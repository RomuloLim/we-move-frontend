import { api } from "@/lib/axios"

class TripService {
    async startTrip(data: StartTripRequest): Promise<StartTripResponse> {
        const response = await api.post<StartTripResponse>("/v1/trips/start", data)
        return response.data
    }

    async getMyActiveTrip(): Promise<ActiveTripResponse | null> {
        try {
            const response = await api.get<ActiveTripResponse>("/v1/trips/my-active-trip")
            return response.data
        } catch (error) {
            return null
        }
    }
}

export const tripService = new TripService()
