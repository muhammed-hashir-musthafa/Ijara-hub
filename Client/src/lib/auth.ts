import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

interface BackendUser {
  _id: string
  fname: string
  lname: string
  email: string
  role: "admin" | "owner" | "renter"
  profileImage?: string
  isVerified: boolean
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    })
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              googleId: user.id,
              email: user.email,
              name: user.name,
              image: user.image,
            }),
          })
          
          if (response.ok) {
            const data = await response.json()
            token.backendToken = data.data.token
            token.backendUser = data.data.user
          }
        } catch (error) {
          console.error('Backend auth error:', error)
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token.backendToken) {
        session.accessToken = token.backendToken as string
      }
      
      if (token.backendUser) {
        const backendUser = token.backendUser as BackendUser
        session.user = {
          ...session.user,
          id: backendUser._id,
          role: backendUser.role,
          fname: backendUser.fname,
          lname: backendUser.lname,
        }
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
})