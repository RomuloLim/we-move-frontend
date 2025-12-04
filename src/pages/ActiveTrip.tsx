import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { routeService } from "@/services/route.service"
import { Button } from "@/components/Button"

type StopWithBoardingStatus = Stop & {
    hasBoarded: boolean
}

export default function ActiveTrip() {
    const navigate = useNavigate()
    const { tripId } = useParams<{ tripId: string }>()
    const [route, setRoute] = useState<RouteDetail | null>(null)
    const [stops, setStops] = useState<StopWithBoardingStatus[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function loadTripData() {
            try {
                setIsLoading(true)
                const tripData = localStorage.getItem("currentTrip")
                if (tripData) {
                    const trip = JSON.parse(tripData) as Trip
                    const routeResponse = await routeService.getRouteById(trip.route_id)
                    setRoute(routeResponse.data)

                    const stopsWithStatus: StopWithBoardingStatus[] = routeResponse.data.stops.map(stop => ({
                        ...stop,
                        hasBoarded: false
                    }))
                    setStops(stopsWithStatus)
                }
            } catch (error) {
                console.error("Erro ao carregar dados da viagem:", error)
            } finally {
                setIsLoading(false)
            }
        }

        loadTripData()
    }, [tripId])

    function handleBoarding(stopId: number) {
        setStops(prevStops =>
            prevStops.map(stop =>
                stop.id === stopId ? { ...stop, hasBoarded: true } : stop
            )
        )

        console.log("Embarque registrado para parada:", stopId)
    }

    function handleFinishTrip() {
        console.log("Finalizar trajeto")
        localStorage.removeItem("currentTrip")
        navigate("/")
    }

    function extractLocationFromStopName(stopName: string): string {
        const parts = stopName.split(",")
        return parts[0]?.trim() || stopName
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-gray-600">Carregando...</p>
                </div>
            </div>
        )
    }

    if (!route) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center space-y-2">
                    <p className="text-gray-900 font-medium">Trajeto não encontrado</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 pb-32">
            <div className="max-w-4xl mx-auto space-y-4">
                <div className="space-y-4">
                    {stops.map((stop, index) => {
                        const isFirst = index === 0

                        return (
                            <div
                                key={stop.id}
                                className="bg-white border border-gray-300 rounded-lg p-3 space-y-4"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-start justify-between gap-2">
                                        <p className={`text-sm leading-5 flex-1 ${isFirst ? "font-medium" : "font-semibold"} text-gray-900`}>
                                            {extractLocationFromStopName(stop.stop_name)}
                                        </p>
                                    </div>

                                    {isFirst && (
                                        <div className="flex items-center">
                                            <div className="bg-gray-50 border border-gray-200 rounded px-1.5 py-0.5">
                                                <p className="text-xs font-medium text-gray-700 leading-[18px]">
                                                    Frequente
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center w-full">
                                        <p className="text-sm text-gray-600 leading-5 flex-1">
                                            {stop.stop_name}
                                        </p>
                                    </div>
                                </div>

                                <Button
                                    type="button"
                                    onClick={() => handleBoarding(stop.id)}
                                    disabled={stop.hasBoarded}
                                    className="w-full justify-center"
                                >
                                    {stop.hasBoarded ? "Embarcado" : "Embarque"}
                                </Button>
                            </div>
                        )
                    })}
                </div>

                <div className="fixed bottom-20 left-0 right-0 p-4 bg-white border-t border-gray-200">
                    <Button
                        type="button"
                        onClick={handleFinishTrip}
                        className="w-full max-w-4xl mx-auto bg-green-600 hover:bg-green-700 justify-center"
                    >
                        Finalizar Viagem
                    </Button>
                </div>
            </div>
        </div>
    )
}
