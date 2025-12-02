import * as React from "react"
import { MaskedInput } from "../MaskedInput"

type DateInputProps = {
    label?: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    disabled?: boolean
    error?: string
    hint?: string
}

const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
    ({ value, onChange, ...props }, ref) => {
        function handleAccept(unmaskedValue: string) {
            if (onChange) {
                const day = unmaskedValue.slice(0, 2)
                const month = unmaskedValue.slice(2, 4)
                const year = unmaskedValue.slice(4, 8)
                const formattedValue = `${day}/${month}/${year}`.replace(/\/$/, '')

                const syntheticEvent = {
                    target: {
                        value: formattedValue,
                    }
                } as React.ChangeEvent<HTMLInputElement>
                onChange(syntheticEvent)
            }
        }

        return (
            <MaskedInput
                {...props}
                inputRef={ref}
                mask="00/00/0000"
                unmask={true}
                value={value as string}
                onAccept={handleAccept}
                placeholder="DD/MM/AAAA"
            />
        )
    }
)

DateInput.displayName = "DateInput"

export { DateInput }
