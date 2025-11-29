import { api } from "@/lib/axios"

class StudentService {
    async getStudentData(studentId: number): Promise<StudentResponse> {
        const response = await api.get<StudentResponse>(`/v1/students/${studentId}`)
        return response.data
    }
}

export const studentService = new StudentService()
