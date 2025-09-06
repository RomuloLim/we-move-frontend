import { Link } from "react-router-dom"

export default function Home() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
            <div className="text-center space-y-8">
                {/* Logo */}
                <div className="flex items-center justify-center gap-4">
                    <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center">
                        <img
                            src="/images/blue-logo.svg"
                            alt="WeMove Logo"
                            className="w-10 h-10"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.parentElement!.innerHTML = `
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M8 12h24M8 20h24M8 28h16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                `;
                            }}
                        />
                    </div>
                    <img
                        src="/images/blue-typographic-logo.svg"
                        alt="WeMove"
                        className="h-12"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement!.innerHTML = `
                <div class="text-2xl font-bold text-blue-600">
                  we <span class="text-blue-500">MOVE</span>
                  <div class="text-xs text-gray-500 font-normal uppercase tracking-wider">TRANSPORTE UNIVERSITÁRIO</div>
                </div>
              `;
                        }}
                    />
                </div>

                <div className="space-y-4">
                    <h1 className="text-3xl font-bold text-gray-900">WeMove</h1>
                    <p className="text-gray-600 max-w-md">
                        Sistema de transporte universitário inteligente
                    </p>
                </div>

                <div className="space-y-4">
                    <Link
                        to="/login"
                        className="block w-full max-w-xs mx-auto bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                        Fazer Login
                    </Link>
                    <Link
                        to="/register"
                        className="block w-full max-w-xs mx-auto border border-blue-600 text-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                    >
                        Criar Conta
                    </Link>
                </div>
            </div>
        </div>
    )
}
