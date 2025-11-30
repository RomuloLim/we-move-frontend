import { z } from "zod"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const MAX_PHOTO_SIZE = 2 * 1024 * 1024 // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
const ACCEPTED_DOCUMENT_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "application/pdf"]

export const requisitionFormSchema = z.object({
    address: z
        .string()
        .optional()
        .refine((val) => val && val.trim().length > 0, "Endereço é obrigatório")
        .refine((val) => !val || val.length <= 255, "Endereço deve ter no máximo 255 caracteres"),
    number: z.string().optional().refine((val) => !val || val.length <= 20, "Número deve ter no máximo 20 caracteres"),
    neighborhood: z
        .string()
        .optional()
        .refine((val) => val && val.trim().length > 0, "Bairro é obrigatório")
        .refine((val) => !val || val.length <= 100, "Bairro deve ter no máximo 100 caracteres"),
    city: z
        .string()
        .optional()
        .refine((val) => val && val.trim().length > 0, "Cidade é obrigatória")
        .refine((val) => !val || val.length <= 100, "Cidade deve ter no máximo 100 caracteres"),
    phone: z
        .string()
        .optional()
        .refine((val) => val && val.trim().length > 0, "Telefone é obrigatório")
        .refine((val) => !val || val.replace(/\D/g, '').length >= 10, "Telefone deve ter no mínimo 10 dígitos")
        .refine((val) => !val || val.replace(/\D/g, '').length <= 11, "Telefone deve ter no máximo 11 dígitos"),
    countryCode: z.string(),
    birthDate: z
        .string()
        .optional()
        .refine((val) => val && val.trim().length > 0, "Data de nascimento é obrigatória")
        .refine((val) => {
            if (!val) return true
            return /^\d{2}\/\d{2}\/\d{4}$/.test(val) || /^\d{4}-\d{2}-\d{2}$/.test(val)
        }, "Formato inválido (DD/MM/AAAA)")
        .refine((val) => {
            if (!val || !val.includes('/')) return true
            const [day, month, year] = val.split('/').map(Number)
            const date = new Date(year, month - 1, day)
            return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
        }, "Data inválida"),
    addressProof: z
        .instanceof(File)
        .nullable()
        .optional()
        .refine((file) => file !== null && file !== undefined, "Comprovante de endereço é obrigatório")
        .refine((file) => !file || file.size <= MAX_FILE_SIZE, "Arquivo deve ter no máximo 5MB")
        .refine((file) => !file || ACCEPTED_DOCUMENT_TYPES.includes(file.type), "Formato não aceito. Use PDF ou imagem"),
    photoId: z
        .instanceof(File)
        .nullable()
        .optional()
        .refine((file) => file !== null && file !== undefined, "Documento com foto é obrigatório")
        .refine((file) => !file || file.size <= MAX_FILE_SIZE, "Arquivo deve ter no máximo 5MB")
        .refine((file) => !file || ACCEPTED_DOCUMENT_TYPES.includes(file.type), "Formato não aceito. Use PDF ou imagem"),
    photo3x4: z
        .instanceof(File)
        .nullable()
        .optional()
        .refine((file) => file !== null && file !== undefined, "Foto 3x4 é obrigatória")
        .refine((file) => !file || file.size <= MAX_PHOTO_SIZE, "Foto deve ter no máximo 2MB")
        .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), "Formato não aceito. Use apenas imagens"),
    email: z
        .string()
        .optional()
        .refine((val) => val && val.trim().length > 0, "Email é obrigatório")
        .refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), "Email inválido")
        .refine((val) => !val || val.length <= 255, "Email deve ter no máximo 255 caracteres"),
    registration: z
        .string()
        .optional()
        .refine((val) => val && val.trim().length > 0, "Matrícula é obrigatória")
        .refine((val) => !val || val.length <= 100, "Matrícula deve ter no máximo 100 caracteres"),
    semester: z
        .string()
        .optional()
        .refine((val) => val && val.trim().length > 0, "Semestre é obrigatório")
        .refine((val) => {
            if (!val) return true
            const num = Number.parseInt(val)
            return !Number.isNaN(num) && num >= 1
        }, "Semestre deve ser um número maior ou igual a 1"),
    institution: z
        .string()
        .optional()
        .refine((val) => val && val.trim().length > 0, "Instituição é obrigatória"),
    course: z
        .string()
        .optional()
        .refine((val) => val && val.trim().length > 0, "Curso é obrigatório"),
    actuationForm: z.enum(["student", "bolsist", "teacher", "prep_course", "other"]),
    enrollmentProof: z
        .instanceof(File)
        .nullable()
        .optional()
        .refine((file) => file !== null && file !== undefined, "Comprovante de matrícula é obrigatório")
        .refine((file) => !file || file.size <= MAX_FILE_SIZE, "Arquivo deve ter no máximo 5MB")
        .refine((file) => !file || ACCEPTED_DOCUMENT_TYPES.includes(file.type), "Formato não aceito. Use PDF ou imagem"),
})

export type RequisitionFormData = z.infer<typeof requisitionFormSchema>
