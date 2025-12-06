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
  cpf: string
  rg: string | null
  gender: Gender
  gender_label: string
  user_type: UserType
  user_type_label: string
  phone_contact: string
  profile_picture_url: string | null
  student_profile?: Student
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

type UpdateUserRequest = {
  email?: string
  password?: string
  phone_contact?: string
}

type UpdateUserResponse = {
  message: string
  data: User
}

type ApiError = {
  message: string
  errors?: Record<string, string[]>
  statusCode?: number
}
