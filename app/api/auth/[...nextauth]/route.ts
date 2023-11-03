import { LoginResponseDTO } from "@/lib/dtos/login.dto";
import { log } from "console";
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jdoe" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials)
          throw new Error("No credentials")
        
        const loginResponse: LoginResponseDTO = await fetch(process.env.NEXT_PUBLIC_COMMON_API_URL + "/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: credentials.username, password: credentials.password })
        })
        .then(res => res.json())

        if (loginResponse.user) {
          return {
            ...loginResponse.user,
            access_token: loginResponse.token
          }
        } else {
          return null
        }
      }
    })
  ],
  secret: process.env.SECRET,
  callbacks: {
    async session({ session, token, user }) {
      console.log("route.ts/session/session", session)
      console.log("route.ts/session/token", token)
      console.log("route.ts/session/user", user)

      session.user = token
      session.test = "test"

      console.log("route.ts/session/--- FILLED SESSION ----", session)

      return session
    },
    async jwt({ token, user, account, profile }) {
      console.log("route.ts/jwt/token", token)
      console.log("route.ts/jwt/user", user)
      console.log("route.ts/jwt/account", account)
      console.log("route.ts/jwt/profile", profile)

      if (user) {
        token = {
          ...token,
          ...user,
          name: user.username,
        }
      }

      return { ...token, ...user, name: user?.username  }
    }
  },
  pages: {
    signIn: "/login",
    error: "/login"
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST, authOptions }