import { api } from "@/lib/axios"
import type { MarkAsReadResponse, NoticeResponse } from "@/@types/notice"

class NoticeService {
    async getUnreadNotices(perPage: number = 1): Promise<NoticeResponse> {
        const response = await api.get<NoticeResponse>("/v1/notices/unread", {
            params: { per_page: perPage },
        })
        return response.data
    }

    async markAsRead(noticeId: number): Promise<MarkAsReadResponse> {
        const response = await api.post<MarkAsReadResponse>(
            `/v1/notices/${noticeId}/mark-as-read`
        )
        return response.data
    }
}

export const noticeService = new NoticeService()
