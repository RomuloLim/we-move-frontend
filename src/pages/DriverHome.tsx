import RouteCard from "@/components/RouteCard"

const MOCK_ROUTES = [
    {
        routeNumber: "Linha 1",
        status: "arriving-soon" as const,
        tripType: "round-trip" as const,
        origin: {
            city: "Fortaleza",
            location: "Terminal Messejana",
        },
        destination: {
            city: "Fortaleza",
            location: "UFC - Campus do Pici",
        },
        estimatedTime: "45 min",
        busNumber: "Ônibus 1234",
        departureTime: "07:30",
    },
    {
        routeNumber: "Linha 2",
        status: "departed" as const,
        tripType: "one-way" as const,
        origin: {
            city: "Fortaleza",
            location: "Centro",
        },
        destination: {
            city: "Fortaleza",
            location: "UECE - Itaperi",
        },
        estimatedTime: "30 min",
        busNumber: "Ônibus 5678",
        departureTime: "08:00",
    },
]

export default function DriverHome() {
    return (
        <div className="min-h-screen bg-gray-50 p-4 pb-32">
            <div className="max-w-4xl mx-auto space-y-4">
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-gray-900">Suas Rotas</h1>
                    <p className="text-sm text-gray-600">Gerencie suas viagens e rotas</p>
                </div>

                <div className="space-y-4">
                    {MOCK_ROUTES.map((route, index) => (
                        <RouteCard
                            key={index}
                            routeNumber={route.routeNumber}
                            status={route.status}
                            tripType={route.tripType}
                            origin={route.origin}
                            destination={route.destination}
                            estimatedTime={route.estimatedTime}
                            busNumber={route.busNumber}
                            departureTime={route.departureTime}
                            onViewDetails={() => console.log("Ver detalhes da rota")}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
