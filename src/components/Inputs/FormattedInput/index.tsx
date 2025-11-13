import { Input, type InputProps } from "../Input";
import { MaskedInput } from "../MaskedInput";

type FormattedInputProps = InputProps & {
    mask?: string | NumberConstructor;
};

export function FormattedInput({ mask, ...props }: FormattedInputProps) {
    return (
        <>
            {Boolean(mask) ? (
                <MaskedInput
                    mask={mask}
                    {...props}
                />
            ) : (
                <Input {...props} />
            )}
        </>
    )
}