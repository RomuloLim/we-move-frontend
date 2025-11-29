import { useNavigate } from "react-router-dom"
import { ArrowLeftIcon } from "@/components/icons/ArrowLeftIcon"

type RequestHeaderProps = {
    title?: string
    subtitle?: string
    onBack?: () => void
}

export function RequestHeader({
    title = "Enviar Documentos",
    subtitle = "Olivia Rhye",
    onBack
}: RequestHeaderProps) {
    const navigate = useNavigate()

    function handleBack() {
        if (onBack) {
            onBack()
        } else {
            navigate(-1)
        }
    }

    return (
        <div className="bg-white border-b border-gray-200 flex gap-2 h-[52px] items-center px-4 py-2.5">
            <button
                onClick={handleBack}
                className="flex items-center justify-center w-6 h-6 text-gray-700 hover:text-gray-900 transition-colors"
                aria-label="Voltar"
            >
                <ArrowLeftIcon className="w-6 h-6" />
            </button>
            <div className="flex flex-col gap-0.5">
                <h1 className="font-semibold text-base leading-6 text-gray-900">
                    {title}
                </h1>
                <p className="font-normal text-xs leading-[18px] text-gray-500">
                    {subtitle}
                </p>
            </div>
        </div>
    )
}
