import { create } from "zustand";
import type { AgeGroup } from "@/types";

export interface Lesson {
    id: string;
    title: string;
    completed: boolean;
}

interface UserStore {
    streak: number;
    xp: number;
    dailyGoal: number;
    lessons: Lesson[];

    // personalization
    ageGroup: AgeGroup | null;

    // actions
    addXp: (value: number) => void;
    completeLesson: (id: string) => void;
    setAgeGroup: (ageGroup: AgeGroup) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    streak: 7,
    xp: 120,
    dailyGoal: 200,
    lessons: [
        { id: "l1", title: "Vocabulary - Animals", completed: false },
        { id: "l2", title: "Grammar - Present Simple", completed: false },
    ],

    ageGroup: null,

    addXp: (value) =>
        set((state) => ({
            xp: state.xp + value,
        })),

    completeLesson: (id) =>
        set((state) => ({
            lessons: state.lessons.map((l) =>
                l.id === id ? { ...l, completed: true } : l
            ),
            xp: state.xp + 20, // mỗi bài +20 XP
        })),

    setAgeGroup: (ageGroup) =>
        set(() => ({
            ageGroup,
        })),
}));
