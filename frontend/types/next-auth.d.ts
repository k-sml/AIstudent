 // types/next-auth.d.ts 
 import NextAuth from "next-auth"
 
 declare module "next-auth" {
   /**
    * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
    */
   interface Session {
     user: {
       name: string
       id: string
       email: string
       role: string
     }
   }
 } 