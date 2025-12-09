import { useEffect, useState } from "react"
import { Home, BusFront, LayoutGrid, UsersRound, UserRound, User } from "lucide-react"
import { Outlet } from "react-router-dom"
import { toast } from "sonner"
import { Menu } from "@/components/Menu"
import { RouteDrawer } from "@/components/RouteDrawer"
import { StudentCardDrawer } from "@/components/StudentCardDrawer"
import { tripService } from "@/services/trip.service"
import { routeService } from "@/services/route.service"
import { studentService } from "@/services/student.service"
import { extractLocationFromStopName } from "@/lib/utils"
import QrCode from "react-qr-code"

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
    const [studentData, setStudentData] = useState<Student | null>(null)
    const [isLoadingUserData, setIsLoadingUserData] = useState(false)

    function StudentCardField({ label, value = "" }: StudentCardFieldProps) {
        return (
            <div className="flex flex-col">
                <span className="text-gray-300 text-xs whitespace-nowrap">{label}</span>
                <span className="font-semibold text-xs whitespace-nowrap">{value}</span>
            </div>
        )
    }

    function formatDateToBR(dateString?: string): string {
        if (!dateString) return ""

        try {
            const date = new Date(dateString)
            return date.toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            })
        } catch {
            return ""
        }
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

    async function loadUserData() {
        if (!studentId) {
            toast.error("ID do estudante não encontrado")
            return
        }

        try {
            setIsLoadingUserData(true)
            const response = await studentService.getStudentData(studentId)
            setStudentData(response.data)
        } catch (error) {
            console.error("Erro ao carregar dados do estudante:", error)
            toast.error("Erro ao carregar dados do estudante")
        } finally {
            setIsLoadingUserData(false)
        }
    }

    function handleStudentDrawerOpen() {
        setIsStudentDrawerOpen(true)
        loadUserData()
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
                            onClick={handleStudentDrawerOpen}
                            className="flex flex-col items-center justify-end flex-1 px-2 text-gray-700"
                            disabled={isLoadingUserData}
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
                {isLoadingUserData ? (
                    <div className="flex items-center justify-center w-full h-full">
                        <span className="text-gray-500">Carregando...</span>
                    </div>
                ) : studentData ? (
                    <div className="flex items-center justify-center w-full h-full overflow-auto">
                        <div className="rotate-90 origin-center transform flex flex-col max-h-[100vw] max-w-[100vh]">
                            <img src="images/light-typographic-logo.svg" alt="We Move Logo" className="mb-[-10px] h-20 shrink-0" />

                            <div className="flex gap-4 items-center justify-center px-6 py-4">
                                {studentData.user.profile_picture_url ? (<img
                                    src={studentData.user.profile_picture_url}
                                    alt="User profile image"
                                    className="w-46 h-46 object-cover rounded flex-shrink-0"
                                />) : (
                                    <User className="w-42 h-42 border bg-white text-gray-700 rounded" />
                                )}

                                <div className="flex gap-5 flex-shrink min-w-0">
                                    <div className="flex flex-col gap-2 min-w-0">
                                        <StudentCardField label="Nome" value={studentData.user.name} />
                                        <StudentCardField label="Instituição de Ensino" value={studentData.latest_requisition?.institution_course.institution.name} />
                                        <StudentCardField label="Telefone" value={studentData.user.phone_contact} />
                                        <StudentCardField label="Curso/Série/Ensino" value={studentData.latest_requisition?.institution_course.course.name} />
                                        <StudentCardField label="Data de Nascimento" value={formatDateToBR(studentData.latest_requisition?.birth_date)} />
                                    </div>

                                    <div className="flex flex-col gap-2 min-w-0">
                                        <StudentCardField label="CPF" value={studentData.user.cpf} />
                                        <StudentCardField label="Válido até" value={formatDateToBR(studentData.latest_requisition?.valid_at)} />
                                        <StudentCardField label="Matricula" value={studentData.latest_requisition?.institution_registration} />
                                        <StudentCardField label="Semestre" value={studentData.latest_requisition?.semester.toString()} />
                                    </div>
                                </div>

                                <div className="flex items-center justify-center flex-shrink-0">
                                    <QrCode
                                        value={studentData.qrcode_token || "sem-token"}
                                        bgColor="#1570EF"
                                        fgColor="#FFFFFF"
                                        size={184}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </StudentCardDrawer>
        </div>
    )
}
