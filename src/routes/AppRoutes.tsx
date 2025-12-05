import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { ComponentShowcase } from "@/components/component-showcase";
import { PrivateRoutes } from "./PrivateRoutes";

export function AppRoutes() {
    function getStoredUser(): User | null {
        const userStr = localStorage.getItem("user");
        if (!userStr) {
            return null;
        }

        try {
            const user: User | null = userStr ? JSON.parse(userStr) : null;

            return user;
        } catch {
            return null;
        }
    }

    const isAuthenticated = getStoredUser() !== null;

    return (
        <Router>
            <Routes>
                {isAuthenticated ? (
                    <>
                        <Route path="/*" element={<PrivateRoutes />} />
                        <Route path="/showcase" element={<ComponentShowcase />} />
                    </>
                ) : (
                    <>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </>
                )}
            </Routes>
        </Router>
    )
}