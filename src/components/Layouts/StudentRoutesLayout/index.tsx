import { useEffect, useState } from "react"
import { Home, BusFront, LayoutGrid, UsersRound, UserRound } from "lucide-react"
import { Outlet } from "react-router-dom"
import { toast } from "sonner"
import { Menu } from "@/components/Menu"
import { RouteDrawer } from "@/components/RouteDrawer"
import { StudentCardDrawer } from "@/components/StudentCardDrawer"
import { tripService } from "@/services/trip.service"
import { routeService } from "@/services/route.service"
import { extractLocationFromStopName } from "@/lib/utils"
import QrCode from "react-qr-code";
import { useAuth } from "@/lib/auth-context"

type RouteStop = {
    id: string
    name: string
    address: string
    status: "completed" | "current" | "pending" | "destination"
}

type StudentCardFieldProps = {
    label: string
    value?: string
}

export function StudentRoutesLayout() {
    const [hasActiveTrip, setHasActiveTrip] = useState(false)
    const [routeStops, setRouteStops] = useState<RouteStop[]>([])
    const [loading, setLoading] = useState(true)
    const [activeTripId, setActiveTripId] = useState<number | null>(null)
    const [studentId, setStudentId] = useState<number | null>(null)
    const [isDisembarking, setIsDisembarking] = useState(false)
    const [isStudentDrawerOpen, setIsStudentDrawerOpen] = useState(false)

    const { currentAuth, isLoading: authLoading } = useAuth()

    console.log("Current Auth in StudentRoutesLayout:", currentAuth);

    function StudentCardField({ label, value = "" }: StudentCardFieldProps) {
        return (
            <div className="flex flex-col">
                <span className="text-gray-300 text-xs whitespace-nowrap">{label}</span>
                <span className="font-semibold text-xs whitespace-nowrap">{value}</span>
            </div>
        )
    }

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

    useEffect(() => {
        checkActiveTripAndLoadStops()
    }, [])

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
                <Menu.Item
                    icon={<LayoutGrid />}
                    label="Estudante"
                    renderCustom={() => (
                        <button
                            type="button"
                            onClick={() => setIsStudentDrawerOpen(true)}
                            className="flex flex-col items-center justify-end flex-1 px-2 text-gray-700"
                            disabled={authLoading}
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-full text-gray-700">
                                <LayoutGrid />
                            </div>
                            <div className="text-sm font-bold mt-1 text-center text-gray-600">
                                Estudante
                            </div>
                        </button>
                    )}
                />
                <Menu.Item to="/social" icon={<UsersRound />} label="Social" />
                <Menu.Item to="/conta" icon={<UserRound />} label="Conta" />
            </Menu>

            <StudentCardDrawer
                open={isStudentDrawerOpen}
                onOpenChange={setIsStudentDrawerOpen}
            >
                <div className="flex items-center justify-center w-full h-full overflow-auto">
                    <div className="rotate-90 origin-center transform flex flex-col max-h-[100vw] max-w-[100vh]">
                        <img src="images/light-typographic-logo.svg" alt="We Move Logo" className="mb-[-10px] h-20 shrink-0" />

                        <div className="flex gap-4 items-center justify-center px-6 py-4">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjuxFT3lVwnme5onXhozb0gHi19QpdqaH90Q&s"
                                alt="User profile image"
                                className="w-46 h-46 object-cover rounded flex-shrink-0"
                            />

                            <div className="flex gap-5 flex-shrink min-w-0">
                                <div className="flex flex-col gap-2 min-w-0">
                                    <StudentCardField label="Nome" value={currentAuth?.name} />
                                    <StudentCardField label="Instituição de Ensino" value="Universidade Estácio de Sá" />
                                    <StudentCardField label="Telefone" value="(21) 99999-9999" />
                                    <StudentCardField label="Curso/Série/Ensino" value="Ciência da Computação" />
                                    <StudentCardField label="Data de Nascimento" value="01/01/2000" />
                                </div>

                                <div className="flex flex-col gap-2 min-w-0">
                                    <StudentCardField label="CPF" value="123.456.789-00" />
                                    <StudentCardField label="Válido até" value="31/12/2024" />
                                    <StudentCardField label="Matricula" value="14141414" />
                                    <StudentCardField label="Semestre" value="9" />
                                </div>
                            </div>

                            <div className="flex items-center justify-center flex-shrink-0">
                                <QrCode value="http://youtube.com" bgColor="#1570EF" fgColor="#FFFFFF" size={184} />
                            </div>
                        </div>
                    </div>
                </div>
            </StudentCardDrawer>
        </div>
    )
}
