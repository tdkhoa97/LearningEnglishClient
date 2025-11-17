import { Home, BookOpen, Trophy, Zap, MapPin, BookMarked, User, Flame, Star, Crown, Target } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarTrigger,
} from "@/components/Layout/Sidebar";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CatLogo } from "@/components/CatLogo";

type Page = "home" | "learn" | "practice" | "leaderboard" | "profile" | "vocabulary" | "historical-places" | "challenges";

interface AppSidebarProps {
    currentPage: Page;
    onNavigate: (page: Page) => void;
    streak: number;
    xp: number;
    dailyGoal: number;
}

export function AppSidebar({ currentPage, onNavigate, streak, xp, dailyGoal }: AppSidebarProps) {
    const progress = Math.min((xp / dailyGoal) * 100, 100);
    const level = Math.floor(xp / 100) + 1;

    const mainNavItems = [
        {
            title: "Home",
            icon: Home,
            page: "home" as Page,
            color: "text-orange-600",
            bgColor: "bg-orange-50",
        },
        {
            title: "Learn",
            icon: BookOpen,
            page: "learn" as Page,
            color: "text-amber-600",
            bgColor: "bg-amber-50",
        },
        {
            title: "Practice",
            icon: Target,
            page: "practice" as Page,
            color: "text-rose-600",
            bgColor: "bg-rose-50",
        },
        {
            title: "Daily Challenges",
            icon: Zap,
            page: "challenges" as Page,
            color: "text-pink-600",
            bgColor: "bg-pink-50",
        },
    ];

    const exploreNavItems = [
        {
            title: "Leaderboard",
            icon: Trophy,
            page: "leaderboard" as Page,
            color: "text-yellow-600",
            bgColor: "bg-yellow-50",
        },
        {
            title: "Explore HCM",
            icon: MapPin,
            page: "historical-places" as Page,
            color: "text-red-600",
            bgColor: "bg-red-50",
        },
        {
            title: "Vocabulary Bank",
            icon: BookMarked,
            page: "vocabulary" as Page,
            color: "text-purple-600",
            bgColor: "bg-purple-50",
        },
    ];

    return (
        <Sidebar className="border-r-2 border-orange-200">
            <SidebarHeader className="border-b-2 border-orange-200 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => onNavigate("home")}
                        className="flex items-center gap-2 hover:scale-105 transition-transform"
                    >
                        <CatLogo size="sm" animated={false} />
                        <div>
                            <h2 className="text-orange-600">FunLingo</h2>
                            <p className="text-xs text-gray-600">Learn with Kitty! 🐾</p>
                        </div>
                    </button>
                    <SidebarTrigger />
                </div>
            </SidebarHeader>

            <SidebarContent className="px-2 py-4">
                {/* User Stats Card */}
                <div className="mb-4 mx-2 p-4 bg-gradient-to-br from-orange-50 via-amber-50 to-pink-50 rounded-xl border-2 border-orange-200">
                    <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-12 w-12 border-2 border-white shadow-lg">
                            <AvatarFallback className="bg-gradient-to-br from-orange-400 to-pink-400 text-white">
                                <User className="w-6 h-6" />
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-700">Level {level}</span>
                                <Crown className="w-4 h-4 text-amber-500" />
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <Flame className="w-4 h-4 text-orange-500" />
                                <span className="text-xs text-gray-600">{streak} day streak</span>
                            </div>
                        </div>
                    </div>

                    {/* XP Progress */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600">Daily Goal</span>
                            <span className="text-xs text-gray-700">{xp}/{dailyGoal} XP</span>
                        </div>
                        <Progress value={progress} className="h-2 bg-white" />
                        {progress >= 100 && (
                            <div className="flex items-center gap-1 text-xs text-orange-600">
                                <Star className="w-3 h-3 fill-orange-600" />
                                <span>Goal completed! 🎉</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Navigation */}
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs text-gray-500 uppercase px-2">
                        Main Menu
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainNavItems.map((item) => (
                                <SidebarMenuItem key={item.page}>
                                    <SidebarMenuButton
                                        onClick={() => onNavigate(item.page)}
                                        isActive={currentPage === item.page}
                                        className={`group relative ${currentPage === item.page
                                            ? `${item.bgColor} ${item.color} border-l-4 border-current`
                                            : "hover:bg-gray-50"
                                            }`}
                                    >
                                        <item.icon
                                            className={`w-5 h-5 ${currentPage === item.page ? item.color : "text-gray-600"
                                                } group-hover:scale-110 transition-transform`}
                                        />
                                        <span>{item.title}</span>
                                        {item.page === "challenges" && (
                                            <Badge
                                                variant="secondary"
                                                className="ml-auto bg-yellow-400 text-yellow-900 border-0"
                                            >
                                                NEW
                                            </Badge>
                                        )}
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Explore Section */}
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs text-gray-500 uppercase px-2">
                        Explore
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {exploreNavItems.map((item) => (
                                <SidebarMenuItem key={item.page}>
                                    <SidebarMenuButton
                                        onClick={() => onNavigate(item.page)}
                                        isActive={currentPage === item.page}
                                        className={`group ${currentPage === item.page
                                            ? `${item.bgColor} ${item.color} border-l-4 border-current`
                                            : "hover:bg-gray-50"
                                            }`}
                                    >
                                        <item.icon
                                            className={`w-5 h-5 ${currentPage === item.page ? item.color : "text-gray-600"
                                                } group-hover:scale-110 transition-transform`}
                                        />
                                        <span>{item.title}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t-2 border-gray-200 p-4 bg-gradient-to-br from-purple-50 to-blue-50">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={() => onNavigate("profile")}
                            isActive={currentPage === "profile"}
                            className={`${currentPage === "profile"
                                ? "bg-blue-100 text-blue-700 border-l-4 border-blue-700"
                                : "hover:bg-gray-50"
                                }`}
                        >
                            <Avatar className="h-8 w-8 border-2 border-white">
                                <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-500 text-white">
                                    <User className="w-4 h-4" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="text-sm">My Profile</p>
                                <p className="text-xs text-gray-500">View achievements</p>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}