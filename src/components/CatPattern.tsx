export function CatPattern() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
            {/* Paw prints pattern */}
            <div className="absolute top-10 left-20 text-4xl text-orange-500 rotate-12">🐾</div>
            <div className="absolute top-32 right-40 text-3xl text-pink-500 -rotate-12">🐾</div>
            <div className="absolute top-64 left-1/4 text-2xl text-amber-500 rotate-45">🐾</div>
            <div className="absolute bottom-40 right-1/3 text-3xl text-orange-400 -rotate-6">🐾</div>
            <div className="absolute bottom-20 left-1/2 text-2xl text-pink-400 rotate-12">🐾</div>
            <div className="absolute top-1/2 right-20 text-4xl text-amber-400 -rotate-45">🐾</div>
            <div className="absolute top-20 left-1/3 text-2xl text-orange-300 rotate-6">🐾</div>
            <div className="absolute bottom-32 right-1/4 text-3xl text-pink-300 -rotate-12">🐾</div>
        </div>
    );
}