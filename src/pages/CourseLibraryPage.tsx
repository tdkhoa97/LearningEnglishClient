import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { PageHeader } from "@/components/Layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
    BookOpen,
    GraduationCap,
    Library,
    Clock,
    Target,
    Trophy,
    Star,
    Lock,
    Play,
    CheckCircle2,
    TrendingUp,
    Award,
    BookMarked,
    Sparkles,
    Filter,
    Search,
    ChevronRight
} from "lucide-react";
import {
    Course,
    CourseType,
    CourseLevel,
    allCourses,
    getFeaturedCourses,
    getCoursesByType
} from "@/lib/courseData";

const levelInfo = {
    A1: { label: "Beginner", labelVi: "Sơ Cấp", color: "bg-green-100 text-green-700", icon: "🌱" },
    A2: { label: "Elementary", labelVi: "Cơ Bản", color: "bg-lime-100 text-lime-700", icon: "🌿" },
    B1: { label: "Intermediate", labelVi: "Trung Cấp", color: "bg-yellow-100 text-yellow-700", icon: "⭐" },
    B2: { label: "Upper-Int", labelVi: "Khá", color: "bg-orange-100 text-orange-700", icon: "🔥" },
    C1: { label: "Advanced", labelVi: "Nâng Cao", color: "bg-red-100 text-red-700", icon: "💎" },
    C2: { label: "Proficient", labelVi: "Thành Thạo", color: "bg-purple-100 text-purple-700", icon: "👑" },
};

interface CourseLibraryPageProps {
    onSelectCourse?: (courseId: string) => void;
}

export function CourseLibraryPage({ onSelectCourse }: CourseLibraryPageProps) {
    const [selectedLevel, setSelectedLevel] = useState<CourseLevel | "all">("all");
    const [selectedType, setSelectedType] = useState<CourseType | "all">("all");
    const [searchQuery, setSearchQuery] = useState("");

    const featuredCourses = getFeaturedCourses();

    const filteredCourses = allCourses.filter(course => {
        const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;
        const matchesType = selectedType === "all" || course.type === selectedType;
        const matchesSearch = searchQuery === "" ||
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.titleVi.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesLevel && matchesType && matchesSearch;
    });

    const handleSelectCourse = (courseId: string) => {
        if (onSelectCourse) {
            onSelectCourse(courseId);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-pink-50 w-full overflow-auto">
            <PageHeader
                title="Course Library 📚"
                subtitle="Structured learning programs from Cambridge, Oxford & more"
            />

            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Hero Section */}
                <Card className="p-8 mb-8 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white border-0 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>

                    <div className="relative flex flex-col lg:flex-row items-center gap-6">
                        <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                            <Library className="w-10 h-10 text-white" />
                        </div>
                        <div className="flex-1 text-center lg:text-left">
                            <h2 className="text-white mb-3">Thư Viện Khóa Học Toàn Diện 📖</h2>
                            <p className="text-white/90 mb-4 text-lg">
                                Học tiếng Anh có hệ thống với các giáo trình nổi tiếng từ Cambridge, Oxford và sách giáo khoa Việt Nam.
                                Mỗi khóa học được thiết kế bài bản với Units, Lessons và Exercises đầy đủ.
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm justify-center lg:justify-start">
                                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                                    <BookOpen className="w-4 h-4" />
                                    <span>{allCourses.length} Courses</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                                    <Target className="w-4 h-4" />
                                    <span>CEFR A1-C2</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                                    <Award className="w-4 h-4" />
                                    <span>Structured Learning</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                                    <Sparkles className="w-4 h-4" />
                                    <span>Track Progress</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <Card className="p-6 bg-white border-2 border-purple-200 text-center hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                            <Library className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="text-2xl text-purple-600 mb-1">{allCourses.length}</div>
                        <div className="text-sm text-gray-600">Total Courses</div>
                    </Card>
                    <Card className="p-6 bg-white border-2 border-blue-200 text-center hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                            <BookMarked className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="text-2xl text-blue-600 mb-1">0</div>
                        <div className="text-sm text-gray-600">In Progress</div>
                    </Card>
                    <Card className="p-6 bg-white border-2 border-green-200 text-center hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="text-2xl text-green-600 mb-1">0</div>
                        <div className="text-sm text-gray-600">Completed</div>
                    </Card>
                    <Card className="p-6 bg-white border-2 border-amber-200 text-center hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                            <Trophy className="w-6 h-6 text-amber-600" />
                        </div>
                        <div className="text-2xl text-amber-600 mb-1">0</div>
                        <div className="text-sm text-gray-600">Certificates</div>
                    </Card>
                </div>

                {/* Featured Courses */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-6">
                        <Sparkles className="w-6 h-6 text-amber-500" />
                        <h2 className="text-gray-800">Featured Courses ⭐</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {featuredCourses.map((course) => (
                            <Card
                                key={course.id}
                                className={`group p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-2 ${course.bgColor} border-${course.color}-300 relative overflow-hidden`}
                                onClick={() => handleSelectCourse(course.id)}
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>

                                <div className="relative">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="text-6xl group-hover:scale-110 transition-transform">{course.icon}</div>
                                        <Badge className={`${levelInfo[course.level].color} shadow-sm`}>
                                            {levelInfo[course.level].icon} {levelInfo[course.level].labelVi}
                                        </Badge>
                                    </div>

                                    <h3 className={`text-${course.color}-800 mb-2`}>
                                        {course.titleVi}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-1">{course.title}</p>
                                    <p className="text-xs text-gray-500 mb-4">{course.publisher}</p>

                                    <p className="text-sm text-gray-700 mb-4 min-h-[60px]">
                                        {course.description}
                                    </p>

                                    <div className="space-y-2 mb-4 bg-white/60 p-3 rounded-lg backdrop-blur-sm">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-gray-600 flex items-center gap-1">
                                                <BookOpen className="w-3 h-3" />
                                                Units
                                            </span>
                                            <span className={`text-${course.color}-700`}>{course.totalUnits} units</span>
                                        </div>
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-gray-600 flex items-center gap-1">
                                                <Target className="w-3 h-3" />
                                                Lessons
                                            </span>
                                            <span className={`text-${course.color}-700`}>{course.totalLessons} lessons</span>
                                        </div>
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-gray-600 flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                Duration
                                            </span>
                                            <span className={`text-${course.color}-700`}>{course.duration}</span>
                                        </div>
                                    </div>

                                    {course.progress > 0 && (
                                        <div className="mb-4">
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-gray-600">Progress</span>
                                                <span className={`text-${course.color}-700`}>{course.progress}%</span>
                                            </div>
                                            <Progress value={course.progress} className="h-2" />
                                        </div>
                                    )}

                                    <Button
                                        className={`w-full bg-gradient-to-r ${course.gradient} text-white hover:opacity-90 shadow-lg group-hover:shadow-xl transition-all`}
                                    >
                                        {course.progress > 0 ? "Continue Learning" : "Start Course"}
                                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Filters & All Courses */}
                <div>
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-gray-800 mb-1">All Courses 📖</h2>
                            <p className="text-sm text-gray-600">Browse by level, publisher, or search</p>
                        </div>

                        {/* Search */}
                        <div className="relative w-full lg:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-300 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <Tabs defaultValue="all" className="mb-6">
                        <TabsList className="bg-white border-2 border-gray-200 p-1">
                            <TabsTrigger value="all" onClick={() => setSelectedType("all")}>
                                All Types
                            </TabsTrigger>
                            <TabsTrigger value="cambridge" onClick={() => setSelectedType("cambridge")}>
                                📘 Cambridge
                            </TabsTrigger>
                            <TabsTrigger value="oxford" onClick={() => setSelectedType("oxford")}>
                                📕 Oxford
                            </TabsTrigger>
                            <TabsTrigger value="textbook" onClick={() => setSelectedType("textbook")}>
                                🇻🇳 Textbook
                            </TabsTrigger>
                            <TabsTrigger value="grammar" onClick={() => setSelectedType("grammar")}>
                                📐 Grammar
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>

                    {/* Level Filter Pills */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        <Badge
                            className={`cursor-pointer px-4 py-2 ${selectedLevel === "all"
                                ? "bg-purple-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            onClick={() => setSelectedLevel("all")}
                        >
                            All Levels
                        </Badge>
                        {(Object.keys(levelInfo) as CourseLevel[]).map((level) => (
                            <Badge
                                key={level}
                                className={`cursor-pointer px-4 py-2 ${selectedLevel === level
                                    ? levelInfo[level].color.replace("100", "600").replace("700", "100")
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                onClick={() => setSelectedLevel(level)}
                            >
                                {levelInfo[level].icon} {level} - {levelInfo[level].labelVi}
                            </Badge>
                        ))}
                    </div>

                    {/* Courses Grid */}
                    {filteredCourses.length === 0 ? (
                        <Card className="p-12 text-center bg-white">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-gray-800 mb-2">No courses found</h3>
                            <p className="text-gray-600">Try adjusting your filters or search query</p>
                        </Card>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCourses.map((course) => (
                                <Card
                                    key={course.id}
                                    className={`group p-6 cursor-pointer transition-all duration-300 hover:shadow-lg border-2 bg-white hover:${course.bgColor} border-gray-200 hover:border-${course.color}-300`}
                                    onClick={() => handleSelectCourse(course.id)}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="text-5xl group-hover:scale-110 transition-transform">{course.icon}</div>
                                            <div>
                                                <h3 className="text-gray-800 mb-1">{course.titleVi}</h3>
                                                <p className="text-xs text-gray-500">{course.publisher}</p>
                                            </div>
                                        </div>
                                        <Badge className={`${levelInfo[course.level].color} shadow-sm text-xs`}>
                                            {course.level}
                                        </Badge>
                                    </div>

                                    <p className="text-sm text-gray-600 mb-4 min-h-[40px]">{course.description}</p>

                                    <div className="flex items-center gap-4 mb-4 text-xs text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <BookOpen className="w-3 h-3" />
                                            {course.totalUnits} units
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Target className="w-3 h-3" />
                                            {course.totalLessons} lessons
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {course.duration}
                                        </span>
                                    </div>

                                    {course.progress > 0 && (
                                        <div className="mb-4">
                                            <Progress value={course.progress} className="h-2" />
                                        </div>
                                    )}

                                    <Button
                                        variant="outline"
                                        className={`w-full border-${course.color}-300 hover:bg-${course.color}-50 group`}
                                    >
                                        View Course
                                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
