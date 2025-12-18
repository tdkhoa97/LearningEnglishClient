import { Home, BookOpen, Trophy, Zap, MapPin, BookMarked, User, Flame, Star, Crown, Target, Headphones, Library, GraduationCap, MessageSquare, Users, Settings } from "lucide-react";
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
import { useUserStore } from "@/stores/useUserStore";
import { useLocation, useNavigate } from "react-router-dom";

type Page = "home" | "learn" | "practice" | "leaderboard" | "profile" | "vocabulary" | "historical-places" | "challenges";

interface AppSidebarProps {

}

export function AppSidebar(props: AppSidebarProps) {
    const navigate = useNavigate();
    const location = useLocation();

    // Get global state from Zustand
    const { xp, streak, dailyGoal } = useUserStore();

    const progress = Math.min((xp / dailyGoal) * 100, 100);
    const level = Math.floor(xp / 100) + 1;
    const currentPage = location.pathname;

    const mainNavItems = [
        {
            title: "Home",
            icon: Home,
            href: "/",
            color: "text-orange-600",
            bgColor: "bg-orange-50",
        },
        {
            title: "Learn",
            icon: BookOpen,
            href: "/learn",
            color: "text-amber-600",
            bgColor: "bg-amber-50",
        },
        {
            title: "Practice",
            icon: Target,
            href: "/practice",
            color: "text-rose-600",
            bgColor: "bg-rose-50",
        },
        {
            title: "Daily Challenges",
            icon: Zap,
            href: "/challenges",
            color: "text-pink-600",
            bgColor: "bg-pink-50",
        },
    ];

    const exploreNavItems = [
        {
            title: "Courses",
            icon: Library,
            // page: "courses" as Page,
            href: '/courses',
            color: "text-purple-600",
            bgColor: "bg-purple-50",
        },
        {
            title: "4 Skills",
            icon: Headphones,
            page: "skills" as Page,
            href: '/skills',
            color: "text-blue-600",
            bgColor: "bg-blue-50",
        },
        {
            title: "Exam Prep",
            icon: GraduationCap,
            page: "exams" as Page,
            href: '/exams',
            color: "text-indigo-600",
            bgColor: "bg-indigo-50",
        },
        {
            title: "Leaderboard",
            icon: Trophy,
            page: "leaderboard" as Page,
            href: '/leaderboard',
            color: "text-yellow-600",
            bgColor: "bg-yellow-50",
        },
        {
            title: "Explore HCM",
            icon: MapPin,
            page: "historical-places" as Page,
            href: '/historical-places',
            color: "text-red-600",
            bgColor: "bg-red-50",
        },
        {
            title: "Vocabulary Bank",
            icon: BookMarked,
            page: "vocabulary" as Page,
            href: '/vocabulary',
            color: "text-purple-600",
            bgColor: "bg-purple-50",
        },
    ];

    const isActive = (path: string) =>
        currentPage === path || currentPage.startsWith(path);

    return (
        <Sidebar className="border-r border-emerald-100">
            <SidebarHeader className="border-b border-emerald-100 bg-gradient-to-br from-emerald-50/50 via-green-50/30 to-lime-50/50 p-4">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => navigate("/home")}
                        className="flex items-center gap-2 hover:scale-105 transition-transform"
                    >
                        <CatLogo size="sm" animated={false} />
                        <div>
                            <h2 className="text-emerald-600">FunLingo</h2>
                            <p className="text-xs text-gray-600">Learn with Joy! 🌿</p>
                        </div>
                    </button>
                    <SidebarTrigger />
                </div>
            </SidebarHeader>

            <SidebarContent className="px-2 py-4">
                {/* User Stats Card */}
                <div className="mb-4 mx-2 p-4 bg-gradient-to-br from-emerald-50/50 via-green-50/30 to-lime-50/50 rounded-xl border border-emerald-200">
                    <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-12 w-12 border-2 border-white shadow-lg">
                            <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-green-500 text-white">
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
                            <div className="flex items-center gap-1 text-xs text-emerald-600">
                                <Star className="w-3 h-3 fill-emerald-600" />
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
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton
                                        onClick={() => navigate(item.href)}
                                        isActive={currentPage === item.href}
                                        className={`group relative ${currentPage === item.href
                                            ? `${item.bgColor} ${item.color} border-l-4 border-current`
                                            : "hover:bg-gray-50"
                                            }`}
                                    >
                                        <item.icon
                                            className={`w-5 h-5 ${currentPage === item.href ? item.color : "text-gray-600"
                                                } group-hover:scale-110 transition-transform`}
                                        />
                                        <span>{item.title}</span>
                                        {item.href === "challenges" && (
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
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton
                                        onClick={() => navigate(item.href)}
                                        isActive={currentPage === item.href}
                                        className={`group ${currentPage === item.href
                                            ? `${item.bgColor} ${item.color} border-l-4 border-current`
                                            : "hover:bg-gray-50"
                                            }`}
                                    >
                                        <item.icon
                                            className={`w-5 h-5 ${currentPage === item.href ? item.color : "text-gray-600"
                                                } group-hover:scale-110 transition-transform`}
                                        />
                                        <span>{item.title}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Community Section */}
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs text-gray-500 uppercase px-2">
                        Community
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    onClick={() => navigate("forum")}
                                    isActive={currentPage === "forum"}
                                    className={`group ${currentPage === "forum"
                                        ? "bg-green-50 text-green-700 border-l-4 border-green-700"
                                        : "hover:bg-gray-50"
                                        }`}
                                >
                                    <Users
                                        className={`w-5 h-5 ${currentPage === "forum" ? "text-green-700" : "text-gray-600"
                                            } group-hover:scale-110 transition-transform`}
                                    />
                                    <span>Forum</span>
                                    <Badge
                                        variant="secondary"
                                        className="ml-auto bg-green-400 text-green-900 border-0"
                                    >
                                        NEW
                                    </Badge>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    onClick={() => navigate("messages")}
                                    isActive={currentPage === "messages"}
                                    className={`group ${currentPage === "messages"
                                        ? "bg-blue-50 text-blue-700 border-l-4 border-blue-700"
                                        : "hover:bg-gray-50"
                                        }`}
                                >
                                    <MessageSquare
                                        className={`w-5 h-5 ${currentPage === "messages" ? "text-blue-700" : "text-gray-600"
                                            } group-hover:scale-110 transition-transform`}
                                    />
                                    <span>Messages</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t-2 border-gray-200 p-4 bg-gradient-to-br from-purple-50 to-blue-50">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={() => navigate("profile")}
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
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={() => navigate("settings")}
                            isActive={currentPage === "settings"}
                            className={`${currentPage === "settings"
                                ? "bg-gray-100 text-gray-700 border-l-4 border-gray-700"
                                : "hover:bg-gray-50"
                                }`}
                        >
                            <Settings
                                className={`w-5 h-5 ${currentPage === "settings" ? "text-gray-700" : "text-gray-600"
                                    }`}
                            />
                            <span>Settings</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}