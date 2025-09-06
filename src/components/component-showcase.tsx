import { ButtonShowcase } from "@/components/Button/showcase"
import { InputShowcase } from "@/components/Input/showcase"
import { TextareaShowcase } from "@/components/Textarea/showcase"

export function ComponentShowcase() {
    return (
        <div className="space-y-12">
            <ButtonShowcase />
            <InputShowcase />
            <TextareaShowcase />
        </div>
    )
}
