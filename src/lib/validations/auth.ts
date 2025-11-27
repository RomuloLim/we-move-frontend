import { z } from "zod"

function validateCPF(cpf: string): boolean {
    const cleanCPF = cpf.replace(/\D/g, "")

    if (cleanCPF.length !== 11) return false
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false

    let sum = 0
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cleanCPF.charAt(i)) * (10 - i)
    }
    let digit = 11 - (sum % 11)
    if (digit >= 10) digit = 0
    if (digit !== parseInt(cleanCPF.charAt(9))) return false

    sum = 0
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cleanCPF.charAt(i)) * (11 - i)
    }
    digit = 11 - (sum % 11)
    if (digit >= 10) digit = 0
    if (digit !== parseInt(cleanCPF.charAt(10))) return false

    return true
}

export const registerSchema = z.object({
    name: z
        .string()
        .min(1, "Nome é obrigatório")
        .max(255, "Nome deve ter no máximo 255 caracteres"),
    email: z
        .string()
        .min(1, "E-mail é obrigatório")
        .email("E-mail inválido")
        .max(255, "E-mail deve ter no máximo 255 caracteres"),
    gender: z.enum(["M", "F", "O"], {
        required_error: "Gênero é obrigatório",
    }),
    cpf: z
        .string()
        .min(1, "CPF é obrigatório")
        .max(14, "CPF inválido")
        .refine(validateCPF, "CPF inválido"),
    phone_contact: z
        .string()
        .min(1, "Telefone é obrigatório")
        .max(15, "Telefone deve ter no máximo 15 caracteres")
        .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Telefone inválido. Use o formato (00) 00000-0000"),
    password: z
        .string()
        .min(8, "Senha deve ter no mínimo 8 caracteres"),
    confirmPassword: z
        .string()
        .min(1, "Confirmação de senha é obrigatória"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
})

export type RegisterFormData = z.infer<typeof registerSchema>
