import { User } from "lucide-react"

type PassengerCardProps = {
    name: string
    cpf: string
    enrollmentId?: string
    profilePictureUrl?: string | null
    onDisembark?: () => void
    isDisembarking?: boolean
}

export function PassengerCard({
    name,
    cpf,
    enrollmentId,
    profilePictureUrl,
    onDisembark,
    isDisembarking = false,
}: PassengerCardProps) {
    function formatCPF(cpf: string): string {
        const cleaned = cpf.replace(/\D/g, "")
        return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
    }

    return (
        <div className="bg-white border border-gray-300 rounded-lg p-3 flex flex-col gap-4">
            {/* Header: Name and Disembark Button */}
            <div className="flex items-center justify-between gap-8">
                <p className="font-medium text-sm leading-5 text-gray-900 flex-1">
                    {name}
                </p>
                <button
                    onClick={onDisembark}
                    disabled={isDisembarking}
                    className="font-semibold text-sm leading-5 text-blue-700 hover:text-blue-800 transition-colors disabled:opacity-50"
                >
                    Desembarque
                </button>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-300" />

            {/* Footer: Info and Profile Picture */}
            <div className="flex items-center justify-between h-[75px]">
                <div className="flex flex-col gap-0 text-sm leading-[18px] text-gray-600">
                    <p>
                        <span className="font-bold">CPF:</span> {formatCPF(cpf)}
                    </p>
                    {enrollmentId && (
                        <p>
                            <span className="font-bold">Matrícula:</span> {enrollmentId}
                        </p>
                    )}
                </div>

                {/* Profile Picture */}
                <div className="w-[75px] h-[75px] rounded-full bg-gray-200 overflow-hidden flex-shrink-0 flex items-center justify-center">
                    {profilePictureUrl ? (
                        <img
                            src={profilePictureUrl}
                            alt={name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <User className="w-8 h-8 text-gray-400" />
                    )}
                </div>
            </div>
        </div>
    )
}
