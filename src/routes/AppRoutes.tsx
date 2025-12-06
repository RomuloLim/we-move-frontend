import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useEffect } from "react"

import Login from "@/pages/Login"
import Register from "@/pages/Register"
import { ComponentShowcase } from "@/components/component-showcase"
import { PrivateRoutes } from "./PrivateRoutes"
import { useAuth } from "@/lib/auth-context"
import { authService } from "@/services/auth.service"

export function AppRoutes() {
    const { currentAuth, setCurrentAuth, isLoading } = useAuth()

    useEffect(() => {
        authService.setAuthContext(setCurrentAuth)
    }, [setCurrentAuth])

    if (isLoading) {
        return null
    }

    return (
        <Router>
            <Routes>
                {currentAuth ? (
                    <>
                        <Route path="/*" element={<PrivateRoutes />} />
                        <Route path="/showcase" element={<ComponentShowcase />} />
                        <Route path="/login" element={<Navigate to="/" replace />} />
                        <Route path="/register" element={<Navigate to="/" replace />} />
                    </>
                ) : (
                    <>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="*" element={<Navigate to="/login" replace />} />
                    </>
                )}
            </Routes>
        </Router>
    )
}