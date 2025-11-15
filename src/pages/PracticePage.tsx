import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Target, Zap } from "lucide-react";

export function PracticePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 w-full overflow-auto">
            <main className="max-w-6xl mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <h2 className="text-gray-800 mb-4">Practice Makes Perfect! 💪</h2>
                    <p className="text-gray-600 text-lg">
                        Strengthen your skills with fun practice exercises
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-4">
                            <Clock className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-blue-800 mb-2">Timed Challenge</h3>
                        <p className="text-blue-700 mb-4">
                            Test your speed! Answer as many questions as you can in 60 seconds.
                        </p>
                        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                            Start Challenge
                        </Button>
                    </Card>

                    <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-4">
                            <Target className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-green-800 mb-2">Weak Skills</h3>
                        <p className="text-green-700 mb-4">
                            Practice the topics where you need the most improvement.
                        </p>
                        <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                            Practice Now
                        </Button>
                    </Card>

                    <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-4">
                            <Zap className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-purple-800 mb-2">Lightning Round</h3>
                        <p className="text-purple-700 mb-4">
                            Quick 5-question rounds to keep your skills sharp!
                        </p>
                        <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                            Let's Go!
                        </Button>
                    </Card>
                </div>

                <Card className="p-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200">
                    <div className="flex items-start gap-4">
                        <span className="text-5xl">🎯</span>
                        <div>
                            <h3 className="text-yellow-800 mb-2">Daily Practice Goal</h3>
                            <p className="text-yellow-700 mb-4">
                                Complete 3 practice sessions today to maintain your streak!
                            </p>
                            <div className="flex gap-2">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className={`w-16 h-16 rounded-lg flex items-center justify-center ${i === 1
                                            ? 'bg-green-500 text-white'
                                            : 'bg-white border-2 border-gray-300 text-gray-400'
                                            }`}
                                    >
                                        {i === 1 ? '✓' : i}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>
            </main>
        </div>
    );
}