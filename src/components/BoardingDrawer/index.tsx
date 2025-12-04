import { useNavigate } from "react-router-dom"
import { PlayCircle } from "lucide-react"
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerClose,
} from "@/components/ui/drawer"
import { PassengerCard } from "@/components/PassengerCard"
import { Button } from "@/components/Button"

type BoardingDrawerProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    passengers: TripPassenger[]
    stopId: number | null
    onDisembark?: (passengerId: number, studentId: number) => void
    isDisembarking?: boolean
}

export function BoardingDrawer({
    open,
    onOpenChange,
    passengers,
    stopId,
    onDisembark,
    isDisembarking = false,
}: BoardingDrawerProps) {
    const navigate = useNavigate()

    function handleNewBoarding() {
        if (stopId) {
            navigate(`/embarque/${stopId}`)
        }
    }

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent className="max-h-[85vh]">
                <DrawerHeader>
                    <DrawerTitle className="text-center font-semibold text-base leading-6">
                        Passageiros
                    </DrawerTitle>
                </DrawerHeader>

                <div className="flex flex-col gap-4 px-4 pb-4">
                    {/* Passengers List */}
                    <div className="flex flex-col gap-2.5 max-h-[calc(85vh-200px)] overflow-y-auto">
                        {passengers.length === 0 ? (
                            <div className="text-center py-8 text-gray-600">
                                <p className="text-sm">Nenhum passageiro embarcado ainda</p>
                            </div>
                        ) : (
                            passengers.map((passenger) => (
                                <PassengerCard
                                    key={passenger.id}
                                    name={passenger.student.user.name}
                                    cpf={passenger.student.user.cpf}
                                    enrollmentId={passenger.student.id.toString()}
                                    profilePictureUrl={passenger.student.user.profile_picture_url}
                                    onDisembark={
                                        onDisembark
                                            ? () => onDisembark(passenger.id, passenger.student_id)
                                            : undefined
                                    }
                                    isDisembarking={isDisembarking}
                                />
                            ))
                        )}
                    </div>

                    {/* New Boarding Button */}
                    <Button
                        type="button"
                        onClick={handleNewBoarding}
                        className="w-full justify-center gap-1"
                    >
                        <PlayCircle className="w-5 h-5" />
                        Novo Embarque
                    </Button>
                </div>

                <DrawerClose />
            </DrawerContent>
        </Drawer>
    )
}
