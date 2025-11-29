type Requisition = {
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
