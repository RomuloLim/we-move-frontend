import { useEffect, useRef, useState } from "react"
import { BrowserMultiFormatReader } from "@zxing/browser"
import type { IScannerControls } from "@zxing/browser"

type UseQRCodeScannerOptions = {
    onScan?: (result: string) => void
    onError?: (error: Error) => void
    enabled?: boolean
}

export function useQRCodeScanner({
    onScan,
    onError,
    enabled = true,
}: UseQRCodeScannerOptions = {}) {
    const [isScanning, setIsScanning] = useState(false)
    const [hasPermission, setHasPermission] = useState<boolean | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [lastScannedCode, setLastScannedCode] = useState<string | null>(null)

    const videoRef = useRef<HTMLVideoElement>(null)
    const readerRef = useRef<BrowserMultiFormatReader | null>(null)
    const controlsRef = useRef<IScannerControls | null>(null)
    const scanTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const lastScanTimeRef = useRef<number>(0)
    const scanCooldown = 2000 // 2 seconds cooldown between scans

    useEffect(() => {
        if (!enabled) {
            stopScanning()
            return
        }

        if (!readerRef.current) {
            readerRef.current = new BrowserMultiFormatReader()
        }

        return () => {
            stopScanning()
        }
    }, [enabled])

    async function startScanning() {
        if (!videoRef.current || !readerRef.current) return

        try {
            setIsScanning(true)
            setError(null)
            setHasPermission(null)

            const devices = await BrowserMultiFormatReader.listVideoInputDevices()

            if (devices.length === 0) {
                throw new Error("Nenhuma câmera encontrada")
            }

            // Prefer back camera on mobile devices
            const backCamera = devices.find((device: MediaDeviceInfo) =>
                device.label.toLowerCase().includes("back") ||
                device.label.toLowerCase().includes("traseira")
            )
            const selectedDevice = backCamera || devices[0]

            setHasPermission(true)

            const controls = await readerRef.current.decodeFromVideoDevice(
                selectedDevice.deviceId,
                videoRef.current,
                (result, error) => {
                    if (result) {
                        const scannedText = result.getText()
                        const now = Date.now()

                        // Check if enough time has passed since last scan
                        if (now - lastScanTimeRef.current < scanCooldown) {
                            return
                        }

                        lastScanTimeRef.current = now
                        setLastScannedCode(scannedText)
                        onScan?.(scannedText)

                        // Vibrate if supported
                        if (navigator.vibrate) {
                            navigator.vibrate([200])
                        }

                        // Play success sound
                        playSuccessSound()
                    }

                    if (error) {
                        // Silently ignore "not found" errors during scanning
                        console.debug("Scanner error:", error)
                    }
                }
            )

            controlsRef.current = controls
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Erro ao iniciar a câmera"
            setError(errorMessage)
            setHasPermission(false)
            setIsScanning(false)
            onError?.(err instanceof Error ? err : new Error(errorMessage))
        }
    }

    function stopScanning() {
        if (controlsRef.current) {
            try {
                controlsRef.current.stop()
                controlsRef.current = null
            } catch (error) {
                console.debug("Error stopping scanner:", error)
            }
        }

        if (scanTimeoutRef.current) {
            clearTimeout(scanTimeoutRef.current)
            scanTimeoutRef.current = null
        }

        // Reset last scan time to allow new scans when restarted
        lastScanTimeRef.current = 0
        setIsScanning(false)
    }

    function playSuccessSound() {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.frequency.value = 800
        oscillator.type = "sine"

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)

        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.2)
    }

    function resetLastScanned() {
        setLastScannedCode(null)
    }

    return {
        videoRef,
        isScanning,
        hasPermission,
        error,
        lastScannedCode,
        startScanning,
        stopScanning,
        resetLastScanned,
    }
}
