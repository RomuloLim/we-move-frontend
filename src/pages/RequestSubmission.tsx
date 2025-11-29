import { useState } from "react"
import { RequestHeader } from "@/components/RequestHeader"
import { FormWizard } from "@/components/FormWizard"
import { Divider } from "@/components/Divider"

const WIZARD_STEPS = [
    { id: 1, label: "Pessoal" },
    { id: 2, label: "Estudo" },
    { id: 3, label: "Concluir" }
]

export default function RequestSubmission() {
    const [currentStep, setCurrentStep] = useState(1)

    function getCurrentStepTitle() {
        switch (currentStep) {
            case 1:
                return "Informações pessoais"
            case 2:
                return "Informações de estudo"
            case 3:
                return "Revisão e envio"
            default:
                return ""
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-md mx-auto bg-white min-h-screen">
                <RequestHeader
                    title="Enviar Documentos"
                    subtitle="Olivia Rhye"
                />

                <FormWizard
                    steps={WIZARD_STEPS}
                    currentStep={currentStep}
                    currentStepTitle={getCurrentStepTitle()}
                />

                <div className="p-4">
                    <div className="space-y-6">
                        {/* Conteúdo do formulário baseado no step atual */}
                        {currentStep === 1 && (
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Dados Pessoais
                                </h2>
                                <p className="text-sm text-gray-600">
                                    Preencha suas informações pessoais
                                </p>

                                <Divider text="ou" className="my-6" />

                                {/* Formulário step 1 aqui */}
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Informações Acadêmicas
                                </h2>
                                <p className="text-sm text-gray-600">
                                    Preencha suas informações de estudo
                                </p>
                                {/* Formulário step 2 aqui */}
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Revisão
                                </h2>
                                <p className="text-sm text-gray-600">
                                    Revise suas informações antes de enviar
                                </p>
                                {/* Revisão step 3 aqui */}
                            </div>
                        )}
                    </div>

                    {/* Botões de navegação */}
                    <div className="flex gap-3 mt-8">
                        {currentStep > 1 && (
                            <button
                                onClick={() => setCurrentStep(currentStep - 1)}
                                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg font-semibold text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Voltar
                            </button>
                        )}
                        <button
                            onClick={() => {
                                if (currentStep < 3) {
                                    setCurrentStep(currentStep + 1)
                                }
                            }}
                            className="flex-1 px-4 py-2.5 bg-blue-600 rounded-lg font-semibold text-sm text-white hover:bg-blue-700 transition-colors"
                        >
                            {currentStep === 3 ? "Enviar" : "Continuar"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

