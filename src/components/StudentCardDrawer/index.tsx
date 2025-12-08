import { X } from "lucide-react"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer"

type StudentCardDrawerProps = {
    trigger?: React.ReactNode
    children: React.ReactNode
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

export function StudentCardDrawer({
    trigger,
    children,
    open,
    onOpenChange,
}: StudentCardDrawerProps) {
    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
            <DrawerContent className="h-screen !max-h-screen !rounded-none !border-none bg-brand-600">
                <div className="flex flex-col h-full">
                    <div className="flex items-start justify-start px-4 py-3 shrink-0">
                        <DrawerClose asChild>
                            <button
                                type="button"
                                className="text-white hover:text-white/80 transition-colors flex items-center gap-2"
                                aria-label="Fechar"
                            >
                                <X className="size-6" />
                                <span>Fechar</span>
                            </button>
                        </DrawerClose>
                    </div>

                    <div className="flex-1 overflow-y-auto text-white">
                        {children}
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
