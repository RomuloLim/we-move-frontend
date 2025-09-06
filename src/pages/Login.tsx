import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Input } from "@/components/Input"
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
        <div className="min-h-screen bg-white flex flex-col max-w-sm mx-auto ">
            {/* Login Form */}
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col px-4 pt-20 justify-between">
                <div className="flex flex-col justify-between">
                    {/* Logo */}
                    <div className="mb-20 flex justify-center">
                        <div className="flex items-center gap-4">
                            <img
                                src="/images/blue-typographic-logo.svg"
                                alt="WeMove"
                                className="h-20"
                            />
                        </div>
                    </div>

                    {/* Email Input */}
                    <div>
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
                </div>
                {/* Login Button */}
                <div className="pt-16 flex flex-col gap-5">
                    <Button
                        type="submit"
                        className="w-full text-white"
                        size="lg"
                        variant="primary"
                    >
                        Login
                    </Button>

                    {/* Register Link */}
                    <div className="pb-8 px-4">
                        <div className="text-center">
                            <p className="text-xs text-gray-600">
                                Ainda não possui cadastro?{" "}
                                <Link
                                    to="/register"
                                    className="text-blue-600 font-semibold hover:text-blue-700 transition-colors text-sm"
                                >
                                    Registre-se
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
