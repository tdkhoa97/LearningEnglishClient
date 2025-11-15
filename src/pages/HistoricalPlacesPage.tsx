import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    MapPin,
    Book,
    Volume2,
    Star,
    Navigation,
    X,
    Landmark,
    Clock,
    DollarSign,
    Maximize2,
    Minimize2
} from "lucide-react";

interface HistoricalPlace {
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

const historicalPlaces: HistoricalPlace[] = [
    {
        id: "independence-palace",
        nameEn: "Independence Palace",
        nameVi: "Dinh Độc Lập",
        category: "landmark",
        coordinates: [106.6958, 10.7769],
        description: "The Independence Palace, also known as Reunification Palace, is a landmark in Ho Chi Minh City. It was designed by architect Ngô Viết Thụ and was the home and workplace of the President of South Vietnam during the Vietnam War.",
        history: "Built on the site of the former Norodom Palace, the Independence Palace was completed in 1966. It played a significant role in the Fall of Saigon on April 30, 1975, when North Vietnamese Army tanks crashed through its gates, marking the end of the Vietnam War.",
        visitInfo: {
            openingHours: "7:30 AM - 11:00 AM, 1:00 PM - 4:00 PM",
            ticketPrice: "40,000 VND (~$1.70)",
            address: "135 Nam Kỳ Khởi Nghĩa, District 1"
        },
        vocabulary: [
            { word: "Independence", definition: "Freedom from outside control" },
            { word: "Reunification", definition: "The process of bringing together again" },
            { word: "Landmark", definition: "A famous or important building or place" },
            { word: "Palace", definition: "A large and impressive building" }
        ],
        imageUrl: "https://images.unsplash.com/photo-1691049969347-a8ced6ead885?w=800",
        audioGuide: true
    },
    {
        id: "notre-dame-cathedral",
        nameEn: "Notre-Dame Cathedral Basilica of Saigon",
        nameVi: "Nhà thờ Đức Bà Sài Gòn",
        category: "landmark",
        coordinates: [106.6990, 10.7797],
        description: "Notre-Dame Cathedral is a famous Catholic cathedral in the heart of Ho Chi Minh City. Built between 1863 and 1880, it was constructed with materials imported from France, including red bricks that have never faded.",
        history: "The cathedral was built during French colonial rule and remains one of the most iconic architectural landmarks in Vietnam. The two bell towers stand 58 meters tall and can be seen from far away. In front of the cathedral stands a statue of the Virgin Mary.",
        visitInfo: {
            openingHours: "Currently under renovation (expected to reopen 2027)",
            ticketPrice: "Free admission",
            address: "01 Công xã Paris, District 1"
        },
        vocabulary: [
            { word: "Cathedral", definition: "A large and important church" },
            { word: "Colonial", definition: "Relating to a period when a country controls another" },
            { word: "Architecture", definition: "The art and practice of designing buildings" },
            { word: "Iconic", definition: "Very famous and well-known" }
        ],
        imageUrl: "https://images.unsplash.com/photo-1609557070354-53a9480a92a4?w=800",
        audioGuide: true
    },
    {
        id: "war-remnants-museum",
        nameEn: "War Remnants Museum",
        nameVi: "Bảo tàng Chứng tích Chiến tranh",
        category: "museum",
        coordinates: [106.6918, 10.7797],
        description: "The War Remnants Museum is a powerful and moving museum that documents the Vietnam War from the Vietnamese perspective. It contains extensive displays of military equipment, photographs, and artifacts from the war.",
        history: "Opened in 1975 as the 'Exhibition House for US and Puppet Crimes', the museum was renamed several times before becoming the War Remnants Museum in 1995. It serves as an important educational resource about the impact of war and the importance of peace.",
        visitInfo: {
            openingHours: "7:30 AM - 12:00 PM, 1:30 PM - 5:00 PM",
            ticketPrice: "40,000 VND (~$1.70)",
            address: "28 Võ Văn Tần, District 3"
        },
        vocabulary: [
            { word: "Remnants", definition: "What is left after other parts have been removed" },
            { word: "Artifact", definition: "An object made by humans, especially of historical interest" },
            { word: "Perspective", definition: "A particular way of viewing things" },
            { word: "Document", definition: "To record information about something" }
        ],
        imageUrl: "https://images.unsplash.com/photo-1747714055016-59328ea655f3?w=800",
        audioGuide: true
    },
    {
        id: "ben-thanh-market",
        nameEn: "Ben Thanh Market",
        nameVi: "Chợ Bến Thành",
        category: "market",
        coordinates: [106.6981, 10.7720],
        description: "Ben Thanh Market is one of the oldest and most iconic markets in Ho Chi Minh City. It offers a wide variety of goods including food, souvenirs, clothing, and handicrafts. The market is a symbol of the city and a must-visit destination.",
        history: "The market was originally built in 1859 near the Ben Thanh wharf and was moved to its current location in 1912 during French colonial rule. The clock tower above the main entrance has become an iconic symbol of the city.",
        visitInfo: {
            openingHours: "6:00 AM - 6:00 PM (Night market: 6:00 PM - 12:00 AM)",
            ticketPrice: "Free entry",
            address: "Lê Lợi, Phường Bến Thành, District 1"
        },
        vocabulary: [
            { word: "Market", definition: "A place where people buy and sell goods" },
            { word: "Handicraft", definition: "Items made skillfully by hand" },
            { word: "Souvenir", definition: "A thing kept as a reminder of a place" },
            { word: "Wharf", definition: "A platform where ships load and unload" }
        ],
        imageUrl: "https://images.unsplash.com/photo-1691049969347-a8ced6ead885?w=800",
        audioGuide: false
    },
    {
        id: "central-post-office",
        nameEn: "Saigon Central Post Office",
        nameVi: "Bưu điện Trung tâm Sài Gòn",
        category: "landmark",
        coordinates: [106.6999, 10.7799],
        description: "The Saigon Central Post Office is a beautiful example of French colonial architecture. Designed by Gustave Eiffel (who also designed the Eiffel Tower), it features a stunning interior with vintage telephone booths and large maps.",
        history: "Built between 1886 and 1891, the post office has been in continuous operation for over 130 years. The building showcases Gothic, Renaissance, and French influences, and remains one of the most photographed landmarks in the city.",
        visitInfo: {
            openingHours: "7:00 AM - 7:00 PM (Monday to Friday), 8:00 AM - 6:00 PM (Weekends)",
            ticketPrice: "Free entry",
            address: "02 Công xã Paris, District 1"
        },
        vocabulary: [
            { word: "Post Office", definition: "A building where mail is received and sent" },
            { word: "Vintage", definition: "Old-fashioned but high quality" },
            { word: "Gothic", definition: "A style of architecture from medieval Europe" },
            { word: "Continuous", definition: "Without stopping or interruption" }
        ],
        imageUrl: "https://images.unsplash.com/photo-1609557070354-53a9480a92a4?w=800",
        audioGuide: true
    },
    {
        id: "saigon-opera-house",
        nameEn: "Saigon Opera House",
        nameVi: "Nhà hát Thành phố",
        category: "landmark",
        coordinates: [106.7030, 10.7770],
        description: "The Saigon Opera House, also known as the Municipal Theatre, is an elegant colonial building that hosts opera, ballet, and musical performances. Its beautiful French architecture makes it a popular spot for photography.",
        history: "Inaugurated in 1900, the Opera House was built as a concert hall for the French colonists. During the Vietnam War, it served as the seat of the Lower House assembly of South Vietnam. After 1975, it was renamed and restored to its original purpose as a theatre.",
        visitInfo: {
            openingHours: "Performance times vary (check schedule)",
            ticketPrice: "Varies by performance",
            address: "07 Công Trường Lam Sơn, District 1"
        },
        vocabulary: [
            { word: "Opera", definition: "A dramatic work set to music for singers and musicians" },
            { word: "Municipal", definition: "Relating to a city or town" },
            { word: "Elegant", definition: "Graceful and stylish" },
            { word: "Inaugurated", definition: "Officially opened or introduced" }
        ],
        imageUrl: "https://images.unsplash.com/photo-1691049969347-a8ced6ead885?w=800",
        audioGuide: true
    }
];

export function HistoricalPlacesPage() {
    const [selectedPlace, setSelectedPlace] = useState<HistoricalPlace | null>(null);
    const [showSidebar, setShowSidebar] = useState(false);
    const [hoveredPlace, setHoveredPlace] = useState<string | null>(null);
    const [zoomLevel, setZoomLevel] = useState(1);

    // Convert lat/lng to SVG coordinates
    const mapToSVG = (coordinates: [number, number]) => {
        const [lng, lat] = coordinates;
        // Map bounds for Ho Chi Minh City area
        const minLng = 106.68;
        const maxLng = 106.71;
        const minLat = 10.77;
        const maxLat = 10.78;

        const x = ((lng - minLng) / (maxLng - minLng)) * 800;
        const y = ((maxLat - lat) / (maxLat - minLat)) * 600;

        return { x, y };
    };

    const getCategoryEmoji = (category: string) => {
        const emojis = {
            museum: "🏛️",
            landmark: "🏰",
            temple: "⛩️",
            park: "🌳",
            market: "🛒"
        };
        return emojis[category as keyof typeof emojis] || "📍";
    };

    const getCategoryColor = (category: string) => {
        const colors = {
            museum: "bg-purple-100 text-purple-700 border-purple-300",
            landmark: "bg-pink-100 text-pink-700 border-pink-300",
            temple: "bg-blue-100 text-blue-700 border-blue-300",
            park: "bg-green-100 text-green-700 border-green-300",
            market: "bg-yellow-100 text-yellow-700 border-yellow-300"
        };
        return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-700";
    };

    const getCategoryGradient = (category: string) => {
        const gradients = {
            museum: "from-purple-400 to-purple-600",
            landmark: "from-pink-400 to-pink-600",
            temple: "from-blue-400 to-blue-600",
            park: "from-green-400 to-green-600",
            market: "from-yellow-400 to-yellow-600"
        };
        return gradients[category as keyof typeof gradients] || "from-gray-400 to-gray-600";
    };

    const playAudioGuide = () => {
        console.log("Playing audio guide for:", selectedPlace?.nameEn);
    };

    return (
        <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
            {/* Map Container */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="relative w-full h-full max-w-6xl max-h-[800px] bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-blue-200">
                    {/* Map Background */}
                    <div
                        className="absolute inset-0 bg-gradient-to-br from-blue-100 via-green-50 to-blue-100"
                        style={{ transform: `scale(${zoomLevel})`, transition: "transform 0.3s ease" }}
                    >
                        {/* Street Grid */}
                        <svg className="absolute inset-0 w-full h-full opacity-20">
                            <defs>
                                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3B82F6" strokeWidth="0.5" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>

                        {/* Saigon River (decorative) */}
                        <svg className="absolute inset-0 w-full h-full">
                            <path
                                d="M 0 300 Q 200 280, 400 300 T 800 300"
                                fill="none"
                                stroke="#60A5FA"
                                strokeWidth="30"
                                opacity="0.3"
                            />
                        </svg>

                        {/* Place Markers */}
                        <svg className="absolute inset-0 w-full h-full">
                            {historicalPlaces.map((place) => {
                                const { x, y } = mapToSVG(place.coordinates);
                                const isSelected = selectedPlace?.id === place.id;
                                const isHovered = hoveredPlace === place.id;
                                const scale = isSelected ? 1.5 : isHovered ? 1.3 : 1;

                                return (
                                    <g
                                        key={place.id}
                                        transform={`translate(${x}, ${y})`}
                                        style={{
                                            cursor: "pointer",
                                            transition: "transform 0.2s ease"
                                        }}
                                        onMouseEnter={() => setHoveredPlace(place.id)}
                                        onMouseLeave={() => setHoveredPlace(null)}
                                        onClick={() => {
                                            setSelectedPlace(place);
                                            setShowSidebar(true);
                                        }}
                                    >
                                        {/* Marker Shadow */}
                                        <circle
                                            cx="0"
                                            cy="0"
                                            r={20 * scale}
                                            fill="rgba(0,0,0,0.2)"
                                            transform="translate(2, 2)"
                                        />

                                        {/* Marker Background */}
                                        <circle
                                            cx="0"
                                            cy="0"
                                            r={20 * scale}
                                            fill="url(#gradient-${place.category})"
                                            stroke="white"
                                            strokeWidth="3"
                                        />

                                        {/* Emoji Icon */}
                                        <text
                                            x="0"
                                            y="0"
                                            textAnchor="middle"
                                            dominantBaseline="central"
                                            fontSize={16 * scale}
                                        >
                                            {getCategoryEmoji(place.category)}
                                        </text>

                                        {/* Label */}
                                        {(isHovered || isSelected) && (
                                            <text
                                                x="0"
                                                y={35 * scale}
                                                textAnchor="middle"
                                                fill="#1F2937"
                                                fontSize="14"
                                                className="pointer-events-none"
                                            >
                                                {place.nameEn}
                                            </text>
                                        )}
                                    </g>
                                );
                            })}

                            {/* Define gradients */}
                            <defs>
                                <linearGradient id="gradient-museum" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#667eea" />
                                    <stop offset="100%" stopColor="#764ba2" />
                                </linearGradient>
                                <linearGradient id="gradient-landmark" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#f093fb" />
                                    <stop offset="100%" stopColor="#f5576c" />
                                </linearGradient>
                                <linearGradient id="gradient-temple" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#4facfe" />
                                    <stop offset="100%" stopColor="#00f2fe" />
                                </linearGradient>
                                <linearGradient id="gradient-park" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#43e97b" />
                                    <stop offset="100%" stopColor="#38f9d7" />
                                </linearGradient>
                                <linearGradient id="gradient-market" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#fa709a" />
                                    <stop offset="100%" stopColor="#fee140" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    {/* Zoom Controls */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                        <Button
                            size="icon"
                            onClick={() => setZoomLevel(Math.min(zoomLevel + 0.2, 2))}
                            className="bg-white hover:bg-gray-100 text-gray-700 shadow-lg"
                        >
                            <Maximize2 className="w-4 h-4" />
                        </Button>
                        <Button
                            size="icon"
                            onClick={() => setZoomLevel(Math.max(zoomLevel - 0.2, 0.8))}
                            className="bg-white hover:bg-gray-100 text-gray-700 shadow-lg"
                        >
                            <Minimize2 className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Legend */}
            <Card className="absolute top-4 left-4 p-4 bg-white/95 backdrop-blur shadow-lg max-w-xs z-10">
                <h3 className="text-gray-800 mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    Historical Places in HCMC
                </h3>
                <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="text-lg">🏛️</span>
                        <span className="text-gray-700">Museum</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-lg">🏰</span>
                        <span className="text-gray-700">Landmark</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-lg">⛩️</span>
                        <span className="text-gray-700">Temple</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-lg">🌳</span>
                        <span className="text-gray-700">Park</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-lg">🛒</span>
                        <span className="text-gray-700">Market</span>
                    </div>
                </div>
            </Card>

            {/* Place Details Sidebar */}
            {showSidebar && selectedPlace && (
                <Card className="absolute top-0 right-0 h-full w-full md:w-[450px] bg-white shadow-2xl z-20 overflow-hidden flex flex-col">
                    <div className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-blue-500 to-purple-600">
                        <h3 className="text-white">Place Details</h3>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setShowSidebar(false)}
                            className="text-white hover:bg-white/20"
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    <ScrollArea className="flex-1">
                        <div className="p-6 space-y-6">
                            {/* Image */}
                            <div className="relative h-48 rounded-lg overflow-hidden">
                                <img
                                    src={selectedPlace.imageUrl}
                                    alt={selectedPlace.nameEn}
                                    className="w-full h-full object-cover"
                                />
                                <Badge
                                    className={`absolute top-3 right-3 ${getCategoryColor(selectedPlace.category)} border`}
                                >
                                    {selectedPlace.category}
                                </Badge>
                            </div>

                            {/* Title */}
                            <div>
                                <h2 className="text-gray-800 mb-1">{selectedPlace.nameEn}</h2>
                                <p className="text-gray-600">{selectedPlace.nameVi}</p>
                            </div>

                            {/* Audio Guide */}
                            {selectedPlace.audioGuide && (
                                <Button
                                    onClick={playAudioGuide}
                                    className="w-full bg-blue-500 hover:bg-blue-600"
                                >
                                    <Volume2 className="w-4 h-4 mr-2" />
                                    Play Audio Guide
                                </Button>
                            )}

                            {/* Description */}
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Book className="w-5 h-5 text-purple-500" />
                                    <h4 className="text-gray-800">Description</h4>
                                </div>
                                <p className="text-gray-700 leading-relaxed">{selectedPlace.description}</p>
                            </div>

                            {/* History */}
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Landmark className="w-5 h-5 text-blue-500" />
                                    <h4 className="text-gray-800">Historical Background</h4>
                                </div>
                                <p className="text-gray-700 leading-relaxed">{selectedPlace.history}</p>
                            </div>

                            {/* Visit Information */}
                            <Card className="p-4 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200">
                                <h4 className="text-green-800 mb-3">Visitor Information</h4>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-start gap-2">
                                        <Clock className="w-4 h-4 text-green-600 mt-0.5" />
                                        <div>
                                            <p className="text-gray-700">{selectedPlace.visitInfo.openingHours}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <DollarSign className="w-4 h-4 text-green-600 mt-0.5" />
                                        <div>
                                            <p className="text-gray-700">{selectedPlace.visitInfo.ticketPrice}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <MapPin className="w-4 h-4 text-green-600 mt-0.5" />
                                        <div>
                                            <p className="text-gray-700">{selectedPlace.visitInfo.address}</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Vocabulary */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Star className="w-5 h-5 text-yellow-500" />
                                    <h4 className="text-gray-800">Learn New Words</h4>
                                </div>
                                <div className="space-y-2">
                                    {selectedPlace.vocabulary.map((vocab, index) => (
                                        <Card key={index} className="p-3 bg-yellow-50 border border-yellow-200">
                                            <div className="flex items-start justify-between gap-2">
                                                <div>
                                                    <p className="text-gray-800 mb-1">{vocab.word}</p>
                                                    <p className="text-sm text-gray-600">{vocab.definition}</p>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="flex-shrink-0"
                                                    onClick={() => console.log("Playing:", vocab.word)}
                                                >
                                                    <Volume2 className="w-4 h-4 text-blue-500" />
                                                </Button>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            {/* Navigate Button */}
                            <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                                <Navigation className="w-4 h-4 mr-2" />
                                Get Directions
                            </Button>
                        </div>
                    </ScrollArea>
                </Card>
            )}

            {/* Info Banner */}
            <Card className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md p-4 bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-200 z-10">
                <div className="flex items-start gap-3">
                    <span className="text-2xl">🗺️</span>
                    <div>
                        <h4 className="text-purple-800 mb-1">Explore & Learn!</h4>
                        <p className="text-sm text-purple-700">
                            Click on any marker to learn about historical places in Ho Chi Minh City.
                            Practice English while discovering Vietnam's rich culture!
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
}