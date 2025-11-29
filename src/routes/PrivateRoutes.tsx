import { PrivateRoutesLayout } from "@/components/Layouts/PrivateRoutesLayout";
import StudentHome from "@/pages/StudentHome";
import RequestSubmission from "@/pages/RequestSubmission";
import { Route, Routes } from "react-router-dom";

export function PrivateRoutes() {
    return (
        <Routes>
            <Route element={<PrivateRoutesLayout />}>
                <Route path="/" element={<StudentHome />} />
                <Route path="/enviar-solicitacao" element={<RequestSubmission />} />
                <Route path="/rotas" element={<div>Rotas Page</div>} />
                <Route path="/estudante" element={<div>Estudante Page</div>} />
                <Route path="/social" element={<div>Social Page</div>} />
                <Route path="/conta" element={<div>Conta Page</div>} />
            </Route>
        </Routes>
    )
}