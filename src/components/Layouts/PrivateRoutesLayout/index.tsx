import { Menu } from "@/components/Menu";
import { Home, BusFront, LayoutGrid, UsersRound, UserRound } from "lucide-react";
import { Outlet } from "react-router-dom";

export function PrivateRoutesLayout() {
    return (
        <div>
            <Outlet />

            <Menu>
                <Menu.Item to="/" icon={<Home />} label="Home" />
                <Menu.Item to="/rotas" icon={<BusFront />} label="Rotas" />
                <Menu.Item to="/estudante" icon={<LayoutGrid />} label="Estudante" />
                <Menu.Item to="/social" icon={<UsersRound />} label="Social" />
                <Menu.Item to="/conta" icon={<UserRound />} label="Conta" />
            </Menu>
        </div>
    )
}