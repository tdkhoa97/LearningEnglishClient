import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Card } from "./ui/card";

interface MascotProps {
    message: string;
    showMessage: boolean;
}

export function Mascot({ message, showMessage }: MascotProps) {
    return (
        <div className="fixed bottom-8 right-8 z-40">
            {showMessage && (
                <Card className="absolute bottom-full right-0 mb-4 p-4 max-w-xs bg-white shadow-lg animate-in fade-in slide-in-from-bottom-2">
                    <p className="text-sm">{message}</p>
                    <div className="absolute bottom-0 right-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white translate-y-full"></div>
                </Card>
            )}
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                <span className="text-5xl">🦉</span>
            </div>
        </div>
    );
}
