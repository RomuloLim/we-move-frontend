import { IMaskMixin } from "react-imask";
import { Input } from "../Input";

type Props = any;

export const MaskedInput = IMaskMixin(({ inputRef, ...props }: Props) => (
    <Input {...props} ref={inputRef} />
));