import { Check } from "lucide-react"
import { Button } from "@/components/Button"

type TripSummaryModalProps = {
    routeName: string
    totalBoardings: number
    duration: string
    onClose: () => void
}

export function TripSummaryModal({
    routeName,
    totalBoardings,
    duration,
    onClose,
}: TripSummaryModalProps) {
    return (
        <div className="bg-white min-h-screen flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-7 px-4 w-full max-w-md">
                <div className="flex flex-col items-center gap-6">
                    <div className="relative">
                        <div className="bg-blue-600 border-[10px] border-blue-50 rounded-full p-2 flex items-center justify-center">
                            <Check className="size-16 text-white" strokeWidth={3} />
                        </div>
                        <div className="absolute -top-12 -left-10 pointer-events-none">
                            <svg width="208" height="137" viewBox="0 0 208 137" fill="none">
                                <circle cx="25" cy="45" r="6" fill="#FEF0C7" opacity="0.7" />
                                <circle cx="180" cy="30" r="4" fill="#FEE4E2" opacity="0.7" />
                                <circle cx="135" cy="20" r="5" fill="#D1FADF" opacity="0.7" />
                                <circle cx="60" cy="15" r="3" fill="#FEF0C7" opacity="0.7" />
                                <circle cx="95" cy="70" r="7" fill="#B2DDFF" opacity="0.7" />
                                <circle cx="180" cy="80" r="6" fill="#FEE4E2" opacity="0.7" />
                                <path d="M150 65 L155 60 L160 65" stroke="#B2DDFF" strokeWidth="2" fill="none" opacity="0.7" />
                                <rect x="40" y="95" width="8" height="8" fill="#D1FADF" opacity="0.7" transform="rotate(45 44 99)" />
                            </svg>
                        </div>
                    </div>

                    <p className="font-semibold text-lg leading-5 text-gray-900">
                        Viagem Finalizada!
                    </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 w-full space-y-4">
                    <div className="flex items-start justify-between">
                        <span className="font-normal text-sm leading-5 text-gray-500">Rota</span>
                        <span className="font-semibold text-sm leading-5 text-gray-900">{routeName}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="font-normal text-sm leading-5 text-gray-500">Embarques</span>
                        <span className="font-semibold text-sm leading-5 text-gray-900">
                            {totalBoardings} {totalBoardings === 1 ? "Passageiro" : "Passageiros"}
                        </span>
                    </div>

                    <div className="flex items-start justify-between">
                        <span className="font-normal text-sm leading-5 text-gray-500">Tempo de Percurso</span>
                        <span className="font-semibold text-sm leading-5 text-gray-900">{duration}</span>
                    </div>
                </div>

                <div className="px-4 w-full">
                    <Button onClick={onClose} className="w-full">
                        Voltar ao Inicio
                    </Button>
                </div>
            </div>
        </div>
    )
}
