import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Trophy,
    Flame,
    Star,
    Calendar,
    Book,
    Target,
    Award,
    Crown,
    Zap,
    Gift,
    Lock
} from "lucide-react";

interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlocked: boolean;
    unlockedDate?: string;
    rarity: "common" | "rare" | "epic" | "legendary";
}

interface ProfilePageProps {
    streak?: number;
    xp?: number;
    onNavigateToVocabulary?: () => void;
}

const mockAchievements: Achievement[] = [
    {
        id: "first-lesson",
        title: "First Steps",
        description: "Complete your first lesson",
        icon: "🎯",
        unlocked: true,
        unlockedDate: "Nov 2, 2025",
        rarity: "common"
    },
    {
        id: "week-streak",
        title: "Week Warrior",
        description: "Maintain a 7-day streak",
        icon: "🔥",
        unlocked: true,
        unlockedDate: "Nov 8, 2025",
        rarity: "rare"
    },
    {
        id: "perfect-score",
        title: "Perfectionist",
        description: "Get 3 stars on any lesson",
        icon: "⭐",
        unlocked: true,
        unlockedDate: "Nov 3, 2025",
        rarity: "rare"
    },
    {
        id: "early-bird",
        title: "Early Bird",
        description: "Complete a lesson before 8 AM",
        icon: "🌅",
        unlocked: false,
        rarity: "common"
    },
    {
        id: "night-owl",
        title: "Night Owl",
        description: "Complete a lesson after 10 PM",
        icon: "🦉",
        unlocked: false,
        rarity: "common"
    },
    {
        id: "month-streak",
        title: "Dedication Master",
        description: "Maintain a 30-day streak",
        icon: "💪",
        unlocked: false,
        rarity: "epic"
    },
    {
        id: "hundred-lessons",
        title: "Century Club",
        description: "Complete 100 lessons",
        icon: "💯",
        unlocked: false,
        rarity: "epic"
    },
    {
        id: "legendary-learner",
        title: "Legendary Learner",
        description: "Reach 10,000 XP",
        icon: "👑",
        unlocked: false,
        rarity: "legendary"
    },
    {
        id: "vocabulary-master",
        title: "Word Wizard",
        description: "Learn 500 new words",
        icon: "📚",
        unlocked: false,
        rarity: "epic"
    },
];

export function ProfilePage({ streak, xp, onNavigateToVocabulary }: ProfilePageProps) {
    const unlockedAchievements = mockAchievements.filter(a => a.unlocked);
    const totalLessonsCompleted = 2;
    const totalWordsLearned = 45;
    const currentLevel = Math.floor(xp / 500) + 1;
    const xpForNextLevel = (currentLevel * 500) - xp;
    const levelProgress = ((xp % 500) / 500) * 100;

    const getRarityColor = (rarity: Achievement["rarity"]) => {
        switch (rarity) {
            case "common":
                return "from-gray-400 to-gray-600";
            case "rare":
                return "from-blue-400 to-blue-600";
            case "epic":
                return "from-purple-400 to-purple-600";
            case "legendary":
                return "from-yellow-400 to-orange-600";
        }
    };

    const getRarityBorder = (rarity: Achievement["rarity"]) => {
        switch (rarity) {
            case "common":
                return "border-gray-300";
            case "rare":
                return "border-blue-300";
            case "epic":
                return "border-purple-300";
            case "legendary":
                return "border-yellow-300";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 w-full overflow-auto">
            <main className="max-w-6xl mx-auto px-4 py-8">
                {/* Profile Header */}
                <Card className="p-6 mb-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <Avatar className="w-24 h-24 border-4 border-white shadow-xl">
                            <AvatarFallback className="bg-gradient-to-br from-green-400 to-blue-500 text-white text-3xl">
                                🦉
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                                <h2 className="text-white">Super Learner</h2>
                                <Badge className="bg-yellow-400 text-yellow-900 hover:bg-yellow-400">
                                    Level {currentLevel}
                                </Badge>
                            </div>
                            <p className="text-white/90 mb-4">Learning English since November 2025</p>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span>Level Progress</span>
                                    <span>{xpForNextLevel} XP to Level {currentLevel + 1}</span>
                                </div>
                                <Progress value={levelProgress} className="h-3 bg-white/20" />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Card className="p-4 bg-white/10 backdrop-blur border-white/20">
                                <div className="text-center">
                                    <Flame className="w-8 h-8 mx-auto mb-2 text-orange-300" />
                                    <p className="text-2xl mb-1">{streak}</p>
                                    <p className="text-sm text-white/80">Day Streak</p>
                                </div>
                            </Card>

                            <Card className="p-4 bg-white/10 backdrop-blur border-white/20">
                                <div className="text-center">
                                    <Star className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                                    <p className="text-2xl mb-1">{xp}</p>
                                    <p className="text-sm text-white/80">Total XP</p>
                                </div>
                            </Card>
                        </div>
                    </div>
                </Card>

                <Tabs defaultValue="stats" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
                        <TabsTrigger value="stats">📊 Stats</TabsTrigger>
                        <TabsTrigger value="achievements">🏆 Achievements</TabsTrigger>
                        <TabsTrigger value="activity">📅 Activity</TabsTrigger>
                    </TabsList>

                    {/* Stats Tab */}
                    <TabsContent value="stats" className="space-y-6">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                                        <Book className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-3xl text-blue-800">{totalLessonsCompleted}</p>
                                    </div>
                                </div>
                                <p className="text-blue-700">Lessons Completed</p>
                            </Card>

                            <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                                        <Target className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-3xl text-green-800">{totalWordsLearned}</p>
                                    </div>
                                </div>
                                <p className="text-green-700">Words Learned</p>
                            </Card>

                            <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                                        <Trophy className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-3xl text-purple-800">{unlockedAchievements.length}</p>
                                    </div>
                                </div>
                                <p className="text-purple-700">Achievements</p>
                            </Card>

                            <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                                        <Calendar className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-3xl text-orange-800">7</p>
                                    </div>
                                </div>
                                <p className="text-orange-700">Days Active</p>
                            </Card>
                        </div>

                        <Card className="p-6">
                            <h3 className="text-gray-800 mb-4">Quick Actions</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Button
                                    onClick={onNavigateToVocabulary}
                                    className="h-auto p-4 justify-start bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                                >
                                    <Book className="w-5 h-5 mr-3" />
                                    <div className="text-left">
                                        <p className="text-white">Vocabulary Bank</p>
                                        <p className="text-xs text-white/80">Review your learned words</p>
                                    </div>
                                </Button>

                                <Button
                                    variant="outline"
                                    className="h-auto p-4 justify-start border-2"
                                >
                                    <Zap className="w-5 h-5 mr-3" />
                                    <div className="text-left">
                                        <p>Practice Weak Words</p>
                                        <p className="text-xs text-gray-600">Improve problem areas</p>
                                    </div>
                                </Button>
                            </div>
                        </Card>
                    </TabsContent>

                    {/* Achievements Tab */}
                    <TabsContent value="achievements" className="space-y-6">
                        <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200">
                            <div className="flex items-center gap-3">
                                <Crown className="w-8 h-8 text-yellow-600" />
                                <div>
                                    <h3 className="text-yellow-800">Achievement Progress</h3>
                                    <p className="text-yellow-700">
                                        {unlockedAchievements.length} of {mockAchievements.length} unlocked ({Math.round((unlockedAchievements.length / mockAchievements.length) * 100)}%)
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {mockAchievements.map((achievement) => (
                                <Card
                                    key={achievement.id}
                                    className={`p-6 relative overflow-hidden ${achievement.unlocked
                                        ? `bg-gradient-to-br ${getRarityColor(achievement.rarity).replace('from-', 'from-').replace('to-', 'to-')}/10 border-2 ${getRarityBorder(achievement.rarity)}`
                                        : 'bg-gray-100 border-2 border-gray-300'
                                        }`}
                                >
                                    {!achievement.unlocked && (
                                        <div className="absolute top-2 right-2">
                                            <Lock className="w-5 h-5 text-gray-400" />
                                        </div>
                                    )}

                                    <div className="text-center">
                                        <div
                                            className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-4xl ${achievement.unlocked
                                                ? `bg-gradient-to-br ${getRarityColor(achievement.rarity)} shadow-lg`
                                                : 'bg-gray-300 grayscale opacity-50'
                                                }`}
                                        >
                                            {achievement.icon}
                                        </div>

                                        <h4 className={achievement.unlocked ? 'text-gray-800' : 'text-gray-500'}>
                                            {achievement.title}
                                        </h4>
                                        <p className={`text-sm mb-3 ${achievement.unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                                            {achievement.description}
                                        </p>

                                        {achievement.unlocked && achievement.unlockedDate && (
                                            <Badge variant="secondary" className="text-xs">
                                                Unlocked: {achievement.unlockedDate}
                                            </Badge>
                                        )}

                                        {!achievement.unlocked && (
                                            <Badge variant="secondary" className="text-xs bg-gray-200">
                                                🔒 Locked
                                            </Badge>
                                        )}
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <Card className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-200">
                            <div className="flex items-start gap-4">
                                <Gift className="w-8 h-8 text-purple-600 flex-shrink-0" />
                                <div>
                                    <h3 className="text-purple-800 mb-2">Keep Going!</h3>
                                    <p className="text-purple-700">
                                        Complete more lessons to unlock amazing achievements and earn rewards!
                                        Each achievement brings you closer to becoming a master! 🌟
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </TabsContent>

                    {/* Activity Tab */}
                    <TabsContent value="activity" className="space-y-6">
                        <Card className="p-6">
                            <h3 className="text-gray-800 mb-6">Recent Activity</h3>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Trophy className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-800">Completed "Greetings" with 3 stars!</p>
                                        <p className="text-sm text-gray-600">November 9, 2025 at 10:30 AM</p>
                                    </div>
                                    <Badge className="bg-green-500">+30 XP</Badge>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Award className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-800">Unlocked "Week Warrior" achievement!</p>
                                        <p className="text-sm text-gray-600">November 8, 2025 at 8:15 PM</p>
                                    </div>
                                    <Badge className="bg-orange-500">🏆</Badge>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Star className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-800">Completed "Colors" lesson</p>
                                        <p className="text-sm text-gray-600">November 5, 2025 at 2:45 PM</p>
                                    </div>
                                    <Badge className="bg-blue-500">+20 XP</Badge>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Flame className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-800">Reached 7-day streak!</p>
                                        <p className="text-sm text-gray-600">November 2, 2025 at 9:00 AM</p>
                                    </div>
                                    <Badge className="bg-purple-500">🔥</Badge>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6 bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-200">
                            <div className="flex items-start gap-4">
                                <Calendar className="w-8 h-8 text-blue-600 flex-shrink-0" />
                                <div>
                                    <h3 className="text-blue-800 mb-2">Stay Consistent!</h3>
                                    <p className="text-blue-700">
                                        Your learning journey is off to a great start! Keep practicing daily to maintain your streak and unlock more achievements. 💪
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}