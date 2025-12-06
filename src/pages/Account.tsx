import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Eye, EyeOff, Mail, User, Lock } from "lucide-react"
import { RequestHeader } from "@/components/RequestHeader"
import { Input } from "@/components/Inputs/Input"
import { PhoneInput } from "@/components/Inputs/PhoneInput"
import { Button } from "@/components/Button"
import { Card } from "@/components/ui/card"
import { authService } from "@/services/auth.service"
import { toast } from "sonner"

const updateUserSchema = z.object({
    email: z
        .string()
        .email("E-mail inválido")
        .max(255, "E-mail deve ter no máximo 255 caracteres")
        .optional()
        .or(z.literal("")),
    password: z
        .string()
        .min(8, "A senha deve ter no mínimo 8 caracteres")
        .optional()
        .or(z.literal("")),
    confirmPassword: z.string().optional().or(z.literal("")),
    phone_contact: z
        .string()
        .max(20, "Telefone deve ter no máximo 20 caracteres")
        .optional()
        .or(z.literal("")),
}).refine((data) => {
    if (data.password && data.password !== data.confirmPassword) {
        return false
    }
    return true
}, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
})

type UpdateUserFormData = z.infer<typeof updateUserSchema>

export default function Account() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const user = authService.getCurrentUser()

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset,
    } = useForm<UpdateUserFormData>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            email: user?.email || "",
            password: "",
            confirmPassword: "",
            phone_contact: user?.phone_contact || "",
        },
    })

    const phoneValue = watch("phone_contact")

    function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValue("phone_contact", e.target.value, { shouldValidate: true })
    }

    function handleCancelEdit() {
        setIsEditing(false)
        reset({
            email: user?.email || "",
            password: "",
            confirmPassword: "",
            phone_contact: user?.phone_contact || "",
        })
        setShowPassword(false)
        setShowConfirmPassword(false)
    }

    async function onSubmit(data: UpdateUserFormData) {
        if (!user) {
            toast.error("Usuário não encontrado")
            return
        }

        try {
            setIsLoading(true)

            const updateData: UpdateUserRequest = {}

            if (data.email && data.email !== user.email) {
                updateData.email = data.email
            }

            if (data.password && data.password.length >= 8) {
                updateData.password = data.password
            }

            if (data.phone_contact && data.phone_contact !== user.phone_contact) {
                updateData.phone_contact = data.phone_contact
            }

            if (Object.keys(updateData).length === 0) {
                toast.info("Nenhuma alteração foi realizada")
                return
            }

            await authService.updateUser(user.id, updateData)

            toast.success("Dados atualizados com sucesso!")
            setIsEditing(false)
            reset({
                email: user?.email || "",
                password: "",
                confirmPassword: "",
                phone_contact: user?.phone_contact || "",
            })
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message || "Erro ao atualizar dados")
            } else {
                toast.error("Erro ao atualizar dados")
            }
        } finally {
            setIsLoading(false)
        }
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-500">Carregando...</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <RequestHeader
                title="Minha Conta"
                subtitle={user.name}
                onBack={() => navigate(-1)}
            />

            <div className="flex-1 overflow-y-auto pb-6">
                <div className="px-4 py-20 space-y-4">
                    <Card className="p-4 space-y-4">
                        <div className="space-y-3">
                            <h3 className="font-semibold text-base text-gray-900">
                                Informações Pessoais
                            </h3>

                            <div className="space-y-3">
                                <Input
                                    label="Nome Completo"
                                    value={user.name}
                                    disabled
                                    leftIcon={<User className="w-5 h-5" />}
                                />

                                <Input
                                    label="CPF"
                                    value={user.cpf}
                                    disabled
                                    leftIcon={<User className="w-5 h-5" />}
                                />

                                {user.rg && (
                                    <Input
                                        label="RG"
                                        value={user.rg || ""}
                                        disabled
                                        leftIcon={<User className="w-5 h-5" />}
                                    />
                                )}

                                <Input
                                    label="Gênero"
                                    value={user.gender_label}
                                    disabled
                                    leftIcon={<User className="w-5 h-5" />}
                                />

                                <Input
                                    label="Tipo de Usuário"
                                    value={user.user_type_label}
                                    disabled
                                    leftIcon={<User className="w-5 h-5" />}
                                />
                            </div>
                        </div>
                    </Card>

                    <Card className="p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-base text-gray-900">
                                Dados de Contato
                            </h3>

                            {!isEditing && (
                                <Button
                                    type="button"
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => setIsEditing(true)}
                                >
                                    Editar
                                </Button>
                            )}
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <Input
                                label="E-mail"
                                type="email"
                                leftIcon={<Mail className="w-5 h-5" />}
                                error={errors.email?.message}
                                disabled={!isEditing}
                                {...register("email")}
                            />

                            <PhoneInput
                                label="Telefone de Contato"
                                value={phoneValue}
                                onChange={handlePhoneChange}
                                error={errors.phone_contact?.message}
                                disabled={!isEditing}
                            />

                            {isEditing && (
                                <>
                                    <div className="pt-2 border-t border-gray-200">
                                        <p className="text-sm text-gray-600 mb-3">
                                            Alterar senha (opcional)
                                        </p>

                                        <div className="space-y-3">
                                            <Input
                                                label="Nova Senha"
                                                type={showPassword ? "text" : "password"}
                                                leftIcon={<Lock className="w-5 h-5" />}
                                                rightIcon={
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="text-gray-400 hover:text-gray-600"
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff className="w-5 h-5" />
                                                        ) : (
                                                            <Eye className="w-5 h-5" />
                                                        )}
                                                    </button>
                                                }
                                                placeholder="Mínimo 8 caracteres"
                                                error={errors.password?.message}
                                                {...register("password")}
                                            />

                                            <Input
                                                label="Confirmar Nova Senha"
                                                type={showConfirmPassword ? "text" : "password"}
                                                leftIcon={<Lock className="w-5 h-5" />}
                                                rightIcon={
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        className="text-gray-400 hover:text-gray-600"
                                                    >
                                                        {showConfirmPassword ? (
                                                            <EyeOff className="w-5 h-5" />
                                                        ) : (
                                                            <Eye className="w-5 h-5" />
                                                        )}
                                                    </button>
                                                }
                                                placeholder="Repita a senha"
                                                error={errors.confirmPassword?.message}
                                                {...register("confirmPassword")}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-2 pt-2">
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            className="flex-1"
                                            onClick={handleCancelEdit}
                                            disabled={isLoading}
                                        >
                                            Cancelar
                                        </Button>

                                        <Button
                                            type="submit"
                                            className="flex-1"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? "Salvando..." : "Salvar"}
                                        </Button>
                                    </div>
                                </>
                            )}
                        </form>
                    </Card>

                    <Card className="p-4 bg-blue-50 border-blue-200">
                        <p className="text-sm text-blue-800">
                            <strong>Atenção:</strong> Para editar outros dados pessoais (nome, CPF, RG, gênero),
                            entre em contato com a administração.
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    )
}
