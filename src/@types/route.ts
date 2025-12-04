type Stop = {
    id: number
    route_id: number
    stop_name: string
    latitude: string
    longitude: string
    scheduled_time: string | null
    order: number
    created_at: string
    updated_at: string
}

type RouteData = {
    id: number
    route_name: string
    description: string | null
    stops_amount: number
    first_stop: Stop
    last_stop: Stop
    created_at: string
    updated_at: string
}

type RouteDetail = {
    id: number
    route_name: string
    description: string | null
    stops: Stop[]
    created_at: string
    updated_at: string
}

type RouteDetailResponse = {
    data: RouteDetail
}

type RoutesListResponse = {
    data: RouteData[]
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

