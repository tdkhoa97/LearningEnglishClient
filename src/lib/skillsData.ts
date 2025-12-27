import type { AgeGroup } from "@/types";

export type SkillType = "listening" | "speaking" | "reading" | "writing";

export interface SkillProgress {
    skill: SkillType;
    level: number;
    totalXP: number;
    completedLessons: number;
    totalLessons: number;
    accuracy: number;
}

export interface SkillLesson {
    id: string;
    title: string;
    description: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    duration: number; // minutes
    xpReward: number;
    completed: boolean;
    locked: boolean;
    skillType: SkillType;
    exercises: number;
}

// Listening Lessons
export const listeningLessons: SkillLesson[] = [
    {
        id: "listening-1",
        title: "Basic Conversations",
        description: "Listen and understand simple daily conversations",
        difficulty: "beginner",
        duration: 10,
        xpReward: 50,
        completed: false,
        locked: false,
        skillType: "listening",
        exercises: 8
    },
    {
        id: "listening-2",
        title: "Numbers & Dates",
        description: "Practice listening to numbers, dates, and times",
        difficulty: "beginner",
        duration: 15,
        xpReward: 50,
        completed: false,
        locked: false,
        skillType: "listening",
        exercises: 10
    },
    {
        id: "listening-3",
        title: "Directions & Locations",
        description: "Understand directions and location descriptions",
        difficulty: "intermediate",
        duration: 20,
        xpReward: 75,
        completed: false,
        locked: true,
        skillType: "listening",
        exercises: 12
    },
    {
        id: "listening-4",
        title: "News & Media",
        description: "Listen to news reports and media content",
        difficulty: "advanced",
        duration: 25,
        xpReward: 100,
        completed: false,
        locked: true,
        skillType: "listening",
        exercises: 15
    },
];

// Speaking Lessons
export const speakingLessons: SkillLesson[] = [
    {
        id: "speaking-1",
        title: "Pronunciation Basics",
        description: "Master fundamental English sounds",
        difficulty: "beginner",
        duration: 15,
        xpReward: 50,
        completed: false,
        locked: false,
        skillType: "speaking",
        exercises: 10
    },
    {
        id: "speaking-2",
        title: "Self Introduction",
        description: "Practice introducing yourself confidently",
        difficulty: "beginner",
        duration: 12,
        xpReward: 50,
        completed: false,
        locked: false,
        skillType: "speaking",
        exercises: 8
    },
    {
        id: "speaking-3",
        title: "Asking Questions",
        description: "Learn to ask clear and natural questions",
        difficulty: "intermediate",
        duration: 18,
        xpReward: 75,
        completed: false,
        locked: true,
        skillType: "speaking",
        exercises: 12
    },
    {
        id: "speaking-4",
        title: "Debate & Discussion",
        description: "Express opinions and participate in debates",
        difficulty: "advanced",
        duration: 30,
        xpReward: 100,
        completed: false,
        locked: true,
        skillType: "speaking",
        exercises: 10
    },
];

// Reading Lessons
export const readingLessons: SkillLesson[] = [
    {
        id: "reading-1",
        title: "Short Stories",
        description: "Read and comprehend simple short stories",
        difficulty: "beginner",
        duration: 15,
        xpReward: 50,
        completed: false,
        locked: false,
        skillType: "reading",
        exercises: 5
    },
    {
        id: "reading-2",
        title: "Emails & Messages",
        description: "Understand written communication",
        difficulty: "beginner",
        duration: 12,
        xpReward: 50,
        completed: false,
        locked: false,
        skillType: "reading",
        exercises: 8
    },
    {
        id: "reading-3",
        title: "Articles & Blogs",
        description: "Read longer texts with detailed information",
        difficulty: "intermediate",
        duration: 25,
        xpReward: 75,
        completed: false,
        locked: true,
        skillType: "reading",
        exercises: 6
    },
    {
        id: "reading-4",
        title: "Academic Texts",
        description: "Comprehend complex academic materials",
        difficulty: "advanced",
        duration: 35,
        xpReward: 100,
        completed: false,
        locked: true,
        skillType: "reading",
        exercises: 8
    },
];

// Writing Lessons
export const writingLessons: SkillLesson[] = [
    {
        id: "writing-1",
        title: "Sentence Building",
        description: "Construct correct and clear sentences",
        difficulty: "beginner",
        duration: 15,
        xpReward: 50,
        completed: false,
        locked: false,
        skillType: "writing",
        exercises: 10
    },
    {
        id: "writing-2",
        title: "Paragraph Writing",
        description: "Write organized paragraphs",
        difficulty: "beginner",
        duration: 20,
        xpReward: 50,
        completed: false,
        locked: false,
        skillType: "writing",
        exercises: 6
    },
    {
        id: "writing-3",
        title: "Email Writing",
        description: "Compose professional and casual emails",
        difficulty: "intermediate",
        duration: 25,
        xpReward: 75,
        completed: false,
        locked: true,
        skillType: "writing",
        exercises: 8
    },
    {
        id: "writing-4",
        title: "Essay Writing",
        description: "Write structured essays with arguments",
        difficulty: "advanced",
        duration: 40,
        xpReward: 100,
        completed: false,
        locked: true,
        skillType: "writing",
        exercises: 5
    },
];

export const getAllSkillLessons = () => ({
    listening: listeningLessons,
    speaking: speakingLessons,
    reading: readingLessons,
    writing: writingLessons,
});

export const getSkillLessons = (skill: SkillType): SkillLesson[] => {
    const lessons = getAllSkillLessons();
    return lessons[skill];
};

export const initialSkillProgress: SkillProgress[] = [
    {
        skill: "listening",
        level: 1,
        totalXP: 0,
        completedLessons: 0,
        totalLessons: listeningLessons.length,
        accuracy: 0,
    },
    {
        skill: "speaking",
        level: 1,
        totalXP: 0,
        completedLessons: 0,
        totalLessons: speakingLessons.length,
        accuracy: 0,
    },
    {
        skill: "reading",
        level: 1,
        totalXP: 0,
        completedLessons: 0,
        totalLessons: readingLessons.length,
        accuracy: 0,
    },
    {
        skill: "writing",
        level: 1,
        totalXP: 0,
        completedLessons: 0,
        totalLessons: writingLessons.length,
        accuracy: 0,
    },
];
