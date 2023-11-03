import NextAuth, { DefaultSession } from "next-auth"
import { AccessToken } from "./types/common"
import { User } from "next-auth"
import { UserDTO } from "@/lib/dtos/user.dto"

declare module "next-auth" {
  interface Session {
    user: {
      access_token?: AccessToken,
    } & User & DefaultSession["user"],
    test: string,
  }

  interface User extends UserDTO {
    access_token: AccessToken,
  }
}

declare module "next-auth/jwt" {
  interface JWT extends User {
  }
}