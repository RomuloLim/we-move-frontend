import { api } from "@/lib/axios"

class RouteService {
    async getRoutes(page: number = 1): Promise<RoutesListResponse> {
        const response = await api.get<RoutesListResponse>(`/v1/routes?page=${page}`)
        return response.data
    }

    async getRouteById(id: number): Promise<RouteDetailResponse> {
        const response = await api.get<RouteDetailResponse>(`/v1/routes/${id}`)
        return response.data
    }

    async getRouteStops(routeId: number): Promise<Stop[]> {
        const response = await api.get<RouteDetailResponse>(`/v1/routes/${routeId}`)
        return response.data.data.stops
    }
}

export const routeService = new RouteService()
