import { useEffect, useState } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { routeService } from "@/services/route.service"
import { tripService } from "@/services/trip.service"
import { Button } from "@/components/Button"
import { TripSummaryModal } from "@/components/TripSummaryModal"
import { BoardingDrawer } from "@/components/BoardingDrawer"
import { extractLocationFromStopName } from "@/lib/utils"

type StopWithBoardingStatus = Stop & {
    hasBoarded: boolean
}

export default function ActiveTrip() {
    const navigate = useNavigate()
    const location = useLocation()
    const { tripId } = useParams<{ tripId: string }>()
    const [route, setRoute] = useState<RouteDetail | null>(null)
    const [stops, setStops] = useState<StopWithBoardingStatus[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [showSummary, setShowSummary] = useState(false)
    const [tripSummary, setTripSummary] = useState<TripSummary | null>(null)
    const [showBoardingDrawer, setShowBoardingDrawer] = useState(false)
    const [passengers, setPassengers] = useState<TripPassenger[]>([])
    const [isLoadingPassengers, setIsLoadingPassengers] = useState(false)
    const [selectedStopId, setSelectedStopId] = useState<number | null>(null)
    const [isDisembarking, setIsDisembarking] = useState(false)
    const [currentTripId, setCurrentTripId] = useState<number | null>(null)

    useEffect(() => {
        async function loadTripData() {
            try {
                setIsLoading(true)
                const tripData = localStorage.getItem("currentTrip")
                if (tripData) {
                    const trip = JSON.parse(tripData) as Trip
                    setCurrentTripId(trip.id)
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

    // Check if should reopen drawer after returning from boarding
    useEffect(() => {
        const state = location.state as { reopenDrawer?: boolean; stopId?: number }
        if (state?.reopenDrawer && state?.stopId) {
            setSelectedStopId(state.stopId)
            loadPassengers()
            setShowBoardingDrawer(true)

            // Clear the state to avoid reopening on refresh
            navigate(location.pathname, { replace: true, state: {} })
        }
    }, [location.state])

    function handleBoarding(stopId: number) {
        console.log("Abrindo detalhes de embarque para parada:", stopId)

        // Set selected stop and open drawer
        setSelectedStopId(stopId)
        loadPassengers()
        setShowBoardingDrawer(true)
    }

    async function loadPassengers() {
        try {
            setIsLoadingPassengers(true)
            const tripData = localStorage.getItem("currentTrip")
            if (!tripData) return

            const trip = JSON.parse(tripData) as Trip
            const response = await tripService.getTripPassengers(trip.id, true)
            setPassengers(response.data)
        } catch (error) {
            console.error("Erro ao carregar passageiros:", error)
        } finally {
            setIsLoadingPassengers(false)
        }
    }

    async function handleDisembark(passengerId: number, studentId: number) {
        if (!currentTripId) return

        try {
            setIsDisembarking(true)
            await tripService.unboardPassenger(currentTripId, studentId)

            // Remove passenger from list
            setPassengers(prev => prev.filter(p => p.id !== passengerId))

            console.log("Desembarque realizado com sucesso")
        } catch (error) {
            console.error("Erro ao realizar desembarque:", error)
        } finally {
            setIsDisembarking(false)
        }
    }

    function handleFinishTrip() {
        async function completeTrip() {
            try {
                const tripData = localStorage.getItem("currentTrip")
                if (!tripData) return

                const trip = JSON.parse(tripData) as Trip
                const response = await tripService.completeTrip(trip.id)

                setTripSummary(response.data.summary)
                setShowSummary(true)
                localStorage.removeItem("currentTrip")
                window.dispatchEvent(new Event("tripStatusChanged"))
            } catch (error) {
                console.error("Erro ao finalizar viagem:", error)
            }
        }

        completeTrip()
    }

    function handleCloseSummary() {
        setShowSummary(false)
        navigate("/")
    }

    if (showSummary && tripSummary) {
        return (
            <TripSummaryModal
                routeName={tripSummary.route_name}
                totalBoardings={tripSummary.total_boardings}
                duration={tripSummary.duration}
                onClose={handleCloseSummary}
            />
        )
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
                                    className="w-full justify-center"
                                >
                                    Embarque
                                </Button>
                            </div>
                        )
                    })}
                </div>

                <div className="fixed w-full bottom-26 left-0 right-0 p-4">
                    <Button
                        type="button"
                        onClick={handleFinishTrip}
                        className="w-full mx-auto bg-green-700 hover:bg-green-800 justify-center"
                    >
                        Finalizar Viagem
                    </Button>
                </div>
            </div>

            {/* Boarding Drawer */}
            <BoardingDrawer
                open={showBoardingDrawer}
                onOpenChange={setShowBoardingDrawer}
                passengers={passengers}
                stopId={selectedStopId}
                onDisembark={handleDisembark}
                isDisembarking={isDisembarking}
                isLoading={isLoadingPassengers}
            />
        </div>
    )
}
