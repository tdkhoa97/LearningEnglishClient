import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    MapPin,
    BookOpen,
    Star,
    Volume2,
    X,
    Info,
    Clock,
    DollarSign,
    Navigation,
    Layers,
} from "lucide-react";
import { MapLeaflet, HistoricalPlace } from "./Components/MapLeaflet";

const historicalPlaces: HistoricalPlace[] = [
    {
        id: "independence-palace",
        nameEn: "Independence Palace",
        nameVi: "Dinh Độc Lập",
        category: "landmark",
        coordinates: [106.6958, 10.7769],
        description:
            "The Independence Palace, also known as Reunification Palace, is a landmark in Ho Chi Minh City. It was designed by architect Ngô Viết Thụ and was the home and workplace of the President of South Vietnam during the Vietnam War.",
        history: "Built on the site of the former Norodom Palace, the Independence Palace was completed in 1966. It played a significant role in the Fall of Saigon on April 30, 1975, when North Vietnamese Army tanks crashed through its gates, marking the end of the Vietnam War.",
        visitInfo: {
            openingHours: "7:30 AM - 11:00 AM, 1:00 PM - 4:00 PM",
            ticketPrice: "40,000 VND (~$1.70)",
            address: "135 Nam Kỳ Khởi Nghĩa, District 1",
        },
        vocabulary: [
            { word: "Independence", definition: "Freedom from outside control" },
            {
                word: "Reunification",
                definition: "The process of bringing together again",
            },
            {
                word: "Landmark",
                definition: "A famous or important building or place",
            },
            { word: "Palace", definition: "A large and impressive building" },
        ],
        imageUrl:
            "https://images.unsplash.com/photo-1691049969347-a8ced6ead885?w=800",
        audioGuide: true,
    },
    {
        id: "notre-dame-cathedral",
        nameEn: "Notre-Dame Cathedral Basilica of Saigon",
        nameVi: "Nhà thờ Đức Bà Sài Gòn",
        category: "landmark",
        coordinates: [106.699, 10.7797],
        description:
            "Notre-Dame Cathedral is a famous Catholic cathedral in the heart of Ho Chi Minh City. Built between 1863 and 1880, it was constructed with materials imported from France, including red bricks that have never faded.",
        history: "The cathedral was built during French colonial rule and remains one of the most iconic architectural landmarks in Vietnam. The two bell towers stand 58 meters tall and can be seen from far away. In front of the cathedral stands a statue of the Virgin Mary.",
        visitInfo: {
            openingHours:
                "Currently under renovation (expected to reopen 2027)",
            ticketPrice: "Free admission",
            address: "01 Công xã Paris, District 1",
        },
        vocabulary: [
            { word: "Cathedral", definition: "A large and important church" },
            {
                word: "Colonial",
                definition: "Relating to a period when a country controls another",
            },
            {
                word: "Architecture",
                definition: "The art and practice of designing buildings",
            },
            { word: "Iconic", definition: "Very famous and well-known" },
        ],
        imageUrl:
            "https://images.unsplash.com/photo-1609557070354-53a9480a92a4?w=800",
        audioGuide: true,
    },
    {
        id: "war-remnants-museum",
        nameEn: "War Remnants Museum",
        nameVi: "Bảo tàng Chứng tích Chiến tranh",
        category: "museum",
        coordinates: [106.6918, 10.7797],
        description:
            "The War Remnants Museum is a powerful and moving museum that documents the Vietnam War from the Vietnamese perspective. It contains extensive displays of military equipment, photographs, and artifacts from the war.",
        history: "Opened in 1975 as the 'Exhibition House for US and Puppet Crimes', the museum was renamed several times before becoming the War Remnants Museum in 1995. It serves as an important educational resource about the impact of war and the importance of peace.",
        visitInfo: {
            openingHours: "7:30 AM - 12:00 PM, 1:30 PM - 5:00 PM",
            ticketPrice: "40,000 VND (~$1.70)",
            address: "28 Võ Văn Tần, District 3",
        },
        vocabulary: [
            {
                word: "Remnants",
                definition:
                    "What is left after other parts have been removed",
            },
            {
                word: "Artifact",
                definition:
                    "An object made by humans, especially of historical interest",
            },
            {
                word: "Perspective",
                definition: "A particular way of viewing things",
            },
            {
                word: "Document",
                definition: "To record information about something",
            },
        ],
        imageUrl:
            "https://images.unsplash.com/photo-1747714055016-59328ea655f3?w=800",
        audioGuide: true,
    },
    {
        id: "ben-thanh-market",
        nameEn: "Ben Thanh Market",
        nameVi: "Chợ Bến Thành",
        category: "market",
        coordinates: [106.6981, 10.772],
        description:
            "Ben Thanh Market is one of the oldest and most iconic markets in Ho Chi Minh City. It offers a wide variety of goods including food, souvenirs, clothing, and handicrafts. The market is a symbol of the city and a must-visit destination.",
        history: "The market was originally built in 1859 near the Ben Thanh wharf and was moved to its current location in 1912 during French colonial rule. The clock tower above the main entrance has become an iconic symbol of the city.",
        visitInfo: {
            openingHours:
                "6:00 AM - 6:00 PM (Night market: 6:00 PM - 12:00 AM)",
            ticketPrice: "Free entry",
            address: "Lê Lợi, Phường Bến Thành, District 1",
        },
        vocabulary: [
            {
                word: "Market",
                definition: "A place where people buy and sell goods",
            },
            {
                word: "Handicraft",
                definition: "Items made skillfully by hand",
            },
            {
                word: "Souvenir",
                definition: "A thing kept as a reminder of a place",
            },
            {
                word: "Wharf",
                definition: "A platform where ships load and unload",
            },
        ],
        imageUrl:
            "https://images.unsplash.com/photo-1691049969347-a8ced6ead885?w=800",
        audioGuide: false,
    },
    {
        id: "central-post-office",
        nameEn: "Saigon Central Post Office",
        nameVi: "Bưu điện Trung tâm Sài Gòn",
        category: "landmark",
        coordinates: [106.6999, 10.7799],
        description:
            "The Saigon Central Post Office is a beautiful example of French colonial architecture. Designed by Gustave Eiffel (who also designed the Eiffel Tower), it features a stunning interior with vintage telephone booths and large maps.",
        history: "Built between 1886 and 1891, the post office has been in continuous operation for over 130 years. The building showcases Gothic, Renaissance, and French influences, and remains one of the most photographed landmarks in the city.",
        visitInfo: {
            openingHours:
                "7:00 AM - 7:00 PM (Monday to Friday), 8:00 AM - 6:00 PM (Weekends)",
            ticketPrice: "Free entry",
            address: "02 Công xã Paris, District 1",
        },
        vocabulary: [
            {
                word: "Post Office",
                definition: "A building where mail is received and sent",
            },
            {
                word: "Vintage",
                definition: "Old-fashioned but high quality",
            },
            {
                word: "Gothic",
                definition: "A style of architecture from medieval Europe",
            },
            {
                word: "Continuous",
                definition: "Without stopping or interruption",
            },
        ],
        imageUrl:
            "https://images.unsplash.com/photo-1609557070354-53a9480a92a4?w=800",
        audioGuide: true,
    },
    {
        id: "saigon-opera-house",
        nameEn: "Saigon Opera House",
        nameVi: "Nhà hát Thành phố",
        category: "landmark",
        coordinates: [106.703, 10.777],
        description:
            "The Saigon Opera House, also known as the Municipal Theatre, is an elegant colonial building that hosts opera, ballet, and musical performances. Its beautiful French architecture makes it a popular spot for photography.",
        history: "Inaugurated in 1900, the Opera House was built as a concert hall for the French colonists. During the Vietnam War, it served as the seat of the Lower House assembly of South Vietnam. After 1975, it was renamed and restored to its original purpose as a theatre.",
        visitInfo: {
            openingHours: "Performance times vary (check schedule)",
            ticketPrice: "Varies by performance",
            address: "07 Công Trường Lam Sơn, District 1",
        },
        vocabulary: [
            {
                word: "Opera",
                definition:
                    "A dramatic work set to music for singers and musicians",
            },
            { word: "Municipal", definition: "Relating to a city or town" },
            { word: "Elegant", definition: "Graceful and stylish" },
            {
                word: "Inaugurated",
                definition: "Officially opened or introduced",
            },
        ],
        imageUrl:
            "https://images.unsplash.com/photo-1691049969347-a8ced6ead885?w=800",
        audioGuide: true,
    },
];

export function HistoricalPlacesPage() {
    const [selectedPlace, setSelectedPlace] =
        useState<HistoricalPlace | null>(null);
    const [showSidebar, setShowSidebar] = useState(false);
    const [mapStyle, setMapStyle] = useState<"streets" | "satellite">(
        "streets"
    );
    const [visitedPlaces, setVisitedPlaces] = useState<Set<string>>(
        new Set()
    );

    const getCategoryEmoji = (category: string) => {
        const emojis: Record<string, string> = {
            museum: "🏛️",
            landmark: "🏰",
            temple: "⛩️",
            park: "🌳",
            market: "🛒",
        };
        return emojis[category] || "📍";
    };

    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            museum: "bg-purple-100 text-purple-700 border-purple-300",
            landmark: "bg-red-100 text-red-700 border-red-300",
            temple: "bg-amber-100 text-amber-700 border-amber-300",
            park: "bg-green-100 text-green-700 border-green-300",
            market: "bg-cyan-100 text-cyan-700 border-cyan-300",
        };
        return (
            colors[category] || "bg-gray-100 text-gray-700 border-gray-300"
        );
    };

    const handlePlaceSelect = (place: HistoricalPlace) => {
        setSelectedPlace(place);
        setShowSidebar(true);
    };

    const handleMarkAsVisited = (placeId: string) => {
        setVisitedPlaces((prev) => new Set([...prev, placeId]));
    };

    const progressPercentage =
        (visitedPlaces.size / historicalPlaces.length) * 100;

    return (
        <div className="h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-pink-50 overflow-hidden flex flex-col">
            <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
                <div className="flex items-center justify-between p-4">
                    <div>
                        <h1 className="text-gray-800">Explore Ho Chi Minh City 🗺️</h1>
                        <p className="text-sm text-gray-600">
                            Learn English through historical places and cultural landmarks
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Main Map Container */}
                <div className="flex-1 relative">
                    {/* Map Controls Overlay */}
                    <div className="absolute top-4 left-4 z-[1000] space-y-2">
                        {/* Progress Card */}
                        <Card className="p-4 bg-white/95 backdrop-blur-sm shadow-xl border-2 border-orange-200">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600">
                                        Exploration Progress
                                    </p>
                                    <p className="text-sm text-gray-800">
                                        {visitedPlaces.size}/
                                        {historicalPlaces.length} Places
                                    </p>
                                </div>
                            </div>
                            <Progress value={progressPercentage} className="h-2" />
                        </Card>

                        {/* Map Style Switcher */}
                        <Card className="p-3 bg-white/95 backdrop-blur-sm shadow-xl border-2 border-orange-200">
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    variant={
                                        mapStyle === "streets"
                                            ? "default"
                                            : "outline"
                                    }
                                    onClick={() => setMapStyle("streets")}
                                    className="flex-1"
                                >
                                    <Layers className="w-4 h-4 mr-1" />
                                    Streets
                                </Button>
                                <Button
                                    size="sm"
                                    variant={
                                        mapStyle === "satellite"
                                            ? "default"
                                            : "outline"
                                    }
                                    onClick={() => setMapStyle("satellite")}
                                    className="flex-1"
                                >
                                    <Layers className="w-4 h-4 mr-1" />
                                    Satellite
                                </Button>
                            </div>
                        </Card>
                    </div>

                    {/* Legend */}
                    <div className="absolute bottom-4 left-4 z-[1000]">
                        <Card className="p-3 bg-white/95 backdrop-blur-sm shadow-xl border-2 border-orange-200">
                            <h4 className="text-xs text-gray-700 mb-2">
                                Legend
                            </h4>
                            <div className="space-y-1 text-xs">
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">🏛️</span>
                                    <span className="text-gray-600">Museum</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">🏰</span>
                                    <span className="text-gray-600">
                                        Landmark
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">🛒</span>
                                    <span className="text-gray-600">Market</span>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Leaflet Map */}
                    <MapLeaflet
                        places={historicalPlaces}
                        onSelectPlace={handlePlaceSelect}
                        mapStyle={mapStyle}
                        getCategoryEmoji={getCategoryEmoji}
                        getCategoryColor={getCategoryColor}
                    />
                </div>

                {/* Sidebar - Place Details */}
                {showSidebar && selectedPlace && (
                    <div className="w-full md:w-96 lg:w-[450px] bg-white border-l-4 border-orange-300 shadow-2xl overflow-hidden flex flex-col h-full">
                        <ScrollArea className="flex-1 min-h-0">
                            {/* Header Image */}
                            <div className="relative h-48 bg-gradient-to-br from-orange-100 to-pink-100">
                                <img
                                    src={selectedPlace.imageUrl}
                                    alt={selectedPlace.nameEn}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute top-3 right-3 bg-white/90 hover:bg-white"
                                    onClick={() => setShowSidebar(false)}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                                <div className="absolute bottom-3 left-3 right-3">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-4xl">
                                            {getCategoryEmoji(
                                                selectedPlace.category
                                            )}
                                        </span>
                                        <div className="flex-1">
                                            <h3 className="text-white drop-shadow-lg">
                                                {selectedPlace.nameVi}
                                            </h3>
                                            <p className="text-sm text-white/90">
                                                {selectedPlace.nameEn}
                                            </p>
                                        </div>
                                    </div>
                                    <Badge
                                        className={`${getCategoryColor(
                                            selectedPlace.category
                                        )} shadow-lg`}
                                    >
                                        {selectedPlace.category}
                                    </Badge>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-6">
                                {/* Visit Info */}
                                <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
                                    <h4 className="text-blue-800 mb-3 flex items-center gap-2">
                                        <Info className="w-5 h-5" />
                                        Visit Information
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-start gap-2">
                                            <Clock className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-gray-600 text-xs">
                                                    Opening Hours
                                                </p>
                                                <p className="text-gray-800">
                                                    {
                                                        selectedPlace.visitInfo
                                                            .openingHours
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <DollarSign className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-gray-600 text-xs">
                                                    Ticket Price
                                                </p>
                                                <p className="text-gray-800">
                                                    {
                                                        selectedPlace.visitInfo
                                                            .ticketPrice
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <Navigation className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-gray-600 text-xs">
                                                    Address
                                                </p>
                                                <p className="text-gray-800">
                                                    {
                                                        selectedPlace.visitInfo
                                                            .address
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>

                                {/* Description */}
                                <div>
                                    <h4 className="text-gray-800 mb-2 flex items-center gap-2">
                                        <BookOpen className="w-5 h-5 text-orange-600" />
                                        Description
                                    </h4>
                                    <p className="text-gray-700 leading-relaxed text-sm">
                                        {selectedPlace.description}
                                    </p>
                                </div>

                                {/* History */}
                                <Card className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200">
                                    <h4 className="text-amber-800 mb-2 flex items-center gap-2">
                                        <BookOpen className="w-5 h-5" />
                                        Historical Background
                                    </h4>
                                    <p className="text-gray-700 leading-relaxed text-sm">
                                        {selectedPlace.history}
                                    </p>
                                </Card>

                                {/* Vocabulary */}
                                <div>
                                    <h4 className="text-gray-800 mb-3 flex items-center gap-2">
                                        <Star className="w-5 h-5 text-purple-600" />
                                        English Vocabulary 📚
                                    </h4>
                                    <div className="space-y-2">
                                        {selectedPlace.vocabulary.map(
                                            (vocab, idx) => (
                                                <Card
                                                    key={idx}
                                                    className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className="p-0 h-8 w-8 hover:bg-purple-100"
                                                        >
                                                            <Volume2 className="w-4 h-4 text-purple-600" />
                                                        </Button>
                                                        <div className="flex-1">
                                                            <p className="text-purple-800">
                                                                {vocab.word}
                                                            </p>
                                                            <p className="text-sm text-gray-600">
                                                                {
                                                                    vocab.definition
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Card>
                                            )
                                        )}
                                    </div>
                                </div>

                                {/* Audio Guide Badge */}
                                {selectedPlace.audioGuide && (
                                    <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                                <Volume2 className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-green-800">
                                                    Audio Guide Available
                                                </p>
                                                <p className="text-xs text-green-600">
                                                    Listen to detailed narration
                                                </p>
                                            </div>
                                            <Button
                                                size="sm"
                                                className="ml-auto bg-green-600 hover:bg-green-700"
                                            >
                                                Play
                                            </Button>
                                        </div>
                                    </Card>
                                )}

                                {/* Mark as Visited */}
                                <Button
                                    className={`w-full ${visitedPlaces.has(selectedPlace.id)
                                        ? "bg-green-600 hover:bg-green-700"
                                        : "bg-orange-500 hover:bg-orange-600"
                                        }`}
                                    onClick={() =>
                                        handleMarkAsVisited(selectedPlace.id)
                                    }
                                    disabled={visitedPlaces.has(
                                        selectedPlace.id
                                    )}
                                >
                                    {visitedPlaces.has(selectedPlace.id) ? (
                                        <>✓ Visited</>
                                    ) : (
                                        <>Mark as Visited</>
                                    )}
                                </Button>
                            </div>
                        </ScrollArea>
                    </div>
                )}

                {/* Places List (when sidebar is closed) */}
                {!showSidebar && (
                    <div className="w-80 bg-white/95 backdrop-blur-sm border-l-2 border-orange-200 overflow-hidden flex flex-col">
                        <div className="p-4 bg-gradient-to-r from-orange-50 to-pink-50 border-b-2 border-orange-200">
                            <h3 className="text-orange-800 mb-1">
                                Historical Places 📍
                            </h3>
                            <p className="text-sm text-gray-600">
                                {historicalPlaces.length} locations to explore
                            </p>
                        </div>
                        <ScrollArea className="flex-1">
                            <div className="p-4 space-y-3">
                                {historicalPlaces.map((place) => {
                                    const isVisited =
                                        visitedPlaces.has(place.id);
                                    return (
                                        <Card
                                            key={place.id}
                                            className={`p-4 cursor-pointer transition-all hover:shadow-lg border-2 ${isVisited
                                                ? "bg-green-50 border-green-300"
                                                : "bg-white border-gray-200 hover:border-orange-300"
                                                }`}
                                            onClick={() =>
                                                handlePlaceSelect(place)
                                            }
                                        >
                                            <div className="flex items-start gap-3">
                                                <span className="text-3xl">
                                                    {getCategoryEmoji(
                                                        place.category
                                                    )}
                                                </span>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between mb-1">
                                                        <h4 className="text-sm text-gray-800 truncate">
                                                            {place.nameVi}
                                                        </h4>
                                                        {isVisited && (
                                                            <Badge className="bg-green-600 text-white text-xs ml-2">
                                                                ✓
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-gray-600 mb-2">
                                                        {place.nameEn}
                                                    </p>
                                                    <Badge
                                                        className={`text-xs ${getCategoryColor(
                                                            place.category
                                                        )}`}
                                                    >
                                                        {place.category}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </Card>
                                    );
                                })}
                            </div>
                        </ScrollArea>
                    </div>
                )}
            </div>
        </div>
    );
}
