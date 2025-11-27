import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/Button"
import { FormattedInput } from "@/components/Inputs/FormattedInput"
import { RadioGroup } from "@/components/Inputs/RadioGroup"
import { registerSchema, type RegisterFormData } from "@/lib/validations/auth"
import { authService } from "@/services/auth.service"
import { FiLock, FiMail, FiUser, FiPhone } from "react-icons/fi"
import { AlertCircle } from "lucide-react"

export default function Register() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    })

    async function onSubmit(data: RegisterFormData) {
        setError("")
        setLoading(true)

        try {
            const { confirmPassword, ...registerData } = data
            await authService.register(registerData)
            navigate("/login", { state: { message: "Cadastro realizado com sucesso! Faça login para continuar." } })
        } catch (err) {
            const error = err as { response?: { data?: ApiError }; message?: string }
            const errorMessage = error.response?.data?.message || error.message || "Erro ao realizar cadastro. Tente novamente."
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden md:max-w-2xl lg:shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                <div className="hidden md:block h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>

                <div className="px-6 pt-6">
                    <h1 className="text-2xl font-semibold">Informações pessoais</h1>
                    <p className="text-gray-600">Antes de utilizar esta aplicação, precisamos de algumas informações básicas.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6">
                    {error && (
                        <div className="flex items-center gap-2 p-3 mb-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <FormattedInput
                        {...register("name")}
                        placeholder="Nome completo"
                        label="Nome completo"
                        className="mb-3"
                        leftIcon={<FiUser size={16} />}
                        error={errors.name?.message}
                        disabled={loading}
                    />

                    <RadioGroup
                        label="Gênero"
                        name="gender"
                        containerClassName="mb-3"
                        error={errors.gender?.message}
                    >
                        <RadioGroup.Item
                            {...register("gender")}
                            value="M"
                            label="Masculino"
                            disabled={loading}
                        />
                        <RadioGroup.Item
                            {...register("gender")}
                            value="F"
                            label="Feminino"
                            disabled={loading}
                        />
                        <RadioGroup.Item
                            {...register("gender")}
                            value="O"
                            label="Outro"
                            disabled={loading}
                        />
                    </RadioGroup>

                    <div className="lg:flex gap-2">
                        <Controller
                            name="cpf"
                            control={control}
                            render={({ field }) => (
                                <FormattedInput
                                    {...field}
                                    placeholder="000.000.000-00"
                                    label="CPF"
                                    className="mb-3"
                                    mask="000.000.000-00"
                                    error={errors.cpf?.message}
                                    disabled={loading}
                                />
                            )}
                        />
                    </div>

                    <Controller
                        name="phone_contact"
                        control={control}
                        render={({ field }) => (
                            <FormattedInput
                                {...field}
                                placeholder="(00) 00000-0000"
                                label="Telefone"
                                className="mb-3"
                                mask="(00) 00000-0000"
                                leftIcon={<FiPhone size={16} />}
                                error={errors.phone_contact?.message}
                                disabled={loading}
                            />
                        )}
                    />

                    <FormattedInput
                        {...register("email")}
                        placeholder="seu@email.com"
                        label="E-mail"
                        className="mb-3"
                        type="email"
                        leftIcon={<FiMail size={16} />}
                        error={errors.email?.message}
                        disabled={loading}
                    />

                    <div className="lg:flex gap-2">
                        <FormattedInput
                            {...register("password")}
                            placeholder="Digite sua senha"
                            label="Senha"
                            className="mb-3"
                            type="password"
                            leftIcon={<FiLock size={16} />}
                            error={errors.password?.message}
                            disabled={loading}
                        />
                        <FormattedInput
                            {...register("confirmPassword")}
                            placeholder="Confirme sua senha"
                            label="Confirme a senha"
                            className="mb-3"
                            type="password"
                            leftIcon={<FiLock size={16} />}
                            error={errors.confirmPassword?.message}
                            disabled={loading}
                        />
                    </div>

                    <div className="text-center pt-2">
                        <p className="text-xs text-gray-600 md:text-sm">
                            Já possui acesso?{" "}
                            <Link
                                to="/login"
                                className="text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-all duration-200"
                            >
                                Login
                            </Link>
                        </p>
                    </div>

                    <div className="pt-4">
                        <Button
                            type="submit"
                            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            size="lg"
                            variant="primary"
                            disabled={loading}
                        >
                            {loading ? "Cadastrando..." : "Realizar cadastro"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
