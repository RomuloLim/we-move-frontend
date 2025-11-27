import { ButtonShowcase } from "@/components/Button/showcase"
import { InputShowcase } from "@/components/Inputs/Input/showcase"
import { TextareaShowcase } from "@/components/Textarea/showcase"
import RouteCardShowcase from "./RouteCard/showcase"

export function ComponentShowcase() {
    return (
        <div className="space-y-12">
            <ButtonShowcase />
            <InputShowcase />
            <TextareaShowcase />
            <RouteCardShowcase />
        </div>
    )
}
