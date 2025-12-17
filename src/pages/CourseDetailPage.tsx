import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/PageHeader";
import {
    BookOpen,
    Clock,
    Target,
    Trophy,
    Lock,
    Play,
    CheckCircle2,
    Award,
    ChevronRight,
    ChevronDown,
    Star,
    TrendingUp,
    Headphones,
    MessageSquare,
    PenTool,
    BookMarked,
    ArrowLeft
} from "lucide-react";
import {
    Course,
    Unit,
    Lesson,
    getCourseById,
    getUnitsByCourseId,
    getLessonById
} from "../lib/courseData";

const levelInfo = {
    A1: { label: "Beginner", labelVi: "Sơ Cấp", color: "bg-green-100 text-green-700", icon: "🌱" },
    A2: { label: "Elementary", labelVi: "Cơ Bản", color: "bg-lime-100 text-lime-700", icon: "🌿" },
    B1: { label: "Intermediate", labelVi: "Trung Cấp", color: "bg-yellow-100 text-yellow-700", icon: "⭐" },
    B2: { label: "Upper-Int", labelVi: "Khá", color: "bg-orange-100 text-orange-700", icon: "🔥" },
    C1: { label: "Advanced", labelVi: "Nâng Cao", color: "bg-red-100 text-red-700", icon: "💎" },
    C2: { label: "Proficient", labelVi: "Thành Thạo", color: "bg-purple-100 text-purple-700", icon: "👑" },
};

const lessonTypeIcons = {
    grammar: { icon: BookOpen, color: "text-blue-600", bgColor: "bg-blue-50" },
    vocabulary: { icon: BookMarked, color: "text-purple-600", bgColor: "bg-purple-50" },
    reading: { icon: BookOpen, color: "text-green-600", bgColor: "bg-green-50" },
    listening: { icon: Headphones, color: "text-cyan-600", bgColor: "bg-cyan-50" },
    speaking: { icon: MessageSquare, color: "text-rose-600", bgColor: "bg-rose-50" },
    writing: { icon: PenTool, color: "text-amber-600", bgColor: "bg-amber-50" },
    mixed: { icon: Target, color: "text-indigo-600", bgColor: "bg-indigo-50" },
};

interface CourseDetailPageProps {
    courseId: string;
    onBack: () => void;
    onStartLesson?: (lessonId: string) => void;
}

export function CourseDetailPage({ courseId, onBack, onStartLesson }: CourseDetailPageProps) {
    const [expandedUnit, setExpandedUnit] = useState<string | null>(null);

    const course = getCourseById(courseId);
    const units = getUnitsByCourseId(courseId);

    if (!course) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-pink-50 p-8">
                <Card className="p-12 text-center">
                    <div className="text-6xl mb-4">😕</div>
                    <h3 className="text-gray-800 mb-2">Course not found</h3>
                    <Button onClick={onBack} className="mt-4">← Back to Library</Button>
                </Card>
            </div>
        );
    }

    const toggleUnit = (unitId: string) => {
        setExpandedUnit(expandedUnit === unitId ? null : unitId);
    };

    const handleStartLesson = (lessonId: string) => {
        if (onStartLesson) {
            onStartLesson(lessonId);
        }
    };

    const completedUnits = units.filter(u => u.completed).length;
    const courseProgress = units.length > 0 ? (completedUnits / units.length) * 100 : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-pink-50 w-full overflow-auto">
            <PageHeader
                title={`${course.icon} ${course.titleVi}`}
                subtitle={course.title}
            />

            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Back Button */}
                <Button
                    variant="outline"
                    onClick={onBack}
                    className="mb-6 hover:bg-gray-100"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Library
                </Button>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Sidebar - Course Info */}
                    <div className="lg:col-span-1 space-y-4">
                        {/* Course Overview Card */}
                        <Card className={`p-6 ${course.bgColor} border-2 border-${course.color}-300 shadow-lg`}>
                            <div className="text-center mb-4">
                                <div className="text-7xl mb-4">{course.icon}</div>
                                <h3 className={`text-${course.color}-800 mb-2`}>
                                    {course.titleVi}
                                </h3>
                                <p className="text-sm text-gray-600 mb-2">{course.title}</p>
                                <p className="text-xs text-gray-500 mb-3">{course.publisher}</p>
                                <Badge className={`${levelInfo[course.level].color} shadow-sm`}>
                                    {levelInfo[course.level].icon} {levelInfo[course.level].labelVi} ({course.level})
                                </Badge>
                            </div>

                            <p className="text-sm text-gray-700 mb-4 text-center">
                                {course.description}
                            </p>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                                    <div className="flex items-center gap-2">
                                        <BookOpen className={`w-5 h-5 text-${course.color}-600`} />
                                        <span className="text-sm text-gray-700">Total Units</span>
                                    </div>
                                    <span className="text-gray-800">{course.totalUnits}</span>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                                    <div className="flex items-center gap-2">
                                        <Target className={`w-5 h-5 text-${course.color}-600`} />
                                        <span className="text-sm text-gray-700">Total Lessons</span>
                                    </div>
                                    <span className="text-gray-800">{course.totalLessons}</span>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                                    <div className="flex items-center gap-2">
                                        <Clock className={`w-5 h-5 text-${course.color}-600`} />
                                        <span className="text-sm text-gray-700">Duration</span>
                                    </div>
                                    <span className="text-gray-800">{course.duration}</span>
                                </div>
                            </div>
                        </Card>

                        {/* Progress Card */}
                        <Card className={`p-6 bg-gradient-to-br ${course.bgColor} border-2 border-${course.color}-300 shadow-lg`}>
                            <h4 className="text-gray-800 mb-4 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5" />
                                Your Progress
                            </h4>
                            <div className="space-y-3">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-700">Overall</span>
                                        <span className={`text-${course.color}-700`}>{Math.round(courseProgress)}%</span>
                                    </div>
                                    <Progress value={courseProgress} className="h-3" />
                                </div>
                                <div className="flex items-center justify-between text-sm p-3 bg-white rounded-lg">
                                    <span className="text-gray-700">Completed Units</span>
                                    <span className={`text-${course.color}-700`}>{completedUnits}/{units.length}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm p-3 bg-white rounded-lg">
                                    <span className="text-gray-700">Total XP Earned</span>
                                    <span className={`text-${course.color}-700`}>0 XP</span>
                                </div>
                                <div className="flex items-center justify-between text-sm p-3 bg-white rounded-lg">
                                    <span className="text-gray-700">Certificates</span>
                                    <span className="text-gray-600">0</span>
                                </div>
                            </div>
                        </Card>

                        {/* Learning Tips */}
                        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 shadow-lg">
                            <h4 className="text-purple-800 mb-3 flex items-center gap-2">
                                <Award className="w-5 h-5" />
                                Learning Tips 💡
                            </h4>
                            <ul className="text-sm text-purple-700 space-y-2">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    <span>Complete units in order for best results</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    <span>Practice daily for 20-30 minutes</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    <span>Review previous lessons regularly</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    <span>Complete all exercises in each lesson</span>
                                </li>
                            </ul>
                        </Card>
                    </div>

                    {/* Right Content - Units & Lessons */}
                    <div className="lg:col-span-2">
                        <div className="mb-6">
                            <h2 className="text-gray-800 mb-2">Course Content 📚</h2>
                            <p className="text-gray-600">
                                Click on any unit to view lessons. Complete them in order to unlock new content.
                            </p>
                        </div>

                        {units.length === 0 ? (
                            <Card className="p-12 text-center bg-white shadow-lg">
                                <div className="text-7xl mb-4">🚧</div>
                                <h3 className="text-gray-800 mb-2">Content Coming Soon!</h3>
                                <p className="text-gray-600 mb-4">
                                    Course content for {course.titleVi} is being prepared. Check back soon!
                                </p>
                                <Button onClick={onBack} variant="outline">
                                    Browse Other Courses
                                </Button>
                            </Card>
                        ) : (
                            <div className="space-y-4">
                                {units.map((unit) => (
                                    <Card
                                        key={unit.id}
                                        className={`bg-white border-2 transition-all duration-300 shadow-md hover:shadow-lg ${unit.locked
                                            ? 'border-gray-200 opacity-60'
                                            : `border-gray-200 hover:border-${course.color}-300`
                                            }`}
                                    >
                                        {/* Unit Header */}
                                        <div
                                            className={`p-6 cursor-pointer ${unit.locked ? 'cursor-not-allowed' : ''}`}
                                            onClick={() => !unit.locked && toggleUnit(unit.id)}
                                        >
                                            <div className="flex items-start gap-4">
                                                {/* Unit Number Icon */}
                                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${course.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                                                    {unit.locked ? (
                                                        <Lock className="w-7 h-7 text-white" />
                                                    ) : unit.completed ? (
                                                        <CheckCircle2 className="w-7 h-7 text-white" />
                                                    ) : (
                                                        <span className="text-white text-xl">{unit.unitNumber}</span>
                                                    )}
                                                </div>

                                                {/* Unit Info */}
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div>
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <h3 className="text-gray-800">
                                                                    Unit {unit.unitNumber}: {unit.title}
                                                                </h3>
                                                                {unit.completed && (
                                                                    <Badge className="bg-green-100 text-green-700 text-xs">
                                                                        <CheckCircle2 className="w-3 h-3 mr-1" />
                                                                        Completed
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            <p className="text-sm text-gray-600">{unit.titleVi}</p>
                                                            <p className="text-sm text-gray-500 mt-1">{unit.description}</p>
                                                        </div>
                                                        {!unit.locked && (
                                                            <ChevronDown
                                                                className={`w-5 h-5 text-gray-400 transition-transform ${expandedUnit === unit.id ? 'rotate-180' : ''
                                                                    }`}
                                                            />
                                                        )}
                                                    </div>

                                                    {/* Topics */}
                                                    <div className="flex flex-wrap gap-2 mb-3">
                                                        {unit.topics.map((topic, idx) => (
                                                            <Badge key={idx} variant="outline" className="text-xs bg-gray-50">
                                                                {topic}
                                                            </Badge>
                                                        ))}
                                                    </div>

                                                    {/* Progress Bar */}
                                                    {!unit.locked && (
                                                        <div className="mt-3">
                                                            <div className="flex justify-between text-xs mb-1">
                                                                <span className="text-gray-600">
                                                                    {unit.lessons.length} lessons
                                                                </span>
                                                                <span className={`text-${course.color}-700`}>
                                                                    {unit.progress}% complete
                                                                </span>
                                                            </div>
                                                            <Progress value={unit.progress} className="h-2" />
                                                        </div>
                                                    )}

                                                    {unit.locked && (
                                                        <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                                                            <Lock className="w-4 h-4" />
                                                            <span>Complete previous units to unlock</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Lessons List (Expandable) */}
                                        {expandedUnit === unit.id && !unit.locked && (
                                            <div className="border-t-2 border-gray-100 bg-gray-50 p-4">
                                                <div className="space-y-3">
                                                    {unit.lessons.map((lessonId, idx) => {
                                                        // In real app, fetch lesson details
                                                        const lesson = getLessonById(lessonId);
                                                        if (!lesson) {
                                                            return (
                                                                <div key={lessonId} className="p-4 bg-white rounded-lg border border-gray-200">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className={`w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center`}>
                                                                            <span className="text-sm text-gray-500">{idx + 1}</span>
                                                                        </div>
                                                                        <div className="flex-1">
                                                                            <p className="text-sm text-gray-500">Lesson {idx + 1} - Coming Soon</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        }

                                                        const typeConfig = lessonTypeIcons[lesson.type];
                                                        const TypeIcon = typeConfig.icon;

                                                        return (
                                                            <div
                                                                key={lessonId}
                                                                className={`p-4 bg-white rounded-lg border-2 transition-all hover:shadow-md ${lesson.locked
                                                                    ? 'border-gray-200 opacity-60'
                                                                    : 'border-gray-200 hover:border-' + course.color + '-300 cursor-pointer'
                                                                    }`}
                                                                onClick={() => !lesson.locked && handleStartLesson(lessonId)}
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    {/* Lesson Icon */}
                                                                    <div className={`w-12 h-12 rounded-xl ${typeConfig.bgColor} flex items-center justify-center flex-shrink-0`}>
                                                                        {lesson.locked ? (
                                                                            <Lock className="w-5 h-5 text-gray-400" />
                                                                        ) : lesson.completed ? (
                                                                            <CheckCircle2 className={`w-5 h-5 ${typeConfig.color}`} />
                                                                        ) : (
                                                                            <TypeIcon className={`w-5 h-5 ${typeConfig.color}`} />
                                                                        )}
                                                                    </div>

                                                                    {/* Lesson Info */}
                                                                    <div className="flex-1">
                                                                        <div className="flex items-center gap-2 mb-1">
                                                                            <h4 className="text-sm text-gray-800">
                                                                                {lesson.lessonNumber}. {lesson.title}
                                                                            </h4>
                                                                            <Badge className="text-xs capitalize" variant="outline">
                                                                                {lesson.type}
                                                                            </Badge>
                                                                            {lesson.completed && (
                                                                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                                                                            )}
                                                                        </div>
                                                                        <p className="text-xs text-gray-500 mb-2">{lesson.titleVi}</p>
                                                                        <div className="flex items-center gap-3 text-xs text-gray-500">
                                                                            <span className="flex items-center gap-1">
                                                                                <Clock className="w-3 h-3" />
                                                                                {lesson.duration} min
                                                                            </span>
                                                                            <span className="flex items-center gap-1">
                                                                                <Trophy className="w-3 h-3" />
                                                                                +{lesson.xpReward} XP
                                                                            </span>
                                                                        </div>
                                                                    </div>

                                                                    {/* Action Button */}
                                                                    {!lesson.locked && (
                                                                        <Button
                                                                            size="sm"
                                                                            className={`bg-gradient-to-r ${course.gradient} text-white hover:opacity-90`}
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                handleStartLesson(lessonId);
                                                                            }}
                                                                        >
                                                                            {lesson.completed ? 'Review' : 'Start'}
                                                                            <ChevronRight className="w-4 h-4 ml-1" />
                                                                        </Button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
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
