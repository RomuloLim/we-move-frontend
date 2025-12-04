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

    async completeTrip(tripId: number): Promise<CompleteTripResponse> {
        const response = await api.patch<CompleteTripResponse>(`/v1/trips/${tripId}/complete`)
        return response.data
    }
}

export const tripService = new TripService()
