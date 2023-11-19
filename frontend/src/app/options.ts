import type {NextAuthOptions} from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import apiClient from "@/lib/apiClient";

export const options: NextAuthOptions = {
        debug: true,
        session: {strategy: "jwt"},
        providers: [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID!,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET!
            }),
            CredentialsProvider({
                    name: "Credentials",
                    credentials: {
                        email: { label: 'email', type: 'email', placeholder: 'メールアドレス' },
                        password: { label: 'password', type: 'password' },
                        name: { label: 'name', type: 'text' },
                    },
                    // メルアド認証処理
              
                    async authorize(credentials) {
                        console.log("入りました");
                        try {
                            const body = { name: credentials?.name, email: credentials?.email, password: credentials?.password };
                            console.log(body);
                            const res = await apiClient.post('/api/users',body);
                            console.log(res.data);
                            return {id: res.data.id, name: res.data.email, email: res.data.email, role: "admin"}
                        }catch (e) {
                            console.log(e);
                            return null;
                        }
                    }
                }
            ),
        ],
        callbacks: {
            jwt: async ({token, user, account, profile, isNewUser}) => {
                // 注意: トークンをログ出力してはダメです。
                console.log('in jwt', {user, token, account, profile})

                if (user) {
                    token.user = user;
                    const u = user as any
                    token.role = u.role;
                }
                if (account) {
                    token.accessToken = account.access_token
                }
                return token;
            },
            session: ({session, token}) => {
                console.log("in session", {session, token});
                token.accessToken
                return {
                    ...session,
                    user: {
                        ...session.user,
                        role: token.role,
                    },
                };
            },
        },
        pages: {
          signIn: '/signup',
        },
    }
;