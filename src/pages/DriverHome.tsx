import { useEffect, useRef, useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowRight, MapPin, X, Play } from "lucide-react"
import RouteCard from "@/components/RouteCard"
import VehicleCard from "@/components/VehicleCard"
import { routeService } from "@/services/route.service"
import { vehicleService } from "@/services/vehicle.service"
import { tripService } from "@/services/trip.service"
import { useInfinitePagination } from "@/lib/hooks/useInfinitePagination"
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
} from "@/components/ui/drawer"
import { Button } from "@/components/Button"

type DrawerView = "route-details" | "vehicle-selection"

export default function DriverHome() {
    const navigate = useNavigate()
    const observerTarget = useRef<HTMLDivElement>(null)
    const vehicleObserverTarget = useRef<HTMLDivElement>(null)
    const [selectedRoute, setSelectedRoute] = useState<RouteDetail | null>(null)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [isLoadingDetails, setIsLoadingDetails] = useState(false)
    const [drawerView, setDrawerView] = useState<DrawerView>("route-details")
    const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(null)
    const [isStartingTrip, setIsStartingTrip] = useState(false)

    const { data: routes, isLoading, isLoadingMore, hasMore, loadMore, load } = useInfinitePagination<RouteData>({
        fetchFunction: async (page) => {
            const response = await routeService.getRoutes(page)
            return {
                data: response.data,
                meta: response.meta,
                links: response.links,
            }
        },
    })

    const {
        data: vehicles,
        isLoading: isLoadingVehicles,
        isLoadingMore: isLoadingMoreVehicles,
        hasMore: hasMoreVehicles,
        loadMore: loadMoreVehicles,
        load: loadVehicles
    } = useInfinitePagination<Vehicle>({
        fetchFunction: async (page) => {
            const response = await vehicleService.getVehicles(page, "available")
            return {
                data: response.data,
                meta: response.meta,
                links: response.links,
            }
        },
    })

    useEffect(() => {
        load()
    }, [load])

    useEffect(() => {
        async function checkActiveTrip() {
            const activeTrip = await tripService.getMyActiveTrip()
            if (activeTrip?.data) {
                localStorage.setItem("currentTrip", JSON.stringify(activeTrip.data))
                window.dispatchEvent(new Event("tripStatusChanged"))
                navigate(`/trajeto/${activeTrip.data.id}`)
            }
        }

        checkActiveTrip()
    }, [])

    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const [target] = entries
            if (target.isIntersecting && hasMore && !isLoadingMore) {
                loadMore()
            }
        },
        [hasMore, isLoadingMore, loadMore]
    )

    useEffect(() => {
        const element = observerTarget.current
        if (!element) return

        const observer = new IntersectionObserver(handleObserver, {
            threshold: 0.1,
        })

        observer.observe(element)

        return () => {
            observer.disconnect()
        }
    }, [handleObserver])

    const handleVehicleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const [target] = entries
            if (target.isIntersecting && hasMoreVehicles && !isLoadingMoreVehicles) {
                loadMoreVehicles()
            }
        },
        [hasMoreVehicles, isLoadingMoreVehicles, loadMoreVehicles]
    )

    useEffect(() => {
        const element = vehicleObserverTarget.current
        if (!element || drawerView !== "vehicle-selection") return

        const observer = new IntersectionObserver(handleVehicleObserver, {
            threshold: 0.1,
        })

        observer.observe(element)

        return () => {
            observer.disconnect()
        }
    }, [handleVehicleObserver, drawerView])

    function extractCityFromStopName(stopName: string): string {
        const parts = stopName.split(",")
        if (parts.length > 1) {
            return parts[parts.length - 2]?.trim() || parts[0]?.trim() || ""
        }
        return parts[0]?.trim() || ""
    }

    function extractLocationFromStopName(stopName: string): string {
        const parts = stopName.split(",")
        return parts[0]?.trim() || ""
    }

    async function handleViewDetails(routeId: number) {
        try {
            setIsLoadingDetails(true)
            setIsDrawerOpen(true)
            setDrawerView("route-details")
            const response = await routeService.getRouteById(routeId)
            setSelectedRoute(response.data)
        } catch (error) {
            console.error("Erro ao carregar detalhes da rota:", error)
        } finally {
            setIsLoadingDetails(false)
        }
    }

    function handleSelectRoute() {
        setDrawerView("vehicle-selection")
        if (vehicles.length === 0) {
            loadVehicles()
        }
    }

    function handleSelectVehicle(vehicleId: number) {
        setSelectedVehicleId(vehicleId)
    }

    async function handleStartTrip() {
        if (!selectedVehicleId || !selectedRoute) return

        try {
            setIsStartingTrip(true)

            const today = new Date().toISOString().split('T')[0]

            const response = await tripService.startTrip({
                route_id: selectedRoute.id,
                vehicle_id: selectedVehicleId,
                trip_date: today
            })

            localStorage.setItem("currentTrip", JSON.stringify(response.data))
            window.dispatchEvent(new Event("tripStatusChanged"))

            setIsDrawerOpen(false)
            navigate(`/trajeto/${response.data.id}`)
        } catch (error) {
            console.error("Erro ao iniciar trajeto:", error)
        } finally {
            setIsStartingTrip(false)
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-gray-600">Carregando rotas...</p>
                </div>
            </div>
        )
    }

    if (routes.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 pb-32">
                <div className="flex flex-col justify-center gap-4 w-full max-w-md text-center">
                    <p className="font-medium text-sm leading-5 text-gray-900">
                        Nenhuma rota disponível no momento
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 pb-32">
            <div className="max-w-4xl mx-auto space-y-4">
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-gray-900">Suas Rotas</h1>
                    <p className="text-sm text-gray-600">Gerencie suas viagens e rotas</p>
                </div>

                <div className="space-y-4">
                    {routes.map((route) => (
                        <RouteCard
                            key={route.id}
                            routeNumber={route.route_name}
                            status="arriving-soon"
                            tripType="round-trip"
                            origin={{
                                city: extractCityFromStopName(route.first_stop.stop_name),
                                location: extractLocationFromStopName(route.first_stop.stop_name),
                            }}
                            destination={{
                                city: extractCityFromStopName(route.last_stop.stop_name),
                                location: extractLocationFromStopName(route.last_stop.stop_name),
                            }}
                            busNumber={`${route.stops_amount} paradas`}
                            departureTime="-"
                            onViewDetails={() => handleViewDetails(route.id)}
                        />
                    ))}

                    <div ref={observerTarget} className="h-10 flex items-center justify-center">
                        {isLoadingMore && (
                            <div className="text-center">
                                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerContent className="max-h-[90vh]">
                    <DrawerHeader className="border-b border-gray-200 p-4">
                        <button
                            onClick={() => setIsDrawerOpen(false)}
                            className="absolute left-4 top-4 text-gray-900 hover:text-gray-700"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </DrawerHeader>

                    <div className="overflow-y-auto px-4 pb-6">
                        {isLoadingDetails ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                            </div>
                        ) : drawerView === "route-details" && selectedRoute ? (
                            <div className="space-y-6 py-4">
                                <div className="space-y-2.5">
                                    <h2 className="text-base font-semibold text-gray-900 leading-6">
                                        {selectedRoute.route_name}
                                    </h2>
                                    <p className="text-sm text-gray-600 leading-[18px]">
                                        <span className="font-bold">Origem:</span> {extractLocationFromStopName(selectedRoute.stops[0]?.stop_name || "")}
                                    </p>
                                    <p className="text-sm text-gray-600 leading-[18px]">
                                        <span className="font-bold">Destino:</span> {extractLocationFromStopName(selectedRoute.stops[selectedRoute.stops.length - 1]?.stop_name || "")}
                                    </p>
                                    <p className="text-sm text-gray-600 leading-[18px]">
                                        <span className="font-bold">Média de passageiros:</span> -
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    {selectedRoute.stops.map((stop, index) => {
                                        const isFirst = index === 0
                                        const isLast = index === selectedRoute.stops.length - 1

                                        return (
                                            <div key={stop.id} className="flex gap-2 py-2">
                                                <div className="flex-shrink-0 w-4 h-4 mt-0.5">
                                                    {isFirst ? (
                                                        <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center p-0.5">
                                                            <MapPin className="w-3 h-3 text-white" />
                                                        </div>
                                                    ) : isLast ? (
                                                        <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                                                            <div className="w-2 h-2 bg-white rounded-full" />
                                                        </div>
                                                    ) : (
                                                        <div className="w-4 h-4 bg-gray-400 rounded flex items-center justify-center p-0.5">
                                                            <MapPin className="w-3 h-3 text-white" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold text-gray-900 leading-5">
                                                        {extractLocationFromStopName(stop.stop_name)}
                                                    </p>
                                                    <p className="text-sm text-gray-600 leading-5 break-words">
                                                        {stop.stop_name}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>

                                <Button
                                    type="button"
                                    onClick={handleSelectRoute}
                                    className="w-full justify-center mt-4"
                                >
                                    Selecionar Rota
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </div>
                        ) : drawerView === "vehicle-selection" ? (
                            <div className="space-y-6 py-4">
                                <h2 className="text-base font-semibold text-gray-900 leading-6 text-center">
                                    Selecione o Veículo
                                </h2>

                                {isLoadingVehicles && vehicles.length === 0 ? (
                                    <div className="flex items-center justify-center py-12">
                                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                    </div>
                                ) : (
                                    <>
                                        <div className="space-y-2.5">
                                            {vehicles.map((vehicle) => (
                                                <VehicleCard
                                                    key={vehicle.id}
                                                    vehicle={vehicle}
                                                    isSelected={selectedVehicleId === vehicle.id}
                                                    onSelect={handleSelectVehicle}
                                                />
                                            ))}

                                            <div ref={vehicleObserverTarget} className="h-10 flex items-center justify-center">
                                                {isLoadingMoreVehicles && (
                                                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                                )}
                                            </div>
                                        </div>

                                        <Button
                                            type="button"
                                            onClick={handleStartTrip}
                                            disabled={!selectedVehicleId || isStartingTrip}
                                            className="w-full justify-center gap-2"
                                        >
                                            {isStartingTrip ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                    Iniciando...
                                                </>
                                            ) : (
                                                <>
                                                    <Play className="w-4 h-4" />
                                                    Iniciar Trajeto
                                                </>
                                            )}
                                        </Button>
                                    </>
                                )}
                            </div>
                        ) : null}
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    )
}
