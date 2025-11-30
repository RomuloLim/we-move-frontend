type Institution = {
    id: number
    name: string
    acronym: string | null
    street: string
    number: string
    complement: string | null
    neighborhood: string
    city: string
    state: string
    zip_code: string
    courses?: Course[]
    is_linked: boolean | null
    created_at: string
    updated_at: string
}

type Course = {
    id: number
    name: string
    course_type: string
    description: string | null
    institution_course_id?: number
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

type PaginationLinks = {
    first: string | null
    last: string | null
    prev: string | null
    next: string | null
}

type PaginationMeta = {
    current_page: number
    from: number
    last_page: number
    links: Array<{
        url: string | null
        label: string
        page: number | null
        active: boolean
    }>
    path: string
    per_page: number
    to: number
    total: number
}

type PaginatedResponse<T> = {
    data: T[]
    links: PaginationLinks
    meta: PaginationMeta
}

type InstitutionsResponse = PaginatedResponse<Institution>

type InstitutionDetailsResponse = {
    data: Institution
}

export type {
    Institution,
    Course,
    InstitutionCourse,
    PaginationLinks,
    PaginationMeta,
    PaginatedResponse,
    InstitutionsResponse,
    InstitutionDetailsResponse,
}
