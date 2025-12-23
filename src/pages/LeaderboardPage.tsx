import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

const mockLeaderboard = [
    { rank: 1, name: "Emma Chen", xp: 12540, streak: 45, avatar: "😊" },
    { rank: 2, name: "Lucas Brown", xp: 11230, streak: 38, avatar: "🙂" },
    { rank: 3, name: "Sofia Garcia", xp: 10890, streak: 42, avatar: "😄" },
    { rank: 4, name: "You", xp: 8750, streak: 7, avatar: "🐱", isCurrentUser: true },
    { rank: 5, name: "Noah Wilson", xp: 8320, streak: 28, avatar: "😃" },
    { rank: 6, name: "Mia Johnson", xp: 7650, streak: 31, avatar: "😁" },
    { rank: 7, name: "Oliver Davis", xp: 7120, streak: 22, avatar: "🤗" },
    { rank: 8, name: "Ava Martinez", xp: 6890, streak: 19, avatar: "😇" },
];

export function LeaderboardPage() {
    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1:
                return <Trophy className="w-6 h-6 text-yellow-500" />;
            case 2:
                return <Medal className="w-6 h-6 text-gray-400" />;
            case 3:
                return <Award className="w-6 h-6 text-emerald-600" />;
            default:
                return null;
        }
    };

    const getRankBadge = (rank: number) => {
        switch (rank) {
            case 1:
                return "bg-gradient-to-r from-yellow-400 to-yellow-600";
            case 2:
                return "bg-gradient-to-r from-gray-300 to-gray-500";
            case 3:
                return "bg-gradient-to-r from-emerald-400 to-emerald-600";
            default:
                return "bg-gray-200";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-green-50 to-lime-50 w-full overflow-auto">
            <PageHeader
                title="Leaderboard 🏆"
                subtitle="See how you stack up against other learners!"
            />
            <main className="max-w-4xl mx-auto px-4 py-8">
                {/* Top 3 Podium */}
                <div className="grid grid-cols-3 gap-4 mb-8 items-end">
                    {/* 2nd Place */}
                    <div className="text-center pb-8">
                        <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center text-3xl border-4 border-white shadow-lg">
                            {mockLeaderboard[1].avatar}
                        </div>
                        <p className="text-gray-800 mb-1">{mockLeaderboard[1].name}</p>
                        <p className="text-sm text-gray-600">{mockLeaderboard[1].xp} XP</p>
                        <div className="mt-4 bg-gradient-to-r from-gray-300 to-gray-500 rounded-t-2xl h-24 flex items-center justify-center">
                            <span className="text-white text-2xl">2</span>
                        </div>
                    </div>

                    {/* 1st Place */}
                    <div className="text-center">
                        <div className="relative">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                                <Trophy className="w-8 h-8 text-yellow-500" />
                            </div>
                            <div className="w-24 h-24 mx-auto mb-3 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-4xl border-4 border-white shadow-xl">
                                {mockLeaderboard[0].avatar}
                            </div>
                        </div>
                        <p className="text-gray-800 mb-1">{mockLeaderboard[0].name}</p>
                        <p className="text-sm text-gray-600">{mockLeaderboard[0].xp} XP</p>
                        <div className="mt-4 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-t-2xl h-32 flex items-center justify-center">
                            <span className="text-white text-3xl">1</span>
                        </div>
                    </div>

                    {/* 3rd Place */}
                    <div className="text-center pb-16">
                        <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-3xl border-4 border-white shadow-lg">
                            {mockLeaderboard[2].avatar}
                        </div>
                        <p className="text-gray-800 mb-1">{mockLeaderboard[2].name}</p>
                        <p className="text-sm text-gray-600">{mockLeaderboard[2].xp} XP</p>
                        <div className="mt-4 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-t-2xl h-16 flex items-center justify-center">
                            <span className="text-white text-xl">3</span>
                        </div>
                    </div>
                </div>

                {/* Remaining Rankings */}
                <div className="space-y-3">
                    {mockLeaderboard.slice(3).map((user) => (
                        <Card
                            key={user.rank}
                            className={`p-4 ${user.isCurrentUser
                                ? 'bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-300'
                                : 'bg-white'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${getRankBadge(
                                        user.rank
                                    )}`}
                                >
                                    {getRankIcon(user.rank) || (
                                        <span className="text-gray-700">{user.rank}</span>
                                    )}
                                </div>
                                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center text-2xl border-2 border-white">
                                    {user.avatar}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <p className="text-gray-800">{user.name}</p>
                                        {user.isCurrentUser && (
                                            <Badge className="bg-emerald-500 text-white">You</Badge>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        🔥 {user.streak} day streak
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-emerald-600">{user.xp} XP</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <Card className="mt-8 p-6 bg-gradient-to-r from-emerald-100 to-green-100 border-2 border-emerald-200">
                    <div className="flex items-start gap-4">
                        <span className="text-4xl">🎯</span>
                        <div>
                            <h3 className="text-emerald-800 mb-2">Climb the Ranks!</h3>
                            <p className="text-emerald-700">
                                Complete more lessons and practice sessions to earn XP and move up the leaderboard.
                                The top 3 learners each week get special badges! 🏅
                            </p>
                        </div>
                    </div>
                </Card>
            </main>
        </div>
    );
}