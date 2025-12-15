import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    GraduationCap,
    Trophy,
    Clock,
    BookOpen,
    Target,
    TrendingUp,
    Star,
    Lock,
    Play,
    CheckCircle2,
    ArrowRight,
    Award,
    BarChart3,
    Calendar,
    Sparkles,
    ChevronRight,
    TrendingDown,
    Info
} from "lucide-react";
import { ExamType, examTypes, getMockTestsByExam, MockTest, ExamInfo } from "@/lib/examData";

const difficultyBadge = {
    easy: { label: "Dễ", color: "bg-green-100 text-green-700", icon: "😊" },
    medium: { label: "Trung Bình", color: "bg-yellow-100 text-yellow-700", icon: "🤔" },
    hard: { label: "Khó", color: "bg-red-100 text-red-700", icon: "🔥" },
};

export function ExamPrepPage() {
    const [selectedExam, setSelectedExam] = useState<ExamType | null>(null);

    const handleSelectExam = (examType: ExamType) => {
        setSelectedExam(examType);
    };

    const handleStartTest = (test: MockTest) => {
        if (!test.locked) {
            console.log("Starting test:", test.id);
            // Navigate to test page
        }
    };

    if (!selectedExam) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-pink-50 w-full overflow-auto">
                <PageHeader
                    title="Exam Preparation 🎓"
                    subtitle="Prepare for international English certifications"
                />

                <main className="max-w-7xl mx-auto px-4 py-8">
                    {/* Hero Card */}
                    <Card className="p-8 mb-8 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white border-0 shadow-xl">
                        <div className="flex flex-col lg:flex-row items-center gap-6">
                            <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                                <GraduationCap className="w-10 h-10 text-white" />
                            </div>
                            <div className="flex-1 text-center lg:text-left">
                                <h2 className="text-white mb-3">Luyện Thi Chứng Chỉ Quốc Tế 🌍</h2>
                                <p className="text-white/90 mb-4 text-lg">
                                    Chuẩn bị cho các kỳ thi TOEIC, IELTS, TOEFL và các chứng chỉ tiếng Anh quốc tế khác
                                    với đề thi thử chuẩn format và giải thích chi tiết.
                                </p>
                                <div className="flex flex-wrap gap-4 text-sm justify-center lg:justify-start">
                                    <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                                        <BookOpen className="w-4 h-4" />
                                        <span>100+ đề thi thử</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                                        <Target className="w-4 h-4" />
                                        <span>Chuẩn format mới nhất</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                                        <Award className="w-4 h-4" />
                                        <span>Giải thích chi tiết</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                                        <TrendingUp className="w-4 h-4" />
                                        <span>Tracking tiến độ</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <Card className="p-6 bg-white border-2 border-blue-200 text-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                <BookOpen className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="text-2xl text-blue-600 mb-1">6</div>
                            <div className="text-sm text-gray-600">Chứng chỉ</div>
                        </Card>
                        <Card className="p-6 bg-white border-2 border-green-200 text-center">
                            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                <CheckCircle2 className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="text-2xl text-green-600 mb-1">100+</div>
                            <div className="text-sm text-gray-600">Đề thi thử</div>
                        </Card>
                        <Card className="p-6 bg-white border-2 border-amber-200 text-center">
                            <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                <Trophy className="w-6 h-6 text-amber-600" />
                            </div>
                            <div className="text-2xl text-amber-600 mb-1">0</div>
                            <div className="text-sm text-gray-600">Đã hoàn thành</div>
                        </Card>
                        <Card className="p-6 bg-white border-2 border-purple-200 text-center">
                            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                <Sparkles className="w-6 h-6 text-purple-600" />
                            </div>
                            <div className="text-2xl text-purple-600 mb-1">--</div>
                            <div className="text-sm text-gray-600">Điểm cao nhất</div>
                        </Card>
                    </div>

                    {/* Popular Exams */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-gray-800 mb-1">Popular Exams 🌟</h2>
                                <p className="text-gray-600 text-sm">Các kỳ thi được lựa chọn nhiều nhất</p>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {examTypes.filter(exam => exam.popular).map((exam) => (
                                <Card
                                    key={exam.id}
                                    onClick={() => handleSelectExam(exam.id)}
                                    className={`group p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-2 ${exam.bgColor} border-${exam.color}-300 relative overflow-hidden`}
                                >
                                    {/* Background decoration */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/30 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>

                                    <div className="relative">
                                        <div className="text-center mb-4">
                                            <div className="text-7xl mb-4 group-hover:scale-110 transition-transform duration-300">{exam.icon}</div>
                                            <h3 className={`text-${exam.color}-800 mb-2`}>
                                                {exam.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-3">{exam.fullName}</p>
                                            <Badge className="mb-3 bg-white border border-gray-300 shadow-sm">
                                                {exam.difficulty}
                                            </Badge>
                                        </div>

                                        <p className="text-gray-700 text-sm mb-4 text-center min-h-[40px]">
                                            {exam.description}
                                        </p>

                                        <div className="space-y-2 mb-4 bg-white/50 p-3 rounded-lg backdrop-blur-sm">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600 flex items-center gap-2">
                                                    <Clock className="w-4 h-4" />
                                                    Thời gian
                                                </span>
                                                <span className={`text-${exam.color}-700`}>{exam.duration}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600 flex items-center gap-2">
                                                    <Trophy className="w-4 h-4" />
                                                    Điểm tối đa
                                                </span>
                                                <span className={`text-${exam.color}-700`}>{exam.targetScore}</span>
                                            </div>
                                        </div>

                                        <div className={`p-3 bg-white rounded-lg mb-4 border border-${exam.color}-200`}>
                                            <p className="text-xs text-gray-600 mb-2 flex items-center gap-1">
                                                <BookOpen className="w-3 h-3" />
                                                Các phần thi:
                                            </p>
                                            <div className="space-y-1">
                                                {exam.sections.map((section, idx) => (
                                                    <div key={idx} className="flex items-center gap-2 text-sm">
                                                        <CheckCircle2 className={`w-4 h-4 text-${exam.color}-500`} />
                                                        <span className="text-gray-700">{section}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <Button
                                            className={`w-full bg-gradient-to-r ${exam.gradient} text-white hover:opacity-90 shadow-lg group-hover:shadow-xl transition-all`}
                                            onClick={() => handleSelectExam(exam.id)}
                                        >
                                            Bắt đầu luyện thi
                                            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </div>
                                </Card>
                            ))}</div>
                    </div>

                    {/* Other Exams */}
                    <div>
                        <div className="mb-6">
                            <h2 className="text-gray-800 mb-1">Other Certifications 📚</h2>
                            <p className="text-gray-600 text-sm">Các chứng chỉ tiếng Anh khác</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {examTypes.filter(exam => !exam.popular).map((exam) => (
                                <Card
                                    key={exam.id}
                                    onClick={() => handleSelectExam(exam.id)}
                                    className={`group p-6 cursor-pointer transition-all duration-300 hover:shadow-lg border-2 bg-white hover:${exam.bgColor} border-gray-200 hover:border-${exam.color}-300`}
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="text-6xl group-hover:scale-110 transition-transform">{exam.icon}</div>
                                        <div className="flex-1">
                                            <h3 className="text-gray-800 mb-1">{exam.name}</h3>
                                            <Badge className="bg-gray-100 text-gray-700 text-xs">
                                                {exam.difficulty}
                                            </Badge>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-4 min-h-[40px]">{exam.description}</p>
                                    <div className="space-y-2 mb-4 text-xs text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-3 h-3" />
                                            <span>{exam.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Trophy className="w-3 h-3" />
                                            <span>{exam.targetScore}</span>
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        className={`w-full border-${exam.color}-300 hover:bg-${exam.color}-50 group`}
                                    >
                                        Xem chi tiết
                                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Comparison Table */}
                    <Card className="mt-8 p-6 bg-white border-2 border-gray-200">
                        <h3 className="text-gray-800 mb-4 flex items-center gap-2">
                            <BarChart3 className="w-5 h-5" />
                            So Sánh Các Kỳ Thi
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b-2 border-gray-200">
                                        <th className="text-left py-3 px-2 text-gray-700">Kỳ thi</th>
                                        <th className="text-left py-3 px-2 text-gray-700">Độ khó</th>
                                        <th className="text-left py-3 px-2 text-gray-700">Thời gian</th>
                                        <th className="text-left py-3 px-2 text-gray-700">Mục đích</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                                        <td className="py-3 px-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl">💼</span>
                                                <span className="text-gray-800">TOEIC L&R</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-2">
                                            <Badge className="bg-yellow-100 text-yellow-700">Trung bình</Badge>
                                        </td>
                                        <td className="py-3 px-2 text-gray-600">120 phút</td>
                                        <td className="py-3 px-2 text-gray-600">Công việc, giao tiếp</td>
                                    </tr>
                                    <tr className="border-b border-gray-100 hover:bg-red-50 transition-colors">
                                        <td className="py-3 px-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl">🎓</span>
                                                <span className="text-gray-800">IELTS</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-2">
                                            <Badge className="bg-red-100 text-red-700">Khó</Badge>
                                        </td>
                                        <td className="py-3 px-2 text-gray-600">165 phút</td>
                                        <td className="py-3 px-2 text-gray-600">Du học, định cư</td>
                                    </tr>
                                    <tr className="border-b border-gray-100 hover:bg-indigo-50 transition-colors">
                                        <td className="py-3 px-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl">🏛️</span>
                                                <span className="text-gray-800">TOEFL iBT</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-2">
                                            <Badge className="bg-red-100 text-red-700">Khó</Badge>
                                        </td>
                                        <td className="py-3 px-2 text-gray-600">180 phút</td>
                                        <td className="py-3 px-2 text-gray-600">Du học Mỹ</td>
                                    </tr>
                                    <tr className="hover:bg-green-50 transition-colors">
                                        <td className="py-3 px-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl">🇻🇳</span>
                                                <span className="text-gray-800">VSTEP</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-2">
                                            <Badge className="bg-yellow-100 text-yellow-700">Trung bình</Badge>
                                        </td>
                                        <td className="py-3 px-2 text-gray-600">150 phút</td>
                                        <td className="py-3 px-2 text-gray-600">Chuẩn VN, đại học</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </main>
            </div>
        );
    }

    // Exam Detail View
    const currentExam = examTypes.find(e => e.id === selectedExam);
    const mockTests = getMockTestsByExam(selectedExam);

    if (!currentExam) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-pink-50 w-full overflow-auto">
            <PageHeader
                title={`${currentExam.name} Preparation ${currentExam.icon}`}
                subtitle={currentExam.description}
            />

            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Back Button */}
                <Button
                    variant="outline"
                    onClick={() => setSelectedExam(null)}
                    className="mb-6 hover:bg-gray-100"
                >
                    ← Quay lại chọn kỳ thi
                </Button>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Sidebar - Exam Info */}
                    <div className="lg:col-span-1 space-y-4">
                        {/* Exam Overview */}
                        <Card className={`p-6 ${currentExam.bgColor} border-2 border-${currentExam.color}-300 shadow-lg`}>
                            <div className="text-center mb-4">
                                <div className="text-7xl mb-3">{currentExam.icon}</div>
                                <h3 className={`text-${currentExam.color}-800 mb-2`}>
                                    {currentExam.name}
                                </h3>
                                <p className="text-sm text-gray-600">{currentExam.fullName}</p>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                                    <div className="flex items-center gap-2">
                                        <Clock className={`w-5 h-5 text-${currentExam.color}-600`} />
                                        <span className="text-sm text-gray-700">Thời gian</span>
                                    </div>
                                    <span className="text-gray-800">{currentExam.duration}</span>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                                    <div className="flex items-center gap-2">
                                        <Trophy className={`w-5 h-5 text-${currentExam.color}-600`} /><span className="text-sm text-gray-700">Điểm tối đa</span>
                                    </div>
                                    <span className="text-gray-800">{currentExam.targetScore}</span>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                                    <div className="flex items-center gap-2">
                                        <BarChart3 className={`w-5 h-5 text-${currentExam.color}-600`} />
                                        <span className="text-sm text-gray-700">Độ khó</span>
                                    </div>
                                    <Badge className={`bg-${currentExam.color}-100 text-${currentExam.color}-700`}>
                                        {currentExam.difficulty}
                                    </Badge>
                                </div>
                            </div>
                        </Card>

                        {/* Exam Structure */}
                        <Card className="p-6 bg-white border-2 border-gray-200 shadow-lg">
                            <h4 className="text-gray-800 mb-4 flex items-center gap-2">
                                <BookOpen className="w-5 h-5" />
                                Cấu trúc bài thi
                            </h4>
                            <div className="space-y-2">
                                {currentExam.sections.map((section, idx) => (
                                    <div key={idx} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                        <CheckCircle2 className={`w-5 h-5 text-${currentExam.color}-500 flex-shrink-0 mt-0.5`} />
                                        <span className="text-sm text-gray-700">{section}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Study Progress */}
                        <Card className={`p-6 bg-gradient-to-br ${currentExam.bgColor} border-2 border-${currentExam.color}-300 shadow-lg`}>
                            <h4 className="text-gray-800 mb-4 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5" />
                                Tiến độ học tập
                            </h4>
                            <div className="space-y-3">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-700">Hoàn thành</span>
                                        <span className={`text-${currentExam.color}-700`}>0/{mockTests.length}</span>
                                    </div>
                                    <Progress value={0} className="h-2" />
                                </div>
                                <div className="flex items-center justify-between text-sm p-3 bg-white rounded-lg">
                                    <span className="text-gray-700">Điểm cao nhất</span>
                                    <span className={`text-${currentExam.color}-700`}>--</span>
                                </div>
                                <div className="flex items-center justify-between text-sm p-3 bg-white rounded-lg">
                                    <span className="text-gray-700">Lần thi gần nhất</span>
                                    <span className="text-gray-600">Chưa có</span>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right Content - Mock Tests */}
                    <div className="lg:col-span-2">
                        <div className="mb-6">
                            <h2 className="text-gray-800 mb-2">Đề Thi Thử</h2>
                            <p className="text-gray-600">
                                Luyện tập với các đề thi thử chuẩn format, được cập nhật liên tục
                            </p>
                        </div>

                        {mockTests.length === 0 ? (
                            <Card className="p-12 text-center bg-white shadow-lg">
                                <div className="text-7xl mb-4">🚧</div>
                                <h3 className="text-gray-800 mb-2">Coming Soon!</h3>
                                <p className="text-gray-600 mb-4">
                                    Đề thi thử cho {currentExam.name} đang được cập nhật. Vui lòng quay lại sau!
                                </p>
                                <Button
                                    variant="outline"
                                    onClick={() => setSelectedExam(null)}
                                    className="mt-4"
                                >
                                    Chọn kỳ thi khác
                                </Button>
                            </Card>
                        ) : (
                            <div className="space-y-4">
                                {mockTests.map((test) => (
                                    <Card
                                        key={test.id}
                                        className={`p-6 bg-white border-2 transition-all duration-300 shadow-md hover:shadow-xl ${test.locked
                                            ? 'border-gray-200 opacity-60'
                                            : `border-gray-200 hover:border-${currentExam.color}-300 cursor-pointer`
                                            }`}
                                        onClick={() => handleStartTest(test)}
                                    >
                                        <div className="flex items-start gap-4">
                                            {/* Icon */}
                                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentExam.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                                                {test.locked ? (
                                                    <Lock className="w-8 h-8 text-white" />
                                                ) : test.completed ? (
                                                    <CheckCircle2 className="w-8 h-8 text-white" />
                                                ) : (
                                                    <Play className="w-8 h-8 text-white" />
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <h3 className="text-gray-800 mb-1">{test.title}</h3>
                                                        <p className="text-gray-600 text-sm">{test.description}</p>
                                                    </div>
                                                    {test.completed && (
                                                        <Badge className="bg-green-100 text-green-700 shadow-sm">
                                                            <Trophy className="w-3 h-3 mr-1" />
                                                            {test.bestScore}
                                                        </Badge>
                                                    )}
                                                </div>

                                                {/* Metadata */}
                                                <div className="flex flex-wrap gap-3 mb-4">
                                                    <Badge className={`${difficultyBadge[test.difficulty].color} shadow-sm`}>
                                                        {difficultyBadge[test.difficulty].icon} {difficultyBadge[test.difficulty].label}
                                                    </Badge>
                                                    <div className="flex items-center gap-1 text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                                                        <Clock className="w-4 h-4" />
                                                        <span>{test.duration} phút</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                                                        <Target className="w-4 h-4" />
                                                        <span>{test.totalQuestions} câu hỏi</span>
                                                    </div>
                                                    {test.attempts > 0 && (
                                                        <div className="flex items-center gap-1 text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                                            <Calendar className="w-4 h-4" />
                                                            <span>Đã thi {test.attempts} lần</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Action Button */}
                                                {!test.locked && (
                                                    <Button
                                                        className={`bg-gradient-to-r ${currentExam.gradient} text-white hover:opacity-90 shadow-lg`}
                                                        onClick={() => handleStartTest(test)}
                                                    >
                                                        {test.completed ? 'Thi lại' : 'Bắt đầu thi'} →
                                                    </Button>
                                                )}
                                                {test.locked && (
                                                    <Button variant="outline" disabled className="cursor-not-allowed">
                                                        <Lock className="w-4 h-4 mr-2" />
                                                        Locked - Hoàn thành đề trước
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
