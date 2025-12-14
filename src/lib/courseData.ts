export type CourseLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
export type CourseType = "cambridge" | "oxford" | "textbook" | "grammar" | "business";

export interface Course {
    id: string;
    title: string;
    titleVi: string;
    publisher: string;
    description: string;
    level: CourseLevel;
    type: CourseType;
    icon: string;
    color: string;
    bgColor: string;
    gradient: string;
    totalUnits: number;
    totalLessons: number;
    duration: string; // e.g., "3 months"
    popular: boolean;
    featured: boolean;
    progress: number; // 0-100
}

export interface Unit {
    id: string;
    courseId: string;
    unitNumber: number;
    title: string;
    titleVi: string;
    description: string;
    topics: string[];
    lessons: string[]; // lesson IDs
    completed: boolean;
    locked: boolean;
    progress: number;
}

export interface Lesson {
    id: string;
    unitId: string;
    lessonNumber: number;
    title: string;
    titleVi: string;
    description: string;
    type: "grammar" | "vocabulary" | "reading" | "listening" | "speaking" | "writing" | "mixed";
    duration: number; // minutes
    xpReward: number;
    completed: boolean;
    locked: boolean;
    content: LessonContent;
}

export interface LessonContent {
    introduction?: string;
    grammar?: GrammarSection;
    vocabulary?: VocabularySection;
    exercises?: Exercise[];
    summary?: string;
}

export interface GrammarSection {
    title: string;
    explanation: string;
    examples: string[];
    rules: string[];
}

export interface VocabularySection {
    words: {
        word: string;
        pronunciation: string;
        meaning: string;
        example: string;
    }[];
}

export interface Exercise {
    id: string;
    type: "multiple-choice" | "fill-blank" | "matching" | "reorder" | "translation";
    question: string;
    options?: string[];
    correctAnswer: string | string[];
    explanation?: string;
}

// Cambridge Courses
export const cambridgeCourses: Course[] = [
    {
        id: "cambridge-first",
        title: "Cambridge First (FCE)",
        titleVi: "Cambridge First - B2",
        publisher: "Cambridge University Press",
        description: "Prepare for Cambridge First Certificate in English (FCE) - Upper-Intermediate level",
        level: "B2",
        type: "cambridge",
        icon: "📘",
        color: "blue",
        bgColor: "bg-blue-50",
        gradient: "from-blue-500 to-cyan-500",
        totalUnits: 12,
        totalLessons: 60,
        duration: "6 months",
        popular: true,
        featured: true,
        progress: 0,
    },
    {
        id: "cambridge-advanced",
        title: "Cambridge Advanced (CAE)",
        titleVi: "Cambridge Advanced - C1",
        publisher: "Cambridge University Press",
        description: "Prepare for Cambridge Advanced Certificate (CAE) - Advanced level",
        level: "C1",
        type: "cambridge",
        icon: "📗",
        color: "green",
        bgColor: "bg-green-50",
        gradient: "from-green-500 to-emerald-500",
        totalUnits: 12,
        totalLessons: 72,
        duration: "8 months",
        popular: true,
        featured: true,
        progress: 0,
    },
    {
        id: "cambridge-preliminary",
        title: "Cambridge Preliminary (PET)",
        titleVi: "Cambridge Preliminary - B1",
        publisher: "Cambridge University Press",
        description: "Prepare for Cambridge Preliminary English Test (PET) - Intermediate level",
        level: "B1",
        type: "cambridge",
        icon: "📙",
        color: "amber",
        bgColor: "bg-amber-50",
        gradient: "from-amber-500 to-orange-500",
        totalUnits: 10,
        totalLessons: 50,
        duration: "5 months",
        popular: true,
        featured: false,
        progress: 0,
    },
];

// Oxford Courses
export const oxfordCourses: Course[] = [
    {
        id: "english-file-elementary",
        title: "English File Elementary",
        titleVi: "English File Sơ Cấp",
        publisher: "Oxford University Press",
        description: "Complete elementary English course covering all skills",
        level: "A1",
        type: "oxford",
        icon: "📕",
        color: "red",
        bgColor: "bg-red-50",
        gradient: "from-red-500 to-pink-500",
        totalUnits: 12,
        totalLessons: 48,
        duration: "4 months",
        popular: true,
        featured: true,
        progress: 0,
    },
    {
        id: "english-file-intermediate",
        title: "English File Intermediate",
        titleVi: "English File Trung Cấp",
        publisher: "Oxford University Press",
        description: "Intermediate English course for confident communication",
        level: "B1",
        type: "oxford",
        icon: "📔",
        color: "purple",
        bgColor: "bg-purple-50",
        gradient: "from-purple-500 to-pink-500",
        totalUnits: 12,
        totalLessons: 60,
        duration: "5 months",
        popular: true,
        featured: false,
        progress: 0,
    },
    {
        id: "headway-beginner",
        title: "New Headway Beginner",
        titleVi: "New Headway Người Mới",
        publisher: "Oxford University Press",
        description: "Perfect for complete beginners starting their English journey",
        level: "A1",
        type: "oxford",
        icon: "📖",
        color: "indigo",
        bgColor: "bg-indigo-50",
        gradient: "from-indigo-500 to-blue-500",
        totalUnits: 14,
        totalLessons: 56,
        duration: "4 months",
        popular: false,
        featured: false,
        progress: 0,
    },
];

// Vietnamese Textbook Courses
export const textbookCourses: Course[] = [
    {
        id: "textbook-grade-6",
        title: "English 6",
        titleVi: "Tiếng Anh Lớp 6",
        publisher: "Vietnamese Ministry of Education",
        description: "Official Grade 6 English textbook for Vietnamese students",
        level: "A1",
        type: "textbook",
        icon: "🇻🇳",
        color: "cyan",
        bgColor: "bg-cyan-50",
        gradient: "from-cyan-500 to-blue-500",
        totalUnits: 10,
        totalLessons: 40,
        duration: "1 school year",
        popular: true,
        featured: true,
        progress: 0,
    },
    {
        id: "textbook-grade-10",
        title: "English 10",
        titleVi: "Tiếng Anh Lớp 10",
        publisher: "Vietnamese Ministry of Education",
        description: "Official Grade 10 English textbook for Vietnamese high school students",
        level: "A2",
        type: "textbook",
        icon: "🇻🇳",
        color: "teal",
        bgColor: "bg-teal-50",
        gradient: "from-teal-500 to-green-500",
        totalUnits: 10,
        totalLessons: 50,
        duration: "1 school year",
        popular: true,
        featured: false,
        progress: 0,
    },
];

// Grammar Courses
export const grammarCourses: Course[] = [
    {
        id: "essential-grammar",
        title: "Essential Grammar in Use",
        titleVi: "Ngữ Pháp Cơ Bản",
        publisher: "Cambridge University Press",
        description: "Grammar reference and practice for elementary learners",
        level: "A1",
        type: "grammar",
        icon: "📐",
        color: "violet",
        bgColor: "bg-violet-50",
        gradient: "from-violet-500 to-purple-500",
        totalUnits: 20,
        totalLessons: 114,
        duration: "6 months",
        popular: true,
        featured: true,
        progress: 0,
    },
    {
        id: "intermediate-grammar",
        title: "English Grammar in Use",
        titleVi: "Ngữ Pháp Trung Cấp",
        publisher: "Cambridge University Press",
        description: "Self-study reference and practice for intermediate learners",
        level: "B1",
        type: "grammar",
        icon: "📏",
        color: "fuchsia",
        bgColor: "bg-fuchsia-50",
        gradient: "from-fuchsia-500 to-pink-500",
        totalUnits: 20,
        totalLessons: 142,
        duration: "8 months",
        popular: true,
        featured: false,
        progress: 0,
    },
];

export const allCourses: Course[] = [
    ...cambridgeCourses,
    ...oxfordCourses,
    ...textbookCourses,
    ...grammarCourses,
];

// Sample Units for Cambridge First
export const cambridgeFirstUnits: Unit[] = [
    {
        id: "cf-unit-1",
        courseId: "cambridge-first",
        unitNumber: 1,
        title: "Making Friends",
        titleVi: "Kết Bạn",
        description: "Learn to talk about yourself, friends, and relationships",
        topics: ["Introductions", "Personality adjectives", "Present tenses", "Social media"],
        lessons: ["cf-u1-l1", "cf-u1-l2", "cf-u1-l3", "cf-u1-l4", "cf-u1-l5"],
        completed: false,
        locked: false,
        progress: 0,
    },
    {
        id: "cf-unit-2",
        courseId: "cambridge-first",
        unitNumber: 2,
        title: "Taking Risks",
        titleVi: "Chấp Nhận Rủi Ro",
        description: "Discuss risk-taking, adventures, and personal challenges",
        topics: ["Risk & adventure", "Modal verbs", "Extreme adjectives", "Storytelling"],
        lessons: ["cf-u2-l1", "cf-u2-l2", "cf-u2-l3", "cf-u2-l4", "cf-u2-l5"],
        completed: false,
        locked: true,
        progress: 0,
    },
    {
        id: "cf-unit-3",
        courseId: "cambridge-first",
        unitNumber: 3,
        title: "Living Together",
        titleVi: "Sống Chung",
        description: "Talk about homes, living arrangements, and daily routines",
        topics: ["Housing", "Household items", "Present perfect", "Describing places"],
        lessons: ["cf-u3-l1", "cf-u3-l2", "cf-u3-l3", "cf-u3-l4", "cf-u3-l5"],
        completed: false,
        locked: true,
        progress: 0,
    },
];

// Sample Lessons
export const sampleLessons: Lesson[] = [
    {
        id: "cf-u1-l1",
        unitId: "cf-unit-1",
        lessonNumber: 1,
        title: "Talking About Yourself",
        titleVi: "Nói Về Bản Thân",
        description: "Learn vocabulary and phrases for introducing yourself",
        type: "vocabulary",
        duration: 20,
        xpReward: 50,
        completed: false,
        locked: false,
        content: {
            introduction: "In this lesson, you'll learn how to introduce yourself and talk about your interests, hobbies, and background.",
            vocabulary: {
                words: [
                    {
                        word: "outgoing",
                        pronunciation: "/ˈaʊtɡəʊɪŋ/",
                        meaning: "hòa đồng, thân thiện",
                        example: "She's very outgoing and loves meeting new people.",
                    },
                    {
                        word: "creative",
                        pronunciation: "/kriˈeɪtɪv/",
                        meaning: "sáng tạo",
                        example: "He has a creative mind and enjoys painting.",
                    },
                    {
                        word: "reliable",
                        pronunciation: "/rɪˈlaɪəbl/",
                        meaning: "đáng tin cậy",
                        example: "My best friend is very reliable; I can always count on her.",
                    },
                ],
            },
            exercises: [
                {
                    id: "ex-1",
                    type: "multiple-choice",
                    question: "Choose the correct word: She's very _____ and makes friends easily.",
                    options: ["shy", "outgoing", "quiet", "reserved"],
                    correctAnswer: "outgoing",
                    explanation: "Outgoing means friendly and sociable, which fits the context of making friends easily.",
                },
            ],
        },
    },
    {
        id: "cf-u1-l2",
        unitId: "cf-unit-1",
        lessonNumber: 2,
        title: "Present Simple vs Present Continuous",
        titleVi: "Hiện Tại Đơn vs Hiện Tại Tiếp Diễn",
        description: "Master the difference between present simple and continuous tenses",
        type: "grammar",
        duration: 25,
        xpReward: 60,
        completed: false,
        locked: false,
        content: {
            introduction: "Understanding when to use present simple vs present continuous is essential for accurate English communication.",
            grammar: {
                title: "Present Simple vs Present Continuous",
                explanation: "Present Simple is used for habits, routines, and permanent situations. Present Continuous is used for actions happening now or temporary situations.",
                examples: [
                    "I work in a bank. (Present Simple - permanent job)",
                    "I'm working on a special project this week. (Present Continuous - temporary)",
                    "She lives in London. (Present Simple - permanent residence)",
                    "She's staying with friends at the moment. (Present Continuous - temporary)",
                ],
                rules: [
                    "Present Simple: Subject + base verb (+ s for he/she/it)",
                    "Present Continuous: Subject + am/is/are + verb-ing",
                    "Time expressions: Simple (always, usually, every day) vs Continuous (now, at the moment, currently)",
                ],
            },
            exercises: [
                {
                    id: "ex-2",
                    type: "multiple-choice",
                    question: "I usually _____ coffee in the morning, but today I _____ tea.",
                    options: [
                        "drink / drink",
                        "drink / am drinking",
                        "am drinking / drink",
                        "am drinking / am drinking",
                    ],
                    correctAnswer: "drink / am drinking",
                    explanation: "Use present simple for habits (usually) and present continuous for what's happening now (today).",
                },
            ],
        },
    },
];

export const getCourseById = (courseId: string): Course | undefined => {
    return allCourses.find(course => course.id === courseId);
};

export const getUnitsByCourseId = (courseId: string): Unit[] => {
    // In real app, this would fetch from database
    if (courseId === "cambridge-first") {
        return cambridgeFirstUnits;
    }
    return [];
};

export const getLessonById = (lessonId: string): Lesson | undefined => {
    return sampleLessons.find(lesson => lesson.id === lessonId);
};

export const getCoursesByType = (type: CourseType): Course[] => {
    return allCourses.filter(course => course.type === type);
};

export const getCoursesByLevel = (level: CourseLevel): Course[] => {
    return allCourses.filter(course => course.level === level);
};

export const getFeaturedCourses = (): Course[] => {
    return allCourses.filter(course => course.featured);
};

export const getPopularCourses = (): Course[] => {
    return allCourses.filter(course => course.popular);
};
