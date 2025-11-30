import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { studentService } from "@/services/student.service"
import { PaperUploadIcon } from "@/components/icons/PaperUploadIcon"

export default function StudentHome() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [hasRequisition, setHasRequisition] = useState<boolean | null>(null)
    const [studentData, setStudentData] = useState<Student | null>(null)

    async function fetchStudentData() {
        try {
            setLoading(true)
            const userStr = localStorage.getItem("user")
            if (!userStr) {
                setLoading(false)
                return
            }

            const user = JSON.parse(userStr) as User

            if (user.user_type !== "student" || !user.student_profile?.id) {
                setLoading(false)
                setHasRequisition(false)
                return
            }

            const response = await studentService.getStudentData(user.student_profile.id)
            setStudentData(response.data)
            setHasRequisition(!!response.data.latest_requisition)
        } catch (error) {
            console.error("Erro ao buscar dados do estudante:", error)
            setHasRequisition(false)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchStudentData()
    }, [])

    function handleSendDocuments() {
        navigate("/enviar-solicitacao")
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-gray-600">Carregando...</p>
                </div>
            </div>
        )
    }

    if (hasRequisition === false) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 pb-32">
                <div className="flex flex-col justify-center gap-4 w-full max-w-md">
                    <div className="flex flex-col gap-4 text-center">
                        <p className="font-medium text-sm leading-5 text-gray-900">
                            Envie a documentação para ver as rotas
                        </p>
                    </div>
                    <button
                        onClick={handleSendDocuments}
                        className="bg-blue-600 rounded-lg px-3.5 py-2.5 flex items-center justify-center gap-1 w-full hover:bg-blue-700 transition-colors"
                    >
                        <PaperUploadIcon className="text-white" />
                        <span className="font-semibold text-sm leading-5 text-white">
                            Enviar Documentos
                        </span>
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen p-4 pb-32">
            <div className="max-w-4xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">Bem-vindo(a)!</h1>
                {studentData && (
                    <div className="bg-white p-6 rounded-lg shadow space-y-4">
                        <h2 className="text-xl font-semibold">Seus Dados</h2>
                        <div className="space-y-2">
                            <p><strong>Nome:</strong> {studentData.user.name}</p>
                            <p><strong>Email:</strong> {studentData.user.email}</p>
                            <p><strong>Status:</strong> {studentData.status}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
