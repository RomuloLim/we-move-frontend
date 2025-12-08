import { StudentCardDrawer } from "."
import { Button } from "@/components/Button"

export function StudentCardDrawerShowcase() {
    return (
        <div className="p-8 space-y-8">
            <div>
                <h2 className="text-2xl font-bold mb-4">Student Card Drawer</h2>
                <p className="text-gray-600 mb-4">
                    Drawer que ocupa toda a tela com botão X no canto superior esquerdo.
                </p>

                <StudentCardDrawer
                    trigger={
                        <Button>
                            Abrir Drawer Tela Cheia
                        </Button>
                    }
                >
                    <div className="px-4 py-6">
                        <h3 className="text-xl font-semibold mb-4">Conteúdo do Drawer</h3>
                        <p className="text-gray-600 mb-4">
                            Este drawer ocupa toda a tela e pode conter qualquer conteúdo.
                        </p>
                        
                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold mb-2">Seção 1</h4>
                                <p className="text-gray-600">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </p>
                            </div>
                            
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold mb-2">Seção 2</h4>
                                <p className="text-gray-600">
                                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                            
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold mb-2">Seção 3</h4>
                                <p className="text-gray-600">
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco.
                                </p>
                            </div>
                        </div>
                    </div>
                </StudentCardDrawer>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Props</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2 font-mono text-sm">
                    <p>
                        <strong>trigger</strong>: ReactNode - Elemento que abre o drawer (opcional)
                    </p>
                    <p>
                        <strong>children</strong>: ReactNode - Conteúdo do drawer
                    </p>
                    <p>
                        <strong>open</strong>: boolean - Controla o estado aberto/fechado (opcional)
                    </p>
                    <p>
                        <strong>onOpenChange</strong>: (open: boolean) =&gt; void - Callback quando o estado muda (opcional)
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Características</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Ocupa 100% da altura da tela</li>
                    <li>Botão X no canto superior esquerdo para fechar</li>
                    <li>Conteúdo com scroll automático quando necessário</li>
                    <li>Pode ser controlado externamente via props open/onOpenChange</li>
                    <li>Suporta trigger customizado</li>
                </ul>
            </div>
        </div>
    )
}
