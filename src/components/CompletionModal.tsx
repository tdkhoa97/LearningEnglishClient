import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, Trophy } from "lucide-react";

interface CompletionModalProps {
  stars: number;
  xpEarned: number;
  onContinue: () => void;
}

export function CompletionModal({ stars, xpEarned, onContinue }: CompletionModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full p-8 text-center bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto mb-4 bg-yellow-400 rounded-full flex items-center justify-center">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-green-600 mb-2">Lesson Complete!</h2>
          <p className="text-gray-600">Great job! Keep up the amazing work! 🎉</p>
        </div>

        <div className="mb-6">
          <div className="flex justify-center gap-2 mb-4">
            {[...Array(3)].map((_, i) => (
              <Star
                key={i}
                className={`w-12 h-12 ${i < stars
                  ? 'fill-yellow-400 text-yellow-500 animate-pulse'
                  : 'text-gray-300'
                  }`}
              />
            ))}
          </div>
          <div className="bg-white rounded-lg p-4 inline-block">
            <p className="text-gray-600 text-sm">XP Earned</p>
            <p className="text-orange-600">+{xpEarned} XP</p>
          </div>
        </div>

        <Button
          onClick={onContinue}
          className="w-full h-12 bg-green-500 hover:bg-green-600 rounded-xl"
        >
          CONTINUE
        </Button>
      </Card>
    </div>
  );
}
