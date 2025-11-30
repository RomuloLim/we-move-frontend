import { FileText } from "lucide-react"

type FileUploadProps = {
    label: string
    value?: File | null
    onChange?: (file: File | null) => void
    accept?: string
}

export function FileUpload({ label, value, onChange, accept = "*" }: FileUploadProps) {
    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] || null
        onChange?.(file)
    }

    return (
        <div className="flex flex-col gap-1.5">
            <label className="font-medium text-sm leading-5 text-gray-700">
                {label}
            </label>
            <label className="cursor-pointer">
                <input
                    type="file"
                    accept={accept}
                    onChange={handleFileChange}
                    className="hidden"
                />
                <div className="bg-white border border-gray-300 rounded-lg h-10 px-3 flex items-center gap-2 hover:border-gray-400 transition-colors">
                    <FileText className="w-4 h-4 text-gray-600" />
                    <span className="font-normal text-base leading-6 text-gray-900">
                        {value?.name || "Anexe o documento"}
                    </span>
                </div>
            </label>
        </div>
    )
}
