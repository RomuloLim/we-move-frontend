import * as React from "react"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

type SelectOption = {
    value: string
    label: string
}

type CustomSelectProps = {
    label?: string
    options: SelectOption[]
    value?: string
    onChange?: (value: string) => void
    placeholder?: string
    searchPlaceholder?: string
    emptyMessage?: string
    disabled?: boolean
    isLoading?: boolean
    hasMore?: boolean
    onLoadMore?: () => void
    onOpen?: () => void
    loadingMessage?: string
}

export function CustomSelect({
    label,
    options,
    value,
    onChange,
    placeholder = "Selecione uma opção...",
    searchPlaceholder = "Buscar...",
    emptyMessage = "Nenhum resultado encontrado.",
    disabled = false,
    isLoading = false,
    hasMore = false,
    onLoadMore,
    onOpen,
    loadingMessage = "Carregando...",
}: CustomSelectProps) {
    const [open, setOpen] = React.useState(false)
    const selectedOption = options.find((option) => option.value === value)
    const listRef = React.useRef<HTMLDivElement>(null)

    function handleOpenChange(isOpen: boolean) {
        setOpen(isOpen)
        if (isOpen && onOpen) {
            onOpen()
        }
    }

    function handleScroll(e: React.UIEvent<HTMLDivElement>) {
        if (!hasMore || isLoading || !onLoadMore) return

        const target = e.currentTarget
        const scrollPercentage = (target.scrollTop + target.clientHeight) / target.scrollHeight

        if (scrollPercentage > 0.8) {
            onLoadMore()
        }
    }

    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label className="font-medium text-sm leading-5 text-gray-700">
                    {label}
                </label>
            )}
            <Popover open={open} onOpenChange={handleOpenChange}>
                <PopoverTrigger asChild>
                    <button
                        type="button"
                        disabled={disabled}
                        role="combobox"
                        aria-expanded={open}
                        className={cn(
                            "w-full h-10 bg-white border border-gray-300 rounded-lg px-3 flex items-center justify-between",
                            "hover:border-gray-400 transition-colors",
                            "disabled:opacity-50 disabled:cursor-not-allowed",
                            !selectedOption && "text-gray-400"
                        )}
                    >
                        <span className="font-semibold text-sm leading-5 truncate">
                            {selectedOption?.label || placeholder}
                        </span>
                        <ChevronDown className={cn("ml-2 h-5 w-5 text-gray-600 transition-transform", open && "rotate-180")} />
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                    <Command>
                        <CommandInput placeholder={searchPlaceholder} />
                        <CommandList ref={listRef} onScroll={handleScroll}>
                            <CommandEmpty>{emptyMessage}</CommandEmpty>
                            <CommandGroup>
                                {options.map((option) => (
                                    <CommandItem
                                        key={option.value}
                                        value={option.value}
                                        onSelect={(currentValue) => {
                                            onChange?.(currentValue === value ? "" : currentValue)
                                            setOpen(false)
                                        }}
                                        className="cursor-pointer"
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === option.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        <span className="text-sm">{option.label}</span>
                                    </CommandItem>
                                ))}
                                {isLoading && (
                                    <div className="py-2 text-center text-sm text-gray-500">
                                        {loadingMessage}
                                    </div>
                                )}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
