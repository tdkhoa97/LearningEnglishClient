import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Trophy, Volume2, ArrowRight } from "lucide-react";

interface Question {
    id: number;
    audio: string;
    question: string;
    options: string[];
    correctAnswer: number;
}

const questions: Question[] = [
    {
        id: 1,
        audio: "How are you today?",
        question: "What did you hear?",
        options: [
            "How are you today?",
            "Where are you today?",
            "Who are you today?",
            "When are you today?"
        ],
        correctAnswer: 0
    },
    {
        id: 2,
        audio: "I like to read books",
        question: "What did you hear?",
        options: [
            "I like to read books",
            "I like to eat food",
            "I like to meet friends",
            "I like to read blogs"
        ],
        correctAnswer: 0
    },
    {
        id: 3,
        audio: "The weather is beautiful",
        question: "What did you hear?",
        options: [
            "The weather is wonderful",
            "The weather is beautiful",
            "The feather is beautiful",
            "The leather is beautiful"
        ],
        correctAnswer: 1
    },
    {
        id: 4,
        audio: "I go to school every day",
        question: "What did you hear?",
        options: [
            "I go to school every week",
            "I go to school every night",
            "I go to school every day",
            "I go to school every way"
        ],
        correctAnswer: 2
    },
];

interface ListeningQuizGameProps {
    onComplete: () => void;
}

export function ListeningQuizGame({ onComplete }: ListeningQuizGameProps) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const question = questions[currentQuestion];
    const isCorrect = selectedAnswer === question.correctAnswer;

    const playAudio = () => {
        setIsPlaying(true);
        // Mock audio playback - in real app, use Web Speech API or audio files
        const utterance = new SpeechSynthesisUtterance(question.audio);
        utterance.lang = "en-US";
        utterance.rate = 0.8;
        utterance.onend = () => setIsPlaying(false);
        window.speechSynthesis.speak(utterance);
    };

    const handleSelectAnswer = (index: number) => {
        setSelectedAnswer(index);
    };

    const handleSubmit = () => {
        setShowFeedback(true);
        if (isCorrect) {
            setScore(prev => prev + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedAnswer(null);
            setShowFeedback(false);
        } else {
            onComplete();
        }
    };

    return (
        <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-none">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-white mb-2">Listening Challenge 🎧</h2>
                        <p className="text-white/90">Listen carefully and choose the correct answer</p>
                    </div>
                </div>
            </Card>

            {/* Progress */}
            <div className="flex gap-4 justify-center">
                <Card className="p-4 bg-white">
                    <p className="text-sm text-gray-600 mb-1">Question</p>
                    <p className="text-2xl text-gray-800">{currentQuestion + 1}/{questions.length}</p>
                </Card>
                <Card className="p-4 bg-white">
                    <p className="text-sm text-gray-600 mb-1">Score</p>
                    <p className="text-2xl text-gray-800">{score}/{questions.length}</p>
                </Card>
            </div>

            {/* Game Area */}
            {currentQuestion < questions.length ? (
                <Card className="p-8 max-w-2xl mx-auto">
                    <div className="space-y-6">
                        {/* Audio Player */}
                        <div className="text-center space-y-4">
                            <p className="text-gray-700 mb-4">{question.question}</p>

                            <Button
                                size="lg"
                                onClick={playAudio}
                                disabled={isPlaying}
                                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-8 py-6 text-lg"
                            >
                                <Volume2 className="w-6 h-6 mr-3" />
                                {isPlaying ? "Playing..." : "Play Audio"}
                            </Button>

                            <p className="text-sm text-gray-500">
                                Click to listen (you can replay as many times as you want)
                            </p>
                        </div>

                        {/* Options */}
                        <div className="space-y-3">
                            {question.options.map((option, index) => (
                                <Button
                                    key={index}
                                    variant="outline"
                                    onClick={() => handleSelectAnswer(index)}
                                    disabled={showFeedback}
                                    className={`w-full p-6 text-left justify-start text-base transition-all ${selectedAnswer === index
                                            ? showFeedback
                                                ? isCorrect && index === question.correctAnswer
                                                    ? "bg-green-100 border-green-500 border-2"
                                                    : index === selectedAnswer
                                                        ? "bg-red-100 border-red-500 border-2"
                                                        : ""
                                                : "bg-blue-100 border-blue-500 border-2"
                                            : showFeedback && index === question.correctAnswer
                                                ? "bg-green-100 border-green-500 border-2"
                                                : ""
                                        }`}
                                >
                                    <span className="flex items-center gap-3">
                                        <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                            {String.fromCharCode(65 + index)}
                                        </span>
                                        <span className="flex-1">{option}</span>
                                        {showFeedback && index === question.correctAnswer && (
                                            <span className="text-green-600">✓</span>
                                        )}
                                        {showFeedback && index === selectedAnswer && !isCorrect && (
                                            <span className="text-red-600">✗</span>
                                        )}
                                    </span>
                                </Button>
                            ))}
                        </div>

                        {/* Feedback */}
                        {showFeedback && (
                            <div className="text-center">
                                {isCorrect ? (
                                    <Badge className="bg-green-500 text-lg px-4 py-2">
                                        ✓ Correct! Great job! 🎉
                                    </Badge>
                                ) : (
                                    <Badge className="bg-red-500 text-lg px-4 py-2">
                                        ✗ Not quite. The correct answer was "{question.options[question.correctAnswer]}"
                                    </Badge>
                                )}
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-4 justify-center pt-4">
                            {!showFeedback ? (
                                <Button
                                    onClick={handleSubmit}
                                    disabled={selectedAnswer === null}
                                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8"
                                >
                                    Submit Answer
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleNext}
                                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-8"
                                >
                                    {currentQuestion < questions.length - 1 ? "Next Question" : "Finish"}
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            )}
                        </div>
                    </div>
                </Card>
            ) : (
                <Card className="p-8 bg-gradient-to-r from-green-100 to-blue-100 border-2 border-green-300 max-w-2xl mx-auto">
                    <div className="text-center">
                        <Trophy className="w-20 h-20 mx-auto mb-4 text-yellow-500" />
                        <h3 className="text-green-800 mb-2">Challenge Complete! 🎉</h3>
                        <p className="text-green-700 mb-4">
                            You got {score} out of {questions.length} questions correct!
                        </p>
                        <p className="text-green-700 mb-4">
                            Accuracy: {Math.round((score / questions.length) * 100)}%
                        </p>
                        <Badge className="bg-green-500 text-lg px-4 py-2">
                            +50 XP Earned!
                        </Badge>
                    </div>
                </Card>
            )}
        </div>
    );
}
