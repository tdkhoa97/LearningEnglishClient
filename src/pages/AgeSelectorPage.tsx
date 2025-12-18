import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CatLogo } from "@/components/CatLogo";
import { Sparkles, GraduationCap, Briefcase, BookOpen, Zap, Target } from "lucide-react";
import { AgeGroup } from "@/types";

interface AgeSelectorPageProps {
    onSelectAgeGroup: (ageGroup: AgeGroup) => void;
}

export function AgeSelectorPage({ onSelectAgeGroup }: AgeSelectorPageProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-pink-50 w-full overflow-auto">
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-6">
                        <CatLogo size="xl" animated={true} />
                    </div>
                    <h1 className="text-orange-600 mb-4">
                        Chào mừng đến với FunLingo! 🎉
                    </h1>
                    <p className="text-gray-700 text-xl">
                        Chọn nhóm học của bạn để bắt đầu hành trình học tiếng Anh!
                    </p>
                </div>

                {/* Age Group Cards */}
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {/* Elementary School */}
                    <Card
                        className="group relative overflow-hidden bg-gradient-to-br from-pink-50 to-rose-100 border-4 border-pink-300 hover:border-pink-500 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:-translate-y-2"
                        onClick={() => onSelectAgeGroup("elementary")}
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-400/20 rounded-full -mr-16 -mt-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-rose-400/20 rounded-full -ml-12 -mb-12"></div>

                        <div className="relative p-8">
                            <Badge className="bg-pink-500 text-white mb-4">
                                6-11 tuổi
                            </Badge>

                            <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-500 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                                <Sparkles className="w-10 h-10 text-white" />
                            </div>

                            <h2 className="text-pink-800 mb-3">
                                Tiểu Học
                            </h2>

                            <p className="text-pink-700 mb-6">
                                Học tiếng Anh vui nhộn qua trò chơi, hình ảnh đẹp và các bài hát thú vị! 🎨✨
                            </p>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-2 text-pink-700">
                                    <span className="text-2xl">🎮</span>
                                    <span>Mini-games siêu vui</span>
                                </div>
                                <div className="flex items-center gap-2 text-pink-700">
                                    <span className="text-2xl">🎵</span>
                                    <span>Học qua bài hát</span>
                                </div>
                                <div className="flex items-center gap-2 text-pink-700">
                                    <span className="text-2xl">⭐</span>
                                    <span>Nhận ngôi sao & phần thưởng</span>
                                </div>
                            </div>

                            <Button
                                className="w-full h-14 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-2xl shadow-lg group-hover:shadow-xl transition-all"
                            >
                                Bắt đầu học! 🚀
                            </Button>
                        </div>
                    </Card>

                    {/* Middle School */}
                    <Card
                        className="group relative overflow-hidden bg-gradient-to-br from-orange-50 to-amber-100 border-4 border-orange-300 hover:border-orange-500 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:-translate-y-2"
                        onClick={() => onSelectAgeGroup("middle")}
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-400/20 rounded-full -mr-16 -mt-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-400/20 rounded-full -ml-12 -mb-12"></div>

                        <div className="relative p-8">
                            <Badge className="bg-orange-500 text-white mb-4">
                                12-17 tuổi
                            </Badge>

                            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                                <GraduationCap className="w-10 h-10 text-white" />
                            </div>

                            <h2 className="text-orange-800 mb-3">
                                Trung Học
                            </h2>

                            <p className="text-orange-700 mb-6">
                                Nâng cao kỹ năng với thử thách hấp dẫn, thi đấu với bạn bè và xếp hạng! 🏆🎯
                            </p>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-2 text-orange-700">
                                    <span className="text-2xl">🎯</span>
                                    <span>Thử thách thú vị</span>
                                </div>
                                <div className="flex items-center gap-2 text-orange-700">
                                    <span className="text-2xl">🏆</span>
                                    <span>Cạnh tranh bảng xếp hạng</span>
                                </div>
                                <div className="flex items-center gap-2 text-orange-700">
                                    <span className="text-2xl">💬</span>
                                    <span>Luyện nói & viết thực tế</span>
                                </div>
                            </div>

                            <Button
                                className="w-full h-14 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-2xl shadow-lg group-hover:shadow-xl transition-all"
                            >
                                Thử thách ngay! 💪
                            </Button>
                        </div>
                    </Card>

                    {/* Adult */}
                    <Card
                        className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 border-4 border-blue-300 hover:border-blue-500 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:-translate-y-2"
                        onClick={() => onSelectAgeGroup("adult")}
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/20 rounded-full -mr-16 -mt-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-400/20 rounded-full -ml-12 -mb-12"></div>

                        <div className="relative p-8">
                            <Badge className="bg-blue-500 text-white mb-4">
                                18+ tuổi
                            </Badge>

                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                                <Briefcase className="w-10 h-10 text-white" />
                            </div>

                            <h2 className="text-blue-800 mb-3">
                                Người Lớn
                            </h2>

                            <p className="text-blue-700 mb-6">
                                Tiếng Anh thực tế cho công việc, du lịch và giao tiếp hàng ngày! 💼✈️
                            </p>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-2 text-blue-700">
                                    <span className="text-2xl">💼</span>
                                    <span>Tiếng Anh công việc</span>
                                </div>
                                <div className="flex items-center gap-2 text-blue-700">
                                    <span className="text-2xl">✈️</span>
                                    <span>Giao tiếp du lịch</span>
                                </div>
                                <div className="flex items-center gap-2 text-blue-700">
                                    <span className="text-2xl">📈</span>
                                    <span>Nâng cao sự nghiệp</span>
                                </div>
                            </div>

                            <Button
                                className="w-full h-14 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-2xl shadow-lg group-hover:shadow-xl transition-all"
                            >
                                Bắt đầu học! 🎓
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Features */}
                <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-orange-200">
                    <h3 className="text-gray-800 text-center mb-8">
                        Tất cả các nhóm đều có 🌟
                    </h3>

                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                <BookOpen className="w-8 h-8 text-white" />
                            </div>
                            <p className="text-gray-700">Học mọi lúc, mọi nơi</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                <Zap className="w-8 h-8 text-white" />
                            </div>
                            <p className="text-gray-700">Bài học ngắn 5-15 phút</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                <Target className="w-8 h-8 text-white" />
                            </div>
                            <p className="text-gray-700">Theo dõi tiến độ</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                <Sparkles className="w-8 h-8 text-white" />
                            </div>
                            <p className="text-gray-700">100% Miễn phí</p>
                        </div>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="text-center mt-8">
                    <p className="text-gray-600">
                        💡 Mẹo: Bạn có thể thay đổi nhóm học bất cứ lúc nào trong phần Cài đặt
                    </p>
                </div>
            </div>
        </div>
    );
}
