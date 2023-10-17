import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/libs/db"


export const AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      })
    ],
    callbacks: {

      async jwt({ token, user, session }) {
        // console.log(user)
        if(user){
          return {
            ...token,
            id: user.id
          };
        }
        // console.log(token)
        return token
      },

      async session({ session, user, token }) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id
          }
        }
      },

    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    // debug: process.env.NODE_ENV === "development",
  }

const handler = NextAuth(AuthOptions)

export { handler as GET, handler as POST }