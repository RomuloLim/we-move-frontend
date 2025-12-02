import { RouteDrawer } from "."
import { BusFront } from "lucide-react"
import { Button } from "@/components/Button"

const MOCK_ROUTE_STOPS = [
    {
        id: "1",
        name: "Igreja matriz",
        address: "RT.5/RW.2, Gambir, Central Jakarta City, Jakarta 10110",
        status: "completed" as const,
    },
    {
        id: "2",
        name: "Estácio - Centro",
        address: "RT.5/RW.2, Gambir, Central Jakarta City, Jakarta 10110",
        status: "completed" as const,
    },
    {
        id: "3",
        name: "Faculdade de Direito - UFC",
        address: "RT.5/RW.2, Gambir, Central Jakarta City, Jakarta 10110",
        status: "current" as const,
    },
    {
        id: "4",
        name: "Faculdade de Direito - UFC",
        address: "RT.5/RW.2, Gambir, Central Jakarta City, Jakarta 10110",
        status: "pending" as const,
    },
    {
        id: "5",
        name: "UECE - Itaperi",
        address: "RT.5/RW.2, Gambir, Central Jakarta City, Jakarta 10110",
        status: "destination" as const,
    },
]

export function RouteDrawerShowcase() {
    function handleDisembark() {
        alert("Desembarque solicitado!")
    }

    return (
        <div className="p-8 space-y-8">
            <div>
                <h2 className="text-2xl font-bold mb-4">Route Drawer</h2>
                <p className="text-gray-600 mb-4">
                    Drawer que exibe informações sobre a rota atual do estudante.
                </p>

                <RouteDrawer
                    stops={MOCK_ROUTE_STOPS}
                    onDisembark={handleDisembark}
                    trigger={
                        <Button>
                            <BusFront className="mr-2" />
                            Abrir Rotas
                        </Button>
                    }
                />
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Props</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2 font-mono text-sm">
                    <p>
                        <strong>trigger</strong>: ReactNode - Elemento que abre o drawer
                    </p>
                    <p>
                        <strong>driverName</strong>: string - Nome do motorista
                    </p>
                    <p>
                        <strong>driverPhone</strong>: string - Telefone do motorista
                    </p>
                    <p>
                        <strong>capacity</strong>: {"{current: number, total: number}"} -
                        Capacidade do ônibus
                    </p>
                    <p>
                        <strong>stops</strong>: RouteStop[] - Lista de paradas
                    </p>
                    <p>
                        <strong>onDisembark</strong>: () =&gt; void - Callback ao clicar em
                        desembarcar
                    </p>
                </div>
            </div>
        </div>
    )
}
