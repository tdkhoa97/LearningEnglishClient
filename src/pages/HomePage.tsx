import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CatLogo } from "@/components/CatLogo";
import { PageHeader } from "@/components/PageHeader";
import {
    Star, Trophy, Users, Globe, Sparkles,
    BookOpen, MessageCircle, Award,
    Target, Gamepad2,
    Music, Palette, Gift, Rocket, Video,
    Briefcase, Plane, BarChart3, GraduationCap,
    CheckCircle2
} from "lucide-react";
import type { AgeGroup } from "@/types";
import { useUserStore } from "@/stores/useUserStore";

// Unified Emerald-Green color scheme - fresh and energizing 🌿
const ageGroupConfig = {
    elementary: {
        title: "Học Tiếng Anh Vui & Dễ Dàng!",
        subtitle: "Cùng mèo FunLingo khám phá thế giới tiếng Anh qua trò chơi thú vị!",
        emoji: "🌱",
        theme: {
            // Soft lime-green theme for kids
            primary: "from-lime-400 to-emerald-400",
            bg: "from-lime-50/40 via-emerald-50/30 to-green-50/40",
            card: "bg-white/85 backdrop-blur-sm border-emerald-200/50",
            button: "bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-lime-600 hover:to-emerald-600",
            badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
            accent: "text-emerald-500",
            accentBorder: "border-emerald-500",
            accentBg: "bg-emerald-500/10",
            iconBg: "from-lime-400 to-emerald-400"
        },
        features: [
            { icon: Gamepad2, title: "Trò Chơi Vui", desc: "Học qua game hấp dẫn" },
            { icon: Music, title: "Bài Hát Hay", desc: "Âm nhạc sinh động" },
            { icon: Palette, title: "Màu Sắc Đẹp", desc: "Giao diện thân thiện" },
            { icon: Gift, title: "Phần Thưởng", desc: "Sao và huy hiệu" }
        ],
        benefits: [
            "🎮 Hơn 300 trò chơi học tập",
            "🎵 100+ bài hát tiếng Anh",
            "⭐ Hệ thống phần thưởng hấp dẫn"
        ]
    },
    middle: {
        title: "Tiếng Anh Thông Minh Hơn!",
        subtitle: "Học tập hiệu quả, thi đấu sôi động, chinh phục mọi thử thách!",
        emoji: "🚀",
        theme: {
            // Vibrant emerald-green theme for teens
            primary: "from-emerald-400 to-green-500",
            bg: "from-emerald-50/40 via-green-50/30 to-teal-50/40",
            card: "bg-white/85 backdrop-blur-sm border-emerald-200/50",
            button: "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700",
            badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
            accent: "text-emerald-500",
            accentBorder: "border-emerald-500",
            accentBg: "bg-emerald-500/10",
            iconBg: "from-emerald-400 to-green-500"
        },
        features: [
            { icon: Target, title: "Mục Tiêu Rõ Ràng", desc: "Lộ trình học tập cá nhân" },
            { icon: Trophy, title: "Xếp Hạng", desc: "Thi đấu toàn quốc" },
            { icon: MessageCircle, title: "Giao Tiếp", desc: "Luyện nói thực tế" },
            { icon: Video, title: "Video Chất", desc: "Nội dung hấp dẫn" }
        ],
        benefits: [
            "🎯 Lộ trình học 500+ bài",
            "🏆 Bảng xếp hạng thời gian thực",
            "💬 Cộng đồng 3M+ học viên"
        ]
    },
    adult: {
        title: "Master English Professionally",
        subtitle: "Career advancement, business fluency, and global communication excellence",
        emoji: "💼",
        theme: {
            // Professional emerald theme for adults
            primary: "from-emerald-500 to-teal-600",
            bg: "from-emerald-50/30 via-teal-50/30 to-green-50/30",
            card: "bg-white/90 backdrop-blur-sm border-emerald-200/50",
            button: "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700",
            badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
            accent: "text-emerald-600",
            accentBorder: "border-emerald-600",
            accentBg: "bg-emerald-600/10",
            iconBg: "from-emerald-500 to-teal-600"
        },
        features: [
            { icon: Briefcase, title: "Business English", desc: "Corporate communication" },
            { icon: Plane, title: "Travel Fluency", desc: "Global confidence" },
            { icon: BarChart3, title: "Career Boost", desc: "Professional growth" },
            { icon: GraduationCap, title: "Certification", desc: "IELTS/TOEIC prep" }
        ],
        benefits: [
            "💼 600+ business lessons",
            "✈️ Travel English mastery",
            "📈 Career-focused curriculum"
        ]
    }
};

export function HomePage() {
    const navigate = useNavigate();
    const { ageGroup } = useUserStore();

    // Default to 'elementary' if ageGroup is not set
    const currentAgeGroup: AgeGroup = ageGroup || 'elementary';
    const config = ageGroupConfig[currentAgeGroup];

    const handleGetStarted = () => {
        navigate('/learn');
    };

    const handleChangeAgeGroup = () => {
        navigate('/age-selector');
    };

    return (
        <div className={`min-h-screen bg-gradient-to-br ${config.theme.bg} w-full overflow-auto`}>
            <PageHeader />

            {/* Hero Section - Redesigned */}
            <section className="relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className={`absolute top-20 right-20 w-64 h-64 bg-gradient-to-br ${config.theme.primary} rounded-full opacity-5 blur-3xl`}></div>
                    <div className={`absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br ${config.theme.primary} rounded-full opacity-5 blur-3xl`}></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 relative">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left Content */}
                        <div className="space-y-8">
                            {/* Badges */}
                            <div className="flex items-center gap-3 flex-wrap">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleChangeAgeGroup}
                                    className="border-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                                >
                                    Đổi Độ Tuổi 🔄
                                </Button>
                            </div>

                            {/* Title Section */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className={`w-20 h-20 bg-gradient-to-br ${config.theme.iconBg} rounded-2xl flex items-center justify-center shadow-lg`}>
                                        <CatLogo size={'md'} />
                                    </div>
                                    <span className="text-6xl">{config.emoji}</span>
                                </div>
                                <h1 className="text-gray-900 text-4xl md:text-5xl leading-tight">
                                    {config.title}
                                </h1>
                                <p className="text-gray-600 text-xl leading-relaxed">
                                    {config.subtitle}
                                </p>
                            </div>

                            {/* Benefits List */}
                            <div className="space-y-3">
                                {config.benefits.map((benefit, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <CheckCircle2 className={`w-5 h-5 ${config.theme.accent}`} />
                                        <span className="text-gray-700">{benefit}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4">
                                <Button
                                    onClick={handleGetStarted}
                                    size="lg"
                                    className={`h-16 px-10 ${config.theme.button} text-white shadow-xl hover:shadow-2xl transition-all text-lg`}
                                >
                                    Bắt Đầu Ngay - Miễn Phí! 🎯
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="h-16 px-10 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 text-lg"
                                >
                                    Xem Demo 📺
                                </Button>
                            </div>

                            {/* Social Proof */}
                            <div className="flex items-center gap-6 pt-4">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className={`w-10 h-10 rounded-full bg-gradient-to-br ${config.theme.iconBg} border-2 border-white flex items-center justify-center text-white text-xs shadow-md`}>
                                            {String.fromCharCode(65 + i)}
                                        </div>
                                    ))}
                                </div>
                                <div className="text-sm">
                                    <p className="text-gray-800">Tham gia cùng <strong>10M+ người học</strong></p>
                                    <div className="flex gap-1 mt-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        ))}
                                        <span className="text-gray-600 ml-1">(4.9/5.0)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right - Enhanced Demo Card */}
                        <div className="relative">
                            <Card className={`relative ${config.theme.card} rounded-3xl p-8 shadow-2xl border`}>
                                <div className="space-y-6">
                                    {/* Header */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-500">Bài học hôm nay</p>
                                            <h3 className="text-gray-900 text-xl">Greetings & Introductions</h3>
                                        </div>
                                        <Badge className={config.theme.badge}>
                                            Lv 3
                                        </Badge>
                                    </div>

                                    {/* Progress */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Tiến độ học tập</span>
                                            <span className="text-gray-900">8/10 bài</span>
                                        </div>
                                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                            <div className={`h-full bg-gradient-to-r ${config.theme.iconBg} rounded-full w-4/5 shadow-sm`}></div>
                                        </div>
                                        <p className="text-xs text-gray-500">Còn 2 bài nữa để hoàn thành!</p>
                                    </div>

                                    {/* Quick Quiz */}
                                    <div className={`${config.theme.card} p-5 rounded-2xl border-2 ${config.theme.badge.replace('bg-', 'border-')}`}>
                                        <div className="flex items-center gap-2 mb-4">
                                            <Sparkles className={`w-5 h-5 ${config.theme.accent}`} />
                                            <p className="text-sm text-gray-700">Quick Practice:</p>
                                        </div>
                                        <p className="text-gray-900 mb-4">Choose the correct greeting:</p>
                                        <div className="space-y-3">
                                            {[
                                                { text: "Good morning!", correct: true },
                                                { text: "Good night!", correct: false },
                                                { text: "Goodbye!", correct: false }
                                            ].map((option, idx) => (
                                                <button
                                                    key={idx}
                                                    className={`w-full p-4 text-left rounded-xl border-2 transition-all ${option.correct
                                                        ? `${config.theme.accentBorder} ${config.theme.accentBg} shadow-md`
                                                        : "border-gray-200 hover:border-gray-300 bg-white hover:shadow-sm"
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span>{option.text}</span>
                                                        {option.correct && <CheckCircle2 className={`w-5 h-5 ${config.theme.accent}`} />}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-3 gap-3">
                                        <Card className={`${config.theme.card} p-4 text-center border`}>
                                            <div className="text-3xl mb-1">🔥</div>
                                            <div className="text-xs text-gray-600">7 ngày</div>
                                        </Card>
                                        <Card className={`${config.theme.card} p-4 text-center border`}>
                                            <div className="text-3xl mb-1">⭐</div>
                                            <div className="text-xs text-gray-600">450 XP</div>
                                        </Card>
                                        <Card className={`${config.theme.card} p-4 text-center border`}>
                                            <div className="text-3xl mb-1">🏆</div>
                                            <div className="text-xs text-gray-600">Top 10%</div>
                                        </Card>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative py-12 bg-white/50 backdrop-blur-sm border-y border-emerald-100">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { icon: Users, value: "10M+", label: "Học viên tích cực" },
                            { icon: BookOpen, value: "500+", label: "Bài học chất lượng" },
                            { icon: Globe, value: "50+", label: "Quốc gia" },
                            { icon: Award, value: "4.9⭐", label: "Đánh giá trung bình" }
                        ].map((stat, idx) => {
                            const IconComponent = stat.icon;
                            return (
                                <div key={idx} className="text-center">
                                    <IconComponent className={`w-8 h-8 ${config.theme.accent} mx-auto mb-3`} />
                                    <div className="text-3xl text-gray-900 mb-1">{stat.value}</div>
                                    <div className="text-sm text-gray-600">{stat.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="relative py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <Badge className={`${config.theme.badge} px-6 py-2 mb-4`}>
                            Tính Năng Nổi Bật
                        </Badge>
                        <h2 className="text-gray-900 text-3xl md:text-4xl mb-4">
                            Tại Sao Chọn FunLingo?
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Hệ thống học tiếng Anh toàn diện với công nghệ AI và phương pháp gamification
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {config.features.map((feature, idx) => {
                            const IconComponent = feature.icon;
                            return (
                                <Card key={idx} className={`${config.theme.card} p-8 hover:shadow-xl transition-all group cursor-pointer border`}>
                                    <div className={`w-16 h-16 bg-gradient-to-br ${config.theme.iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                                        <IconComponent className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-gray-900 text-xl mb-3">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.desc}</p>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="relative py-20 bg-white/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <Badge className={`${config.theme.badge} px-6 py-2 mb-4`}>
                            Quy Trình Đơn Giản
                        </Badge>
                        <h2 className="text-gray-900 text-3xl md:text-4xl mb-4">
                            3 Bước Bắt Đầu
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Chỉ cần 15 phút mỗi ngày để cải thiện tiếng Anh
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                step: "1",
                                icon: Target,
                                title: "Chọn Mục Tiêu",
                                desc: "Xác định trình độ và mục tiêu học tập của bạn"
                            },
                            {
                                step: "2",
                                icon: Rocket,
                                title: "Học Mỗi Ngày",
                                desc: "Hoàn thành bài học và thử thách hàng ngày"
                            },
                            {
                                step: "3",
                                icon: Trophy,
                                title: "Đạt Thành Tích",
                                desc: "Theo dõi tiến bộ và nhận phần thưởng"
                            }
                        ].map((item, idx) => {
                            const IconComponent = item.icon;
                            return (
                                <div key={idx} className="relative">
                                    <Card className={`${config.theme.card} p-8 text-center hover:shadow-xl transition-shadow border`}>
                                        <div className={`w-20 h-20 bg-gradient-to-br ${config.theme.iconBg} rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl shadow-lg`}>
                                            {item.step}
                                        </div>
                                        <IconComponent className={`w-10 h-10 ${config.theme.accent} mx-auto mb-4`} />
                                        <h3 className="text-gray-900 text-xl mb-3">{item.title}</h3>
                                        <p className="text-gray-600">{item.desc}</p>
                                    </Card>
                                    {idx < 2 && (
                                        <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                                            <div className={`text-4xl ${config.theme.accent} opacity-30`}>→</div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-20">
                <div className="max-w-4xl mx-auto px-4">
                    <Card className={`${config.theme.card} p-16 text-center shadow-2xl border-2 ${config.theme.badge.replace('bg-', 'border-')}`}>
                        <div className={`w-24 h-24 bg-gradient-to-br ${config.theme.iconBg} rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl`}>
                            <CatLogo size={'lg'} />
                        </div>
                        <h2 className="text-gray-900 text-3xl md:text-4xl mb-4">
                            Sẵn Sàng Bắt Đầu Hành Trình?
                        </h2>
                        <p className="text-gray-600 text-xl mb-10 max-w-2xl mx-auto">
                            Tham gia hàng triệu người đang học tiếng Anh một cách vui vẻ và hiệu quả với FunLingo! 🌿
                        </p>
                        <Button
                            onClick={handleGetStarted}
                            size="lg"
                            className={`h-20 px-16 ${config.theme.button} text-white shadow-2xl hover:shadow-3xl transition-all text-xl`}
                        >
                            Học Ngay - 100% Miễn Phí! 🚀
                        </Button>
                        <p className="text-sm text-gray-500 mt-6">Không cần thẻ tín dụng • Huỷ bất cứ lúc nào</p>
                    </Card>
                </div>
            </section>

            {/* Footer Spacer */}
            <div className="h-20"></div>
        </div>
    );
}
