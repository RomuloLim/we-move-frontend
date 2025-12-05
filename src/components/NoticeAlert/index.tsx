import { useEffect, useState } from "react"
import { AlertCard } from "@/components/AlertCard"
import { noticeService } from "@/services/notice.service"
import type { Notice } from "@/@types/notice"

type NoticeAlertProps = {
    className?: string
}

export function NoticeAlert({ className }: NoticeAlertProps) {
    const [notice, setNotice] = useState<Notice | null>(null)
    const [loading, setLoading] = useState(true)

    async function fetchUnreadNotice() {
        try {
            setLoading(true)
            const response = await noticeService.getUnreadNotices(1)
            if (response.data.length > 0) {
                setNotice(response.data[0])
            } else {
                setNotice(null)
            }
        } catch (error) {
            console.error("Erro ao buscar notificações:", error)
            setNotice(null)
        } finally {
            setLoading(false)
        }
    }

    async function handleMarkAsRead() {
        if (!notice) return

        try {
            await noticeService.markAsRead(notice.id)
            setNotice(null)
        } catch (error) {
            console.error("Erro ao marcar notificação como lida:", error)
        }
    }

    useEffect(() => {
        fetchUnreadNotice()
    }, [])

    if (loading || !notice) {
        return null
    }


    function getTitle() {
        if (!notice) return ""
        if (notice.route) {
            return `Aviso - ${notice.route.name}`
        }
        return notice.title
    }

    return (
        <AlertCard
            title={getTitle()}
            subject={notice.title.toUpperCase()}
            message={notice.content}
            variant="warning"
            onMarkAsRead={handleMarkAsRead}
            className={className}
        />
    )
}
