type VehicleCardProps = {
    vehicle: Vehicle
    isSelected: boolean
    onSelect: (vehicleId: number) => void
}

function VehicleCard({ vehicle, isSelected, onSelect }: VehicleCardProps) {
    return (
        <div
            className={`border rounded-lg p-3 space-y-4 ${isSelected ? "border-blue-600" : "border-gray-300"
                }`}
        >
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900 leading-5">
                    {vehicle.license_plate}
                </p>
                <button
                    type="button"
                    onClick={() => onSelect(vehicle.id)}
                    className="text-sm font-semibold text-blue-700 hover:text-blue-800"
                >
                    {isSelected ? "Selecionado" : "Selecionar"}
                </button>
            </div>

            <div className={`border-t border-dashed ${isSelected ? "border-blue-600" : "border-gray-300"}`} />

            <div className="space-y-1">
                <p className="text-sm text-gray-600 leading-[18px]">
                    <span className="font-bold">Modelo:</span> {vehicle.model}
                </p>
                <p className="text-sm text-gray-600 leading-[18px]">
                    <span className="font-bold">Capacidade:</span> {vehicle.capacity} passageiros
                </p>
            </div>
        </div>
    )
}

export default VehicleCard
