import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Trophy, RotateCcw } from "lucide-react";

interface MemoryCard {
    id: number;
    content: string;
    type: "english" | "vietnamese";
    pairId: number;
    isFlipped: boolean;
    isMatched: boolean;
}

const wordPairs = [
    { english: "Hello", vietnamese: "Xin chào" },
    { english: "Thank you", vietnamese: "Cảm ơn" },
    { english: "Goodbye", vietnamese: "Tạm biệt" },
    { english: "Please", vietnamese: "Làm ơn" },
    { english: "Yes", vietnamese: "Có" },
    { english: "No", vietnamese: "Không" },
];

interface MemoryCardGameProps {
    onComplete: () => void;
}

export function MemoryCardGame({ onComplete }: MemoryCardGameProps) {
    const [cards, setCards] = useState<MemoryCard[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [matchedPairs, setMatchedPairs] = useState(0);
    const [isChecking, setIsChecking] = useState(false);

    useEffect(() => {
        initializeGame();
    }, []);

    const initializeGame = () => {
        const gameCards: MemoryCard[] = [];
        wordPairs.forEach((pair, pairId) => {
            gameCards.push({
                id: pairId * 2,
                content: pair.english,
                type: "english",
                pairId,
                isFlipped: false,
                isMatched: false
            });
            gameCards.push({
                id: pairId * 2 + 1,
                content: pair.vietnamese,
                type: "vietnamese",
                pairId,
                isFlipped: false,
                isMatched: false
            });
        });

        // Shuffle cards
        const shuffled = gameCards.sort(() => Math.random() - 0.5);
        setCards(shuffled);
        setFlippedCards([]);
        setMoves(0);
        setMatchedPairs(0);
    };

    const handleCardClick = (cardId: number) => {
        if (isChecking) return;
        if (flippedCards.length >= 2) return;
        if (flippedCards.includes(cardId)) return;
        if (cards.find(c => c.id === cardId)?.isMatched) return;

        const newFlippedCards = [...flippedCards, cardId];
        setFlippedCards(newFlippedCards);

        setCards(prev => prev.map(card =>
            card.id === cardId ? { ...card, isFlipped: true } : card
        ));

        if (newFlippedCards.length === 2) {
            setIsChecking(true);
            setMoves(prev => prev + 1);

            setTimeout(() => {
                checkMatch(newFlippedCards);
            }, 800);
        }
    };

    const checkMatch = (flippedCardIds: number[]) => {
        const [firstId, secondId] = flippedCardIds;
        const firstCard = cards.find(c => c.id === firstId);
        const secondCard = cards.find(c => c.id === secondId);

        if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
            // Match!
            setCards(prev => prev.map(card =>
                card.pairId === firstCard.pairId
                    ? { ...card, isMatched: true, isFlipped: true }
                    : card
            ));
            setMatchedPairs(prev => prev + 1);

            // Check if game is complete
            if (matchedPairs + 1 === wordPairs.length) {
                setTimeout(() => {
                    onComplete();
                }, 1000);
            }
        } else {
            // No match - flip back
            setCards(prev => prev.map(card =>
                flippedCardIds.includes(card.id) && !card.isMatched
                    ? { ...card, isFlipped: false }
                    : card
            ));
        }

        setFlippedCards([]);
        setIsChecking(false);
    };

    return (
        <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-white mb-2">Memory Match 🎴</h2>
                        <p className="text-white/90">Match English words with Vietnamese translations</p>
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={initializeGame}
                        className="bg-white/20 hover:bg-white/30 border-white/40 text-white"
                    >
                        <RotateCcw className="w-5 h-5" />
                    </Button>
                </div>
            </Card>

            {/* Stats */}
            <div className="flex gap-4 justify-center">
                <Card className="p-4 bg-white">
                    <p className="text-sm text-gray-600 mb-1">Moves</p>
                    <p className="text-2xl text-gray-800">{moves}</p>
                </Card>
                <Card className="p-4 bg-white">
                    <p className="text-sm text-gray-600 mb-1">Matched</p>
                    <p className="text-2xl text-gray-800">{matchedPairs}/{wordPairs.length}</p>
                </Card>
            </div>

            {/* Game Board */}
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        onClick={() => handleCardClick(card.id)}
                        className={`aspect-square p-4 cursor-pointer transition-all duration-300 transform ${card.isFlipped || card.isMatched
                                ? "bg-gradient-to-br from-blue-400 to-purple-500 text-white scale-105"
                                : "bg-gradient-to-br from-gray-200 to-gray-300 hover:scale-105 hover:shadow-lg"
                            } ${card.isMatched ? "opacity-70 border-4 border-green-400" : ""}`}
                    >
                        <div className="h-full flex items-center justify-center">
                            {card.isFlipped || card.isMatched ? (
                                <div className="text-center">
                                    <p className={`${card.type === "english" ? "text-lg" : "text-base"} break-words`}>
                                        {card.content}
                                    </p>
                                    {card.isMatched && (
                                        <p className="mt-2 text-2xl">✓</p>
                                    )}
                                </div>
                            ) : (
                                <p className="text-4xl">?</p>
                            )}
                        </div>
                    </Card>
                ))}
            </div>

            {/* Completion */}
            {matchedPairs === wordPairs.length && (
                <Card className="p-6 bg-gradient-to-r from-green-100 to-blue-100 border-2 border-green-300">
                    <div className="text-center">
                        <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
                        <h3 className="text-green-800 mb-2">Congratulations! 🎉</h3>
                        <p className="text-green-700 mb-4">
                            You completed the game in {moves} moves!
                        </p>
                        <Badge className="bg-green-500">
                            +30 XP Earned!
                        </Badge>
                    </div>
                </Card>
            )}
        </div>
    );
}
