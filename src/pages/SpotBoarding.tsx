import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { QRCodeScanner } from "@/components/QRCodeScanner"

export default function SpotBoarding() {
    const navigate = useNavigate()
    const [scannedCode, setScannedCode] = useState<string | null>(null)
    const [showSuccess, setShowSuccess] = useState(false)

    function handleScan(code: string) {
        console.log("QR Code escaneado:", code)
        setScannedCode(code)
        setShowSuccess(true)

        // TODO: Enviar requisição para o endpoint
        // await requisitionService.scanQRCode(code)

        // Hide success message after 3 seconds
        setTimeout(() => {
            setShowSuccess(false)
            setScannedCode(null)
        }, 3000)
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
                    <h1 className="font-semibold text-lg text-gray-900">Embarque Avulso</h1>
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
                        enabled={!showSuccess}
                        className="w-full h-full"
                    />
                </div>

                {/* Success Feedback */}
                {showSuccess && scannedCode && (
                    <div className="fixed inset-x-4 bottom-6 mx-auto max-w-md">
                        <div className="bg-success-600 text-white rounded-lg p-4 shadow-lg flex items-center gap-3 animate-slide-up">
                            <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm">QR Code lido com sucesso!</p>
                                <p className="text-xs text-success-100 truncate mt-0.5">
                                    Código: {scannedCode}
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
