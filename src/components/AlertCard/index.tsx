import { useState } from "react"
import { cn } from "@/lib/utils"

type AlertCardProps = {
    title: string
    subject: string
    message: string
    variant?: "warning" | "info" | "error" | "success"
    onMarkAsRead?: () => void
    className?: string
}

const variantStyles = {
    warning: {
        border: "border-warning-600",
        banner: "bg-gradient-to-r from-warning-600 to-warning-500",
        titleText: "text-white",
        subjectText: "text-warning-700",
        buttonBorder: "border-warning-600",
        buttonText: "text-warning-700",
        buttonHover: "hover:bg-warning-50",
    },
    info: {
        border: "border-brand-600",
        banner: "bg-gradient-to-r from-brand-600 to-brand-500",
        titleText: "text-white",
        subjectText: "text-brand-700",
        buttonBorder: "border-brand-600",
        buttonText: "text-brand-700",
        buttonHover: "hover:bg-brand-50",
    },
    error: {
        border: "border-error-600",
        banner: "bg-gradient-to-r from-error-600 to-error-500",
        titleText: "text-white",
        subjectText: "text-error-700",
        buttonBorder: "border-error-600",
        buttonText: "text-error-700",
        buttonHover: "hover:bg-error-50",
    },
    success: {
        border: "border-success-600",
        banner: "bg-gradient-to-r from-success-600 to-success-500",
        titleText: "text-white",
        subjectText: "text-success-700",
        buttonBorder: "border-success-600",
        buttonText: "text-success-700",
        buttonHover: "hover:bg-success-50",
    },
}

export function AlertCard({
    title,
    subject,
    message,
    variant = "warning",
    onMarkAsRead,
    className,
}: AlertCardProps) {
    const [isRead, setIsRead] = useState(false)
    const styles = variantStyles[variant]

    function handleMarkAsRead() {
        setIsRead(true)
        onMarkAsRead?.()
    }

    return (
        <div
            className={cn(
                "flex flex-col w-full rounded-2xl border bg-white overflow-hidden",
                styles.border,
                className
            )}
        >
            {/* Banner */}
            <div
                className={cn(
                    "px-4 py-2 flex items-center",
                    styles.banner
                )}
            >
                <p className={cn("font-semibold text-sm leading-5", styles.titleText)}>
                    {title}
                </p>
            </div>

            {/* Subject */}
            <div className="py-2 px-4 flex items-center justify-center">
                <p
                    className={cn(
                        "font-normal text-xs leading-[18px] uppercase",
                        styles.subjectText
                    )}
                >
                    {subject}
                </p>
            </div>

            {/* Content */}
            <div className="px-4 pb-4 flex flex-col gap-2">
                {/* Message */}
                <p className="font-normal text-xs leading-[18px] text-gray-600">
                    {message}
                </p>

                {/* Divider */}
                <div className="w-full h-px bg-gray-200" />

                {/* Button */}
                <div className="flex items-center justify-center">
                    <button
                        type="button"
                        onClick={handleMarkAsRead}
                        disabled={isRead}
                        className={cn(
                            "px-3 py-1 rounded-lg border bg-gray-50 font-semibold text-sm leading-5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                            styles.buttonBorder,
                            styles.buttonText,
                            styles.buttonHover
                        )}
                    >
                        {isRead ? "Marcado como Lido" : "Marcar como Lido"}
                    </button>
                </div>
            </div>
        </div>
    )
}
