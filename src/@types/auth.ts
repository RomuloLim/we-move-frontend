type LoginRequest = {
  email: string
  password: string
}

type Gender = "M" | "F" | "O"

type RegisterRequest = {
  name: string
  email: string
  gender: Gender
  cpf: string
  rg?: string
  phone_contact: string
  password: string
}

type UserType = "student" | "driver" | "super-admin"

type User = {
  id: number
  name: string
  email: string
  gender: Gender
  user_type: UserType
  email_verified_at: string | null
  created_at: string
  updated_at: string
}

type LoginResponse = {
  message: string
  data: {
    user: User
    token: string
    token_type: string
  }
}

type RegisterResponse = {
  message: string
  data: User
}

type MeResponse = {
  data: User
}

type ApiError = {
  message: string
  errors?: Record<string, string[]>
  statusCode?: number
}
