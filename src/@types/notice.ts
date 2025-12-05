export type NoticeType = "general" | "route_alert"

export type NoticeAuthor = {
    id: number
    name: string
    email: string
}

export type NoticeRoute = {
    id: number
    name: string
    description: string
}

export type Notice = {
    id: number
    title: string
    content: string
    type: NoticeType
    author: NoticeAuthor
    route: NoticeRoute | null
    created_at: string
    updated_at: string
}

export type NoticeLinks = {
    first: string
    last: string
    prev: string | null
    next: string | null
}

export type NoticeMeta = {
    current_page: number
    from: number
    last_page: number
    path: string
    per_page: number
    to: number
    total: number
}

export type NoticeResponse = {
    data: Notice[]
    links: NoticeLinks
    meta: NoticeMeta
}

export type MarkAsReadResponse = {
    message: string
}
