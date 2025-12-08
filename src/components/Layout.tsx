import React, { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useAuthStore } from '@/stores/authStore'
import { BookOpen, User, LogOut, Home, GraduationCap, Trophy, MessageSquare, TrendingUp, Bell } from 'lucide-react'
import { SidebarProvider, useSidebar } from "@/components/Layout/Sidebar";
import { AppSidebar } from "@/components/Layout/AppSidebar";
type Page = "home" | "learn" | "practice" | "leaderboard" | "profile" | "vocabulary" | "historical-places" | "challenges";

export function Layout() {
    const location = useLocation()
    const { user, isAuthenticated, logout } = useAuthStore()
    const [currentPage, setCurrentPage] = useState<Page>("home");
    const [streak, setStreak] = useState(7);
    const [xp, setXp] = useState(450);
    const [dailyGoal] = useState(500);

    const navigation = [
        { name: 'Trang chủ', href: '/', icon: Home },
        { name: 'Bài học', href: '/lessons', icon: BookOpen },
        { name: 'Thành tích', href: '/achievements', icon: Trophy },
        { name: 'Cộng đồng', href: '/community', icon: MessageSquare },
        { name: 'Xếp hạng', href: '/leaderboard', icon: TrendingUp },
        { name: 'Thông báo', href: '/notifications', icon: Bell },
        { name: 'Tài khoản', href: '/account', icon: User },
    ]

    const handleNavigation = (page: Page) => {
        setCurrentPage(page);
    };

    const handleGetStarted = () => {
        setCurrentPage("learn");
    };

    const MainContent = () => {
        const { open } = useSidebar();

        return (
            <main
                className={`
                flex-1 transition-all duration-300
                ${open ? "ml-64" : ""} 
            `}
            >
                <Outlet />
            </main>
        );
    }

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-gradient-to-br from-orange-50 via-amber-50 to-pink-50">
                <AppSidebar />
                {/* Header */}
                {/* <header className="bg-white shadow-sm border-b">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center h-16">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <GraduationCap className="h-8 w-8 text-blue-600" />
                                        <h1 className="text-xl font-bold text-gray-900">English Learning</h1>
                                    </div>
                                </div>

                
                                <div className="flex items-center space-x-4">
                                    {isAuthenticated ? (
                                        <>
                                            <div className="flex items-center space-x-2">
                                                <div className="text-sm">
                                                    <p className="font-medium text-gray-900">{user?.name}</p>
                                                    <p className="text-gray-500">Level: {user?.level}</p>
                                                </div>
                                            </div>
                                            <Button variant="outline" size="sm" onClick={logout}>
                                                <LogOut className="h-4 w-4 mr-2" />
                                                Đăng xuất
                                            </Button>
                                        </>
                                    ) : (
                                        <Link to="/login">
                                            <Button size="sm">Đăng nhập</Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </header> */}

                {/* Main Content */}
                <MainContent />
                {/* <main className="flex-1">
                    <Outlet />
                </main> */}

                {/* Footer */}
                {/* <footer className="bg-white border-t mt-auto">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="text-center text-gray-500 text-sm">
                            <p>&copy; 2024 English Learning App. Học tiếng Anh hiệu quả.</p>
                        </div>
                    </div>
                </footer> */}
            </div>
        </SidebarProvider>
    )
}
