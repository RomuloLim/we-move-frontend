import * as React from "react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { mergeClasses } from "@/lib/utils"
import { inputVariants, type InputProps } from "../Input"

type PhoneInputProps = Omit<InputProps, "leftIcon" | "type"> & {
    countryCode?: string
    onCountryCodeChange?: (code: string) => void
}

const COUNTRY_CODES = [
    { code: "+55", country: "BR" },
    { code: "+1", country: "US" },
    { code: "+44", country: "UK" },
]

function formatPhoneNumber(input: string) {
    const numbers = input.replace(/\D/g, '')

    if (numbers.length <= 2) return `(${numbers}`
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
    ({
        className,
        variant,
        size = "md",
        label,
        hint,
        error,
        disabled,
        countryCode = "+55",
        onCountryCodeChange,
        value,
        onChange,
        ...props
    }, ref) => {
        const [isDropdownOpen, setIsDropdownOpen] = useState(false)
        const hasError = error || variant === "error"
        const inputVariant = hasError ? "error" : "default"

        function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
            const formatted = formatPhoneNumber(e.target.value)
            onChange?.(e)
            if (e.target.value !== formatted) {
                e.target.value = formatted
            }
        }

        return (
            <div className="w-full">
                {label && (
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        {label}
                    </label>
                )}

                <div className={mergeClasses(
                    "flex items-center overflow-hidden",
                    inputVariants({ variant: inputVariant, size, className })
                )}>
                    <div className="relative border-r border-gray-300">
                        <button
                            type="button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            disabled={disabled}
                            className="flex items-center px-3 py-2 gap-1 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="font-medium text-sm text-gray-700">
                                {countryCode}
                            </span>
                            <ChevronDown className="w-4 h-4 text-gray-600" />
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                {COUNTRY_CODES.map((item) => (
                                    <button
                                        key={item.code}
                                        type="button"
                                        onClick={() => {
                                            onCountryCodeChange?.(item.code)
                                            setIsDropdownOpen(false)
                                        }}
                                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors whitespace-nowrap"
                                    >
                                        {item.code} {item.country}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <input
                        ref={ref}
                        type="tel"
                        value={value}
                        onChange={handleChange}
                        disabled={disabled}
                        placeholder="(85) 99999-9999"
                        className="flex-1 px-3 py-2 bg-transparent border-0 outline-none font-normal text-base leading-6 text-gray-900 placeholder:text-gray-400 disabled:opacity-50"
                        {...props}
                    />
                </div>

                {hint && !hasError && (
                    <p className="mt-1.5 text-xs text-gray-600">{hint}</p>
                )}

                {hasError && (
                    <p className="mt-1.5 text-xs text-red-600">{error}</p>
                )}
            </div>
        )
    }
)

PhoneInput.displayName = "PhoneInput"

export { PhoneInput }
