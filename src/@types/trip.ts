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

type TripPassenger = {
    id: number
    trip_id: number
    student_id: number
    boarding_timestamp: string
    landed_at: string | null
    is_boarded: boolean
    stop_id: number
    student: {
        id: number
        user_id: number
        institution_course_id: number
        city_of_origin: string
        status: string
        qrcode_token: string
        created_at: string
        updated_at: string
        user: {
            id: number
            name: string
            email: string
            email_verified_at: string | null
            created_at: string
            updated_at: string
            user_type: string
            cpf: string
            rg: string | null
            phone_contact: string
            gender: string
            profile_picture_url: string | null
        }
    }
    stop: {
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
    created_at: string
    updated_at: string
}

type TripPassengersResponse = {
    data: TripPassenger[]
}

type ActiveTripAsStudentResponse = {
    data: {
        id: number
        route_id: number
        driver_id: number
        vehicle_id: number
        trip_date: string
        status: string
        status_label: string
        route: {
            id: number
            route_name: string
            description: string | null
            created_at: string
            updated_at: string
        }
        driver: {
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
            profile_picture_url: string | null
            created_at: string
            updated_at: string
        }
        vehicle: {
            id: number
            license_plate: string
            model: string
            capacity: number
            created_at: string
            updated_at: string
        }
        created_at: string
        updated_at: string
    }
}
