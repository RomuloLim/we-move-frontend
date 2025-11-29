type DividerProps = {
    text?: string
    className?: string
}

export function Divider({ text, className = "" }: DividerProps) {
    if (!text) {
        return <div className={`h-px bg-gray-200 w-full ${className}`} />
    }

    return (
        <div className={`flex items-center gap-4 w-full ${className}`}>
            <div className="flex-1 h-px bg-gray-200" />
            <span className="font-normal text-sm leading-5 text-gray-500 whitespace-nowrap">
                {text}
            </span>
            <div className="flex-1 h-px bg-gray-200" />
        </div>
    )
}
