import { createClient } from '@supabase/supabase-js';

/**
 * SUPABASE SETUP INSTRUCTIONS
 * ============================
 * 
 * 1. Replace these values with your Supabase project credentials:
 *    - SUPABASE_URL: Your project URL (found in Project Settings > API)
 *    - SUPABASE_ANON_KEY: Your anon/public key (found in Project Settings > API)
 * 
 * 2. Create the following tables in your Supabase database:
 * 
 * -- Users table (if not exists)
 * CREATE TABLE IF NOT EXISTS users (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   username TEXT UNIQUE NOT NULL,
 *   display_name TEXT,
 *   avatar_url TEXT,
 *   level INTEGER DEFAULT 1,
 *   xp INTEGER DEFAULT 0,
 *   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
 * );
 * 
 * -- Forum threads table
 * CREATE TABLE IF NOT EXISTS forum_threads (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   title TEXT NOT NULL,
 *   content TEXT NOT NULL,
 *   author_id UUID REFERENCES users(id) ON DELETE CASCADE,
 *   category TEXT NOT NULL,
 *   views INTEGER DEFAULT 0,
 *   likes INTEGER DEFAULT 0,
 *   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
 *   updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
 * );
 * 
 * -- Forum messages/replies table
 * CREATE TABLE IF NOT EXISTS forum_messages (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   thread_id UUID REFERENCES forum_threads(id) ON DELETE CASCADE,
 *   author_id UUID REFERENCES users(id) ON DELETE CASCADE,
 *   content TEXT NOT NULL,
 *   likes INTEGER DEFAULT 0,
 *   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
 * );
 * 
 * -- Direct messages table
 * CREATE TABLE IF NOT EXISTS direct_messages (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
 *   receiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
 *   content TEXT NOT NULL,
 *   read BOOLEAN DEFAULT FALSE,
 *   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
 * );
 * 
 * 3. Enable Row Level Security (RLS) policies:
 * 
 * -- Enable RLS
 * ALTER TABLE users ENABLE ROW LEVEL SECURITY;
 * ALTER TABLE forum_threads ENABLE ROW LEVEL SECURITY;
 * ALTER TABLE forum_messages ENABLE ROW LEVEL SECURITY;
 * ALTER TABLE direct_messages ENABLE ROW LEVEL SECURITY;
 * 
 * -- Allow public read access to forum (adjust based on your needs)
 * CREATE POLICY "Public read forum threads" ON forum_threads FOR SELECT USING (true);
 * CREATE POLICY "Public read forum messages" ON forum_messages FOR SELECT USING (true);
 * CREATE POLICY "Public read users" ON users FOR SELECT USING (true);
 * 
 * -- Allow authenticated users to insert (you'll need proper auth setup)
 * -- These are examples - adjust based on your auth strategy
 * CREATE POLICY "Authenticated insert threads" ON forum_threads FOR INSERT WITH CHECK (true);
 * CREATE POLICY "Authenticated insert messages" ON forum_messages FOR INSERT WITH CHECK (true);
 * CREATE POLICY "Authenticated insert DM" ON direct_messages FOR INSERT WITH CHECK (true);
 * CREATE POLICY "Users read own DM" ON direct_messages FOR SELECT USING (sender_id = auth.uid() OR receiver_id = auth.uid());
 * 
 * 4. Enable Realtime for live updates:
 *    Go to Database > Replication and enable realtime for:
 *    - forum_threads
 *    - forum_messages
 *    - direct_messages
 */

// Replace with your Supabase project URL
const SUPABASE_URL = 'YOUR_SUPABASE_URL_HERE';

// Replace with your Supabase anon/public key
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY_HERE';

// Validate credentials
const isValidUrl = (url: string) => {
    try {
        new URL(url);
        return url.startsWith('http://') || url.startsWith('https://');
    } catch {
        return false;
    }
};

const hasValidCredentials =
    isValidUrl(SUPABASE_URL) &&
    SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY_HERE' &&
    SUPABASE_ANON_KEY.length > 20;

// Create Supabase client only if valid credentials exist
export const supabase = hasValidCredentials
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

// Check if we're in mock mode
export const isMockMode = !hasValidCredentials;

// Types
export interface User {
    id: string;
    username: string;
    display_name?: string;
    avatar_url?: string;
    level: number;
    xp: number;
    created_at: string;
}

export interface ForumThread {
    id: string;
    title: string;
    content: string;
    author_id: string;
    category: string;
    views: number;
    likes: number;
    created_at: string;
    updated_at: string;
    author?: User;
    message_count?: number;
}

export interface ForumMessage {
    id: string;
    thread_id: string;
    author_id: string;
    content: string;
    likes: number;
    created_at: string;
    author?: User;
}

export interface DirectMessage {
    id: string;
    sender_id: string;
    receiver_id: string;
    content: string;
    read: boolean;
    created_at: string;
    sender?: User;
    receiver?: User;
}

// Helper to get or create current user (for demo purposes)
// In production, use proper Supabase Auth
export const getCurrentUser = async (): Promise<User | null> => {
    // If in mock mode, use localStorage only
    if (isMockMode) {
        let storedUser = localStorage.getItem('funlingo_mock_user');
        if (storedUser) {
            return JSON.parse(storedUser);
        }

        // Create mock user
        const mockUser: User = {
            id: `mock-${Date.now()}`,
            username: `learner_${Math.floor(Math.random() * 10000)}`,
            display_name: 'English Learner',
            level: 1,
            xp: 0,
            created_at: new Date().toISOString(),
        };

        localStorage.setItem('funlingo_mock_user', JSON.stringify(mockUser));
        return mockUser;
    }

    // Real Supabase mode
    try {
        const storedUserId = localStorage.getItem('funlingo_user_id');

        if (storedUserId && supabase) {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', storedUserId)
                .single();

            if (!error && data) {
                return data;
            }
        }

        // Create demo user if none exists
        const demoUser = {
            username: `learner_${Math.floor(Math.random() * 10000)}`,
            display_name: `English Learner`,
            level: 1,
            xp: 0,
        };

        if (!supabase) return null;

        const { data, error } = await supabase
            .from('users')
            .insert(demoUser)
            .select()
            .single();

        if (!error && data) {
            localStorage.setItem('funlingo_user_id', data.id);
            return data;
        }

        return null;
    } catch (error) {
        console.error('Error getting current user:', error);
        return null;
    }
};

// Mock data for demo mode
export const getMockUsers = (): User[] => {
    return [
        {
            id: 'mock-user-1',
            username: 'cat_lover_123',
            display_name: 'Cat Lover',
            level: 5,
            xp: 450,
            created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
        },
        {
            id: 'mock-user-2',
            username: 'english_master',
            display_name: 'English Master',
            level: 8,
            xp: 750,
            created_at: new Date(Date.now() - 86400000 * 14).toISOString(),
        },
        {
            id: 'mock-user-3',
            username: 'learner_pro',
            display_name: 'Pro Learner',
            level: 3,
            xp: 250,
            created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
        },
    ];
};

export const getMockThreads = (): ForumThread[] => {
    const users = getMockUsers();
    return [
        {
            id: 'mock-thread-1',
            title: 'How to improve my English pronunciation?',
            content: 'I\'ve been learning English for 6 months now, but I still struggle with pronunciation. Does anyone have tips? 🗣️',
            author_id: users[0].id,
            author: users[0],
            category: 'tips',
            views: 45,
            likes: 12,
            message_count: 5,
            created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
            updated_at: new Date(Date.now() - 3600000 * 2).toISOString(),
        },
        {
            id: 'mock-thread-2',
            title: 'What\'s the difference between "affect" and "effect"?',
            content: 'These two words always confuse me. Can someone explain clearly? Thanks!',
            author_id: users[2].id,
            author: users[2],
            category: 'grammar',
            views: 32,
            likes: 8,
            message_count: 3,
            created_at: new Date(Date.now() - 3600000 * 8).toISOString(),
            updated_at: new Date(Date.now() - 3600000 * 4).toISOString(),
        },
        {
            id: 'mock-thread-3',
            title: 'Looking for a practice partner! 🤝',
            content: 'Hi everyone! I\'m looking for someone to practice English conversation with. Anyone interested?',
            author_id: users[1].id,
            author: users[1],
            category: 'practice',
            views: 28,
            likes: 15,
            message_count: 7,
            created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
            updated_at: new Date(Date.now() - 3600000 * 1).toISOString(),
        },
    ];
};