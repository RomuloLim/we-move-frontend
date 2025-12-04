import { useEffect, useState } from "react"
import { Button } from "@/components/Button"
import { Menu } from "@/components/Menu"
import { Home, CircleAlert, LayoutGrid } from "lucide-react"
import { Outlet } from "react-router-dom"

export function DriverRoutesLayout() {
    const [hasActiveTrip, setHasActiveTrip] = useState(false)

    useEffect(() => {
        function checkActiveTrip() {
            const currentTrip = localStorage.getItem("currentTrip")
            setHasActiveTrip(!!currentTrip)
        }

        checkActiveTrip()

        window.addEventListener("storage", checkActiveTrip)

        window.addEventListener("tripStatusChanged", checkActiveTrip)

        return () => {
            window.removeEventListener("storage", checkActiveTrip)
            window.removeEventListener("tripStatusChanged", checkActiveTrip)
        }
    }, [])

    return (
        <div>
            <Outlet />

            <Menu>
                <Menu.Item to="/" icon={<Home />} label="Home" />
                <Menu.Item
                    to="/embarque-avulso"
                    icon={<LayoutGrid />}
                    label="Embarque Avulso"
                    disabled={!hasActiveTrip}
                />
                <Menu.Item
                    to="/aviso"
                    icon={<CircleAlert />}
                    label="Aviso"
                    disabled={!hasActiveTrip}
                />
            </Menu>
        </div>
    )
}
