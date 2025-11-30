type Trip = {
    id: number
    route_id: number
    driver_id: number
    vehicle_id: number
    trip_date: string
    status: string
    status_label: string
    route: RouteData
    driver: Driver
    vehicle: Vehicle
    created_at: string
    updated_at: string
}
