import type {NextAuthOptions} from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

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
                    },
                    // メルアド認証処理
              
                    async authorize(credentials) {
                        const users = [
                            {id: "1", email: "user1@example.com", password: "password1"},
                            {id: "2", email: "user2@example.com", password: "password2"},
                            {id: "3", email: "abc@abc", password: "123"},
                        ];
                        console.log("入りました");

                        const user = users.find(user => user.email === credentials?.email);

                        if (user && user?.password === credentials?.password) {
                            return {id: user.id, name: user.email, email: user.email, role: "admin"};
                        } else {
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