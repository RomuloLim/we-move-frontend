import { Check } from "lucide-react"

type Step = {
    id: number
    label: string
}

type FormWizardProps = {
    steps: Step[]
    currentStep: number
    currentStepTitle?: string
}

export function FormWizard({ steps, currentStep, currentStepTitle }: FormWizardProps) {
    return (
        <div className="bg-white flex flex-col w-full">
            <div className="border-b border-gray-300 flex gap-1 items-center justify-center px-4 py-2">
                {steps.map((step, index) => {
                    const isActive = currentStep === step.id
                    const isCompleted = currentStep > step.id
                    const isLast = index === steps.length - 1

                    return (
                        <div key={step.id} className="flex gap-1 items-center">
                            <div className="flex gap-1 items-center">
                                <div
                                    className={`
                                        flex items-center justify-center h-6 w-6 rounded-full border
                                        ${isActive
                                            ? 'bg-blue-50 border-blue-500'
                                            : isCompleted
                                                ? 'bg-blue-600 border-blue-600'
                                                : 'bg-white border-gray-300'
                                        }
                                    `}
                                >
                                    {isCompleted ? (
                                        <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                                    ) : (
                                        <span
                                            className={`
                                                font-normal text-xs leading-[18px] text-center
                                                ${isActive
                                                    ? 'text-blue-700'
                                                    : 'text-gray-900'
                                                }
                                            `}
                                        >
                                            {step.id}
                                        </span>
                                    )}
                                </div>
                                <p className="font-normal text-xs leading-[18px] text-gray-900">
                                    {step.label}
                                </p>
                            </div>
                            {!isLast && (
                                <div className="w-4 h-px bg-gray-400 rounded-full" />
                            )}
                        </div>
                    )
                })}
            </div>
            {currentStepTitle && (
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-between px-4 py-2">
                    <p className="font-medium text-xs leading-[18px] text-white text-center">
                        {currentStepTitle}
                    </p>
                </div>
            )}
        </div>
    )
}
