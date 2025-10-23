import { DefaultSession } from "next-auth"

interface BackendUser {
  _id: string
  fname: string
  lname: string
  email: string
  role: "admin" | "owner" | "renter"
  profileImage?: string
  isVerified: boolean
}

declare module "next-auth" {
  interface Session {
    accessToken?: string
    user: {
      id: string
      role: string
      fname?: string
      lname?: string
    } & DefaultSession["user"]
  }

  interface JWT {
    accessToken?: string
    user?: BackendUser
  }
}