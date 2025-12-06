import { X } from "lucide-react"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer"

type FullScreenDrawerProps = {
    trigger?: React.ReactNode
    children: React.ReactNode
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

export function FullScreenDrawer({
    trigger,
    children,
    open,
    onOpenChange,
}: FullScreenDrawerProps) {
    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
            <DrawerContent className="h-screen max-h-screen rounded-none">
                <div className="bg-white flex flex-col h-full">
                    <div className="flex items-start justify-start px-4 py-3 shrink-0">
                        <DrawerClose asChild>
                            <button
                                type="button"
                                className="text-gray-900 hover:text-gray-700 transition-colors"
                                aria-label="Fechar"
                            >
                                <X className="size-6" />
                            </button>
                        </DrawerClose>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {children}
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
