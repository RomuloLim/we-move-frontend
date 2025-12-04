import { useEffect } from "react"
import { Camera, AlertCircle } from "lucide-react"
import { useQRCodeScanner } from "@/lib/hooks/useQRCodeScanner"
import { cn } from "@/lib/utils"

type QRCodeScannerProps = {
    onScan: (code: string) => void
    enabled?: boolean
    className?: string
}

export function QRCodeScanner({ onScan, enabled = true, className }: QRCodeScannerProps) {
    const {
        videoRef,
        isScanning,
        hasPermission,
        error,
        startScanning,
        stopScanning,
    } = useQRCodeScanner({
        onScan,
        enabled,
    })

    useEffect(() => {
        if (enabled && !isScanning && hasPermission !== false) {
            startScanning()
        }

        return () => {
            if (isScanning) {
                stopScanning()
            }
        }
    }, [enabled])

    if (error || hasPermission === false) {
        return (
            <div className={cn("flex flex-col items-center justify-center gap-4 p-6 bg-gray-50 rounded-lg", className)}>
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                    <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <div className="text-center space-y-2">
                    <h3 className="font-semibold text-base text-gray-900">
                        Não foi possível acessar a câmera
                    </h3>
                    <p className="text-sm text-gray-600 max-w-sm">
                        {error || "Permissão de câmera negada. Verifique as configurações do seu navegador."}
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className={cn("relative bg-black rounded-lg overflow-hidden", className)}>
            {/* Video Stream */}
            <video
                ref={videoRef}
                className="w-full h-full object-cover"
                playsInline
                muted
            />

            {/* Scanning Overlay */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Dark overlay with transparent center */}
                <div className="absolute inset-0 bg-black/40" />
                
                {/* Scanning area */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-72 h-72 max-w-[80vw] max-h-[80vw]">
                        {/* Corner borders */}
                        <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-blue-500 rounded-tl-2xl" />
                        <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-blue-500 rounded-tr-2xl" />
                        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-blue-500 rounded-bl-2xl" />
                        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-blue-500 rounded-br-2xl" />
                        
                        {/* Scanning line animation */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-scan-line" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Camera icon indicator */}
            {!isScanning && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                    <div className="flex flex-col items-center gap-3">
                        <Camera className="w-12 h-12 text-gray-400 animate-pulse" />
                        <p className="text-sm text-gray-400">Iniciando câmera...</p>
                    </div>
                </div>
            )}
        </div>
    )
}
