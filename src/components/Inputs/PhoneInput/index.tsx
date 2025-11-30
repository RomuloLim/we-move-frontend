import * as React from "react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { mergeClasses } from "@/lib/utils"
import { inputVariants, type InputProps } from "../Input"
import { MaskedInput } from "../MaskedInput"

type PhoneInputProps = Omit<InputProps, "leftIcon" | "type"> & {
    countryCode?: string
    onCountryCodeChange?: (code: string) => void
}

const COUNTRY_CODES = [
    { code: "+55", country: "BR" },
    { code: "+1", country: "US" },
    { code: "+44", country: "UK" },
]

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
    }) => {
        const [isDropdownOpen, setIsDropdownOpen] = useState(false)
        const hasError = error || variant === "error"
        const inputVariant = hasError ? "error" : "default"

        function handleAccept(unmaskedValue: string) {
            if (onChange) {
                const syntheticEvent = {
                    target: {
                        value: unmaskedValue,
                    }
                } as React.ChangeEvent<HTMLInputElement>
                onChange(syntheticEvent)
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

                    <MaskedInput
                        mask="(00) 00000-0000"
                        unmask={true}
                        value={value as string}
                        onAccept={handleAccept}
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
