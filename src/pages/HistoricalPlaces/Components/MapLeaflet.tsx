import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

/* ================= TYPES ================= */
export interface HistoricalPlace {
    id: string;
    nameEn: string;
    nameVi: string;
    category: "museum" | "landmark" | "temple" | "park" | "market";
    coordinates: [number, number]; // [longitude, latitude]
    description: string;
    history: string;
    visitInfo: {
        openingHours: string;
        ticketPrice: string;
        address: string;
    };
    vocabulary: {
        word: string;
        definition: string;
    }[];
    imageUrl: string;
    audioGuide?: boolean;
}

interface MapLeafletProps {
    places: HistoricalPlace[];
    onSelectPlace: (place: HistoricalPlace) => void;
    mapStyle?: "streets" | "satellite";
    getCategoryEmoji?: (category: string) => string;
    getCategoryColor?: (category: string) => string;
}

/* ================= ICON HELPERS ================= */
const defaultIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

export const createCustomIcon = (category: string, emoji: string) => {
    const colors = {
        museum: "#9333ea",
        landmark: "#dc2626",
        temple: "#f59e0b",
        park: "#16a34a",
        market: "#0891b2",
    };

    const color = colors[category as keyof typeof colors] || "#6b7280";

    return L.divIcon({
        className: "custom-marker",
        html: `
            <div style="
                background: ${color};
                width: 40px;
                height: 40px;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                border: 3px solid white;
                box-shadow: 0 4px 6px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
            ">
                <span style="
                    transform: rotate(45deg);
                    font-size: 20px;
                ">${emoji}</span>
            </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
    });
};

// Component to handle map events
function MapEventHandler({
    onPlaceSelect,
}: {
    onPlaceSelect: (place: HistoricalPlace) => void;
}) {
    const map = useMap();
    useEffect(() => {
        // You can add custom map event handlers here
    }, [map]);
    return null;
}

/* ================= COMPONENT ================= */
export function MapLeaflet({
    places,
    onSelectPlace,
    mapStyle = "streets",
    getCategoryEmoji,
    getCategoryColor,
}: MapLeafletProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const getTileLayerUrl = () => {
        if (mapStyle === "satellite") {
            return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
        }
        return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    };

    const getTileLayerAttribution = () => {
        if (mapStyle === "satellite") {
            return '&copy; <a href="https://www.esri.com/">Esri</a>';
        }
        return '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    };

    if (!isMounted) {
        return <div style={{ height: "100%", width: "100%" }} />;
    }

    const defaultGetEmoji = (category: string) => {
        const emojis: Record<string, string> = {
            museum: "🏛️",
            landmark: "🏰",
            temple: "⛩️",
            park: "🌳",
            market: "🛒",
        };
        return emojis[category] || "📍";
    };

    const emojiGetter = getCategoryEmoji || defaultGetEmoji;

    return (
        <div style={{ height: "100%", width: "100%" }}>
            <MapContainer
                center={[10.7769, 106.6958]}
                zoom={14}
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom={true}
            >
                <TileLayer
                    url={getTileLayerUrl()}
                    attribution={getTileLayerAttribution()}
                />

                {places.map((place) => {
                    const [lng, lat] = place.coordinates;
                    const customIcon = createCustomIcon(
                        place.category,
                        emojiGetter(place.category)
                    );

                    return (
                        <Marker
                            key={place.id}
                            position={[lat, lng]}
                            icon={customIcon}
                            eventHandlers={{
                                click: () => onSelectPlace(place),
                            }}
                        >
                            <Popup>
                                <div style={{ padding: "8px", minWidth: "200px" }}>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "start",
                                            gap: "8px",
                                            marginBottom: "8px",
                                        }}
                                    >
                                        <span style={{ fontSize: "24px" }}>
                                            {emojiGetter(place.category)}
                                        </span>
                                        <div style={{ flex: 1 }}>
                                            <h4
                                                style={{
                                                    fontSize: "14px",
                                                    color: "#1f2937",
                                                    margin: 0,
                                                }}
                                            >
                                                {place.nameVi}
                                            </h4>
                                            <p
                                                style={{
                                                    fontSize: "12px",
                                                    color: "#4b5563",
                                                    margin: 0,
                                                }}
                                            >
                                                {place.nameEn}
                                            </p>
                                        </div>
                                    </div>
                                    <p
                                        style={{
                                            fontSize: "12px",
                                            color: "#374151",
                                            marginBottom: "12px",
                                            display: "-webkit-box",
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                        }}
                                    >
                                        {place.description}
                                    </p>
                                    <button
                                        onClick={() => onSelectPlace(place)}
                                        style={{
                                            width: "100%",
                                            padding: "6px 12px",
                                            backgroundColor: "#f97316",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "4px",
                                            cursor: "pointer",
                                            fontSize: "12px",
                                        }}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}

                <MapEventHandler onPlaceSelect={onSelectPlace} />
            </MapContainer>
        </div>
    );
}
