import { IMaskMixin } from "react-imask"
import { Input } from "../Input"

export const MaskedInput = IMaskMixin(({ inputRef, ...props }: any) => (
    <Input {...props} ref={inputRef} />
))