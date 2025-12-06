import { api } from "@/lib/axios"

const VALID_USER_TYPES = ["student", "driver", "super-admin"]

class AuthService {
    async login(credentials: LoginRequest): Promise<LoginResponse> {
        const response = await api.post<LoginResponse>("/v1/auth/login", credentials)

        const { user, token } = response.data.data

        if (!VALID_USER_TYPES.includes(user.user_type)) {
            throw new Error("Tipo de usuário inválido. É necessário ser estudante, motorista ou super administrador.")
        }

        localStorage.setItem("token", token)

        await this.verifyAuth()

        return response.data
    }

    async register(userData: RegisterRequest): Promise<RegisterResponse> {
        const response = await api.post<RegisterResponse>("/v1/register", userData)

        const user = response.data.data

        if (user?.user_type && !VALID_USER_TYPES.includes(user.user_type)) {
            throw new Error("Tipo de usuário inválido. É necessário ser estudante, motorista ou super administrador.")
        }

        return response.data
    }

    async logout(): Promise<void> {
        try {
            await api.post("/v1/auth/logout")
        } finally {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
        }
    }

    getCurrentUser(): User | null {
        const userStr = localStorage.getItem("user")
        if (!userStr) return null

        try {
            return JSON.parse(userStr) as User
        } catch {
            return null
        }
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem("token")
    }

    getToken(): string | null {
        return localStorage.getItem("token")
    }

    async verifyAuth(): Promise<User> {
        const response = await api.get<MeResponse>("/v1/auth/me")
        const user = response.data.data

        if (!VALID_USER_TYPES.includes(user.user_type)) {
            this.logout()
            throw new Error("Invalid user type detected.")
        }

        localStorage.setItem("user", JSON.stringify(user))
        return user
    }

    async updateUser(userId: number, data: UpdateUserRequest): Promise<UpdateUserResponse> {
        const response = await api.put<UpdateUserResponse>(`/v1/users/${userId}`, data)

        const updatedUser = response.data.data
        localStorage.setItem("user", JSON.stringify(updatedUser))

        return response.data
    }
}

export const authService = new AuthService()
