import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { studentService } from "@/services/student.service"
import { PaperUploadIcon } from "@/components/icons/PaperUploadIcon"
import RouteCard from "@/components/RouteCard"
import { RouteDrawer } from "@/components/RouteDrawer"
import { PullToRefresh } from "@/components/PullToRefresh"
import { extractLocationFromStopName } from "@/lib/utils"
import { NoticeAlert } from "@/components/NoticeAlert"

type RouteStop = {
    id: string
    name: string
    address: string
    status: "completed" | "current" | "pending" | "destination"
}

function mapTripStopsToRouteStops(stops: Stop[]): RouteStop[] {
    if (!stops || stops.length === 0) return []

    return stops.map((stop, index) => {
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
}

export default function StudentHome() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [hasRequisition, setHasRequisition] = useState<boolean | null>(null)
    const [studentData, setStudentData] = useState<Student | null>(null)

    async function fetchStudentData() {
        try {
            setLoading(true)
            const userStr = localStorage.getItem("user")
            if (!userStr) {
                setLoading(false)
                return
            }

            const user = JSON.parse(userStr) as User

            if (user.user_type !== "student" || !user.student_profile?.id) {
                setLoading(false)
                setHasRequisition(false)
                return
            }

            const response = await studentService.getStudentData(user.student_profile.id)
            setStudentData(response.data)
            setHasRequisition(!!response.data.latest_requisition)
        } catch (error) {
            console.error("Erro ao buscar dados do estudante:", error)
            setHasRequisition(false)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchStudentData()
    }, [])

    function handleSendDocuments() {
        navigate("/enviar-solicitacao")
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-gray-600">Carregando...</p>
                </div>
            </div>
        )
    }

    if (hasRequisition && studentData) {
        const hasAvailableTrips = studentData.available_trips && studentData.available_trips.length > 0

        return (
            <PullToRefresh onRefresh={fetchStudentData}>
                <div className="min-h-screen bg-gray-50 p-4 pb-32">
                    <div className="max-w-4xl mx-auto space-y-6">
                        {/* Header */}
                        <div className="flex flex-col gap-1">
                            <h1 className="font-semibold text-2xl leading-8 text-gray-900">
                                Olá, {studentData.user.name}
                            </h1>
                            <p className="font-normal text-base leading-6 text-gray-600">
                                Trajetos disponíveis para você
                            </p>
                        </div>

                        {/* Notice Alert */}
                        <NoticeAlert />

                        {/* Available Trips */}
                        {hasAvailableTrips ? (
                            <div className="space-y-3">
                                {studentData.available_trips.map((trip) => {
                                    const tripDate = new Date(trip.trip_date)
                                    const departureTime = tripDate.toLocaleTimeString("pt-BR", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })

                                    const stops = mapTripStopsToRouteStops(trip.route.stops)

                                    return (
                                        <RouteDrawer
                                            key={trip.id}
                                            trigger={
                                                <div>
                                                    <RouteCard
                                                        routeNumber={trip.route.route_name}
                                                        status={trip.status === "scheduled" ? "arriving-soon" : undefined}
                                                        tripType="one-way"
                                                        origin={{
                                                            city: extractLocationFromStopName(trip.route.first_stop?.stop_name || "Origem"),
                                                            location: trip.route.first_stop?.stop_name || "Origem",
                                                        }}
                                                        destination={{
                                                            city: extractLocationFromStopName(trip.route.last_stop?.stop_name || "Destino"),
                                                            location: trip.route.last_stop?.stop_name || "Destino",
                                                        }}
                                                        busNumber={trip.vehicle.license_plate}
                                                        departureTime={departureTime}
                                                    />
                                                </div>
                                            }
                                            driverName={trip.driver.name}
                                            driverPhone={trip.driver.phone_contact}
                                            capacity={{
                                                current: 0,
                                                total: trip.vehicle.capacity,
                                            }}
                                            stops={stops}
                                        />
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg p-8 shadow-sm text-center">
                                <h3 className="font-medium text-base leading-6 text-gray-900 mb-2">
                                    Nenhum trajeto disponível
                                </h3>
                                <p className="font-normal text-sm leading-5 text-gray-600">
                                    Não há trajetos programados para sua rota no momento.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </PullToRefresh>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 pb-32">
            <div className="flex flex-col justify-center gap-4 w-full max-w-md">
                <div className="flex flex-col gap-4 text-center">
                    <p className="font-medium text-sm leading-5 text-gray-900">
                        Envie a documentação para ver as rotas
                    </p>
                </div>
                <button
                    onClick={handleSendDocuments}
                    className="bg-blue-600 rounded-lg px-3.5 py-2.5 flex items-center justify-center gap-1 w-full hover:bg-blue-700 transition-colors"
                >
                    <PaperUploadIcon className="text-white" />
                    <span className="font-semibold text-sm leading-5 text-white">
                        Enviar Documentos
                    </span>
                </button>
            </div>
        </div>
    )
}
