import { useState, useMemo, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail, ArrowRight } from "lucide-react"
import { RequestHeader } from "@/components/RequestHeader"
import { FormWizard } from "@/components/FormWizard"
import { CustomSelect } from "@/components/CustomSelect"
import { PhoneInput } from "@/components/Inputs/PhoneInput"
import { DateInput } from "@/components/Inputs/DateInput"
import { FileUpload } from "@/components/FileUpload"
import { Input } from "@/components/Inputs/Input"
import { requisitionService } from "@/services/requisition.service"
import { institutionService } from "@/services/institution.service"
import { useInfinitePagination } from "@/lib/hooks/useInfinitePagination"
import { requisitionFormSchema, type RequisitionFormData } from "@/lib/validations/requisition"
import type { ActuationForm } from "@/@types/requisition"
import type { Course } from "@/@types/institution-course"

const WIZARD_STEPS = [
    { id: 1, label: "Pessoal" },
    { id: 2, label: "Estudo" },
    { id: 3, label: "Concluir" }
]

const ACTUATION_FORMS = [
    { value: "student" as ActuationForm, label: "Aluno" },
    { value: "bolsist" as ActuationForm, label: "Bolsista" },
    { value: "teacher" as ActuationForm, label: "Professor" },
    { value: "prep_course" as ActuationForm, label: "Cursinho" },
    { value: "other" as ActuationForm, label: "Outro" },
]

export default function RequestSubmission() {
    const navigate = useNavigate()
    const [currentStep, setCurrentStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [courses, setCourses] = useState<Course[]>([])
    const [isLoadingCourses, setIsLoadingCourses] = useState(false)

    const {
        data: institutions,
        isLoading: isLoadingInstitutions,
        isLoadingMore: isLoadingMoreInstitutions,
        hasMore: hasMoreInstitutions,
        loadMore: loadMoreInstitutions,
        load: loadInstitutions,
    } = useInfinitePagination({
        fetchFunction: (page) => institutionService.getInstitutions(page),
    })

    const institutionOptions = useMemo(
        () =>
            institutions.map((institution) => ({
                value: institution.id.toString(),
                label: institution.acronym
                    ? `${institution.name} - ${institution.acronym}`
                    : institution.name,
            })),
        [institutions]
    )

    const {
        setValue,
        watch,
        trigger,
        formState: { errors },
    } = useForm<RequisitionFormData>({
        resolver: zodResolver(requisitionFormSchema),
        mode: "onChange",
        defaultValues: {
            countryCode: "+55",
            actuationForm: "student" as ActuationForm,
        },
    })

    const formData = watch()

    const courseOptions = useMemo(
        () =>
            courses.map((course) => ({
                value: course.institution_course_id!.toString(),
                label: course.name,
            })),
        [courses]
    )

    useEffect(() => {
        async function fetchCourses() {
            if (!formData.institution) {
                setCourses([])
                setValue("course", "")
                return
            }

            try {
                setIsLoadingCourses(true)
                const response = await institutionService.getInstitutionById(
                    Number.parseInt(formData.institution)
                )
                setCourses(response.data.courses || [])
            } catch (error) {
                console.error("Erro ao buscar cursos:", error)
                setCourses([])
            } finally {
                setIsLoadingCourses(false)
            }
        }

        fetchCourses()
    }, [formData.institution, setValue])

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

    function getStepErrors() {
        if (currentStep === 1) {
            return {
                address: errors.address?.message,
                number: errors.number?.message,
                neighborhood: errors.neighborhood?.message,
                city: errors.city?.message,
                phone: errors.phone?.message,
                birthDate: errors.birthDate?.message,
                addressProof: errors.addressProof?.message,
                photoId: errors.photoId?.message,
                photo3x4: errors.photo3x4?.message,
            }
        }

        if (currentStep === 2) {
            return {
                email: errors.email?.message,
                registration: errors.registration?.message,
                semester: errors.semester?.message,
                institution: errors.institution?.message,
                course: errors.course?.message,
                actuationForm: errors.actuationForm?.message,
                enrollmentProof: errors.enrollmentProof?.message,
            }
        }

        return {}
    }

    async function validateCurrentStep() {
        if (currentStep === 1) {
            const fields: (keyof RequisitionFormData)[] = [
                "address",
                "neighborhood",
                "city",
                "phone",
                "birthDate",
                "addressProof",
                "photoId",
                "photo3x4",
            ]
            return await trigger(fields)
        }

        if (currentStep === 2) {
            const fields: (keyof RequisitionFormData)[] = [
                "email",
                "registration",
                "semester",
                "institution",
                "course",
                "actuationForm",
                "enrollmentProof",
            ]
            return await trigger(fields)
        }

        return true
    }

    function convertDateToISO(dateStr: string): string {
        if (!dateStr || dateStr.length !== 10) return dateStr

        const [day, month, year] = dateStr.split('/')
        return `${year}-${month}-${day}`
    }

    async function handleSubmit() {
        setIsSubmitting(true)

        try {
            const response = await requisitionService.create({
                street_name: formData.address!,
                house_number: formData.number || null,
                neighborhood: formData.neighborhood!,
                city: formData.city!,
                phone_contact: `${formData.countryCode}${formData.phone}`,
                birth_date: convertDateToISO(formData.birthDate!),
                institution_email: formData.email!,
                institution_registration: formData.registration!,
                semester: Number.parseInt(formData.semester!),
                institution_course_id: Number.parseInt(formData.course!),
                atuation_form: formData.actuationForm!,
                residency_proof: formData.addressProof!,
                identification_document: formData.photoId!,
                profile_picture: formData.photo3x4!,
                enrollment_proof: formData.enrollmentProof!,
            })

            navigate("/solicitacao-concluida", {
                state: {
                    protocol: response.data.protocol,
                    status: response.data.status,
                },
            })
        } catch (error: unknown) {
            console.error("Erro ao enviar solicitação:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    async function handleContinue() {
        if (currentStep < 3) {
            const isValid = await validateCurrentStep()
            if (isValid) {
                setCurrentStep(currentStep + 1)
            }
        } else {
            await handleSubmit()
        }
    }

    const stepErrors = getStepErrors()
    const hasErrors = Object.values(stepErrors).some((error) => error)

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
                    {hasErrors && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-900 font-medium mb-2">Corrija os seguintes erros:</p>
                            <ul className="list-disc list-inside text-sm text-red-800 space-y-1">
                                {Object.entries(stepErrors).map(([field, error]) =>
                                    error ? <li key={field}>{error}</li> : null
                                )}
                            </ul>
                        </div>
                    )}

                    <div className="space-y-4">
                        {currentStep === 1 && (
                            <>
                                <div>
                                    <Input
                                        label="Endereço"
                                        placeholder="Rua João Faccundo"
                                        value={formData.address || ""}
                                        onChange={(e) => setValue("address", e.target.value)}
                                    />
                                    {errors.address && (
                                        <p className="text-red-600 text-xs mt-1">{errors.address.message}</p>
                                    )}
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-[84px]">
                                        <Input
                                            label="Número"
                                            placeholder="12"
                                            value={formData.number || ""}
                                            onChange={(e) => setValue("number", e.target.value)}
                                        />
                                        {errors.number && (
                                            <p className="text-red-600 text-xs mt-1">{errors.number.message}</p>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <Input
                                            label="Bairro"
                                            placeholder="Centro"
                                            value={formData.neighborhood || ""}
                                            onChange={(e) => setValue("neighborhood", e.target.value)}
                                        />
                                        {errors.neighborhood && (
                                            <p className="text-red-600 text-xs mt-1">{errors.neighborhood.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <Input
                                        label="Cidade"
                                        placeholder="Pacajus"
                                        value={formData.city || ""}
                                        onChange={(e) => setValue("city", e.target.value)}
                                    />
                                    {errors.city && (
                                        <p className="text-red-600 text-xs mt-1">{errors.city.message}</p>
                                    )}
                                </div>

                                <div>
                                    <PhoneInput
                                        label="Telefone de contato"
                                        value={formData.phone || ""}
                                        onChange={(e) => setValue("phone", e.target.value)}
                                        countryCode={formData.countryCode || "+55"}
                                        onCountryCodeChange={(code) => setValue("countryCode", code)}
                                    />
                                    {errors.phone && (
                                        <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>
                                    )}
                                </div>

                                <div>
                                    <DateInput
                                        label="Data de Nascimento"
                                        value={formData.birthDate || ""}
                                        onChange={(e) => setValue("birthDate", e.target.value)}
                                    />
                                    {errors.birthDate && (
                                        <p className="text-red-600 text-xs mt-1">{errors.birthDate.message}</p>
                                    )}
                                </div>

                                <div>
                                    <FileUpload
                                        label="Comprovante de endereço"
                                        value={formData.addressProof || null}
                                        onChange={(file) => setValue("addressProof", file!)}
                                        accept="application/pdf,image/*"
                                    />
                                    {errors.addressProof && (
                                        <p className="text-red-600 text-xs mt-1">{errors.addressProof.message}</p>
                                    )}
                                </div>

                                <div>
                                    <FileUpload
                                        label="Documento com foto"
                                        value={formData.photoId || null}
                                        onChange={(file) => setValue("photoId", file!)}
                                        accept="application/pdf,image/*"
                                    />
                                    {errors.photoId && (
                                        <p className="text-red-600 text-xs mt-1">{errors.photoId.message}</p>
                                    )}
                                </div>

                                <div>
                                    <FileUpload
                                        label="Foto 3x4"
                                        value={formData.photo3x4 || null}
                                        onChange={(file) => setValue("photo3x4", file!)}
                                        accept="image/*"
                                    />
                                    {errors.photo3x4 && (
                                        <p className="text-red-600 text-xs mt-1">{errors.photo3x4.message}</p>
                                    )}
                                </div>
                            </>
                        )}

                        {currentStep === 2 && (
                            <>
                                <div>
                                    <Input
                                        label="Email da Universidade"
                                        type="email"
                                        placeholder="aluno@email.com"
                                        value={formData.email || ""}
                                        onChange={(e) => setValue("email", e.target.value)}
                                        leftIcon={<Mail className="w-4 h-4 text-gray-600" />}
                                    />
                                    {errors.email && (
                                        <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
                                    )}
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <Input
                                            label="Matrícula"
                                            placeholder="1515062"
                                            value={formData.registration || ""}
                                            onChange={(e) => setValue("registration", e.target.value)}
                                        />
                                        {errors.registration && (
                                            <p className="text-red-600 text-xs mt-1">{errors.registration.message}</p>
                                        )}
                                    </div>
                                    <div className="w-[84px]">
                                        <Input
                                            label="Semestre"
                                            placeholder="12"
                                            value={formData.semester || ""}
                                            onChange={(e) => setValue("semester", e.target.value)}
                                        />
                                        {errors.semester && (
                                            <p className="text-red-600 text-xs mt-1">{errors.semester.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <PhoneInput
                                        label="Telefone de contato"
                                        value={formData.phone || ""}
                                        onChange={(e) => setValue("phone", e.target.value)}
                                        countryCode={formData.countryCode || "+55"}
                                        onCountryCodeChange={(code) => setValue("countryCode", code)}
                                    />
                                    {errors.phone && (
                                        <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>
                                    )}
                                </div>

                                <div>
                                    <CustomSelect
                                        label="Instituição"
                                        options={institutionOptions}
                                        value={formData.institution || ""}
                                        onChange={(value) => setValue("institution", value)}
                                        placeholder="Selecione a instituição"
                                        searchPlaceholder="Buscar instituição..."
                                        isLoading={isLoadingMoreInstitutions}
                                        hasMore={hasMoreInstitutions}
                                        onLoadMore={loadMoreInstitutions}
                                        onOpen={loadInstitutions}
                                        disabled={isLoadingInstitutions && institutions.length === 0}
                                    />
                                    {errors.institution && (
                                        <p className="text-red-600 text-xs mt-1">{errors.institution.message}</p>
                                    )}
                                </div>

                                <div>
                                    <CustomSelect
                                        label="Curso"
                                        options={courseOptions}
                                        value={formData.course || ""}
                                        onChange={(value) => setValue("course", value)}
                                        placeholder="Selecione o curso"
                                        searchPlaceholder="Buscar curso..."
                                        disabled={!formData.institution || isLoadingCourses}
                                        isLoading={isLoadingCourses}
                                    />
                                    {errors.course && (
                                        <p className="text-red-600 text-xs mt-1">{errors.course.message}</p>
                                    )}
                                </div>

                                <div>
                                    <CustomSelect
                                        label="Forma de Atuação"
                                        options={ACTUATION_FORMS}
                                        value={formData.actuationForm || "student"}
                                        onChange={(value) => setValue("actuationForm", value as ActuationForm)}
                                        searchPlaceholder="Buscar forma de atuação..."
                                    />
                                    {errors.actuationForm && (
                                        <p className="text-red-600 text-xs mt-1">{errors.actuationForm.message}</p>
                                    )}
                                </div>

                                <div>
                                    <FileUpload
                                        label="Comprovante de Matricula"
                                        value={formData.enrollmentProof || null}
                                        onChange={(file) => setValue("enrollmentProof", file!)}
                                        accept="application/pdf,image/*"
                                    />
                                    {errors.enrollmentProof && (
                                        <p className="text-red-600 text-xs mt-1">{errors.enrollmentProof.message}</p>
                                    )}
                                </div>
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
                                                {institutionOptions.find(i => i.value === formData.institution)?.label || "-"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Curso</span>
                                            <span className="text-gray-900 font-medium text-right max-w-[200px]">
                                                {courseOptions.find(c => c.value === formData.course)?.label || "-"}
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

                    <button
                        onClick={handleContinue}
                        disabled={isSubmitting}
                        className="w-full mt-8 px-3.5 py-2.5 bg-blue-600 rounded-lg font-semibold text-sm text-white hover:bg-blue-700 transition-colors flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span>{isSubmitting ? "Enviando..." : currentStep === 3 ? "Concluir" : "Prosseguir"}</span>
                        {!isSubmitting && <ArrowRight className="w-5 h-5" />}
                    </button>
                </div>
            </div>
        </div>
    )
}

