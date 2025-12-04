type Vehicle = {
    id: number
    license_plate: string
    model: string
    capacity: number
    created_at: string
    updated_at: string
}

type VehicleAvailability = "all" | "available" | "in_use"

type VehiclesListResponse = {
    data: Vehicle[]
    links: {
        first: string
        last: string
        prev: string | null
        next: string | null
    }
    meta: {
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
}
