import { useState } from "react"
import { Mail, ArrowRight } from "lucide-react"
import { RequestHeader } from "@/components/RequestHeader"
import { FormWizard } from "@/components/FormWizard"
import { CustomSelect } from "@/components/CustomSelect"
import { PhoneInput } from "@/components/Inputs/PhoneInput"
import { FileUpload } from "@/components/FileUpload"
import { Input } from "@/components/Inputs/Input"

const WIZARD_STEPS = [
    { id: 1, label: "Pessoal" },
    { id: 2, label: "Estudo" },
    { id: 3, label: "Concluir" }
]

const INSTITUTIONS = [
    { value: "uece", label: "Universidade Estadual do Ceará - UECE" },
    { value: "ufc", label: "Universidade Federal do Ceará - UFC" },
    { value: "unifor", label: "Universidade de Fortaleza - UNIFOR" },
]

const COURSES = [
    { value: "cc", label: "Ciências da Computação" },
    { value: "eng", label: "Engenharia de Software" },
    { value: "si", label: "Sistemas de Informação" },
]

const ACTUATION_FORMS = [
    { value: "bolsista", label: "Bolsista" },
    { value: "aluno", label: "Aluno" },
    { value: "professor", label: "Professor" },
    { value: "cursinho", label: "Cursinho" },
    { value: "outro", label: "Outro" },
]

export default function RequestSubmission() {
    const [currentStep, setCurrentStep] = useState(2)
    const [formData, setFormData] = useState({
        email: "",
        registration: "",
        semester: "",
        phone: "",
        countryCode: "+55",
        institution: "",
        course: "",
        actuationForm: "aluno",
        enrollmentProof: null as File | null,
    })

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
        <div className="w-full min-h-screen bg-gray-50">
            <div className="mx-auto bg-white min-h-screen">
                <RequestHeader
                    title="Enviar Documentos"
                    subtitle="Olivia Rhye"
                />

                <FormWizard
                    steps={WIZARD_STEPS}
                    currentStep={currentStep}
                    currentStepTitle={getCurrentStepTitle()}
                />

                <div className="px-4 py-6">
                    <div className="space-y-4">
                        {currentStep === 2 && (
                            <>
                                <Input
                                    label="Email da Universidade"
                                    type="email"
                                    placeholder="aluno@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    leftIcon={<Mail className="w-4 h-4 text-gray-600" />}
                                />

                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <Input
                                            label="Matrícula"
                                            placeholder="1515062"
                                            value={formData.registration}
                                            onChange={(e) => setFormData({ ...formData, registration: e.target.value })}
                                        />
                                    </div>
                                    <div className="w-[84px]">
                                        <Input
                                            label="Semestre"
                                            placeholder="12"
                                            value={formData.semester}
                                            onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <PhoneInput
                                    label="Telefone de contato"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    countryCode={formData.countryCode}
                                    onCountryCodeChange={(code) => setFormData({ ...formData, countryCode: code })}
                                />

                                <CustomSelect
                                    label="Instituição"
                                    options={INSTITUTIONS}
                                    value={formData.institution}
                                    onChange={(value) => setFormData({ ...formData, institution: value })}
                                    placeholder="Selecione a instituição"
                                    searchPlaceholder="Buscar instituição..."
                                />

                                <CustomSelect
                                    label="Curso"
                                    options={COURSES}
                                    value={formData.course}
                                    onChange={(value) => setFormData({ ...formData, course: value })}
                                    placeholder="Selecione o curso"
                                    searchPlaceholder="Buscar curso..."
                                />

                                <CustomSelect
                                    label="Forma de Atuação"
                                    options={ACTUATION_FORMS}
                                    value={formData.actuationForm}
                                    onChange={(value) => setFormData({ ...formData, actuationForm: value })}
                                    searchPlaceholder="Buscar forma de atuação..."
                                />

                                <FileUpload
                                    label="Comprovante de Matricula"
                                    value={formData.enrollmentProof}
                                    onChange={(file) => setFormData({ ...formData, enrollmentProof: file })}
                                    accept="application/pdf,image/*"
                                />
                            </>
                        )}
                    </div>

                    {/* Botão de continuar */}
                    <button
                        onClick={() => {
                            if (currentStep < 3) {
                                setCurrentStep(currentStep + 1)
                            }
                        }}
                        className="w-full mt-8 px-3.5 py-2.5 bg-blue-600 rounded-lg font-semibold text-sm text-white hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
                    >
                        <span>Prosseguir</span>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}

