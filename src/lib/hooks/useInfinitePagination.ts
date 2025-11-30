import { useState, useCallback, useRef } from "react"

type UseInfinitePaginationOptions<T> = {
    fetchFunction: (page: number) => Promise<{
        data: T[]
        meta: {
            current_page: number
            last_page: number
            total: number
        }
        links: {
            next: string | null
        }
    }>
    initialPage?: number
}

type UseInfinitePaginationReturn<T> = {
    data: T[]
    isLoading: boolean
    isLoadingMore: boolean
    hasMore: boolean
    error: Error | null
    loadMore: () => Promise<void>
    refresh: () => Promise<void>
    load: () => Promise<void>
}

export function useInfinitePagination<T>({
    fetchFunction,
    initialPage = 1,
}: UseInfinitePaginationOptions<T>): UseInfinitePaginationReturn<T> {
    const [data, setData] = useState<T[]>([])
    const [currentPage, setCurrentPage] = useState(initialPage)
    const [lastPage, setLastPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    const hasLoadedRef = useRef(false)

    const hasMore = currentPage < lastPage

    const loadData = useCallback(
        async (page: number, append: boolean = false) => {
            try {
                if (append) {
                    setIsLoadingMore(true)
                } else {
                    setIsLoading(true)
                }
                setError(null)

                const response = await fetchFunction(page)

                setData((prevData) => (append ? [...prevData, ...response.data] : response.data))
                setCurrentPage(response.meta.current_page)
                setLastPage(response.meta.last_page)
                hasLoadedRef.current = true
            } catch (err) {
                setError(err instanceof Error ? err : new Error("Erro ao carregar dados"))
            } finally {
                setIsLoading(false)
                setIsLoadingMore(false)
            }
        },
        [fetchFunction]
    )

    const load = useCallback(async () => {
        if (!hasLoadedRef.current && !isLoading) {
            await loadData(initialPage, false)
        }
    }, [isLoading, initialPage, loadData])

    const loadMore = useCallback(async () => {
        if (hasMore && !isLoadingMore && !isLoading) {
            await loadData(currentPage + 1, true)
        }
    }, [hasMore, isLoadingMore, isLoading, currentPage, loadData])

    const refresh = useCallback(async () => {
        hasLoadedRef.current = false
        setCurrentPage(initialPage)
        await loadData(initialPage, false)
    }, [initialPage, loadData])

    return {
        data,
        isLoading,
        isLoadingMore,
        hasMore,
        error,
        loadMore,
        refresh,
        load,
    }
}
