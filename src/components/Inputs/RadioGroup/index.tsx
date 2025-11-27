import { mergeClasses } from "@/lib/utils"
import { createContext, useContext, type ReactNode, forwardRef } from "react"

type RadioGroupContextType = {
    name: string
    inline?: boolean
}

type RadioGroupProps = RadioGroupContextType & {
    children: ReactNode
    name: string
    label?: string
    containerClassName?: string
    error?: string
}

type RadioItemProps = {
    value: string
    label: string
    disabled?: boolean
}

const RadioGroupContext = createContext<RadioGroupContextType>({} as RadioGroupContextType)

function RadioGroup({ children, label, name, containerClassName, inline = true, error }: RadioGroupProps) {
    return (
        <div className={containerClassName}>
            {label && <h1 className="mb-1.5 block text-sm font-medium text-gray-700">{label}</h1>}

            <RadioGroupContext.Provider value={{ name, inline }}>
                <div className={mergeClasses("flex flex-wrap gap-1 md:gap-2", !inline && "flex-col")}>
                    {children}
                </div>
            </RadioGroupContext.Provider>

            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    )
}

const RadioItem = forwardRef<HTMLInputElement, RadioItemProps>(
    ({ value, label, disabled, ...props }, ref) => {
        const { name } = useContext(RadioGroupContext)

        return (
            <label className={mergeClasses(
                "flex items-center gap-1",
                disabled && "opacity-50 cursor-not-allowed"
            )}>
                <input
                    ref={ref}
                    type="radio"
                    name={name}
                    value={value}
                    disabled={disabled}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 disabled:cursor-not-allowed"
                    {...props}
                />

                <span className="text-sm text-gray-700">{label}</span>
            </label>
        )
    }
)

RadioItem.displayName = "RadioItem"

RadioGroup.Item = RadioItem

export { RadioGroup }