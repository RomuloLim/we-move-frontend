import { api } from "@/lib/axios"
import type { CreateRequisitionRequest, CreateRequisitionResponse } from "@/@types/requisition"

class RequisitionService {
    private readonly endpoint = "/v1/requisitions"

    async create(data: CreateRequisitionRequest): Promise<CreateRequisitionResponse> {
        const formData = new FormData()

        formData.append("street_name", data.street_name)
        if (data.house_number) {
            formData.append("house_number", data.house_number)
        }
        formData.append("neighborhood", data.neighborhood)
        formData.append("city", data.city)
        formData.append("phone_contact", data.phone_contact)
        formData.append("birth_date", data.birth_date)
        formData.append("institution_email", data.institution_email)
        formData.append("institution_registration", data.institution_registration)
        formData.append("semester", data.semester.toString())
        formData.append("institution_course_id", data.institution_course_id.toString())
        formData.append("atuation_form", data.atuation_form)
        formData.append("residency_proof", data.residency_proof)
        formData.append("identification_document", data.identification_document)
        formData.append("profile_picture", data.profile_picture)
        formData.append("enrollment_proof", data.enrollment_proof)

        const response = await api.post<CreateRequisitionResponse>(this.endpoint, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })

        return response.data
    }
}

export const requisitionService = new RequisitionService()
