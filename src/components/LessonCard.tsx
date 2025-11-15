import { Lock, Star, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LessonCardProps {
    title: string;
    description: string;
    icon: string;
    completed: boolean;
    locked: boolean;
    stars: number;
    onClick: () => void;
}

export function LessonCard({
    title,
    description,
    icon,
    completed,
    locked,
    stars,
    onClick
}: LessonCardProps) {
    return (
        <div className="relative">
            <Button
                onClick={onClick}
                disabled={locked}
                className={`
          w-full h-32 rounded-2xl border-4 relative overflow-hidden
          ${locked ? 'bg-gray-200 border-gray-300 cursor-not-allowed' :
                        completed ? 'bg-green-500 border-green-600 hover:bg-green-600' :
                            'bg-gradient-to-br from-blue-400 to-blue-600 border-blue-700 hover:from-blue-500 hover:to-blue-700'}
          transition-all duration-200 shadow-lg hover:shadow-xl
        `}
            >
                <div className="flex flex-col items-center justify-center gap-2">
                    <div className="text-4xl">{icon}</div>
                    <div className="text-white">{title}</div>
                    {locked && <Lock className="w-5 h-5 text-gray-500 absolute bottom-2" />}
                    {completed && (
                        <div className="flex gap-1 absolute bottom-2">
                            {[...Array(3)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < stars ? 'fill-yellow-400 text-yellow-400' : 'text-white opacity-50'}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </Button>
            {completed && (
                <div className="absolute -top-2 -right-2">
                    <CheckCircle2 className="w-8 h-8 fill-green-500 text-white" />
                </div>
            )}
        </div>
    );
}
