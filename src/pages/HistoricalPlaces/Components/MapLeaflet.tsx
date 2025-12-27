import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { defaultIcon } from "@/lib/leafletIcon";

export interface HistoricalPlace {
    id: string;
    nameEn: string;
    nameVi: string;
    category: "museum" | "landmark" | "temple" | "park" | "market";
    coordinates: [number, number]; // [lng, lat]
    visitInfo: {
        address: string;
    };
}

interface MapLeafletProps {
    places: HistoricalPlace[];
    onSelectPlace: (place: HistoricalPlace) => void;
}

export function MapLeaflet({ places, onSelectPlace }: MapLeafletProps) {
    return (
        <MapContainer
            center={[10.7769, 106.6958]}
            zoom={14}
            className="h-full w-full rounded-2xl"
        >
            <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {places.map((place) => (
                <Marker
                    key={place.id}
                    position={[place.coordinates[1], place.coordinates[0]]}
                    icon={defaultIcon}
                    eventHandlers={{
                        click: () => onSelectPlace(place),
                    }}
                >
                    <Popup>
                        <div className="space-y-1">
                            <p className="font-semibold">{place.nameEn}</p>
                            <p className="text-sm text-gray-600">{place.nameVi}</p>
                            <p className="text-xs">{place.visitInfo.address}</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
