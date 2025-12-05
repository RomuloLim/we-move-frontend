import { AlertCard } from "."

export function AlertCardShowcase() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div>
                <h2 className="text-lg font-semibold mb-4">Alert Card Variants</h2>

                {/* Warning Variant */}
                <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Warning</h3>
                    <AlertCard
                        title="Aviso - Rota 08"
                        subject="PROBLEMAS COM ÔNIBUS 01"
                        message="Devido à alguns problemas de logística, o ônibus 08 da rota PACAJUS - FORTALEZA chegará atrasado, agradecemos a compreensão."
                        variant="warning"
                        onMarkAsRead={() => console.log("Marked as read")}
                    />
                </div>

                {/* Info Variant */}
                <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Info</h3>
                    <AlertCard
                        title="Informação - Rota 05"
                        subject="NOVA ROTA DISPONÍVEL"
                        message="Informamos que a partir de segunda-feira haverá uma nova rota disponível para os estudantes do campus central."
                        variant="info"
                        onMarkAsRead={() => console.log("Marked as read")}
                    />
                </div>

                {/* Error Variant */}
                <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Error</h3>
                    <AlertCard
                        title="Erro - Rota 12"
                        subject="SERVIÇO TEMPORARIAMENTE INDISPONÍVEL"
                        message="A rota 12 está temporariamente indisponível devido a problemas técnicos. Pedimos desculpas pelo transtorno."
                        variant="error"
                        onMarkAsRead={() => console.log("Marked as read")}
                    />
                </div>

                {/* Success Variant */}
                <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Success</h3>
                    <AlertCard
                        title="Sucesso - Rota 03"
                        subject="PROBLEMA RESOLVIDO"
                        message="O problema técnico na rota 03 foi solucionado. O serviço está funcionando normalmente."
                        variant="success"
                        onMarkAsRead={() => console.log("Marked as read")}
                    />
                </div>
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-4">Multiple Alerts</h2>
                <div className="flex flex-col gap-3">
                    <AlertCard
                        title="Aviso - Rota 08"
                        subject="ATRASO PREVISTO"
                        message="Previsão de atraso de 15 minutos na rota."
                        variant="warning"
                    />
                    <AlertCard
                        title="Informação - Sistema"
                        subject="MANUTENÇÃO PROGRAMADA"
                        message="O sistema passará por manutenção hoje às 22h."
                        variant="info"
                    />
                </div>
            </div>
        </div>
    )
}
