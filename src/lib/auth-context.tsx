import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type AuthContextType = {
    currentAuth: User | null
    setCurrentAuth: (user: User | null) => void
    isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthProviderProps = {
    children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [currentAuth, setCurrentAuth] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        function loadStoredUser() {
            const userStr = localStorage.getItem("user")
            const token = localStorage.getItem("token")

            if (userStr && token) {
                try {
                    const user = JSON.parse(userStr) as User
                    setCurrentAuth(user)
                } catch {
                    localStorage.removeItem("user")
                    localStorage.removeItem("token")
                }
            }

            setIsLoading(false)
        }

        loadStoredUser()
    }, [])

    return (
        <AuthContext.Provider value={{ currentAuth, setCurrentAuth, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)

    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }

    return context
}
