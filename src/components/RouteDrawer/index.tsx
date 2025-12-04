import { MapPin, X, AlertCircle } from "lucide-react"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/Button"

type RouteStop = {
    id: string
    name: string
    address: string
    status: "completed" | "current" | "pending" | "destination"
}

type RouteDrawerProps = {
    trigger?: React.ReactNode
    driverName?: string
    driverPhone?: string
    capacity?: {
        current: number
        total: number
    }
    stops?: RouteStop[]
    onDisembark?: () => void
    isDisembarking?: boolean
}

export function RouteDrawer({
    trigger,
    driverName = "Rômulo Lima Fonseca",
    driverPhone = "(85) 99999-9999",
    capacity = { current: 14, total: 28 },
    stops = [],
    onDisembark,
    isDisembarking = false,
}: RouteDrawerProps) {
    function getStopIcon(status: RouteStop["status"]) {
        if (status === "destination") {
            return (
                <div className="size-4 flex items-center justify-center">
                    <div className="size-4 rounded-full border-6 border-gray-500 bg-white" />
                </div>
            )
        }

        const bgColor =
            status === "completed" || status === "current"
                ? "bg-green-500"
                : "bg-gray-400"

        return (
            <div
                className={`${bgColor} rounded flex items-center justify-center p-0.5`}
            >
                <MapPin className="size-3 text-white" fill="white" />
            </div>
        )
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>{trigger}</DrawerTrigger>
            <DrawerContent className="max-h-[85vh] flex flex-col">
                <div className="bg-white rounded-t-2xl flex flex-col h-full">
                    <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 shrink-0">
                        <DrawerClose asChild>
                            <button
                                type="button"
                                className="text-gray-900 hover:text-gray-700 transition-colors"
                                aria-label="Fechar"
                            >
                                <X className="size-6" />
                            </button>
                        </DrawerClose>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        <div className="px-4 py-6 pb-4">
                            <div className="space-y-2.5">
                                <h2 className="font-semibold text-base leading-6 text-gray-900">
                                    Sua Viagem
                                </h2>
                                <p className="font-normal text-sm leading-[18px] text-gray-500">
                                    <span className="font-bold">Motorista</span>: {driverName}
                                </p>
                                <p className="font-normal text-sm leading-[18px] text-gray-500">
                                    <span className="font-bold">Contato:</span> {driverPhone}
                                </p>
                                <p className="font-normal text-sm leading-[18px] text-gray-500">
                                    <span className="font-bold">Capacidade do ônibus:</span>{" "}
                                    {capacity.current}/{capacity.total}
                                </p>
                            </div>

                            <div className="relative py-2 mt-4">
                                <div className="absolute left-2 top-0 bottom-0 w-px bg-gray-200" />

                                <div className="space-y-2">
                                    {stops.map((stop) => (
                                        <div key={stop.id} className="flex gap-2 relative">
                                            <div className="relative z-10">
                                                {getStopIcon(stop.status)}
                                            </div>
                                            <div className="flex-1 pb-4">
                                                <p className="font-semibold text-sm leading-5 text-gray-900">
                                                    {stop.name}
                                                </p>
                                                <p className="font-normal text-sm leading-5 text-gray-500 mt-2.5">
                                                    {stop.address}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4 pt-8 pb-6">
                                <p className="font-normal text-sm leading-[18px] text-gray-500 text-center">
                                    As rotas podem variar mediante organização do transporte e
                                    necessidade
                                </p>
                                {onDisembark && (
                                    <Button
                                        onClick={onDisembark}
                                        disabled={isDisembarking}
                                        className="w-full bg-red-700 hover:bg-red-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <AlertCircle className="size-5 mr-1" />
                                        {isDisembarking ? "Desembarcando..." : "Desembarcar"}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
