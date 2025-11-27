import { BusFront } from "lucide-react";
import { Card } from "../ui/card";

interface RouteCardProps {
    routeNumber: string;
    status?: "arriving-soon" | "departed";
    tripType: "one-way" | "round-trip";
    origin: {
        city: string;
        location: string;
    };
    destination: {
        city: string;
        location: string;
    };
    estimatedTime: string;
    busNumber: string;
    departureTime: string;
    onViewDetails?: () => void;
}

function RouteCard({
    routeNumber,
    status = "arriving-soon",
    tripType,
    origin,
    destination,
    estimatedTime,
    busNumber,
    departureTime,
    onViewDetails,
}: RouteCardProps) {
    return (
        <Card className="flex flex-col gap-4 p-4 rounded-2xl shadow-sm">
            {/* Header */}
            <div className="flex flex-col gap-3">
                {/* Route Number */}
                <div className="flex items-center">
                    <p className="text-sm font-medium text-gray-900">{routeNumber}</p>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-2">
                    {status === "arriving-soon" && (
                        <div className="px-2 py-1 bg-orange-500 rounded-md">
                            <p className="text-xs font-semibold text-white">Chega em breve</p>
                        </div>
                    )}
                    <div className="px-2 py-1 bg-gray-100 rounded-md">
                        <p className="text-xs font-semibold text-gray-700">
                            {tripType === "one-way" ? "Ida" : "Ida e Volta"}
                        </p>
                    </div>
                </div>

                {/* Origin and Destination */}
                <div className="flex gap-3 min-w-0">
                    {/* Origin */}
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="flex items-center justify-center w-6 h-6 mt-0.5 flex-shrink-0">
                            <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm" />
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                            <p className="text-xs font-regular text-gray-500 truncate">
                                {origin.city}
                            </p>
                            <p className="text-sm font-medium text-gray-900 truncate">{origin.location}</p>
                        </div>
                    </div>

                    {/* Time Indicator */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                        <div className="px-2 py-1 bg-gray-100 rounded-md whitespace-nowrap">
                            <p className="text-xs font-semibold text-gray-700">
                                {estimatedTime}
                            </p>
                        </div>
                    </div>

                    {/* Destination */}
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="flex items-center justify-center w-6 h-6 mt-0.5 flex-shrink-0">
                            <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-sm" />
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                            <p className="text-xs font-regular text-gray-500 truncate">
                                {destination.city}
                            </p>
                            <p className="text-sm font-medium text-gray-900 truncate">
                                {destination.location}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bus Information */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                        <BusFront className="text-gray-600" />
                        <p className="text-sm font-medium text-gray-700">{busNumber}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-500">Saida</p>
                        <p className="text-sm font-medium text-gray-700">{departureTime}</p>
                    </div>
                </div>
            </div>

            {/* Button */}
            <button
                type="button"
                onClick={onViewDetails}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl transition-colors"
            >
                <p className="text-sm font-semibold text-white">Ver Detalhes</p>
            </button>
        </Card>
    );
}

export default RouteCard;
