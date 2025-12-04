import { useEffect, useRef, useState, type ReactNode } from "react"
import { Loader2 } from "lucide-react"

type PullToRefreshProps = {
    onRefresh: () => Promise<void>
    children: ReactNode
    threshold?: number
    maxPullDistance?: number
}

export function PullToRefresh({
    onRefresh,
    children,
    threshold = 80,
    maxPullDistance = 120,
}: PullToRefreshProps) {
    const [pullDistance, setPullDistance] = useState(0)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [startY, setStartY] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        function handleTouchStart(e: TouchEvent) {
            if (container && container.scrollTop === 0) {
                setStartY(e.touches[0].clientY)
            }
        }

        function handleTouchMove(e: TouchEvent) {
            if (isRefreshing || !container || container.scrollTop > 0) return

            const currentY = e.touches[0].clientY
            const distance = currentY - startY

            if (distance > 0) {
                e.preventDefault()
                const pull = Math.min(distance * 0.5, maxPullDistance)
                setPullDistance(pull)
            }
        }

        async function handleTouchEnd() {
            if (pullDistance >= threshold && !isRefreshing) {
                setIsRefreshing(true)
                setPullDistance(threshold)

                try {
                    await onRefresh()
                } finally {
                    setIsRefreshing(false)
                    setPullDistance(0)
                }
            } else {
                setPullDistance(0)
            }
            setStartY(0)
        }

        container.addEventListener("touchstart", handleTouchStart, { passive: true })
        container.addEventListener("touchmove", handleTouchMove, { passive: false })
        container.addEventListener("touchend", handleTouchEnd, { passive: true })

        return () => {
            container.removeEventListener("touchstart", handleTouchStart)
            container.removeEventListener("touchmove", handleTouchMove)
            container.removeEventListener("touchend", handleTouchEnd)
        }
    }, [startY, pullDistance, isRefreshing, onRefresh, threshold, maxPullDistance])

    const shouldShowIndicator = pullDistance > 0 || isRefreshing
    const indicatorOpacity = Math.min(pullDistance / threshold, 1)
    const indicatorScale = Math.min(0.5 + (pullDistance / threshold) * 0.5, 1)

    return (
        <div ref={containerRef} className="relative h-full overflow-y-auto">
            {/* Pull to Refresh Indicator */}
            {shouldShowIndicator && (
                <div
                    className="absolute top-0 left-0 right-0 flex justify-center items-center transition-transform duration-200 z-50"
                    style={{
                        transform: `translateY(${isRefreshing ? threshold - 40 : pullDistance - 40}px)`,
                        opacity: isRefreshing ? 1 : indicatorOpacity,
                    }}
                >
                    <div
                        className="bg-white rounded-full p-2 shadow-lg"
                        style={{
                            transform: `scale(${indicatorScale})`,
                        }}
                    >
                        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                    </div>
                </div>
            )}

            {/* Content with padding on top when pulling */}
            <div
                style={{
                    transform: `translateY(${isRefreshing ? threshold : pullDistance}px)`,
                    transition: isRefreshing ? "transform 0.2s ease-out" : "none",
                }}
            >
                {children}
            </div>
        </div>
    )
}
