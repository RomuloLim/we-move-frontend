import { api } from "@/lib/axios"

class VehicleService {
    async getVehicles(page: number = 1, availability: VehicleAvailability = "available"): Promise<VehiclesListResponse> {
        const response = await api.get<VehiclesListResponse>(`/v1/vehicles?page=${page}&availability=${availability}`)
        return response.data
    }
}

export const vehicleService = new VehicleService()
