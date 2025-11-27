import { api } from "@/lib/axios"

/**
 * Exemplo de service genérico
 * Use este template para criar novos services na aplicação
 */

// Tipos de exemplo
type ExampleData = {
    id: string
    name: string
    description: string
}

type CreateExampleRequest = Omit<ExampleData, "id">
type UpdateExampleRequest = Partial<CreateExampleRequest>

class ExampleService {
    private readonly endpoint = "/examples"

    /**
     * Lista todos os registros
     */
    async getAll(): Promise<ExampleData[]> {
        const response = await api.get<ExampleData[]>(this.endpoint)
        return response.data
    }

    /**
     * Busca um registro por ID
     */
    async getById(id: string): Promise<ExampleData> {
        const response = await api.get<ExampleData>(`${this.endpoint}/${id}`)
        return response.data
    }

    /**
     * Cria um novo registro
     */
    async create(data: CreateExampleRequest): Promise<ExampleData> {
        const response = await api.post<ExampleData>(this.endpoint, data)
        return response.data
    }

    /**
     * Atualiza um registro existente
     */
    async update(id: string, data: UpdateExampleRequest): Promise<ExampleData> {
        const response = await api.put<ExampleData>(`${this.endpoint}/${id}`, data)
        return response.data
    }

    /**
     * Atualiza parcialmente um registro existente
     */
    async patch(id: string, data: UpdateExampleRequest): Promise<ExampleData> {
        const response = await api.patch<ExampleData>(`${this.endpoint}/${id}`, data)
        return response.data
    }

    /**
     * Deleta um registro
     */
    async delete(id: string): Promise<void> {
        await api.delete(`${this.endpoint}/${id}`)
    }
}

// Exporta uma instância única do service (Singleton)
export const exampleService = new ExampleService()
