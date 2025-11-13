import { mergeClasses } from "@/lib/utils";
import { createContext, useContext, type ReactNode } from "react";

type RadioGroupContextType = {
    name: string;
    inline?: boolean;
}

type RadioGroupProps = RadioGroupContextType & {
    children: ReactNode;
    name: string;
    label?: string;
    containerClassName?: string;
}

type RadioItemProps = {
    value: string;
    label: string;
}

const RadioGroupContext = createContext<RadioGroupContextType>({} as RadioGroupContextType);

function RadioGroup({ children, label, name, containerClassName, inline = true }: RadioGroupProps) {
    return (
        <div className={containerClassName}>
            {label && <h1 className="mb-1.5 block text-sm font-medium text-gray-700">{label}</h1>}

            <RadioGroupContext.Provider value={{ name, inline }}>
                <div className={mergeClasses("flex flex-wrap gap-1 md:gap-2", !inline && "flex-col")}>
                    {children}
                </div>
            </RadioGroupContext.Provider>
        </div>
    )
}

function RadioItem({ value, label }: RadioItemProps) {
    const { name } = useContext(RadioGroupContext);

    return (
        <label className="flex items-center gap-1">
            <input
                type="radio"
                name={name}
                value={value}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
            />

            <span className="text-sm text-gray-700">{label}</span>
        </label>
    )
}

RadioGroup.Item = RadioItem;

export { RadioGroup };