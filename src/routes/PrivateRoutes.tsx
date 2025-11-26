import { PrivateRoutesLayout } from "@/components/Layouts/PrivateRoutesLayout";
import { Route, Routes } from "react-router-dom";

export function PrivateRoutes() {
    return (
        <Routes>
            <Route element={<PrivateRoutesLayout />}>
                <Route path="/" element={<div>Home Page</div>} />
                <Route path="/rotas" element={<div>Rotas Page</div>} />
                <Route path="/estudante" element={<div>Estudante Page</div>} />
                <Route path="/social" element={<div>Social Page</div>} />
                <Route path="/conta" element={<div>Conta Page</div>} />
            </Route>
        </Routes>
    )
}