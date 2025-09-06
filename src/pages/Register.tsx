import { Link } from "react-router-dom"

export default function Register() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
            <div className="text-center space-y-4">
                <h1 className="text-2xl font-bold text-gray-900">Registro</h1>
                <p className="text-gray-600">Página de registro em desenvolvimento</p>
                <Link
                    to="/login"
                    className="inline-block text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                    Voltar para Login
                </Link>
            </div>
        </div>
    )
}
