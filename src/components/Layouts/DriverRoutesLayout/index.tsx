import { Button } from "@/components/Button"
import { Menu } from "@/components/Menu"
import { Home, CircleAlert, LayoutGrid } from "lucide-react"
import { Outlet } from "react-router-dom"

export function DriverRoutesLayout() {
    return (
        <div>
            <Outlet />

            <Menu>
                <Menu.Item to="/" icon={<Home />} label="Home" />
                <Menu.Item to="/embarque-avulso" icon={<LayoutGrid />} label="Embarque Avulso" />
                <Menu.Item to="/aviso" icon={<CircleAlert />} label="Aviso" />
            </Menu>
        </div>
    )
}
