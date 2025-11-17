interface CatLogoProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    animated?: boolean;
    className?: string;
}

export function CatLogo({ size = 'md', animated = true, className = '' }: CatLogoProps) {
    const sizeClasses = {
        sm: 'w-8 h-8 text-xl',
        md: 'w-12 h-12 text-3xl',
        lg: 'w-16 h-16 text-4xl',
        xl: 'w-24 h-24 text-6xl'
    };

    return (
        <div className={`relative ${className}`}>
            {/* Cat Face Container */}
            <div className={`${sizeClasses[size]} bg-gradient-to-br from-orange-400 via-amber-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg ${animated ? 'hover:scale-110 transition-transform' : ''} relative overflow-hidden`}>
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-50"></div>

                {/* Cat emoji */}
                <span className="relative z-10">🐱</span>

                {/* Whiskers effect - only show on larger sizes */}
                {(size === 'lg' || size === 'xl') && (
                    <>
                        <div className="absolute left-0 top-1/2 w-4 h-0.5 bg-white/40 rounded-full -translate-y-2"></div>
                        <div className="absolute left-0 top-1/2 w-4 h-0.5 bg-white/40 rounded-full translate-y-2"></div>
                        <div className="absolute right-0 top-1/2 w-4 h-0.5 bg-white/40 rounded-full -translate-y-2"></div>
                        <div className="absolute right-0 top-1/2 w-4 h-0.5 bg-white/40 rounded-full translate-y-2"></div>
                    </>
                )}
            </div>

            {/* Floating paw prints - only show on xl size with animation */}
            {animated && size === 'xl' && (
                <>
                    <div className="absolute -top-2 -right-2 text-orange-300 animate-bounce text-sm">🐾</div>
                    <div className="absolute -bottom-2 -left-2 text-pink-300 animate-bounce delay-100 text-sm">🐾</div>
                </>
            )}
        </div>
    );
}
