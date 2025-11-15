import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Trophy, Shuffle, ArrowRight } from "lucide-react";

const words = [
    { word: "HELLO", hint: "A greeting" },
    { word: "FRIEND", hint: "A person you like" },
    { word: "SCHOOL", hint: "A place to learn" },
    { word: "ENGLISH", hint: "The language you're learning" },
    { word: "TEACHER", hint: "A person who helps you learn" },
];

interface WordScrambleGameProps {
    onComplete: () => void;
}

export function WordScrambleGame({ onComplete }: WordScrambleGameProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [scrambledWord, setScrambledWord] = useState("");
    const [userAnswer, setUserAnswer] = useState("");
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
    const [attempts, setAttempts] = useState(0);

    const currentWord = words[currentIndex];

    useEffect(() => {
        scrambleWord(currentWord.word);
    }, [currentIndex]);

    const scrambleWord = (word: string) => {
        const letters = word.split("");
        for (let i = letters.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [letters[i], letters[j]] = [letters[j], letters[i]];
        }
        setScrambledWord(letters.join(""));
    };

    const handleSubmit = () => {
        setAttempts(prev => prev + 1);

        if (userAnswer.toUpperCase() === currentWord.word) {
            setFeedback("correct");
            setScore(prev => prev + 1);

            setTimeout(() => {
                if (currentIndex < words.length - 1) {
                    setCurrentIndex(prev => prev + 1);
                    setUserAnswer("");
                    setFeedback(null);
                } else {
                    onComplete();
                }
            }, 1500);
        } else {
            setFeedback("incorrect");
            setTimeout(() => setFeedback(null), 1000);
        }
    };

    const handleSkip = () => {
        if (currentIndex < words.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setUserAnswer("");
            setFeedback(null);
        }
    };

    const handleReshuffle = () => {
        scrambleWord(currentWord.word);
    };

    return (
        <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-none">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-white mb-2">Word Scramble 🔤</h2>
                        <p className="text-white/90">Unscramble the letters to form English words</p>
                    </div>
                </div>
            </Card>

            {/* Progress */}
            <div className="flex gap-4 justify-center">
                <Card className="p-4 bg-white">
                    <p className="text-sm text-gray-600 mb-1">Progress</p>
                    <p className="text-2xl text-gray-800">{currentIndex + 1}/{words.length}</p>
                </Card>
                <Card className="p-4 bg-white">
                    <p className="text-sm text-gray-600 mb-1">Score</p>
                    <p className="text-2xl text-gray-800">{score}/{words.length}</p>
                </Card>
                <Card className="p-4 bg-white">
                    <p className="text-sm text-gray-600 mb-1">Attempts</p>
                    <p className="text-2xl text-gray-800">{attempts}</p>
                </Card>
            </div>

            {/* Game Area */}
            {currentIndex < words.length ? (
                <Card className="p-8 max-w-2xl mx-auto">
                    <div className="text-center space-y-6">
                        {/* Hint */}
                        <Badge variant="secondary" className="text-lg px-4 py-2">
                            💡 Hint: {currentWord.hint}
                        </Badge>

                        {/* Scrambled Word */}
                        <div className="flex justify-center gap-2 flex-wrap">
                            {scrambledWord.split("").map((letter, index) => (
                                <Card
                                    key={index}
                                    className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-purple-400 to-pink-500 text-white border-none"
                                >
                                    <span className="text-2xl">{letter}</span>
                                </Card>
                            ))}
                        </div>

                        {/* Reshuffle Button */}
                        <Button
                            variant="outline"
                            onClick={handleReshuffle}
                            className="mb-4"
                        >
                            <Shuffle className="w-4 h-4 mr-2" />
                            Reshuffle
                        </Button>

                        {/* Input */}
                        <div className="space-y-4">
                            <Input
                                type="text"
                                placeholder="Type your answer..."
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                                className="text-center text-xl p-6"
                                disabled={feedback === "correct"}
                            />

                            {/* Feedback */}
                            {feedback === "correct" && (
                                <Badge className="bg-green-500 text-lg px-4 py-2">
                                    ✓ Correct! Well done! 🎉
                                </Badge>
                            )}
                            {feedback === "incorrect" && (
                                <Badge className="bg-red-500 text-lg px-4 py-2">
                                    ✗ Try again!
                                </Badge>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 justify-center">
                            <Button
                                onClick={handleSubmit}
                                disabled={!userAnswer || feedback === "correct"}
                                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                            >
                                Submit
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                            <Button
                                variant="outline"
                                onClick={handleSkip}
                                disabled={feedback === "correct"}
                            >
                                Skip
                            </Button>
                        </div>
                    </div>
                </Card>
            ) : (
                <Card className="p-8 bg-gradient-to-r from-green-100 to-blue-100 border-2 border-green-300 max-w-2xl mx-auto">
                    <div className="text-center">
                        <Trophy className="w-20 h-20 mx-auto mb-4 text-yellow-500" />
                        <h3 className="text-green-800 mb-2">Challenge Complete! 🎉</h3>
                        <p className="text-green-700 mb-4">
                            You got {score} out of {words.length} words correct!
                        </p>
                        <p className="text-green-700 mb-4">
                            Total attempts: {attempts}
                        </p>
                        <Badge className="bg-green-500 text-lg px-4 py-2">
                            +40 XP Earned!
                        </Badge>
                    </div>
                </Card>
            )}
        </div>
    );
}
