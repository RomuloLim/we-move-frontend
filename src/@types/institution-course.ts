type Institution = {
    id: number
    name: string
    acronym: string
    street: string
    number: string
    complement: string | null
    neighborhood: string
    city: string
    state: string
    zip_code: string
    is_linked: boolean | null
    created_at: string
    updated_at: string
}

type Course = {
    id: number
    name: string
    course_type: string
    description: string
    is_linked: boolean | null
    created_at: string
    updated_at: string
}

type InstitutionCourse = {
    id: number
    institution_id: number
    course_id: number
    institution: Institution
    course: Course
    created_at: string | null
    updated_at: string | null
}
