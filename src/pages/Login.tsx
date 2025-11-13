import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Input } from "@/components/Inputs/Input"
import { Button } from "@/components/Button"
import { Mail, Lock } from "lucide-react"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: Implementar lógica de login
        console.log("Login attempt:", { email, password })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
            {/* Container com responsividade e profundidade */}
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden md:max-w-md lg:shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                {/* Header decorativo apenas em desktop */}
                <div className="hidden md:block h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="flex flex-col p-6 md:p-8 lg:p-10 space-y-6">
                    {/* Logo */}
                    <div className="flex justify-center mb-4 md:mb-8">
                        <div className="flex items-center gap-4 transform hover:scale-105 transition-transform duration-200">
                            <img
                                src="/images/blue-typographic-logo.svg"
                                alt="WeMove"
                                className="h-16 md:h-20 lg:h-24"
                            />
                        </div>
                    </div>

                    {/* Input Fields */}
                    <div className="space-y-4">
                        {/* Email Input */}
                        <Input
                            label="Email"
                            type="email"
                            placeholder="estudante@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            leftIcon={<Mail className="w-4 h-4" />}
                            size="lg"
                            required
                        />

                        {/* Password Input */}
                        <Input
                            label="Senha"
                            type="password"
                            placeholder="Digite sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            leftIcon={<Lock className="w-4 h-4" />}
                            size="lg"
                            required
                        />
                    </div>

                    {/* Login Button */}
                    <div className="pt-4">
                        <Button
                            type="submit"
                            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 shadow-md hover:shadow-lg transition-all duration-200"
                            size="lg"
                            variant="primary"
                        >
                            Login
                        </Button>
                    </div>

                    {/* Register Link */}
                    <div className="text-center pt-2">
                        <p className="text-xs text-gray-600 md:text-sm">
                            Ainda não possui cadastro?{" "}
                            <Link
                                to="/register"
                                className="text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-all duration-200"
                            >
                                Registre-se
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}
