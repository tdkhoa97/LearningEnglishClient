export function FloatingCats() {
    return (
        <>
            {/* Floating cat faces */}
            <div className="fixed top-20 left-10 text-4xl opacity-20 animate-bounce pointer-events-none z-0">
                😺
            </div>
            <div className="fixed top-40 right-20 text-3xl opacity-20 animate-pulse pointer-events-none z-0">
                😸
            </div>
            <div className="fixed bottom-32 left-1/4 text-2xl opacity-20 animate-bounce delay-100 pointer-events-none z-0">
                😻
            </div>
            <div className="fixed bottom-20 right-1/3 text-3xl opacity-20 animate-pulse delay-200 pointer-events-none z-0">
                😺
            </div>
        </>
    );
}
