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

    async getTripPassengers(tripId: number, onlyBoarded: boolean = true): Promise<TripPassengersResponse> {
        const response = await api.get<TripPassengersResponse>(`/v1/trips/${tripId}/passengers`, {
            params: { only_boarded: onlyBoarded }
        })
        return response.data
    }

    async unboardPassenger(tripId: number, studentId: number): Promise<{ message: string }> {
        const response = await api.post<{ message: string }>("/v1/boardings/unboard", {
            trip_id: tripId,
            student_id: studentId
        })
        return response.data
    }
}

export const tripService = new TripService()
