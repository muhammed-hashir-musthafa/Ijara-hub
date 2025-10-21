export type UserRole = "renter" | "owner" | "admin"

export interface User {
  _id?: string
  customId: string
  fname: string
  lname: string
  email: string
  role: UserRole
  phone: string
  gender: 'male' | 'female' | 'other'
  age: number
  address?: {
    street?: string
    city?: string
    emirate?: string
    zipCode?: string
  }
  companyDetails?: {
    companyName: string
    companyAddress: {
      place: string
      pincode: number
    }
    companyEmail: string
    isCompanyEmailVerified: boolean
    isCompanyVerified: boolean
    companyPhone: number
    since: number
    bio: string
  }
  profileImage?: string | null
  isVerified: boolean
  isActive: boolean
  isDeleted: boolean
  lastLogin?: Date | null
  createdAt?: Date
  updatedAt?: Date
}

export interface LoginPayload {
  email: string
  password: string
  role?: string
}

export interface SignupPayload {
  fname: string
  lname: string
  email: string
  password: string
  phone: string
  gender: 'male' | 'female' | 'other'
  age: number
  address?: {
    street?: string
    city?: string
    emirate?: string
    zipCode?: string
  }
  companyDetails?: {
    companyName: string
    companyAddress: {
      place: string
      pincode: number
    }
    companyEmail: string
    companyPhone: number
    since: number
    bio: string
  }
}

export interface AdminLoginPayload {
  email: string
  password: string
}

export interface AuthResponse {
  message: string
  token: string
  user?: User
}

export interface ProfileResponse {
  user: User
}

export interface UpdateUserPayload {
  fname?: string
  lname?: string
  email?: string
  phone?: string
  gender?: 'male' | 'female' | 'other'
  age?: number
  address?: {
    street?: string
    city?: string
    emirate?: string
    zipCode?: string
  }
  companyDetails?: {
    companyName: string
    companyAddress: {
      place: string
      pincode: number
    }
    companyEmail: string
    companyPhone: number
    since: number
    bio: string
  }
  profileImage?: string | null
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}
