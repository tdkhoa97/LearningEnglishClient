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

// Pages
import { HomePage } from "@/pages/HomePage";
import { LearnPage } from "@/pages/LearnPage";
import { PracticePage } from "@/pages/PracticePage";
import { LeaderboardPage } from "@/pages/LeaderboardPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { VocabularyBankPage } from "@/pages/VocabularyBankPage";
import { CourseLibraryPage } from "@/pages/CourseLibraryPage";
import { HistoricalPlacesPage } from "@/pages/HistoricalPlacesPage";
import { DailyChallengesPage } from "@/pages/DailyChallengesPage";

//Test
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
    return (
        <QueryProvider>
            <RouterProvider router={router} />
        </QueryProvider>
    )
}
