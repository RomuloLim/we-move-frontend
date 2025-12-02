import { Menu } from "@/components/Menu";
import { RouteDrawer } from "@/components/RouteDrawer";
import { Home, BusFront, LayoutGrid, UsersRound, UserRound } from "lucide-react";
import { Outlet } from "react-router-dom";

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

export function PrivateRoutesLayout() {
    function handleDisembark() {
        console.log("Desembarcar solicitado")
    }

    return (
        <div>
            <Outlet />

            <Menu>
                <Menu.Item to="/" icon={<Home />} label="Home" />
                <Menu.Item
                    icon={<BusFront />}
                    renderCustom={() => (
                        <RouteDrawer
                            stops={MOCK_ROUTE_STOPS}
                            onDisembark={handleDisembark}
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
                    )}
                />
                <Menu.Item to="/estudante" icon={<LayoutGrid />} label="Estudante" />
                <Menu.Item to="/social" icon={<UsersRound />} label="Social" />
                <Menu.Item to="/conta" icon={<UserRound />} label="Conta" />
            </Menu>
        </div>
    )
}