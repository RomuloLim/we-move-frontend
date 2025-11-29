type Stop = {
    id: number
    route_id: number
    stop_name: string
    latitude: string
    longitude: string
    scheduled_time: number
    order: number
    created_at: string
    updated_at: string
}

type RouteData = {
    id: number
    route_name: string
    description: string
    stops: Stop[]
    created_at: string
    updated_at: string
}
