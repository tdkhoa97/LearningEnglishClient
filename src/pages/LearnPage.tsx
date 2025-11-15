import { useState } from "react";
import { LessonCard } from "@/components/LessonCard";
import { ExerciseQuiz } from "@/components/ExerciseQuiz";
import { CompletionModal } from "@/components/CompletionModal";
import { Mascot } from "@/components/Mascot";
import { Badge } from "@/components/ui/badge";
import { Card } from '@/components/ui/card'

interface Lesson {
    id: number;
    title: string;
    description: string;
    icon: string;
    completed: boolean;
    locked: boolean;
    stars: number;
}

const mockLessons: Lesson[] = [
    { id: 1, title: "Greetings", description: "Learn basic greetings", icon: "👋", completed: true, locked: false, stars: 3 },
    { id: 2, title: "Colors", description: "Name all the colors", icon: "🎨", completed: true, locked: false, stars: 2 },
    { id: 3, title: "Animals", description: "Meet our furry friends", icon: "🐶", completed: false, locked: false, stars: 0 },
    { id: 4, title: "Numbers", description: "Count from 1 to 100", icon: "🔢", completed: false, locked: false, stars: 0 },
    { id: 5, title: "Food", description: "Delicious vocabulary", icon: "🍕", completed: false, locked: true, stars: 0 },
    { id: 6, title: "Family", description: "Talk about your family", icon: "👨‍👩‍👧‍👦", completed: false, locked: true, stars: 0 },
    { id: 7, title: "Weather", description: "Sunny or rainy?", icon: "⛅", completed: false, locked: true, stars: 0 },
    { id: 8, title: "School", description: "Classroom essentials", icon: "📚", completed: false, locked: true, stars: 0 },
    { id: 9, title: "Sports", description: "Let's play!", icon: "⚽", completed: false, locked: true, stars: 0 },
];

const mockQuestions = [
    {
        id: 1,
        type: "multiple-choice" as const,
        question: "How do you say 'Hello' in English?",
        options: ["Goodbye", "Hello", "Thank you", "Please"],
        correctAnswer: "Hello",
        image: "👋"
    },
    {
        id: 2,
        type: "multiple-choice" as const,
        question: "Which one is a DOG?",
        options: ["Cat 🐱", "Dog 🐶", "Bird 🐦", "Fish 🐠"],
        correctAnswer: "Dog 🐶",
    },
    {
        id: 3,
        type: "multiple-choice" as const,
        question: "What color is the sky?",
        options: ["Red", "Blue", "Green", "Yellow"],
        correctAnswer: "Blue",
        image: "☁️"
    },
    {
        id: 4,
        type: "multiple-choice" as const,
        question: "Select 'Good morning'",
        options: ["Good night", "Good morning", "Good afternoon", "Good evening"],
        correctAnswer: "Good morning",
    },
    {
        id: 5,
        type: "multiple-choice" as const,
        question: "Which is correct?",
        options: ["I am happy 😊", "I is happy", "I are happy", "Happy I am"],
        correctAnswer: "I am happy 😊",
    },
];

interface LearnPageProps {
    streak?: number;
    xp?: number;
    onXpChange?: (newXp: number) => void;
}

export function LearnPage({ streak, xp, onXpChange }: LearnPageProps) {
    const [lessons, setLessons] = useState(mockLessons);
    const [activeLesson, setActiveLesson] = useState<number | null>(null);
    const [showCompletion, setShowCompletion] = useState(false);
    const [completionStars, setCompletionStars] = useState(0);
    const [showMascotMessage, setShowMascotMessage] = useState(true);

    const handleLessonClick = (lessonId: number) => {
        setActiveLesson(lessonId);
        setShowMascotMessage(false);
    };

    const handleQuizComplete = (stars: number) => {
        setCompletionStars(stars);
        setShowCompletion(true);

        // Update lesson progress
        setLessons(lessons.map(lesson =>
            lesson.id === activeLesson
                ? { ...lesson, completed: true, stars: Math.max(lesson.stars, stars) }
                : lesson
        ));

        // Add XP
        const xpEarned = stars * 10;
        onXpChange(xp + xpEarned);

        // Unlock next lesson
        const currentIndex = lessons.findIndex(l => l.id === activeLesson);
        if (currentIndex < lessons.length - 1) {
            setLessons(lessons.map((lesson, index) =>
                index === currentIndex + 1 ? { ...lesson, locked: false } : lesson
            ));
        }
    };

    const handleContinue = () => {
        setShowCompletion(false);
        setActiveLesson(null);
        setShowMascotMessage(true);
    };

    const currentLesson = lessons.find(l => l.id === activeLesson);

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 w-full overflow-auto">
            <main className="max-w-6xl mx-auto px-4 py-8">
                {/* Stats Section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <Card className="p-4 bg-white">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                <span className="text-2xl">⚡</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Current Streak</p>
                                <p className="text-orange-600">{streak} days</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-4 bg-white">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-2xl">📊</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total XP</p>
                                <p className="text-blue-600">{xp} points</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-4 bg-white">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-2xl">🏆</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Lessons Done</p>
                                <p className="text-green-600">{lessons.filter(l => l.completed).length}/{lessons.length}</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Learning Path */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-gray-800">Your Learning Path</h2>
                        <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                            Beginner Level
                        </Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {lessons.map((lesson) => (
                            <LessonCard
                                key={lesson.id}
                                title={lesson.title}
                                description={lesson.description}
                                icon={lesson.icon}
                                completed={lesson.completed}
                                locked={lesson.locked}
                                stars={lesson.stars}
                                onClick={() => handleLessonClick(lesson.id)}
                            />
                        ))}
                    </div>
                </div>

                {/* Fun Facts Section */}
                <Card className="p-6 bg-gradient-to-r from-pink-100 to-yellow-100 border-2 border-pink-200">
                    <div className="flex items-start gap-4">
                        <span className="text-4xl">💡</span>
                        <div>
                            <h3 className="text-pink-800 mb-2">Did you know?</h3>
                            <p className="text-pink-700">
                                Learning just 15 minutes a day can help you master a new language!
                                Keep your streak going and watch your progress soar! 🚀
                            </p>
                        </div>
                    </div>
                </Card>
            </main>

            {/* Active Quiz */}
            {activeLesson && currentLesson && !showCompletion && (
                <ExerciseQuiz
                    lessonTitle={currentLesson.title}
                    questions={mockQuestions}
                    onComplete={handleQuizComplete}
                    onClose={() => setActiveLesson(null)}
                />
            )}

            {/* Completion Modal */}
            {showCompletion && (
                <CompletionModal
                    stars={completionStars}
                    xpEarned={completionStars * 10}
                    onContinue={handleContinue}
                />
            )}

            {/* Mascot */}
            <Mascot
                message="Hey there! Click on a lesson to start learning! 🎯"
                showMessage={showMascotMessage}
            />
        </div>
    );
}