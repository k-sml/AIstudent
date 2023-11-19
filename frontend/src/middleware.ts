import { withAuth } from "next-auth/middleware"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
  },
  {
    callbacks: {
        // 認可に関する処理。ロールが `admin` ならOK
        authorized: ({token}) => {
            console.log("in authorized", {token})
            return token?.role === "admin"
             // if(token) return true // デフォ
        },
    },
  }
)

export const config = { matcher: ["/((?!api|signup|login|test).*)"] }