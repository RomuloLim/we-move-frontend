import { useState } from "react"
import { useNavigate } from "react-router-dom"
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
    const navigate = useNavigate()
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState({
        // Step 1: Personal Information
        address: "",
        number: "",
        neighborhood: "",
        city: "",
        phone: "",
        countryCode: "+55",
        birthDate: "",
        addressProof: null as File | null,
        photoId: null as File | null,
        photo3x4: null as File | null,
        // Step 2: Study Information
        email: "",
        registration: "",
        semester: "",
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

                <div className="pt-[52px]">
                    <FormWizard
                        steps={WIZARD_STEPS}
                        currentStep={currentStep}
                        currentStepTitle={getCurrentStepTitle()}
                    />
                </div>

                <div className="px-4 py-6 pb-32">
                    <div className="space-y-4">
                        {currentStep === 1 && (
                            <>
                                <Input
                                    label="Endereço"
                                    placeholder="Rua João Faccundo"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                />

                                <div className="flex gap-4">
                                    <div className="w-[84px]">
                                        <Input
                                            label="Número"
                                            placeholder="12"
                                            value={formData.number}
                                            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Input
                                            label="Bairro"
                                            placeholder="Centro"
                                            value={formData.neighborhood}
                                            onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <Input
                                    label="Cidade"
                                    placeholder="Pacajus"
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                />

                                <PhoneInput
                                    label="Telefone de contato"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    countryCode={formData.countryCode}
                                    onCountryCodeChange={(code) => setFormData({ ...formData, countryCode: code })}
                                />

                                <Input
                                    label="Data de Nascimento"
                                    placeholder="DD/MM/AAAA"
                                    value={formData.birthDate}
                                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                                />

                                <FileUpload
                                    label="Comprovante de endereço"
                                    value={formData.addressProof}
                                    onChange={(file) => setFormData({ ...formData, addressProof: file })}
                                    accept="application/pdf,image/*"
                                />

                                <FileUpload
                                    label="Documento com foto"
                                    value={formData.photoId}
                                    onChange={(file) => setFormData({ ...formData, photoId: file })}
                                    accept="application/pdf,image/*"
                                />

                                <FileUpload
                                    label="Foto 3x4"
                                    value={formData.photo3x4}
                                    onChange={(file) => setFormData({ ...formData, photo3x4: file })}
                                    accept="image/*"
                                />
                            </>
                        )}

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

                        {currentStep === 3 && (
                            <>
                                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 space-y-4">
                                    <h3 className="font-semibold text-sm leading-5 text-gray-900 mb-4">Informações Pessoais</h3>

                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Endereço</span>
                                            <span className="text-gray-900 font-medium text-right max-w-[200px]">{formData.address || "-"}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Número</span>
                                            <span className="text-gray-900 font-medium">{formData.number || "-"}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Bairro</span>
                                            <span className="text-gray-900 font-medium">{formData.neighborhood || "-"}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Cidade</span>
                                            <span className="text-gray-900 font-medium">{formData.city || "-"}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Telefone</span>
                                            <span className="text-gray-900 font-medium">{formData.phone || "-"}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Data de Nascimento</span>
                                            <span className="text-gray-900 font-medium">{formData.birthDate || "-"}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 space-y-4">
                                    <h3 className="font-semibold text-sm leading-5 text-gray-900 mb-4">Informações de Estudo</h3>

                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">E-mail</span>
                                            <span className="text-gray-900 font-medium text-right max-w-[200px] break-all">{formData.email || "-"}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Matrícula</span>
                                            <span className="text-gray-900 font-medium">{formData.registration || "-"}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Semestre</span>
                                            <span className="text-gray-900 font-medium">{formData.semester || "-"}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Instituição</span>
                                            <span className="text-gray-900 font-medium text-right max-w-[200px]">
                                                {INSTITUTIONS.find(i => i.value === formData.institution)?.label || "-"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Curso</span>
                                            <span className="text-gray-900 font-medium text-right max-w-[200px]">
                                                {COURSES.find(c => c.value === formData.course)?.label || "-"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Forma de Atuação</span>
                                            <span className="text-gray-900 font-medium">
                                                {ACTUATION_FORMS.find(a => a.value === formData.actuationForm)?.label || "-"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                                    <p className="text-sm text-blue-900">
                                        <strong>Atenção:</strong> Verifique se todas as informações estão corretas antes de enviar. Após o envio, você receberá um protocolo de acompanhamento.
                                    </p>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Botão de continuar */}
                    <button
                        onClick={() => {
                            if (currentStep < 3) {
                                setCurrentStep(currentStep + 1)
                            } else {
                                navigate("/solicitacao-concluida")
                            }
                        }}
                        className="w-full mt-8 px-3.5 py-2.5 bg-blue-600 rounded-lg font-semibold text-sm text-white hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
                    >
                        <span>{currentStep === 3 ? "Concluir" : "Prosseguir"}</span>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}

