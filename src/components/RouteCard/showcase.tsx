import RouteCard from ".";

function RouteCardShowcase() {
    return (
        <div className="p-8 space-y-6 bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-900">Route Card Examples</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
                {/* Example 1 - Arriving Soon */}
                <RouteCard
                    routeNumber="Rota 08"
                    status="arriving-soon"
                    tripType="one-way"
                    origin={{
                        city: "Pacajus",
                        location: "Igreja Matriz",
                    }}
                    destination={{
                        city: "Fortaleza",
                        location: "UECE",
                    }}
                    estimatedTime="Est. 1h 15min"
                    busNumber="Ônibus 01"
                    departureTime="15:30"
                    onViewDetails={() => console.log("View details clicked")}
                />

                {/* Example 2 - Departed */}
                <RouteCard
                    routeNumber="Rota 12"
                    status="departed"
                    tripType="round-trip"
                    origin={{
                        city: "Fortaleza",
                        location: "Terminal Messejana",
                    }}
                    destination={{
                        city: "Aquiraz",
                        location: "Beach Park",
                    }}
                    estimatedTime="Est. 45min"
                    busNumber="Ônibus 03"
                    departureTime="08:00"
                    onViewDetails={() => console.log("View details clicked")}
                />

                {/* Example 3 - One Way */}
                <RouteCard
                    routeNumber="Rota 05"
                    status="arriving-soon"
                    tripType="one-way"
                    origin={{
                        city: "Eusébio",
                        location: "Centro",
                    }}
                    destination={{
                        city: "Fortaleza",
                        location: "Shopping Iguatemi",
                    }}
                    estimatedTime="Est. 30min"
                    busNumber="Ônibus 02"
                    departureTime="14:00"
                    onViewDetails={() => console.log("View details clicked")}
                />
            </div>
        </div>
    );
}

export default RouteCardShowcase;
