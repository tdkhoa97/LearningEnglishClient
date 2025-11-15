import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/stores/authStore'
import { useLearningStore } from '@/stores/learningStore'
import {
    BookOpen,
    Target,
    Clock,
    TrendingUp,
    PlayCircle,
} from 'lucide-react'
import { Star, Zap, Trophy, Users, Globe, Sparkles } from "lucide-react";

interface HomePageProps {
    onGetStarted: () => void;
}

export function HomePage(props: HomePageProps) {
    const { onGetStarted } = props
    const { user, isAuthenticated } = useAuthStore()
    const { lessons, learnedWords, currentStreak, dailyGoal } = useLearningStore()

    const completedLessons = lessons.filter(lesson => lesson.completed).length
    const totalLessons = lessons.length
    const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

    const stats = [
        {
            title: 'Từ đã học',
            value: learnedWords.length,
            icon: BookOpen,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100'
        },
        {
            title: 'Chuỗi ngày',
            value: currentStreak,
            icon: Trophy,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-100'
        },
        {
            title: 'Bài học hoàn thành',
            value: completedLessons,
            icon: Target,
            color: 'text-green-600',
            bgColor: 'bg-green-100'
        },
        {
            title: 'Mục tiêu hôm nay',
            value: dailyGoal,
            icon: Clock,
            color: 'text-purple-600',
            bgColor: 'bg-purple-100'
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 w-full overflow-auto">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                                ✨ Free Forever • No Ads • Fun Learning
                            </Badge>

                            <h1 className="text-green-600">
                                Learn English the Fun Way! 🦉
                            </h1>

                            <p className="text-gray-700 text-xl">
                                Join millions of learners making English learning fun, effective,
                                and totally free! Perfect for kids, teens, and adults of all ages.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Button
                                    onClick={onGetStarted}
                                    size="lg"
                                    className="h-14 px-8 bg-green-500 hover:bg-green-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all"
                                >
                                    GET STARTED - IT'S FREE! 🚀
                                </Button>

                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="h-14 px-8 border-2 border-blue-500 text-blue-600 hover:bg-blue-50 rounded-2xl"
                                >
                                    WATCH DEMO 🎬
                                </Button>
                            </div>

                            <div className="flex items-center gap-6 pt-4">
                                <div className="flex items-center gap-2">
                                    <div className="flex -space-x-2">
                                        {['😊', '🙂', '😄', '😃'].map((emoji, i) => (
                                            <div
                                                key={i}
                                                className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center border-2 border-white"
                                            >
                                                <span className="text-lg">{emoji}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="ml-2">
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                        <p className="text-sm text-gray-600">10M+ Happy Learners</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-purple-400 rounded-3xl transform rotate-3"></div>
                            <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                                            <span className="text-2xl">👋</span>
                                        </div>
                                        <div className="flex-1 bg-gray-100 rounded-lg p-3">
                                            <p className="text-sm text-gray-600">Today's Lesson</p>
                                            <p className="text-gray-900">Greetings & Introductions</p>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-4">
                                        <p className="text-sm text-gray-600 mb-2">Your Progress</p>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span>Daily Goal</span>
                                                <span className="text-green-600">450/500 XP</span>
                                            </div>
                                            <div className="w-full bg-white rounded-full h-3">
                                                <div className="bg-green-500 h-3 rounded-full" style={{ width: '90%' }}></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2">
                                        {['🎨', '🐶', '🔢'].map((emoji, i) => (
                                            <div
                                                key={i}
                                                className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-4 text-center hover:scale-105 transition-transform"
                                            >
                                                <span className="text-3xl">{emoji}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-20 left-10 animate-bounce">
                    <span className="text-4xl">⭐</span>
                </div>
                <div className="absolute top-40 right-20 animate-bounce delay-100">
                    <span className="text-4xl">🎯</span>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-gray-800 mb-4">Why FunLingo? 🤔</h2>
                        <p className="text-gray-600 text-lg">
                            Learning English has never been this fun and effective!
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="p-6 bg-gradient-to-br from-pink-50 to-pink-100 border-2 border-pink-200 hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-pink-500 rounded-2xl flex items-center justify-center mb-4">
                                <Sparkles className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-pink-800 mb-2">Fun & Engaging</h3>
                            <p className="text-pink-700">
                                Learn through games, stories, and interactive exercises that make learning feel like play!
                            </p>
                        </Card>

                        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-4">
                                <Zap className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-blue-800 mb-2">Bite-Sized Lessons</h3>
                            <p className="text-blue-700">
                                Just 5-15 minutes a day! Perfect for busy schedules and short attention spans.
                            </p>
                        </Card>

                        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-4">
                                <Trophy className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-green-800 mb-2">Track Progress</h3>
                            <p className="text-green-700">
                                Earn XP, unlock achievements, and watch your streak grow every single day!
                            </p>
                        </Card>

                        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-4">
                                <Users className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-purple-800 mb-2">For All Ages</h3>
                            <p className="text-purple-700">
                                From kids to adults, our content is designed to be appropriate and fun for everyone!
                            </p>
                        </Card>

                        <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mb-4">
                                <Globe className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-orange-800 mb-2">Learn Anywhere</h3>
                            <p className="text-orange-700">
                                Practice on any device, anytime. Your progress syncs automatically!
                            </p>
                        </Card>

                        <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200 hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mb-4">
                                <Star className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-yellow-800 mb-2">100% Free</h3>
                            <p className="text-yellow-700">
                                No hidden costs, no subscriptions. Quality education should be free for all!
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-16 bg-gradient-to-b from-purple-50 to-blue-50">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-gray-800 mb-4">How It Works 📚</h2>
                        <p className="text-gray-600 text-lg">
                            Start your English learning journey in 3 simple steps!
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-lg">
                                <span className="text-3xl">1️⃣</span>
                            </div>
                            <h3 className="text-blue-800 mb-2">Choose Your Lesson</h3>
                            <p className="text-gray-600">
                                Pick from fun topics like greetings, animals, food, and more!
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-lg">
                                <span className="text-3xl">2️⃣</span>
                            </div>
                            <h3 className="text-green-800 mb-2">Play & Learn</h3>
                            <p className="text-gray-600">
                                Complete interactive exercises and games to master new words!
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-lg">
                                <span className="text-3xl">3️⃣</span>
                            </div>
                            <h3 className="text-purple-800 mb-2">Earn Rewards</h3>
                            <p className="text-gray-600">
                                Collect stars, gain XP, and unlock new levels as you progress!
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-white mb-4">
                        Ready to Start Your English Adventure? 🚀
                    </h2>
                    <p className="text-white/90 text-xl mb-8">
                        Join millions of learners worldwide and make English learning fun!
                    </p>
                    <Button
                        onClick={onGetStarted}
                        size="lg"
                        className="h-16 px-12 bg-white text-green-600 hover:bg-gray-100 rounded-2xl shadow-2xl hover:shadow-xl transition-all"
                    >
                        START LEARNING NOW - FREE! 🎉
                    </Button>
                    <p className="text-white/80 mt-4 text-sm">
                        No credit card required • Takes less than 1 minute to start
                    </p>
                </div>
            </section>

            {/* Mascot */}
            <div className="fixed bottom-8 right-8 z-40">
                <div className="relative">
                    <div className="absolute -top-20 right-0 bg-white rounded-2xl p-4 shadow-lg max-w-xs hidden md:block animate-bounce">
                        <p className="text-sm">Hi! I'm Lingo the Owl! Ready to learn? 🦉</p>
                    </div>
                    <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                        <span className="text-5xl">🦉</span>
                    </div>
                </div>
            </div>
        </div>
    );
    // return (
    //     <div className="space-y-8">
    //         {/* Hero Section */}
    //         <div className="text-center space-y-4">
    //             <h1 className="text-4xl font-bold text-gray-900">
    //                 Chào mừng đến với English Learning!
    //             </h1>
    //             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
    //                 Học tiếng Anh một cách hiệu quả và thú vị với các bài học được thiết kế đặc biệt cho bạn.
    //             </p>

    //             {isAuthenticated && user && (
    //                 <div className="flex items-center justify-center space-x-2">
    //                     <Badge variant="secondary" className="text-lg px-4 py-2">
    //                         Level: {user.level}
    //                     </Badge>
    //                     <Badge variant="outline" className="text-lg px-4 py-2">
    //                         {user.totalWordsLearned} từ đã học
    //                     </Badge>
    //                 </div>
    //             )}
    //         </div>

    //         {/* Stats Grid */}
    //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    //             {stats.map((stat, index) => {
    //                 const Icon = stat.icon
    //                 return (
    //                     <Card key={index} className="hover:shadow-lg transition-shadow">
    //                         <CardContent className="p-6">
    //                             <div className="flex items-center space-x-4">
    //                                 <div className={`p-3 rounded-full ${stat.bgColor}`}>
    //                                     <Icon className={`h-6 w-6 ${stat.color}`} />
    //                                 </div>
    //                                 <div>
    //                                     <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
    //                                     <p className="text-sm text-gray-600">{stat.title}</p>
    //                                 </div>
    //                             </div>
    //                         </CardContent>
    //                     </Card>
    //                 )
    //             })}
    //         </div>

    //         {/* Progress Section */}
    //         <Card>
    //             <CardHeader>
    //                 <CardTitle className="flex items-center space-x-2">
    //                     <TrendingUp className="h-5 w-5" />
    //                     <span>Tiến độ học tập</span>
    //                 </CardTitle>
    //                 <CardDescription>
    //                     Theo dõi tiến độ học tập của bạn
    //                 </CardDescription>
    //             </CardHeader>
    //             <CardContent>
    //                 <div className="space-y-4">
    //                     <div className="flex justify-between text-sm">
    //                         <span>Hoàn thành bài học</span>
    //                         <span>{completedLessons}/{totalLessons}</span>
    //                     </div>
    //                     <div className="w-full bg-gray-200 rounded-full h-2">
    //                         <div
    //                             className="bg-blue-600 h-2 rounded-full transition-all duration-300"
    //                             style={{ width: `${progressPercentage}%` }}
    //                         />
    //                     </div>
    //                     <p className="text-sm text-gray-600">
    //                         {progressPercentage.toFixed(1)}% hoàn thành
    //                     </p>
    //                 </div>
    //             </CardContent>
    //         </Card>

    //         {/* Quick Actions */}
    //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //             <Card className="hover:shadow-lg transition-shadow">
    //                 <CardHeader>
    //                     <CardTitle className="flex items-center space-x-2">
    //                         <PlayCircle className="h-5 w-5 text-blue-600" />
    //                         <span>Bắt đầu học</span>
    //                     </CardTitle>
    //                     <CardDescription>
    //                         Tiếp tục bài học hiện tại hoặc bắt đầu bài học mới
    //                     </CardDescription>
    //                 </CardHeader>
    //                 <CardContent>
    //                     <Link to="/lessons">
    //                         <Button className="w-full">
    //                             <BookOpen className="h-4 w-4 mr-2" />
    //                             Xem tất cả bài học
    //                         </Button>
    //                     </Link>
    //                 </CardContent>
    //             </Card>

    //             <Card className="hover:shadow-lg transition-shadow">
    //                 <CardHeader>
    //                     <CardTitle className="flex items-center space-x-2">
    //                         <Star className="h-5 w-5 text-yellow-600" />
    //                         <span>Thành tích</span>
    //                     </CardTitle>
    //                     <CardDescription>
    //                         Xem các thành tích và huy hiệu bạn đã đạt được
    //                     </CardDescription>
    //                 </CardHeader>
    //                 <CardContent>
    //                     <Button variant="outline" className="w-full">
    //                         <Trophy className="h-4 w-4 mr-2" />
    //                         Xem thành tích
    //                     </Button>
    //                 </CardContent>
    //             </Card>
    //         </div>

    //         {/* Recent Activity */}
    //         <Card>
    //             <CardHeader>
    //                 <CardTitle className="flex items-center space-x-2">
    //                     <Clock className="h-5 w-5" />
    //                     <span>Hoạt động gần đây</span>
    //                 </CardTitle>
    //             </CardHeader>
    //             <CardContent>
    //                 <div className="space-y-3">
    //                     {learnedWords.slice(-3).map((word, index) => (
    //                         <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
    //                             <BookOpen className="h-4 w-4 text-blue-600" />
    //                             <div>
    //                                 <p className="font-medium">{word.english}</p>
    //                                 <p className="text-sm text-gray-600">{word.vietnamese}</p>
    //                             </div>
    //                             <Badge variant="secondary" className="ml-auto">
    //                                 Đã học
    //                             </Badge>
    //                         </div>
    //                     ))}
    //                     {learnedWords.length === 0 && (
    //                         <p className="text-gray-500 text-center py-4">
    //                             Chưa có hoạt động nào. Hãy bắt đầu học ngay!
    //                         </p>
    //                     )}
    //                 </div>
    //             </CardContent>
    //         </Card>

    //         {/* Community Section */}
    //         <Card>
    //             <CardHeader>
    //                 <CardTitle className="flex items-center space-x-2">
    //                     <Users className="h-5 w-5" />
    //                     <span>Cộng đồng học tập</span>
    //                 </CardTitle>
    //                 <CardDescription>
    //                     Kết nối với những người học khác và chia sẻ kinh nghiệm
    //                 </CardDescription>
    //             </CardHeader>
    //             <CardContent>
    //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    //                     <div className="text-center p-4 bg-blue-50 rounded-lg">
    //                         <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
    //                         <p className="font-medium">1,234</p>
    //                         <p className="text-sm text-gray-600">Người học</p>
    //                     </div>
    //                     <div className="text-center p-4 bg-green-50 rounded-lg">
    //                         <Trophy className="h-8 w-8 text-green-600 mx-auto mb-2" />
    //                         <p className="font-medium">5,678</p>
    //                         <p className="text-sm text-gray-600">Bài học hoàn thành</p>
    //                     </div>
    //                     <div className="text-center p-4 bg-purple-50 rounded-lg">
    //                         <Star className="h-8 w-8 text-purple-600 mx-auto mb-2" />
    //                         <p className="font-medium">9,012</p>
    //                         <p className="text-sm text-gray-600">Từ đã học</p>
    //                     </div>
    //                 </div>
    //             </CardContent>
    //         </Card>
    //     </div>
    // )
}

