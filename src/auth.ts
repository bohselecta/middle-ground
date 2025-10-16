import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db"
import EmailProvider from "next-auth/providers/email"
// Optional OAuth providers:
// import GitHub from "next-auth/providers/github"
// import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" }, // or "jwt" for edge-friendly
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    // GitHub({ 
    //   clientId: process.env.GITHUB_ID!, 
    //   clientSecret: process.env.GITHUB_SECRET! 
    // }),
    // Google({ 
    //   clientId: process.env.GOOGLE_ID!, 
    //   clientSecret: process.env.GOOGLE_SECRET! 
    // }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, user }) {
      // Expose role & settings to client
      if (session.user) {
        (session.user as any).id = user.id
        ;(session.user as any).role = (user as any).role
        ;(session.user as any).shareTrends = (user as any).shareTrends
        ;(session.user as any).safeMode = (user as any).safeMode
      }
      return session
    },
  },
})
