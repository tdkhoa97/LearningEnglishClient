export type ExamType = "toeic" | "ielts" | "toefl" | "toeic-speaking" | "vstep" | "aptis";

export interface ExamInfo {
    id: ExamType;
    name: string;
    fullName: string;
    description: string;
    icon: string;
    color: string;
    bgColor: string;
    gradient: string;
    difficulty: string;
    duration: string;
    sections: string[];
    targetScore: string;
    popular: boolean;
}

export interface MockTest {
    id: string;
    examType: ExamType;
    title: string;
    description: string;
    duration: number; // minutes
    totalQuestions: number;
    difficulty: "easy" | "medium" | "hard";
    completed: boolean;
    bestScore?: number;
    attempts: number;
    locked: boolean;
}

export const examTypes: ExamInfo[] = [
    {
        id: "toeic",
        name: "TOEIC L&R",
        fullName: "Test of English for International Communication",
        description: "Chứng chỉ tiếng Anh cho công việc và giao tiếp quốc tế",
        icon: "💼",
        color: "blue",
        bgColor: "bg-blue-50",
        gradient: "from-blue-500 to-cyan-500",
        difficulty: "Intermediate",
        duration: "120 phút",
        sections: ["Listening (100 câu)", "Reading (100 câu)"],
        targetScore: "990 điểm",
        popular: true,
    },
    {
        id: "ielts",
        name: "IELTS",
        fullName: "International English Language Testing System",
        description: "Chứng chỉ tiếng Anh quốc tế cho du học và định cư",
        icon: "🎓",
        color: "red",
        bgColor: "bg-red-50",
        gradient: "from-red-500 to-pink-500",
        difficulty: "Advanced",
        duration: "165 phút",
        sections: ["Listening", "Reading", "Writing", "Speaking"],
        targetScore: "9.0 bands",
        popular: true,
    },
    {
        id: "toefl",
        name: "TOEFL iBT",
        fullName: "Test of English as a Foreign Language",
        description: "Chứng chỉ tiếng Anh Mỹ cho du học",
        icon: "🏛️",
        color: "indigo",
        bgColor: "bg-indigo-50",
        gradient: "from-indigo-500 to-purple-500",
        difficulty: "Advanced",
        duration: "180 phút",
        sections: ["Reading", "Listening", "Speaking", "Writing"],
        targetScore: "120 điểm",
        popular: true,
    },
    {
        id: "toeic-speaking",
        name: "TOEIC S&W",
        fullName: "TOEIC Speaking & Writing",
        description: "Đánh giá kỹ năng nói và viết trong công việc",
        icon: "🗣️",
        color: "cyan",
        bgColor: "bg-cyan-50",
        gradient: "from-cyan-500 to-blue-500",
        difficulty: "Intermediate",
        duration: "80 phút",
        sections: ["Speaking (11 câu)", "Writing (8 câu)"],
        targetScore: "400 điểm",
        popular: false,
    },
    {
        id: "vstep",
        name: "VSTEP",
        fullName: "Vietnamese Standardized Test of English Proficiency",
        description: "Chứng chỉ tiếng Anh chuẩn Việt Nam",
        icon: "🇻🇳",
        color: "green",
        bgColor: "bg-green-50",
        gradient: "from-green-500 to-emerald-500",
        difficulty: "Intermediate",
        duration: "150 phút",
        sections: ["Listening", "Reading", "Writing", "Speaking"],
        targetScore: "Cấp độ 3-5",
        popular: false,
    },
    {
        id: "aptis",
        name: "Aptis",
        fullName: "Aptis English Test",
        description: "Chứng chỉ của Hội đồng Anh",
        icon: "🎯",
        color: "amber",
        bgColor: "bg-amber-50",
        gradient: "from-amber-500 to-orange-500",
        difficulty: "Intermediate",
        duration: "155 phút",
        sections: ["Grammar", "Vocabulary", "Listening", "Reading", "Writing", "Speaking"],
        targetScore: "CEFR C2",
        popular: false,
    },
];

// TOEIC Mock Tests
export const toeicMockTests: MockTest[] = [
    {
        id: "toeic-mock-1",
        examType: "toeic",
        title: "TOEIC Full Test #1",
        description: "Đề thi thử TOEIC L&R hoàn chỉnh theo format mới nhất",
        duration: 120,
        totalQuestions: 200,
        difficulty: "medium",
        completed: false,
        attempts: 0,
        locked: false,
    },
    {
        id: "toeic-mock-2",
        examType: "toeic",
        title: "TOEIC Full Test #2",
        description: "Đề thi thử nâng cao với độ khó cao hơn",
        duration: 120,
        totalQuestions: 200,
        difficulty: "hard",
        completed: false,
        attempts: 0,
        locked: true,
    },
    {
        id: "toeic-listening-only",
        examType: "toeic",
        title: "TOEIC Listening Practice",
        description: "Luyện tập riêng phần Listening",
        duration: 45,
        totalQuestions: 100,
        difficulty: "medium",
        completed: false,
        attempts: 0,
        locked: false,
    },
    {
        id: "toeic-reading-only",
        examType: "toeic",
        title: "TOEIC Reading Practice",
        description: "Luyện tập riêng phần Reading",
        duration: 75,
        totalQuestions: 100,
        difficulty: "medium",
        completed: false,
        attempts: 0,
        locked: false,
    },
];

// IELTS Mock Tests
export const ieltsMockTests: MockTest[] = [
    {
        id: "ielts-mock-1",
        examType: "ielts",
        title: "IELTS Academic Full Test #1",
        description: "Đề thi thử IELTS Academic đầy đủ 4 kỹ năng",
        duration: 165,
        totalQuestions: 40,
        difficulty: "hard",
        completed: false,
        attempts: 0,
        locked: false,
    },
    {
        id: "ielts-mock-2",
        examType: "ielts",
        title: "IELTS General Training Test",
        description: "Đề thi thử IELTS General Training",
        duration: 165,
        totalQuestions: 40,
        difficulty: "medium",
        completed: false,
        attempts: 0,
        locked: true,
    },
    {
        id: "ielts-listening",
        examType: "ielts",
        title: "IELTS Listening Practice",
        description: "40 câu Listening theo format chuẩn",
        duration: 30,
        totalQuestions: 40,
        difficulty: "medium",
        completed: false,
        attempts: 0,
        locked: false,
    },
    {
        id: "ielts-reading",
        examType: "ielts",
        title: "IELTS Reading Practice",
        description: "3 passages với 40 câu hỏi",
        duration: 60,
        totalQuestions: 40,
        difficulty: "hard",
        completed: false,
        attempts: 0,
        locked: false,
    },
];

// TOEFL Mock Tests
export const toeflMockTests: MockTest[] = [
    {
        id: "toefl-mock-1",
        examType: "toefl",
        title: "TOEFL iBT Full Test #1",
        description: "Đề thi thử TOEFL iBT hoàn chỉnh",
        duration: 180,
        totalQuestions: 80,
        difficulty: "hard",
        completed: false,
        attempts: 0,
        locked: false,
    },
    {
        id: "toefl-reading",
        examType: "toefl",
        title: "TOEFL Reading Section",
        description: "Luyện tập Reading với 3-4 passages",
        duration: 54,
        totalQuestions: 30,
        difficulty: "hard",
        completed: false,
        attempts: 0,
        locked: false,
    },
];

export const getMockTestsByExam = (examType: ExamType): MockTest[] => {
    const allTests: { [key in ExamType]: MockTest[] } = {
        toeic: toeicMockTests,
        ielts: ieltsMockTests,
        toefl: toeflMockTests,
        "toeic-speaking": [],
        vstep: [],
        aptis: [],
    };
    return allTests[examType] || [];
};

export const getExamInfo = (examType: ExamType): ExamInfo | undefined => {
    return examTypes.find(exam => exam.id === examType);
};
