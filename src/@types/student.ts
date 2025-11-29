type StudentUser = {
    id: number
    name: string
    email: string
    cpf: string
    rg: string
    gender: string | null
    gender_label: string
    user_type: string
    user_type_label: string
    phone_contact: string
    profile_picture_url: string
    created_at: string
    updated_at: string
}

type Student = {
    id: number
    user_id: number
    institution_course_id: number
    city_of_origin: string
    status: string
    qrcode_token: string
    user: StudentUser
    latest_requisition: Requisition | null
    available_trips: Trip[]
    created_at: string
    updated_at: string
}

type StudentResponse = {
    data: Student
}
