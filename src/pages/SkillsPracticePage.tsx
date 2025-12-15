import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/Layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Headphones,
    MessageSquare,
    BookOpen,
    PenTool,
    Clock,
    Target,
    Trophy,
    Lock,
    Play,
    CheckCircle2,
    TrendingUp,
    Award,
    Zap,
    Star,
    Brain
} from "lucide-react";
import { SkillType, getSkillLessons, initialSkillProgress, SkillLesson } from "@/lib/skillsData";

const skillConfig = {
    listening: {
        icon: Headphones,
        title: "Listening",
        titleVi: "Nghe",
        description: "Improve your listening comprehension",
        descriptionVi: "Nâng cao khả năng nghe hiểu",
        color: "blue",
        gradient: "from-blue-500 to-cyan-500",
        bgColor: "bg-blue-50",
        textColor: "text-blue-700",
        borderColor: "border-blue-300",
    },
    speaking: {
        icon: MessageSquare,
        title: "Speaking",
        titleVi: "Nói",
        description: "Practice speaking fluently and confidently",
        descriptionVi: "Luyện nói trôi chảy và tự tin",
        color: "rose",
        gradient: "from-rose-500 to-pink-500",
        bgColor: "bg-rose-50",
        textColor: "text-rose-700",
        borderColor: "border-rose-300",
    },
    reading: {
        icon: BookOpen,
        title: "Reading",
        titleVi: "Đọc",
        description: "Enhance reading speed and comprehension",
        descriptionVi: "Tăng tốc độ đọc và hiểu",
        color: "green",
        gradient: "from-green-500 to-emerald-500",
        bgColor: "bg-green-50",
        textColor: "text-green-700",
        borderColor: "border-green-300",
    },
    writing: {
        icon: PenTool,
        title: "Writing",
        titleVi: "Viết",
        description: "Master writing skills and grammar",
        descriptionVi: "Làm chủ kỹ năng viết và ngữ pháp",
        color: "amber",
        gradient: "from-amber-500 to-orange-500",
        bgColor: "bg-amber-50",
        textColor: "text-amber-700",
        borderColor: "border-amber-300",
    },
};

const difficultyConfig = {
    beginner: { label: "Beginner", labelVi: "Cơ Bản", color: "bg-green-100 text-green-700" },
    intermediate: { label: "Intermediate", labelVi: "Trung Cấp", color: "bg-yellow-100 text-yellow-700" },
    advanced: { label: "Advanced", labelVi: "Nâng Cao", color: "bg-red-100 text-red-700" },
};

export function SkillsPracticePage() {
    const [selectedSkill, setSelectedSkill] = useState<SkillType>("listening");
    const [skillProgress] = useState(initialSkillProgress);

    const currentSkillConfig = skillConfig[selectedSkill];
    const lessons = getSkillLessons(selectedSkill);
    const progress = skillProgress.find(p => p.skill === selectedSkill);
    const Icon = currentSkillConfig.icon;

    const handleStartLesson = (lesson: SkillLesson) => {
        if (!lesson.locked) {
            console.log("Starting lesson:", lesson.id);
            // Navigate to lesson detail page
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-pink-50 w-full overflow-auto">
            <PageHeader
                title="4 Skills Practice 🎯"
                subtitle="Master Listening, Speaking, Reading & Writing"
            />

            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Skills Overview Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {(Object.keys(skillConfig) as SkillType[]).map((skill) => {
                        const config = skillConfig[skill];
                        const SkillIcon = config.icon;
                        const skillProg = skillProgress.find(p => p.skill === skill);
                        const isActive = selectedSkill === skill;

                        return (
                            <Card
                                key={skill}
                                onClick={() => setSelectedSkill(skill)}
                                className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${isActive
                                    ? `${config.bgColor} border-2 ${config.borderColor} shadow-md scale-105`
                                    : 'bg-white border-2 border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className="text-center">
                                    <div className={`w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${config.gradient} flex items-center justify-center`}>
                                        <SkillIcon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className={isActive ? config.textColor : "text-gray-800"}>
                                        {config.titleVi}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-3">{config.title}</p>

                                    {/* Progress */}
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-xs text-gray-600">
                                            <span>Level {skillProg?.level}</span>
                                            <span>{skillProg?.completedLessons}/{skillProg?.totalLessons}</span>
                                        </div>
                                        <Progress
                                            value={(skillProg?.completedLessons || 0) / (skillProg?.totalLessons || 1) * 100}
                                            className="h-2"
                                        />
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>

                {/* Selected Skill Detail */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Sidebar - Stats */}
                    <div className="lg:col-span-1 space-y-4">
                        {/* Skill Stats Card */}
                        <Card className={`p-6 ${currentSkillConfig.bgColor} border-2 ${currentSkillConfig.borderColor}`}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${currentSkillConfig.gradient} flex items-center justify-center`}>
                                    <Icon className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <h3 className={currentSkillConfig.textColor}>
                                        {currentSkillConfig.titleVi}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {currentSkillConfig.descriptionVi}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <Trophy className={`w-5 h-5 ${currentSkillConfig.textColor}`} />
                                        <span className="text-sm text-gray-700">Level</span>
                                    </div>
                                    <Badge className={`${currentSkillConfig.bgColor} ${currentSkillConfig.textColor}`}>
                                        {progress?.level}
                                    </Badge>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className={`w-5 h-5 ${currentSkillConfig.textColor}`} />
                                        <span className="text-sm text-gray-700">Total XP</span>
                                    </div>
                                    <span className={`font-semibold ${currentSkillConfig.textColor}`}>
                                        {progress?.totalXP}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <Target className={`w-5 h-5 ${currentSkillConfig.textColor}`} />
                                        <span className="text-sm text-gray-700">Accuracy</span>
                                    </div>
                                    <span className={`font-semibold ${currentSkillConfig.textColor}`}>
                                        {progress?.accuracy}%
                                    </span>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className={`w-5 h-5 ${currentSkillConfig.textColor}`} />
                                        <span className="text-sm text-gray-700">Completed</span>
                                    </div>
                                    <span className={`font-semibold ${currentSkillConfig.textColor}`}>
                                        {progress?.completedLessons}/{progress?.totalLessons}
                                    </span>
                                </div>
                            </div>
                        </Card>

                        {/* Tips Card */}
                        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
                            <div className="flex items-start gap-3">
                                <Award className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="text-purple-800 mb-2">Pro Tips!</h4>
                                    <ul className="text-sm text-purple-700 space-y-1">
                                        {selectedSkill === "listening" && (
                                            <>
                                                <li>• Listen multiple times</li>
                                                <li>• Focus on key words</li>
                                                <li>• Practice daily 15 mins</li>
                                            </>
                                        )}
                                        {selectedSkill === "speaking" && (
                                            <>
                                                <li>• Record yourself</li>
                                                <li>• Practice pronunciation</li>
                                                <li>• Speak naturally</li>
                                            </>
                                        )}
                                        {selectedSkill === "reading" && (
                                            <>
                                                <li>• Skim before reading</li>
                                                <li>• Note key information</li>
                                                <li>• Build vocabulary</li>
                                            </>
                                        )}
                                        {selectedSkill === "writing" && (
                                            <>
                                                <li>• Plan before writing</li>
                                                <li>• Check grammar</li>
                                                <li>• Use varied vocabulary</li>
                                            </>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right Content - Lessons */}
                    <div className="lg:col-span-2">
                        <div className="mb-6">
                            <h2 className="text-gray-800 mb-2">Available Lessons</h2>
                            <p className="text-gray-600">
                                Choose a lesson to practice your {currentSkillConfig.title.toLowerCase()} skills
                            </p>
                        </div>

                        <div className="space-y-4">
                            {lessons.map((lesson) => (
                                <Card
                                    key={lesson.id}
                                    className={`p-6 bg-white border-2 transition-all duration-300 ${lesson.locked
                                        ? 'border-gray-200 opacity-60'
                                        : `border-gray-200 hover:border-${currentSkillConfig.color}-300 hover:shadow-lg cursor-pointer`
                                        }`}
                                    onClick={() => handleStartLesson(lesson)}
                                >
                                    <div className="flex items-start gap-4">
                                        {/* Icon */}
                                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentSkillConfig.gradient} flex items-center justify-center flex-shrink-0`}>
                                            {lesson.locked ? (
                                                <Lock className="w-8 h-8 text-white" />
                                            ) : lesson.completed ? (
                                                <CheckCircle2 className="w-8 h-8 text-white" />
                                            ) : (
                                                <Play className="w-8 h-8 text-white" />
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <h3 className="text-gray-800 mb-1">{lesson.title}</h3>
                                                    <p className="text-gray-600 text-sm">{lesson.description}</p>
                                                </div>
                                                {lesson.completed && (
                                                    <Badge className="bg-green-100 text-green-700">
                                                        Completed ✓
                                                    </Badge>
                                                )}
                                            </div>

                                            {/* Metadata */}
                                            <div className="flex flex-wrap gap-4 mb-4">
                                                <Badge className={difficultyConfig[lesson.difficulty].color}>
                                                    {difficultyConfig[lesson.difficulty].labelVi}
                                                </Badge>
                                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{lesson.duration} phút</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                                    <Target className="w-4 h-4" />
                                                    <span>{lesson.exercises} bài tập</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-sm text-amber-600">
                                                    <Award className="w-4 h-4" />
                                                    <span>+{lesson.xpReward} XP</span>
                                                </div>
                                            </div>

                                            {/* Action Button */}
                                            {!lesson.locked && (
                                                <Button
                                                    className={`bg-gradient-to-r ${currentSkillConfig.gradient} text-white hover:opacity-90`}
                                                    onClick={() => handleStartLesson(lesson)}
                                                >
                                                    {lesson.completed ? 'Practice Again' : 'Start Lesson'} →
                                                </Button>
                                            )}
                                            {lesson.locked && (
                                                <Button variant="outline" disabled className="cursor-not-allowed">
                                                    <Lock className="w-4 h-4 mr-2" />
                                                    Locked - Complete previous lessons
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}