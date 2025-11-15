import { useState, useEffect, useRef } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Trophy, Zap, RotateCcw } from "lucide-react";

const sentences = [
    "The quick brown fox jumps over the lazy dog",
    "I love learning English every day",
    "Practice makes perfect in language learning",
    "Hello world, how are you doing today?",
    "Reading books helps improve vocabulary skills"
];

interface SpeedTypingGameProps {
    onComplete: () => void;
}

export function SpeedTypingGame({ onComplete }: SpeedTypingGameProps) {
    const [currentSentence, setCurrentSentence] = useState(0);
    const [userInput, setUserInput] = useState("");
    const [startTime, setStartTime] = useState<number | null>(null);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const inputRef = useRef<HTMLInputElement>(null);

    const sentence = sentences[currentSentence];
    const progress = (userInput.length / sentence.length) * 100;

    useEffect(() => {
        if (startTime && !isComplete) {
            const interval = setInterval(() => {
                setTimeElapsed(Date.now() - startTime);
            }, 100);
            return () => clearInterval(interval);
        }
    }, [startTime, isComplete]);

    useEffect(() => {
        if (userInput.length > 0 && !startTime) {
            setStartTime(Date.now());
        }

        if (userInput === sentence) {
            handleSentenceComplete();
        }

        // Calculate accuracy
        let correct = 0;
        for (let i = 0; i < userInput.length; i++) {
            if (userInput[i] === sentence[i]) {
                correct++;
            }
        }
        const acc = userInput.length > 0 ? (correct / userInput.length) * 100 : 100;
        setAccuracy(Math.round(acc));
    }, [userInput, sentence, startTime]);

    const handleSentenceComplete = () => {
        if (startTime) {
            const timeInMinutes = (Date.now() - startTime) / 1000 / 60;
            const words = sentence.split(" ").length;
            const calculatedWpm = Math.round(words / timeInMinutes);
            setWpm(calculatedWpm);
        }

        setTimeout(() => {
            if (currentSentence < sentences.length - 1) {
                setCurrentSentence(prev => prev + 1);
                setUserInput("");
                setStartTime(null);
                setTimeElapsed(0);
                inputRef.current?.focus();
            } else {
                setIsComplete(true);
                onComplete();
            }
        }, 1500);
    };

    const handleReset = () => {
        setCurrentSentence(0);
        setUserInput("");
        setStartTime(null);
        setTimeElapsed(0);
        setIsComplete(false);
        setWpm(0);
        setAccuracy(100);
    };

    const getCharacterColor = (index: number) => {
        if (index >= userInput.length) return "text-gray-400";
        if (userInput[index] === sentence[index]) return "text-green-600";
        return "text-red-600";
    };

    return (
        <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-r from-orange-500 to-red-500 text-white border-none">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-white mb-2">Speed Typing ⚡</h2>
                        <p className="text-white/90">Type the sentence as fast and accurately as you can</p>
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleReset}
                        className="bg-white/20 hover:bg-white/30 border-white/40 text-white"
                    >
                        <RotateCcw className="w-5 h-5" />
                    </Button>
                </div>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="p-4 bg-white">
                    <p className="text-sm text-gray-600 mb-1">Sentence</p>
                    <p className="text-2xl text-gray-800">{currentSentence + 1}/{sentences.length}</p>
                </Card>
                <Card className="p-4 bg-white">
                    <p className="text-sm text-gray-600 mb-1">Time</p>
                    <p className="text-2xl text-gray-800">{(timeElapsed / 1000).toFixed(1)}s</p>
                </Card>
                <Card className="p-4 bg-white">
                    <p className="text-sm text-gray-600 mb-1">WPM</p>
                    <p className="text-2xl text-gray-800">{wpm || "-"}</p>
                </Card>
                <Card className="p-4 bg-white">
                    <p className="text-sm text-gray-600 mb-1">Accuracy</p>
                    <p className="text-2xl text-gray-800">{accuracy}%</p>
                </Card>
            </div>

            {/* Game Area */}
            {!isComplete ? (
                <Card className="p-8 max-w-3xl mx-auto">
                    <div className="space-y-6">
                        {/* Progress */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Progress</span>
                                <span>{userInput.length}/{sentence.length} characters</span>
                            </div>
                            <Progress value={progress} className="h-2" />
                        </div>

                        {/* Target Sentence */}
                        <Card className="p-6 bg-gray-50 border-2 border-gray-200">
                            <p className="text-2xl leading-relaxed text-center font-mono">
                                {sentence.split("").map((char, index) => (
                                    <span key={index} className={getCharacterColor(index)}>
                                        {char}
                                    </span>
                                ))}
                            </p>
                        </Card>

                        {/* Input */}
                        <div className="space-y-2">
                            <Input
                                ref={inputRef}
                                type="text"
                                placeholder="Start typing here..."
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                className="text-xl p-6 font-mono"
                                autoFocus
                            />
                            <p className="text-sm text-gray-500 text-center">
                                💡 Tip: Focus on accuracy over speed!
                            </p>
                        </div>

                        {/* Live Feedback */}
                        {userInput.length > 0 && (
                            <div className="flex gap-2 justify-center flex-wrap">
                                <Badge variant="secondary" className="px-3 py-1">
                                    <Zap className="w-3 h-3 mr-1" />
                                    {wpm || "..."} WPM
                                </Badge>
                                <Badge
                                    className={`px-3 py-1 ${accuracy >= 95 ? "bg-green-500" :
                                            accuracy >= 80 ? "bg-yellow-500" : "bg-red-500"
                                        }`}
                                >
                                    {accuracy}% Accurate
                                </Badge>
                            </div>
                        )}
                    </div>
                </Card>
            ) : (
                <Card className="p-8 bg-gradient-to-r from-green-100 to-blue-100 border-2 border-green-300 max-w-2xl mx-auto">
                    <div className="text-center">
                        <Trophy className="w-20 h-20 mx-auto mb-4 text-yellow-500" />
                        <h3 className="text-green-800 mb-4">Challenge Complete! 🎉</h3>

                        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
                            <Card className="p-4 bg-white">
                                <p className="text-sm text-gray-600 mb-1">Average WPM</p>
                                <p className="text-2xl text-gray-800">{wpm}</p>
                            </Card>
                            <Card className="p-4 bg-white">
                                <p className="text-sm text-gray-600 mb-1">Final Accuracy</p>
                                <p className="text-2xl text-gray-800">{accuracy}%</p>
                            </Card>
                        </div>

                        {wpm >= 40 && accuracy >= 90 && (
                            <Badge className="bg-yellow-500 text-lg px-4 py-2 mb-4">
                                🌟 Excellent Performance!
                            </Badge>
                        )}

                        <Badge className="bg-green-500 text-lg px-4 py-2">
                            +35 XP Earned!
                        </Badge>
                    </div>
                </Card>
            )}
        </div>
    );
}
