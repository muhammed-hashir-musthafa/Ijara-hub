export type UserRole = "renter" | "owner" | "admin"

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  role: UserRole
  avatar?: string
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}
