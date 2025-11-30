export type Requisition = {
    id: number
    student_id: number
    protocol: string
    status: string
    semester: number
    street_name: string
    house_number: string
    neighborhood: string
    city: string
    phone_contact: string
    birth_date: string
    atuation_form: string
    deny_reason: string | null
    reproved_fields: string | null
    institution_course: InstitutionCourse
    created_at: string
    updated_at: string
}

export type ActuationForm = "student" | "bolsist" | "teacher" | "prep_course" | "other"

export type CreateRequisitionRequest = {
    street_name: string
    house_number?: string | null
    neighborhood: string
    city: string
    phone_contact: string
    birth_date: string
    institution_email: string
    institution_registration: string
    semester: number
    institution_course_id: number
    atuation_form: ActuationForm
    residency_proof: File
    identification_document: File
    profile_picture: File
    enrollment_proof: File
}

export type CreateRequisitionResponse = {
    message: string
    data: {
        protocol: string
        status: string
    }
}
