import { useEffect, useState } from "react"
import { Home, BusFront, LayoutGrid, UsersRound, UserRound } from "lucide-react"
import { Outlet } from "react-router-dom"
import { toast } from "sonner"
import { Menu } from "@/components/Menu"
import { RouteDrawer } from "@/components/RouteDrawer"
import { tripService } from "@/services/trip.service"
import { routeService } from "@/services/route.service"
import { extractLocationFromStopName } from "@/lib/utils"

type RouteStop = {
    id: string
    name: string
    address: string
    status: "completed" | "current" | "pending" | "destination"
}

export function StudentRoutesLayout() {
    const [hasActiveTrip, setHasActiveTrip] = useState(false)
    const [routeStops, setRouteStops] = useState<RouteStop[]>([])
    const [loading, setLoading] = useState(true)
    const [activeTripId, setActiveTripId] = useState<number | null>(null)
    const [studentId, setStudentId] = useState<number | null>(null)
    const [isDisembarking, setIsDisembarking] = useState(false)

    useEffect(() => {
        checkActiveTripAndLoadStops()
    }, [])

    async function checkActiveTripAndLoadStops() {
        try {
            setLoading(true)

            const userStr = localStorage.getItem("user")
            if (userStr) {
                const user = JSON.parse(userStr) as User
                if (user.student_profile?.id) {
                    setStudentId(user.student_profile.id)
                }
            }

            const activeTripResponse = await tripService.getMyActiveTripAsStudent()

            if (activeTripResponse && activeTripResponse.data) {
                setHasActiveTrip(true)
                setActiveTripId(activeTripResponse.data.id)

                const stops = await routeService.getRouteStops(activeTripResponse.data.route_id)

                const mappedStops: RouteStop[] = stops.map((stop, index) => {
                    const isFirst = index === 0
                    const isLast = index === stops.length - 1

                    let status: RouteStop["status"] = "pending"
                    if (isFirst) {
                        status = "current"
                    } else if (isLast) {
                        status = "destination"
                    }

                    return {
                        id: stop.id.toString(),
                        name: extractLocationFromStopName(stop.stop_name),
                        address: stop.stop_name,
                        status,
                    }
                })

                setRouteStops(mappedStops)
            } else {
                setHasActiveTrip(false)
                setRouteStops([])
            }
        } catch (error) {
            console.error("Erro ao verificar viagem ativa:", error)
            setHasActiveTrip(false)
            setRouteStops([])
        } finally {
            setLoading(false)
        }
    }

    async function handleDisembark() {
        if (!activeTripId || !studentId) {
            toast.error("Erro ao desembarcar", {
                description: "Dados da viagem ou estudante não encontrados"
            })
            return
        }

        try {
            setIsDisembarking(true)
            await tripService.unboardPassenger(activeTripId, studentId)

            setHasActiveTrip(false)
            setRouteStops([])
            setActiveTripId(null)

            toast.success("Desembarque realizado com sucesso")
        } catch (error) {
            console.error("Erro ao realizar desembarque:", error)
            toast.error("Erro ao desembarcar", {
                description: "Não foi possível realizar o desembarque. Tente novamente."
            })
        } finally {
            setIsDisembarking(false)
        }
    }

    return (
        <div>
            <Outlet />

            <Menu>
                <Menu.Item to="/" icon={<Home />} label="Home" />
                <Menu.Item
                    icon={<BusFront />}
                    label="Rotas"
                    disabled={!hasActiveTrip || loading}
                    renderCustom={hasActiveTrip && !loading ? () => (
                        <RouteDrawer
                            stops={routeStops}
                            onDisembark={handleDisembark}
                            isDisembarking={isDisembarking}
                            trigger={
                                <button
                                    type="button"
                                    className="flex flex-col items-center justify-end flex-1 px-2 text-gray-700"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full text-gray-700">
                                        <BusFront />
                                    </div>
                                    <div className="text-sm font-bold mt-1 text-center text-gray-600">
                                        Rotas
                                    </div>
                                </button>
                            }
                        />
                    ) : undefined}
                />
                <Menu.Item to="/estudante" icon={<LayoutGrid />} label="Estudante" />
                <Menu.Item to="/social" icon={<UsersRound />} label="Social" />
                <Menu.Item to="/conta" icon={<UserRound />} label="Conta" />
            </Menu>
        </div>
    )
}
