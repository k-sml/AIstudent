import type {NextAuthOptions} from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import apiClient from "@/lib/apiClient";
import Axios from "axios";

export const options: NextAuthOptions = {
        debug: true,
        session: {strategy: "jwt"},
        providers: [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID!,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
           
                async profile(profile) {
                    const user = {email: profile.email, password: profile.sub };
                    try {
                        const res = await apiClient.post('/api/users/login',user);
                        if(res.data==0){
                            const signInUser = {name: profile.name, email: profile.email, password: profile.sub };
                            const res = await apiClient.post('/api/users/', signInUser);
                            return {id: res.data.id, name: res.data.name, email: res.data.email}
                        }
                        return {id: res.data.id, name: res.data.name, email: res.data.email, role: null}
                    }catch (e) {
                        console.log(e);
                        return {id: null, name: null, email: null}
                  
                    }
                }
            }),
            CredentialsProvider({
                    name: "Credentials",
                    credentials: {
                        email: { label: 'email', type: 'email', placeholder: 'メールアドレス' },
                        password: { label: 'password', type: 'password' },
                        name: { label: 'name', type: 'text' },
                        type: { label: 'type', type: 'text' },

                    },
                    // メルアド認証処理
                    async authorize(credentials) {
                        console.log("authorize入りました");
                        //login処理
                        try {
                            if(credentials?.type=="signup"){
                                const user = {name: credentials?.name, email: credentials?.email, password: credentials?.password };
                                const res = await apiClient.post('/api/users/',user);
                                console.log("res",res.data);
                                return {id: res.data.id, name: res.data.name, email: res.data.email, role: null}
                            }
                            else{
                                const user = {email: credentials?.email, password: credentials?.password };
                                const res = await apiClient.post('/api/users/login',user);
                                if(res.data==0){
                                    return null;
                                }
                                return {id: res.data.id, name: res.data.name, email: res.data.email, role: null}
                            }
                        }catch (e) {
                            if (Axios.isAxiosError(e) && e.response && e.response.status === 400) {
                                console.log('400 Error!!');
                                return null;
                            }
                    
                            return null;
                        }
                    }
                }
            ),
        ],
        secret: process.env.NEXTAUTH_SECRET,
        callbacks: {
            jwt: async ({token, user, account, profile, isNewUser,trigger}) => {
                console.log("jwt入りました")
                // 注意: トークンをログ出力してはダメです。
                console.log('in jwt', {user, token, account, profile, trigger})
                if (user) {
                    token.user = user;
                    const u = user as any
                    token.role = "admin";
                }
                if (account) {
                    token.accessToken = account.access_token
                }
                return token;
            },
            session: ({session, token}) => {
                console.log("in session", {session, token});
                token.accessToken
                if (session.user != null && token.sub != null) {
                    session.user.id = token.sub;
                }
              
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