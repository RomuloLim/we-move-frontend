import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react"
import { QRCodeScanner } from "@/components/QRCodeScanner"
import { tripService } from "@/services/trip.service"

export default function StopBoarding() {
    const navigate = useNavigate()
    const { stopId } = useParams<{ stopId: string }>()
    const [scannedCode, setScannedCode] = useState<string | null>(null)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [isProcessing, setIsProcessing] = useState(false)

    async function handleScan(code: string) {
        if (isProcessing) return

        try {
            setIsProcessing(true)
            setScannedCode(code)

            const tripData = localStorage.getItem("currentTrip")
            if (!tripData || !stopId) {
                throw new Error("Dados da viagem ou parada não encontrados")
            }

            const trip = JSON.parse(tripData) as Trip
            await tripService.boardPassenger(trip.id, Number(stopId), code)

            setShowSuccess(true)

            // Redirect back after 2 seconds with state to reopen drawer
            setTimeout(() => {
                navigate(`/trajeto/${trip.id}`, {
                    state: { reopenDrawer: true, stopId: Number(stopId) }
                })
            }, 2000)
        } catch (error: any) {
            console.error("Erro ao realizar embarque:", error)
            setErrorMessage(error.response?.data?.message || "Erro ao realizar embarque")
            setShowError(true)

            setTimeout(() => {
                setShowError(false)
                setIsProcessing(false)
                setScannedCode(null)
            }, 3000)
        }
    }

    function handleBack() {
        navigate(-1)
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
                <button
                    onClick={handleBack}
                    className="p-2 -m-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Voltar"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-700" />
                </button>
                <div>
                    <h1 className="font-semibold text-lg text-gray-900">Embarque na Parada</h1>
                    <p className="text-sm text-gray-600">Escaneie o QR Code do estudante</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center p-4 gap-6">
                {/* Instructions */}
                <div className="text-center space-y-2 max-w-md">
                    <h2 className="font-semibold text-base text-gray-900">
                        Posicione o QR Code na área indicada
                    </h2>
                    <p className="text-sm text-gray-600">
                        Centralize o QR Code dentro da moldura para realizar a leitura automaticamente
                    </p>
                </div>

                {/* Scanner */}
                <div className="w-full max-w-md aspect-square">
                    <QRCodeScanner
                        onScan={handleScan}
                        enabled={!showSuccess && !showError && !isProcessing}
                        className="w-full h-full"
                    />
                </div>

                {/* Success Feedback */}
                {showSuccess && scannedCode && (
                    <div className="fixed inset-x-4 bottom-6 mx-auto max-w-md">
                        <div className="bg-success-600 text-white rounded-lg p-4 shadow-lg flex items-center gap-3 animate-slide-up">
                            <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm">Embarque realizado com sucesso!</p>
                                <p className="text-xs text-success-100 mt-0.5">
                                    Redirecionando...
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Error Feedback */}
                {showError && (
                    <div className="fixed inset-x-4 bottom-6 mx-auto max-w-md">
                        <div className="bg-error-600 text-white rounded-lg p-4 shadow-lg flex items-center gap-3 animate-slide-up">
                            <AlertCircle className="w-6 h-6 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm">Erro ao embarcar</p>
                                <p className="text-xs text-error-100 mt-0.5">
                                    {errorMessage}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Help Text */}
                <div className="text-center space-y-1 max-w-md">
                    <p className="text-xs text-gray-500">
                        Certifique-se de que o QR Code esteja bem iluminado e visível
                    </p>
                    <p className="text-xs text-gray-500">
                        A leitura será feita automaticamente
                    </p>
                </div>
            </main>
        </div>
    )
}
