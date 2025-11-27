import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { ComponentShowcase } from "@/components/component-showcase";
import { PrivateRoutes } from "./PrivateRoutes";
import { PrivateRoutesLayout } from "@/components/Layouts/PrivateRoutesLayout";

export function AppRoutes() {
    // Todo: Implement authentication check to conditionally render PrivateRoutes
    return (
        <Router>
            <Routes>
                {/* <Route path="/*" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/showcase" element={<ComponentShowcase />} /> */}

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/*" element={<PrivateRoutes />} />
                <Route path="/showcase" element={<ComponentShowcase />} />
            </Routes>
        </Router>
    )
}