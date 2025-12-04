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

type StartTripRequest = {
    route_id: number
    vehicle_id: number
    trip_date: string
}

type StartTripResponse = {
    data: Trip
}

type ActiveTripResponse = {
    data: Trip
}

type TripSummary = {
    route_name: string
    total_boardings: number
    duration: string
}

type CompleteTripResponse = {
    message: string
    data: {
        trip: Trip
        summary: TripSummary
    }
}
