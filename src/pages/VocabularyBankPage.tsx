import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Search,
    Star,
    Volume2,
    Book,
    CheckCircle2,
    Heart,
    Filter,
    TrendingUp,
    AlertCircle
} from "lucide-react";

interface VocabularyWord {
    id: string;
    word: string;
    translation: string;
    pronunciation: string;
    example: string;
    category: string;
    learned: boolean;
    favorite: boolean;
    masteryLevel: number; // 0-100
    learnedDate: string;
    reviewCount: number;
}

const mockVocabulary: VocabularyWord[] = [
    {
        id: "1",
        word: "Hello",
        translation: "Xin chào",
        pronunciation: "/həˈloʊ/",
        example: "Hello! How are you today?",
        category: "Greetings",
        learned: true,
        favorite: true,
        masteryLevel: 95,
        learnedDate: "Nov 2, 2025",
        reviewCount: 5
    },
    {
        id: "2",
        word: "Goodbye",
        translation: "Tạm biệt",
        pronunciation: "/ˌɡʊdˈbaɪ/",
        example: "Goodbye! See you tomorrow!",
        category: "Greetings",
        learned: true,
        favorite: false,
        masteryLevel: 88,
        learnedDate: "Nov 2, 2025",
        reviewCount: 4
    },
    {
        id: "3",
        word: "Thank you",
        translation: "Cảm ơn",
        pronunciation: "/θæŋk juː/",
        example: "Thank you for your help!",
        category: "Greetings",
        learned: true,
        favorite: true,
        masteryLevel: 92,
        learnedDate: "Nov 2, 2025",
        reviewCount: 6
    },
    {
        id: "4",
        word: "Blue",
        translation: "Màu xanh dương",
        pronunciation: "/bluː/",
        example: "The sky is blue.",
        category: "Colors",
        learned: true,
        favorite: false,
        masteryLevel: 78,
        learnedDate: "Nov 5, 2025",
        reviewCount: 3
    },
    {
        id: "5",
        word: "Red",
        translation: "Màu đỏ",
        pronunciation: "/red/",
        example: "I like the red apple.",
        category: "Colors",
        learned: true,
        favorite: false,
        masteryLevel: 85,
        learnedDate: "Nov 5, 2025",
        reviewCount: 3
    },
    {
        id: "6",
        word: "Green",
        translation: "Màu xanh lá",
        pronunciation: "/ɡriːn/",
        example: "The grass is green.",
        category: "Colors",
        learned: true,
        favorite: false,
        masteryLevel: 65,
        learnedDate: "Nov 5, 2025",
        reviewCount: 2
    },
    {
        id: "7",
        word: "Yellow",
        translation: "Màu vàng",
        pronunciation: "/ˈjeloʊ/",
        example: "The sun is yellow.",
        category: "Colors",
        learned: true,
        favorite: false,
        masteryLevel: 72,
        learnedDate: "Nov 5, 2025",
        reviewCount: 3
    },
    {
        id: "8",
        word: "Dog",
        translation: "Con chó",
        pronunciation: "/dɔːɡ/",
        example: "I have a dog.",
        category: "Animals",
        learned: false,
        favorite: false,
        masteryLevel: 45,
        learnedDate: "Nov 9, 2025",
        reviewCount: 1
    },
    {
        id: "9",
        word: "Cat",
        translation: "Con mèo",
        pronunciation: "/kæt/",
        example: "The cat is sleeping.",
        category: "Animals",
        learned: false,
        favorite: false,
        masteryLevel: 40,
        learnedDate: "Nov 9, 2025",
        reviewCount: 1
    },
];

export function VocabularyBankPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [words, setWords] = useState(mockVocabulary);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    const categories = ["all", ...Array.from(new Set(words.map(w => w.category)))];

    const filteredWords = words.filter(word => {
        const matchesSearch = word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
            word.translation.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "all" || word.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const learnedWords = filteredWords.filter(w => w.learned);
    const learningWords = filteredWords.filter(w => !w.learned);
    const favoriteWords = words.filter(w => w.favorite);
    const weakWords = words.filter(w => w.masteryLevel < 70);

    const toggleFavorite = (id: string) => {
        setWords(words.map(word =>
            word.id === id ? { ...word, favorite: !word.favorite } : word
        ));
    };

    const playPronunciation = (word: string) => {
        console.log("Playing pronunciation for:", word);
        // Mock audio playback
    };

    const getMasteryColor = (level: number) => {
        if (level >= 80) return "text-green-600 bg-green-100";
        if (level >= 60) return "text-blue-600 bg-blue-100";
        if (level >= 40) return "text-yellow-600 bg-yellow-100";
        return "text-red-600 bg-red-100";
    };

    const getMasteryLabel = (level: number) => {
        if (level >= 80) return "Mastered";
        if (level >= 60) return "Good";
        if (level >= 40) return "Learning";
        return "Needs Practice";
    };

    const WordCard = ({ word }: { word: VocabularyWord }) => (
        <Card className="p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-gray-800">{word.word}</h4>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => playPronunciation(word.word)}
                        >
                            <Volume2 className="w-4 h-4 text-blue-500" />
                        </Button>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{word.pronunciation}</p>
                    <p className="text-gray-700 mb-2">{word.translation}</p>
                    <p className="text-sm text-gray-600 italic">"{word.example}"</p>
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFavorite(word.id)}
                    className="flex-shrink-0"
                >
                    <Heart className={`w-5 h-5 ${word.favorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                </Button>
            </div>

            <div className="flex items-center justify-between pt-3 border-t">
                <Badge variant="secondary" className="text-xs">
                    {word.category}
                </Badge>

                <div className="flex items-center gap-2">
                    <Badge className={`text-xs ${getMasteryColor(word.masteryLevel)}`}>
                        {getMasteryLabel(word.masteryLevel)}
                    </Badge>
                    {word.learned && (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                    )}
                </div>
            </div>
        </Card>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 w-full overflow-auto">
            <main className="max-w-6xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-gray-800 mb-2">Vocabulary Bank 📚</h2>
                    <p className="text-gray-600">
                        Review and master all your learned words
                    </p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
                        <div className="text-center">
                            <Book className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                            <p className="text-2xl text-blue-800 mb-1">{words.length}</p>
                            <p className="text-sm text-blue-700">Total Words</p>
                        </div>
                    </Card>

                    <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
                        <div className="text-center">
                            <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-green-600" />
                            <p className="text-2xl text-green-800 mb-1">{learnedWords.length}</p>
                            <p className="text-sm text-green-700">Mastered</p>
                        </div>
                    </Card>

                    <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200">
                        <div className="text-center">
                            <Heart className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                            <p className="text-2xl text-purple-800 mb-1">{favoriteWords.length}</p>
                            <p className="text-sm text-purple-700">Favorites</p>
                        </div>
                    </Card>

                    <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200">
                        <div className="text-center">
                            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                            <p className="text-2xl text-orange-800 mb-1">{learningWords.length}</p>
                            <p className="text-sm text-orange-700">Learning</p>
                        </div>
                    </Card>
                </div>

                {/* Search and Filter */}
                <Card className="p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search words or translations..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        <div className="flex gap-2 flex-wrap">
                            {categories.map(category => (
                                <Button
                                    key={category}
                                    variant={selectedCategory === category ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setSelectedCategory(category)}
                                    className={selectedCategory === category ? "bg-blue-500" : ""}
                                >
                                    {category === "all" ? "All" : category}
                                </Button>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Tabs */}
                <Tabs defaultValue="all" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
                        <TabsTrigger value="all">All ({filteredWords.length})</TabsTrigger>
                        <TabsTrigger value="learned">Mastered ({learnedWords.length})</TabsTrigger>
                        <TabsTrigger value="favorites">Favorites ({favoriteWords.length})</TabsTrigger>
                        <TabsTrigger value="weak">Weak ({weakWords.length})</TabsTrigger>
                    </TabsList>

                    {/* All Words Tab */}
                    <TabsContent value="all">
                        {filteredWords.length === 0 ? (
                            <Card className="p-12 text-center">
                                <Book className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                                <h3 className="text-gray-600 mb-2">No words found</h3>
                                <p className="text-gray-500">Try adjusting your search or filters</p>
                            </Card>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-4">
                                {filteredWords.map(word => (
                                    <WordCard key={word.id} word={word} />
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    {/* Learned Words Tab */}
                    <TabsContent value="learned">
                        {learnedWords.length === 0 ? (
                            <Card className="p-12 text-center bg-gradient-to-br from-green-50 to-blue-50">
                                <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-500" />
                                <h3 className="text-gray-800 mb-2">Keep Learning!</h3>
                                <p className="text-gray-600">Complete lessons to master more words</p>
                            </Card>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-4">
                                {learnedWords.map(word => (
                                    <WordCard key={word.id} word={word} />
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    {/* Favorites Tab */}
                    <TabsContent value="favorites">
                        {favoriteWords.length === 0 ? (
                            <Card className="p-12 text-center bg-gradient-to-br from-purple-50 to-pink-50">
                                <Heart className="w-16 h-16 mx-auto mb-4 text-purple-400" />
                                <h3 className="text-gray-800 mb-2">No favorites yet</h3>
                                <p className="text-gray-600">Click the heart icon on words to save them as favorites</p>
                            </Card>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-4">
                                {favoriteWords.map(word => (
                                    <WordCard key={word.id} word={word} />
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    {/* Weak Words Tab */}
                    <TabsContent value="weak">
                        <Card className="p-4 mb-6 bg-orange-50 border-2 border-orange-200">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-orange-800 mb-1">Practice These Words</h3>
                                    <p className="text-orange-700 text-sm">
                                        These words need more practice. Review them regularly to improve your mastery!
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {weakWords.length === 0 ? (
                            <Card className="p-12 text-center bg-gradient-to-br from-green-50 to-blue-50">
                                <Star className="w-16 h-16 mx-auto mb-4 text-green-500" />
                                <h3 className="text-gray-800 mb-2">Amazing!</h3>
                                <p className="text-gray-600">You've mastered all your words! Keep up the great work! 🎉</p>
                            </Card>
                        ) : (
                            <>
                                <div className="grid md:grid-cols-2 gap-4 mb-6">
                                    {weakWords.map(word => (
                                        <WordCard key={word.id} word={word} />
                                    ))}
                                </div>

                                <Card className="p-6 bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-blue-800 mb-2">Ready to Practice?</h3>
                                            <p className="text-blue-700">
                                                Review these {weakWords.length} words to boost your mastery level!
                                            </p>
                                        </div>
                                        <Button className="bg-blue-500 hover:bg-blue-600">
                                            Start Review
                                        </Button>
                                    </div>
                                </Card>
                            </>
                        )}
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}