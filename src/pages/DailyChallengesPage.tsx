import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    Trophy,
    Zap,
    Target,
    Flame,
    Star,
    Gift,
    Clock,
    Brain,
    Headphones,
    Shuffle
} from "lucide-react";
import { MemoryCardGame } from "@/components/games/MemoryCardGame";
import { WordScrambleGame } from "@/components/games/WordScrambleGame";
import { ListeningQuizGame } from "@/components/games/ListeningQuizGame";
import { SpeedTypingGame } from "@/components/games/SpeedTypingGame";

interface DailyChallenge {
    id: string;
    title: string;
    description: string;
    icon: string;
    xpReward: number;
    completed: boolean;
    difficulty: "easy" | "medium" | "hard";
    type: "memory" | "scramble" | "listening" | "typing";
}

const dailyChallenges: DailyChallenge[] = [
    {
        id: "memory-match",
        title: "Memory Match",
        description: "Match English words with Vietnamese translations",
        icon: "🎴",
        xpReward: 30,
        completed: false,
        difficulty: "easy",
        type: "memory"
    },
    {
        id: "word-scramble",
        title: "Word Scramble",
        description: "Unscramble the letters to form English words",
        icon: "🔤",
        xpReward: 40,
        completed: false,
        difficulty: "medium",
        type: "scramble"
    },
    {
        id: "listening-quiz",
        title: "Listening Challenge",
        description: "Listen and choose the correct answer",
        icon: "🎧",
        xpReward: 50,
        completed: false,
        difficulty: "hard",
        type: "listening"
    },
    {
        id: "speed-typing",
        title: "Speed Typing",
        description: "Type the English sentence as fast as you can",
        icon: "⚡",
        xpReward: 35,
        completed: false,
        difficulty: "medium",
        type: "typing"
    }
];

interface DailyChallengesPageProps {
    onXpEarned?: (xp: number) => void;
}

export function DailyChallengesPage({ onXpEarned }: DailyChallengesPageProps) {
    const [challenges, setChallenges] = useState(dailyChallenges);
    const [selectedGame, setSelectedGame] = useState<string | null>(null);
    const [mascotMood, setMascotMood] = useState<"happy" | "excited" | "thinking">("happy");

    const completedCount = challenges.filter(c => c.completed).length;
    const totalXp = challenges.reduce((sum, c) => sum + (c.completed ? c.xpReward : 0), 0);
    const progressPercent = (completedCount / challenges.length) * 100;

    const handleChallengeComplete = (challengeId: string) => {
        setChallenges(prev => prev.map(c =>
            c.id === challengeId ? { ...c, completed: true } : c
        ));
        const challenge = challenges.find(c => c.id === challengeId);
        if (challenge) {
            onXpEarned(challenge.xpReward);
            setMascotMood("excited");
            setTimeout(() => setMascotMood("happy"), 2000);
        }
        setSelectedGame(null);
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "easy": return "bg-green-100 text-green-700 border-green-300";
            case "medium": return "bg-yellow-100 text-yellow-700 border-yellow-300";
            case "hard": return "bg-red-100 text-red-700 border-red-300";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    const getDifficultyIcon = (difficulty: string) => {
        switch (difficulty) {
            case "easy": return "⭐";
            case "medium": return "⭐⭐";
            case "hard": return "⭐⭐⭐";
            default: return "⭐";
        }
    };

    if (selectedGame) {
        const challenge = challenges.find(c => c.id === selectedGame);
        if (!challenge) return null;

        return (
            <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
                <main className="max-w-6xl mx-auto px-4 py-8">
                    <Button
                        variant="outline"
                        onClick={() => setSelectedGame(null)}
                        className="mb-6"
                    >
                        ← Back to Challenges
                    </Button>

                    {challenge.type === "memory" && (
                        <MemoryCardGame onComplete={() => handleChallengeComplete(selectedGame)} />
                    )}
                    {challenge.type === "scramble" && (
                        <WordScrambleGame onComplete={() => handleChallengeComplete(selectedGame)} />
                    )}
                    {challenge.type === "listening" && (
                        <ListeningQuizGame onComplete={() => handleChallengeComplete(selectedGame)} />
                    )}
                    {challenge.type === "typing" && (
                        <SpeedTypingGame onComplete={() => handleChallengeComplete(selectedGame)} />
                    )}
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 w-full overflow-auto">
            <main className="max-w-6xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="text-6xl animate-bounce">
                            {mascotMood === "excited" ? "🦉✨" : mascotMood === "thinking" ? "🦉🤔" : "🦉"}
                        </div>
                    </div>
                    <h2 className="text-gray-800 mb-2">Daily Challenges 🎯</h2>
                    <p className="text-gray-600">
                        Complete fun mini-games to earn bonus XP!
                    </p>
                </div>

                {/* Progress Overview */}
                <Card className="p-6 mb-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex-1">
                            <h3 className="text-white mb-2">Today's Progress</h3>
                            <div className="flex items-center gap-3 mb-3">
                                <Progress value={progressPercent} className="flex-1 h-3 bg-white/20" />
                                <span className="text-sm">{completedCount}/{challenges.length}</span>
                            </div>
                            <p className="text-white/90 text-sm">
                                {completedCount === challenges.length
                                    ? "🎉 All challenges completed! Amazing work!"
                                    : `${challenges.length - completedCount} challenges remaining`}
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <Card className="p-4 bg-white/10 backdrop-blur border-white/20">
                                <div className="text-center">
                                    <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                                    <p className="text-2xl mb-1">{completedCount}</p>
                                    <p className="text-xs text-white/80">Completed</p>
                                </div>
                            </Card>

                            <Card className="p-4 bg-white/10 backdrop-blur border-white/20">
                                <div className="text-center">
                                    <Zap className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                                    <p className="text-2xl mb-1">{totalXp}</p>
                                    <p className="text-xs text-white/80">XP Earned</p>
                                </div>
                            </Card>
                        </div>
                    </div>
                </Card>

                {/* Challenges Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {challenges.map((challenge) => (
                        <Card
                            key={challenge.id}
                            className={`p-6 relative overflow-hidden transition-all hover:shadow-xl ${challenge.completed
                                ? "bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-300"
                                : "bg-white hover:scale-105"
                                }`}
                        >
                            {challenge.completed && (
                                <div className="absolute top-4 right-4">
                                    <Badge className="bg-green-500">
                                        ✓ Completed
                                    </Badge>
                                </div>
                            )}

                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                                    {challenge.icon}
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-gray-800">{challenge.title}</h3>
                                    </div>

                                    <p className="text-gray-600 text-sm mb-3">
                                        {challenge.description}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Badge className={`${getDifficultyColor(challenge.difficulty)} border`}>
                                                {getDifficultyIcon(challenge.difficulty)} {challenge.difficulty}
                                            </Badge>
                                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                                +{challenge.xpReward} XP
                                            </Badge>
                                        </div>

                                        {!challenge.completed && (
                                            <Button
                                                onClick={() => setSelectedGame(challenge.id)}
                                                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                                            >
                                                Play
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Bonus Rewards */}
                <Card className="p-6 bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300">
                    <div className="flex items-start gap-4">
                        <Gift className="w-10 h-10 text-orange-600 flex-shrink-0" />
                        <div>
                            <h3 className="text-orange-800 mb-2">Complete All Challenges!</h3>
                            <p className="text-orange-700 mb-3">
                                Finish all 4 challenges today to unlock a special bonus reward! 🎁
                            </p>
                            {completedCount === challenges.length ? (
                                <Badge className="bg-orange-500 text-white">
                                    🎉 Bonus Unlocked: +50 XP!
                                </Badge>
                            ) : (
                                <Badge variant="secondary">
                                    {completedCount}/{challenges.length} completed
                                </Badge>
                            )}
                        </div>
                    </div>
                </Card>

                {/* Tips */}
                <div className="mt-8 grid md:grid-cols-3 gap-4">
                    <Card className="p-4 bg-blue-50 border-blue-200">
                        <div className="flex items-center gap-3 mb-2">
                            <Brain className="w-6 h-6 text-blue-500" />
                            <h4 className="text-blue-800">Brain Boost</h4>
                        </div>
                        <p className="text-sm text-blue-700">
                            Mini-games improve memory and vocabulary retention!
                        </p>
                    </Card>

                    <Card className="p-4 bg-purple-50 border-purple-200">
                        <div className="flex items-center gap-3 mb-2">
                            <Clock className="w-6 h-6 text-purple-500" />
                            <h4 className="text-purple-800">Daily Reset</h4>
                        </div>
                        <p className="text-sm text-purple-700">
                            New challenges every day at midnight!
                        </p>
                    </Card>

                    <Card className="p-4 bg-pink-50 border-pink-200">
                        <div className="flex items-center gap-3 mb-2">
                            <Star className="w-6 h-6 text-pink-500" />
                            <h4 className="text-pink-800">Streak Bonus</h4>
                        </div>
                        <p className="text-sm text-pink-700">
                            Complete challenges 7 days in a row for extra rewards!
                        </p>
                    </Card>
                </div>
            </main>
        </div>
    );
}