import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, Volume2 } from "lucide-react";

interface Question {
    id: number;
    type: "multiple-choice" | "fill-blank" | "translate";
    question: string;
    options?: string[];
    correctAnswer: string;
    image?: string;
}

interface ExerciseQuizProps {
    lessonTitle: string;
    questions: Question[];
    onComplete: (score: number) => void;
    onClose: () => void;
}

export function ExerciseQuiz({ lessonTitle, questions, onComplete, onClose }: ExerciseQuizProps) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string>("");
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [score, setScore] = useState(0);

    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    const handleAnswer = () => {
        const correct = selectedAnswer === question.correctAnswer;
        setIsCorrect(correct);
        setShowResult(true);
        if (correct) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer("");
            setShowResult(false);
            setIsCorrect(false);
        } else {
            onComplete(Math.round((score / questions.length) * 3));
        }
    };

    const playAudio = () => {
        // Mock audio playback
        console.log("Playing audio:", question.question);
    };

    return (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
            <div className="max-w-2xl mx-auto px-4 py-6">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <Button variant="ghost" onClick={onClose}>✕</Button>
                        <span className="text-sm text-gray-600">
                            Question {currentQuestion + 1} of {questions.length}
                        </span>
                    </div>
                    <Progress value={progress} className="h-3" />
                </div>

                {/* Question */}
                <div className="mb-8">
                    <h2 className="text-gray-800 mb-6">{lessonTitle}</h2>

                    <div className="flex items-center gap-4 mb-6">
                        <h3 className="text-gray-900">{question.question}</h3>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={playAudio}
                            className="text-blue-500 hover:text-blue-600"
                        >
                            <Volume2 className="w-6 h-6" />
                        </Button>
                    </div>

                    {question.image && (
                        <div className="mb-6 flex justify-center">
                            <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center text-6xl">
                                {question.image}
                            </div>
                        </div>
                    )}

                    {/* Options */}
                    <div className="space-y-3">
                        {question.options?.map((option) => (
                            <button
                                key={option}
                                onClick={() => !showResult && setSelectedAnswer(option)}
                                disabled={showResult}
                                className={`
                  w-full p-4 rounded-xl border-2 text-left transition-all
                  ${selectedAnswer === option
                                        ? showResult
                                            ? isCorrect
                                                ? 'border-green-500 bg-green-50'
                                                : 'border-red-500 bg-red-50'
                                            : 'border-blue-500 bg-blue-50'
                                        : 'border-gray-300 hover:border-gray-400 bg-white'
                                    }
                  ${showResult && option === question.correctAnswer ? 'border-green-500 bg-green-50' : ''}
                `}
                            >
                                <div className="flex items-center justify-between">
                                    <span>{option}</span>
                                    {showResult && selectedAnswer === option && (
                                        isCorrect ? (
                                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                                        ) : (
                                            <XCircle className="w-6 h-6 text-red-500" />
                                        )
                                    )}
                                    {showResult && option === question.correctAnswer && selectedAnswer !== option && (
                                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Feedback */}
                {showResult && (
                    <Card className={`p-4 mb-4 ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                        <div className="flex items-center gap-3">
                            {isCorrect ? (
                                <>
                                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                                    <div>
                                        <p className="text-green-800">Excellent! 🎉</p>
                                        <p className="text-sm text-green-700">You got it right!</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <XCircle className="w-6 h-6 text-red-600" />
                                    <div>
                                        <p className="text-red-800">Not quite!</p>
                                        <p className="text-sm text-red-700">The correct answer was: {question.correctAnswer}</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </Card>
                )}

                {/* Action Button */}
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
                    <div className="max-w-2xl mx-auto">
                        {!showResult ? (
                            <Button
                                onClick={handleAnswer}
                                disabled={!selectedAnswer}
                                className="w-full h-14 bg-green-500 hover:bg-green-600 text-white rounded-xl"
                                size="lg"
                            >
                                CHECK
                            </Button>
                        ) : (
                            <Button
                                onClick={handleNext}
                                className="w-full h-14 bg-green-500 hover:bg-green-600 text-white rounded-xl"
                                size="lg"
                            >
                                {currentQuestion < questions.length - 1 ? 'CONTINUE' : 'FINISH'}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
