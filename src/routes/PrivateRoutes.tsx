import { StudentRoutesLayout } from "@/components/Layouts/StudentRoutesLayout"
import { DriverRoutesLayout } from "@/components/Layouts/DriverRoutesLayout"
import StudentHome from "@/pages/StudentHome"
import DriverHome from "@/pages/DriverHome"
import ActiveTrip from "@/pages/ActiveTrip"
import RequestSubmission from "@/pages/RequestSubmission"
import { Route, Routes } from "react-router-dom"

export function PrivateRoutes() {
    const userStr = localStorage.getItem("user")
    const user = userStr ? JSON.parse(userStr) as User : null
    const isDriver = user?.user_type === "driver"

    if (isDriver) {
        return (
            <Routes>
                <Route element={<DriverRoutesLayout />}>
                    <Route path="/" element={<DriverHome />} />
                    <Route path="/embarque-avulso" element={<div>Embarque Avulso Page</div>} />
                    <Route path="/aviso" element={<div>Aviso Page</div>} />
                </Route>
                <Route path="/trajeto/:tripId" element={<ActiveTrip />} />
            </Routes>
        )
    }

    return (
        <Routes>
            <Route element={<StudentRoutesLayout />}>
                <Route path="/" element={<StudentHome />} />
                <Route path="/rotas" element={<div>Rotas Page</div>} />
                <Route path="/estudante" element={<div>Estudante Page</div>} />
                <Route path="/social" element={<div>Social Page</div>} />
                <Route path="/conta" element={<div>Conta Page</div>} />
            </Route>
            <Route path="/enviar-solicitacao" element={<RequestSubmission />} />
        </Routes>
    )
}