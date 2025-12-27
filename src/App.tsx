import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryProvider } from '@/providers/QueryProvider'
import { Layout } from '@/components/Layout'
import { AccountPage } from '@/pages/AccountPage'
import { LoginPage } from '@/pages/LoginPage'
import { LessonsPage } from '@/pages/LessonsPage'
import { AchievementsPage } from '@/pages/AchievementsPage'
import { CommunityPage } from '@/pages/CommunityPage'
import { PostDetailPage } from '@/pages/PostDetailPage'
import { NotificationsPage } from '@/pages/NotificationsPage'
import { LessonDetailPage } from '@/pages/LessonDetailPage'
import ProtectedRoute from '@/components/ProtectedRoute'
import { HomePage } from "@/pages/HomePage";
import { LearnPage } from "@/pages/LearnPage";
import { PracticePage } from "@/pages/PracticePage";
import { LeaderboardPage } from "@/pages/LeaderboardPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { CourseLibraryPage } from "@/pages/CourseLibraryPage";
import { SkillsPracticePage } from "@/pages/SkillsPracticePage";
import { HistoricalPlacesPage } from "@/pages/HistoricalPlaces/HistoricalPlacesPage";
import { DailyChallengesPage } from "@/pages/DailyChallengesPage";

import {
    TestPage,
    ExamPrepPage, VocabularyBankPage,
    ChatForumPage, MessagesPage,
    SettingsPage,
    AgeSelectorPage
} from "@/pages";
import type { AgeGroup } from "@/types";
import { useUserStore } from "@/stores/useUserStore";

// Router config
const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "test",
                element: <TestPage />,
            },
            {
                path: "learn",
                element: <LearnPage />,
            },
            {
                path: "practice",
                element: <PracticePage />,
            },
            {
                path: "leaderboard",
                element: <LeaderboardPage />,
            },
            {
                path: "profile",
                element: <ProfilePage />,
            },
            {
                path: "vocabulary",
                element: <VocabularyBankPage />,
            },
            {
                path: "historical-places",
                element: <HistoricalPlacesPage />,
            },
            {
                path: "challenges",
                element: <DailyChallengesPage />,
            },
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'courses',
                element: <CourseLibraryPage />
            },
            {
                path: 'skills',
                element: <SkillsPracticePage />
            },
            {
                path: 'lessons',
                element: <LessonsPage />,
            },
            {
                path: 'lessons/:id',
                element: <LessonDetailPage />,
            },
            {
                path: 'achievements',
                element: (
                    <ProtectedRoute>
                        <AchievementsPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'community',
                element: <CommunityPage />,
            },
            {
                path: 'community/:id',
                element: <PostDetailPage />,
            },
            {
                path: 'leaderboard',
                element: <LeaderboardPage />,
            },
            {
                path: 'exams',
                element: <ExamPrepPage />,
            },
            {
                path: 'forum',
                element: <ChatForumPage />,
            },
            {
                path: 'messages',
                element: <MessagesPage />,
            },
            {
                path: 'settings',
                element: <SettingsPage />
            },
            {
                path: 'notifications',
                element: (
                    <ProtectedRoute>
                        <NotificationsPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'account',
                element: (
                    <ProtectedRoute>
                        <AccountPage />
                    </ProtectedRoute>
                ),
            },
        ],
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
])

export default function App() {
    const { ageGroup, setAgeGroup } = useUserStore();

    const handleSelectAgeGroup = (group: AgeGroup) => {
        setAgeGroup(group);
    };

    // Onboarding: if chưa chọn nhóm tuổi thì hiển thị màn AgeSelector toàn màn hình
    // if (!ageGroup) {
    //     return <AgeSelectorPage onSelectAgeGroup={handleSelectAgeGroup} />;
    // }

    return (
        <QueryProvider>
            <RouterProvider router={router} />
        </QueryProvider>
    )
}
