import { api } from "@/lib/axios"
import type { InstitutionsResponse, InstitutionDetailsResponse } from "@/@types/institution-course"

class InstitutionService {
    async getInstitutions(page: number = 1): Promise<InstitutionsResponse> {
        const response = await api.get<InstitutionsResponse>(`/v1/institutions?page=${page}`)
        return response.data
    }

    async getInstitutionById(id: number): Promise<InstitutionDetailsResponse> {
        const response = await api.get<InstitutionDetailsResponse>(`/v1/institutions/${id}`)
        return response.data
    }
}

export const institutionService = new InstitutionService()
