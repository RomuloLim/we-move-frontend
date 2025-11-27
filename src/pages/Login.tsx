import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Input } from "@/components/Inputs/Input"
import { Button } from "@/components/Button"
import { Mail, Lock, AlertCircle, CheckCircle } from "lucide-react"
import { authService } from "@/services/auth.service"
import { loginSchema, type LoginFormData } from "@/lib/validations/login"

export default function Login() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const navigate = useNavigate()
    const location = useLocation()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    })

    useEffect(() => {
        const state = location.state as { message?: string }
        if (state?.message) {
            setSuccessMessage(state.message)
            window.history.replaceState({}, document.title)
        }
    }, [location])

    async function onSubmit(data: LoginFormData) {
        setError("")
        setSuccessMessage("")
        setLoading(true)

        try {
            await authService.login(data)
            navigate("/")
        } catch (err) {
            const error = err as { response?: { data?: ApiError }; message?: string }
            const errorMessage = error.response?.data?.message ? "Credenciais Inválidas" : error.message || "Erro ao fazer login. Tente novamente."
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden md:max-w-md lg:shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                <div className="hidden md:block h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-6 md:p-8 lg:p-10 space-y-6">
                    <div className="flex justify-center mb-4 md:mb-8">
                        <div className="flex items-center gap-4 transform hover:scale-105 transition-transform duration-200">
                            <img
                                src="/images/blue-typographic-logo.svg"
                                alt="WeMove"
                                className="h-16 md:h-20 lg:h-24"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        {successMessage && (
                            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                                <span>{successMessage}</span>
                            </div>
                        )}

                        {error && (
                            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <Input
                            {...register("email")}
                            label="Email"
                            type="email"
                            placeholder="estudante@email.com"
                            leftIcon={<Mail className="w-4 h-4" />}
                            size="lg"
                            error={errors.email?.message}
                            disabled={loading}
                        />

                        <Input
                            {...register("password")}
                            label="Senha"
                            type="password"
                            placeholder="Digite sua senha"
                            leftIcon={<Lock className="w-4 h-4" />}
                            size="lg"
                            error={errors.password?.message}
                            disabled={loading}
                        />
                    </div>

                    <div className="pt-4">
                        <Button
                            type="submit"
                            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            size="lg"
                            variant="primary"
                            disabled={loading}
                        >
                            {loading ? "Entrando..." : "Login"}
                        </Button>
                    </div>

                    <div className="text-center pt-2">
                        <p className="text-xs text-gray-600 md:text-sm">
                            Ainda não possui cadastro?{" "}
                            <Link
                                to="/register"
                                className="text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-all duration-200"
                            >
                                Registre-se
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}
