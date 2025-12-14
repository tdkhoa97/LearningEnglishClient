import { useState, useEffect } from 'react';
import { MessageSquare, Users, Plus, Eye, ThumbsUp, Clock, TrendingUp, Send, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PageHeader } from '@/components/Layout/PageHeader';
import { supabase, ForumThread, ForumMessage, User, getCurrentUser, isMockMode, getMockUsers, getMockThreads } from '@/lib/supabase';
import { toast } from 'sonner';

export function ChatForumPage() {
    const [threads, setThreads] = useState<ForumThread[]>([]);
    const [selectedThread, setSelectedThread] = useState<ForumThread | null>(null);
    const [messages, setMessages] = useState<ForumMessage[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [newThreadOpen, setNewThreadOpen] = useState(false);
    const [replyContent, setReplyContent] = useState('');

    // New thread form
    const [newThread, setNewThread] = useState({
        title: '',
        content: '',
        category: 'general',
    });

    const categories = [
        { value: 'general', label: 'General Discussion', color: 'bg-emerald-100 text-emerald-700' },
        { value: 'grammar', label: 'Grammar Help', color: 'bg-blue-100 text-blue-700' },
        { value: 'vocabulary', label: 'Vocabulary', color: 'bg-purple-100 text-purple-700' },
        { value: 'practice', label: 'Practice Partners', color: 'bg-green-100 text-green-700' },
        { value: 'tips', label: 'Tips & Tricks', color: 'bg-lime-100 text-lime-700' },
    ];

    useEffect(() => {
        initializeForum();
    }, []);

    const initializeForum = async () => {
        try {
            setLoading(true);

            // Get or create current user
            const user = await getCurrentUser();
            setCurrentUser(user);

            // If in mock mode, load mock data
            if (isMockMode) {
                setThreads(getMockThreads());
                toast.info('Demo Mode: Using mock data. Configure Supabase in /lib/supabase.ts for real database.');
                setLoading(false);
                return;
            }

            // Load threads
            await loadThreads();

            // Subscribe to real-time updates
            if (supabase) {
                const threadSubscription = supabase
                    .channel('forum_threads_changes')
                    .on('postgres_changes', {
                        event: '*',
                        schema: 'public',
                        table: 'forum_threads'
                    }, () => {
                        loadThreads();
                    })
                    .subscribe();

                return () => {
                    threadSubscription.unsubscribe();
                };
            }
        } catch (error) {
            console.error('Error initializing forum:', error);
            toast.error('Failed to load forum.');
        } finally {
            setLoading(false);
        }
    };

    const loadThreads = async () => {
        if (!supabase) return;

        try {
            const { data, error } = await supabase
                .from('forum_threads')
                .select(`
          *,
          author:users!forum_threads_author_id_fkey(*)
        `)
                .order('updated_at', { ascending: false });

            if (error) throw error;

            // Get message counts for each thread
            const threadsWithCounts = await Promise.all(
                (data || []).map(async (thread) => {
                    const { count } = await supabase
                        .from('forum_messages')
                        .select('*', { count: 'exact', head: true })
                        .eq('thread_id', thread.id);

                    return { ...thread, message_count: count || 0 };
                })
            );

            setThreads(threadsWithCounts);
        } catch (error) {
            console.error('Error loading threads:', error);
        }
    };

    const loadThreadMessages = async (threadId: string) => {
        // Mock mode: return empty messages for now
        if (isMockMode) {
            setMessages([]);
            return;
        }

        if (!supabase) return;

        try {
            const { data, error } = await supabase
                .from('forum_messages')
                .select(`
          *,
          author:users!forum_messages_author_id_fkey(*)
        `)
                .eq('thread_id', threadId)
                .order('created_at', { ascending: true });

            if (error) throw error;
            setMessages(data || []);

            // Subscribe to new messages in this thread
            const messageSubscription = supabase
                .channel(`thread_${threadId}_messages`)
                .on('postgres_changes', {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'forum_messages',
                    filter: `thread_id=eq.${threadId}`
                }, () => {
                    loadThreadMessages(threadId);
                })
                .subscribe();

            return () => {
                messageSubscription.unsubscribe();
            };
        } catch (error) {
            console.error('Error loading messages:', error);
        }
    };

    const handleCreateThread = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!currentUser) {
            toast.error('Please wait for user initialization');
            return;
        }

        if (!newThread.title.trim() || !newThread.content.trim()) {
            toast.error('Please fill in all fields');
            return;
        }

        // Mock mode: add to local state
        if (isMockMode) {
            const mockNewThread: ForumThread = {
                id: `mock-thread-${Date.now()}`,
                title: newThread.title,
                content: newThread.content,
                category: newThread.category,
                author_id: currentUser.id,
                author: currentUser,
                views: 0,
                likes: 0,
                message_count: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            };

            setThreads([mockNewThread, ...threads]);
            toast.success('Thread created! (Demo Mode) You earned 10 XP! 🎉');
            setNewThreadOpen(false);
            setNewThread({ title: '', content: '', category: 'general' });
            return;
        }

        if (!supabase) return;

        try {
            const { error } = await supabase
                .from('forum_threads')
                .insert({
                    title: newThread.title,
                    content: newThread.content,
                    category: newThread.category,
                    author_id: currentUser.id,
                });

            if (error) throw error;

            toast.success('Thread created! You earned 10 XP! 🎉');
            setNewThreadOpen(false);
            setNewThread({ title: '', content: '', category: 'general' });
            loadThreads();
        } catch (error) {
            console.error('Error creating thread:', error);
            toast.error('Failed to create thread');
        }
    };

    const handleReply = async () => {
        if (!currentUser || !selectedThread) {
            toast.error('Cannot post reply');
            return;
        }

        if (!replyContent.trim()) {
            toast.error('Please write a reply');
            return;
        }

        // Mock mode: add to local state
        if (isMockMode) {
            const mockMessage: ForumMessage = {
                id: `mock-message-${Date.now()}`,
                thread_id: selectedThread.id,
                author_id: currentUser.id,
                author: currentUser,
                content: replyContent,
                likes: 0,
                created_at: new Date().toISOString(),
            };

            setMessages([...messages, mockMessage]);
            toast.success('Reply posted! (Demo Mode) You earned 5 XP! 🎉');
            setReplyContent('');
            return;
        }

        if (!supabase) return;

        try {
            const { error } = await supabase
                .from('forum_messages')
                .insert({
                    thread_id: selectedThread.id,
                    author_id: currentUser.id,
                    content: replyContent,
                });

            if (error) throw error;

            // Update thread's updated_at
            await supabase
                .from('forum_threads')
                .update({ updated_at: new Date().toISOString() })
                .eq('id', selectedThread.id);

            toast.success('Reply posted! You earned 5 XP! 🎉');
            setReplyContent('');
            loadThreadMessages(selectedThread.id);
            loadThreads();
        } catch (error) {
            console.error('Error posting reply:', error);
            toast.error('Failed to post reply');
        }
    };

    const handleThreadClick = async (thread: ForumThread) => {
        setSelectedThread(thread);
        await loadThreadMessages(thread.id);

        // Mock mode: just increment locally
        if (isMockMode) {
            const updatedThreads = threads.map(t =>
                t.id === thread.id ? { ...t, views: t.views + 1 } : t
            );
            setThreads(updatedThreads);
            return;
        }

        // Increment view count
        if (supabase) {
            await supabase
                .from('forum_threads')
                .update({ views: thread.views + 1 })
                .eq('id', thread.id);
        }
    };

    const getCategoryColor = (category: string) => {
        return categories.find(c => c.value === category)?.color || 'bg-gray-100 text-gray-700';
    };

    const formatTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (seconds < 60) return 'just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
        return `${Math.floor(seconds / 86400)}d ago`;
    };

    if (loading) {
        return (
            <div className="flex-1">
                <PageHeader title="Loading..." />
                <div className="p-8 flex items-center justify-center">
                    <p className="text-gray-600">Loading forum...</p>
                </div>
            </div>
        );
    }

    // Thread detail view
    if (selectedThread) {
        return (
            <div className="flex-1 flex flex-col">
                <PageHeader
                    title={selectedThread.title}
                    action={
                        <Button
                            variant="outline"
                            onClick={() => setSelectedThread(null)}
                            className="border-orange-200"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Forum
                        </Button>
                    }
                />

                <div className="flex-1 p-8">
                    <div className="max-w-4xl mx-auto space-y-6">
                        {/* Thread Content */}
                        <Card className="border-2 border-orange-200 shadow-lg">
                            <CardHeader>
                                <div className="flex items-start gap-4">
                                    <Avatar className="h-12 w-12 border-2 border-orange-300">
                                        <AvatarFallback className="bg-gradient-to-br from-orange-400 to-pink-400 text-white">
                                            {selectedThread.author?.username.slice(0, 2).toUpperCase() || 'U'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="font-medium text-gray-900">
                                                {selectedThread.author?.display_name || selectedThread.author?.username}
                                            </span>
                                            <Badge variant="outline" className="text-xs">
                                                Level {selectedThread.author?.level || 1}
                                            </Badge>
                                            <span className="text-sm text-gray-500">•</span>
                                            <span className="text-sm text-gray-500">
                                                {formatTimeAgo(selectedThread.created_at)}
                                            </span>
                                        </div>
                                        <Badge className={getCategoryColor(selectedThread.category)}>
                                            {categories.find(c => c.value === selectedThread.category)?.label}
                                        </Badge>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700 whitespace-pre-wrap">{selectedThread.content}</p>
                                <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <Eye className="w-4 h-4" />
                                        {selectedThread.views}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <MessageSquare className="w-4 h-4" />
                                        {messages.length}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Replies */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900">
                                {messages.length} {messages.length === 1 ? 'Reply' : 'Replies'}
                            </h3>

                            {messages.map((message) => (
                                <Card key={message.id} className="border border-gray-200">
                                    <CardContent className="p-4">
                                        <div className="flex items-start gap-3">
                                            <Avatar className="h-10 w-10 border-2 border-gray-300">
                                                <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-400 text-white">
                                                    {message.author?.username.slice(0, 2).toUpperCase() || 'U'}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-medium text-sm">
                                                        {message.author?.display_name || message.author?.username}
                                                    </span>
                                                    <Badge variant="outline" className="text-xs">
                                                        Level {message.author?.level || 1}
                                                    </Badge>
                                                    <span className="text-xs text-gray-500">
                                                        {formatTimeAgo(message.created_at)}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                                                    {message.content}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Reply Form */}
                        <Card className="border-2 border-orange-200">
                            <CardHeader>
                                <CardTitle className="text-lg">Post a Reply</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <Textarea
                                        placeholder="Share your thoughts..."
                                        value={replyContent}
                                        onChange={(e) => setReplyContent(e.target.value)}
                                        className="min-h-[100px] border-gray-300 focus:border-orange-400"
                                    />
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-gray-500">
                                            💡 Earn 5 XP for posting a helpful reply!
                                        </p>
                                        <Button
                                            onClick={handleReply}
                                            className="bg-orange-500 hover:bg-orange-600"
                                            disabled={!replyContent.trim()}
                                        >
                                            <Send className="w-4 h-4 mr-2" />
                                            Post Reply
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    // Forum list view
    return (
        <div className="flex-1">
            <PageHeader
                title="Community Forum"
                subtitle="Ask questions, share tips, and connect with fellow learners! 💬"
                action={
                    <Dialog open={newThreadOpen} onOpenChange={setNewThreadOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-orange-500 hover:bg-orange-600">
                                <Plus className="w-4 h-4 mr-2" />
                                New Thread
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Create New Thread</DialogTitle>
                                <DialogDescription>
                                    Start a discussion and earn 10 XP! 🎉
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleCreateThread} className="space-y-4">
                                <div>
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        placeholder="What's your question or topic?"
                                        value={newThread.title}
                                        onChange={(e) => setNewThread({ ...newThread, title: e.target.value })}
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="category">Category</Label>
                                    <Select
                                        value={newThread.category}
                                        onValueChange={(value) => setNewThread({ ...newThread, category: value })}
                                    >
                                        <SelectTrigger className="mt-1">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((cat) => (
                                                <SelectItem key={cat.value} value={cat.value}>
                                                    {cat.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="content">Content</Label>
                                    <Textarea
                                        id="content"
                                        placeholder="Share more details..."
                                        value={newThread.content}
                                        onChange={(e) => setNewThread({ ...newThread, content: e.target.value })}
                                        className="mt-1 min-h-[150px]"
                                    />
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setNewThreadOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="bg-orange-500 hover:bg-orange-600"
                                    >
                                        Create Thread
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                }
            />

            <div className="p-8">
                <div className="max-w-6xl mx-auto">
                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <Card className="border-2 border-orange-200">
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                                    <Users className="w-6 h-6 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{threads.length}</p>
                                    <p className="text-sm text-gray-600">Active Threads</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-2 border-blue-200">
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                    <MessageSquare className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {threads.reduce((sum, t) => sum + (t.message_count || 0), 0)}
                                    </p>
                                    <p className="text-sm text-gray-600">Total Replies</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-2 border-purple-200">
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {Math.floor(Math.random() * 50) + 20}
                                    </p>
                                    <p className="text-sm text-gray-600">Active Today</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Category Tabs */}
                    <Tabs defaultValue="all" className="w-full">
                        <TabsList className="mb-6">
                            <TabsTrigger value="all">All Discussions</TabsTrigger>
                            {categories.map((cat) => (
                                <TabsTrigger key={cat.value} value={cat.value}>
                                    {cat.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        <TabsContent value="all" className="space-y-4">
                            {threads.length === 0 ? (
                                <Card className="border-2 border-gray-200">
                                    <CardContent className="p-12 text-center">
                                        <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                        <p className="text-gray-500 mb-4">No threads yet. Be the first to start a discussion!</p>
                                        <Button
                                            onClick={() => setNewThreadOpen(true)}
                                            className="bg-orange-500 hover:bg-orange-600"
                                        >
                                            Create First Thread
                                        </Button>
                                    </CardContent>
                                </Card>
                            ) : (
                                threads.map((thread) => (
                                    <Card
                                        key={thread.id}
                                        className="border-2 border-gray-200 hover:border-orange-300 transition-colors cursor-pointer"
                                        onClick={() => handleThreadClick(thread)}
                                    >
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                <Avatar className="h-12 w-12 border-2 border-gray-300">
                                                    <AvatarFallback className="bg-gradient-to-br from-orange-400 to-pink-400 text-white">
                                                        {thread.author?.username.slice(0, 2).toUpperCase() || 'U'}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-4 mb-2">
                                                        <div className="flex-1">
                                                            <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                                                                {thread.title}
                                                            </h3>
                                                            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                                                                {thread.content}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-sm">
                                                        <Badge className={getCategoryColor(thread.category)}>
                                                            {categories.find(c => c.value === thread.category)?.label}
                                                        </Badge>
                                                        <span className="text-gray-600">
                                                            by {thread.author?.display_name || thread.author?.username}
                                                        </span>
                                                        <span className="text-gray-500 flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            {formatTimeAgo(thread.updated_at)}
                                                        </span>
                                                        <span className="text-gray-500 flex items-center gap-1">
                                                            <Eye className="w-3 h-3" />
                                                            {thread.views}
                                                        </span>
                                                        <span className="text-gray-500 flex items-center gap-1">
                                                            <MessageSquare className="w-3 h-3" />
                                                            {thread.message_count || 0}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </TabsContent>

                        {categories.map((cat) => (
                            <TabsContent key={cat.value} value={cat.value} className="space-y-4">
                                {threads
                                    .filter((t) => t.category === cat.value)
                                    .map((thread) => (
                                        <Card
                                            key={thread.id}
                                            className="border-2 border-gray-200 hover:border-orange-300 transition-colors cursor-pointer"
                                            onClick={() => handleThreadClick(thread)}
                                        >
                                            <CardContent className="p-6">
                                                <div className="flex items-start gap-4">
                                                    <Avatar className="h-12 w-12 border-2 border-gray-300">
                                                        <AvatarFallback className="bg-gradient-to-br from-orange-400 to-pink-400 text-white">
                                                            {thread.author?.username.slice(0, 2).toUpperCase() || 'U'}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-gray-900 mb-1">
                                                            {thread.title}
                                                        </h3>
                                                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                                                            {thread.content}
                                                        </p>
                                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                                            <span>
                                                                by {thread.author?.display_name || thread.author?.username}
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <Clock className="w-3 h-3" />
                                                                {formatTimeAgo(thread.updated_at)}
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <MessageSquare className="w-3 h-3" />
                                                                {thread.message_count || 0}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </div>
        </div>
    );
}