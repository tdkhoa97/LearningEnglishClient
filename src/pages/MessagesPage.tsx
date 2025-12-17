import { supabase, DirectMessage, User, getCurrentUser, isMockMode, getMockUsers } from '../lib/supabase';
import { useState, useEffect, useRef } from 'react';
import { Send, Search, UserPlus, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PageHeader } from '@/components/PageHeader';
import { toast } from 'sonner';

interface Conversation {
    user: User;
    lastMessage?: DirectMessage;
    unreadCount: number;
}

export function MessagesPage() {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<User | null>(null);
    const [messages, setMessages] = useState<DirectMessage[]>([]);
    const [messageInput, setMessageInput] = useState('');
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [newChatOpen, setNewChatOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        initializeMessages();
    }, []);

    useEffect(() => {
        if (selectedConversation) {
            loadMessages(selectedConversation.id);
        }
    }, [selectedConversation]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const initializeMessages = async () => {
        try {
            setLoading(true);

            // Get current user
            const user = await getCurrentUser();
            setCurrentUser(user);

            if (!user) return;

            // If in mock mode, load mock users
            if (isMockMode) {
                setAllUsers(getMockUsers());
                toast.info('Demo Mode: Using mock data. Configure Supabase in /lib/supabase.ts for real database.');
                setLoading(false);
                return;
            }

            // Load all users for new chat
            await loadAllUsers();

            // Load conversations
            await loadConversations(user.id);

            // Subscribe to new messages
            if (supabase) {
                const messageSubscription = supabase
                    .channel('direct_messages_changes')
                    .on('postgres_changes', {
                        event: 'INSERT',
                        schema: 'public',
                        table: 'direct_messages',
                        filter: `receiver_id=eq.${user.id}`
                    }, () => {
                        loadConversations(user.id);
                        if (selectedConversation) {
                            loadMessages(selectedConversation.id);
                        }
                    })
                    .subscribe();

                return () => {
                    messageSubscription.unsubscribe();
                };
            }
        } catch (error) {
            console.error('Error initializing messages:', error);
            toast.error('Failed to load messages.');
        } finally {
            setLoading(false);
        }
    };

    const loadAllUsers = async () => {
        if (!supabase) return;

        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setAllUsers(data || []);
        } catch (error) {
            console.error('Error loading users:', error);
        }
    };

    const loadConversations = async (userId: string) => {
        if (!supabase) return;

        try {
            // Get all messages where user is sender or receiver
            const { data: messagesData, error } = await supabase
                .from('direct_messages')
                .select(`
          *,
          sender:users!direct_messages_sender_id_fkey(*),
          receiver:users!direct_messages_receiver_id_fkey(*)
        `)
                .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
                .order('created_at', { ascending: false });

            if (error) throw error;

            // Group by conversation partner
            const conversationMap = new Map<string, Conversation>();

            (messagesData || []).forEach((msg) => {
                const partnerId = msg.sender_id === userId ? msg.receiver_id : msg.sender_id;
                const partner = msg.sender_id === userId ? msg.receiver : msg.sender;

                if (!conversationMap.has(partnerId)) {
                    conversationMap.set(partnerId, {
                        user: partner,
                        lastMessage: msg,
                        unreadCount: 0,
                    });
                }

                // Count unread messages
                if (msg.receiver_id === userId && !msg.read) {
                    const conv = conversationMap.get(partnerId)!;
                    conv.unreadCount++;
                }
            });

            setConversations(Array.from(conversationMap.values()));
        } catch (error) {
            console.error('Error loading conversations:', error);
        }
    };

    const loadMessages = async (partnerId: string) => {
        if (!currentUser) return;

        // Mock mode: return empty messages
        if (isMockMode) {
            setMessages([]);
            return;
        }

        if (!supabase) return;

        try {
            const { data, error } = await supabase
                .from('direct_messages')
                .select(`
          *,
          sender:users!direct_messages_sender_id_fkey(*),
          receiver:users!direct_messages_receiver_id_fkey(*)
        `)
                .or(`and(sender_id.eq.${currentUser.id},receiver_id.eq.${partnerId}),and(sender_id.eq.${partnerId},receiver_id.eq.${currentUser.id})`)
                .order('created_at', { ascending: true });

            if (error) throw error;
            setMessages(data || []);

            // Mark messages as read
            await supabase
                .from('direct_messages')
                .update({ read: true })
                .eq('receiver_id', currentUser.id)
                .eq('sender_id', partnerId)
                .eq('read', false);

            // Refresh conversations to update unread count
            await loadConversations(currentUser.id);
        } catch (error) {
            console.error('Error loading messages:', error);
        }
    };

    const handleSendMessage = async () => {
        if (!currentUser || !selectedConversation || !messageInput.trim()) return;

        // Mock mode: add to local state
        if (isMockMode) {
            const mockMessage: DirectMessage = {
                id: `mock-dm-${Date.now()}`,
                sender_id: currentUser.id,
                receiver_id: selectedConversation.id,
                content: messageInput,
                read: false,
                created_at: new Date().toISOString(),
                sender: currentUser,
                receiver: selectedConversation,
            };

            setMessages([...messages, mockMessage]);
            setMessageInput('');
            toast.success('Message sent! (Demo Mode)');
            return;
        }

        if (!supabase) return;

        try {
            const { error } = await supabase
                .from('direct_messages')
                .insert({
                    sender_id: currentUser.id,
                    receiver_id: selectedConversation.id,
                    content: messageInput,
                });

            if (error) throw error;

            setMessageInput('');
            await loadMessages(selectedConversation.id);
            await loadConversations(currentUser.id);
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('Failed to send message');
        }
    };

    const handleStartNewChat = (user: User) => {
        setSelectedConversation(user);
        setNewChatOpen(false);
        setMessages([]);
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const seconds = Math.floor(diff / 1000);

        if (seconds < 60) return 'just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        if (seconds < 86400) return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
        if (seconds < 604800) return date.toLocaleDateString('en-US', { weekday: 'short' });
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const filteredUsers = allUsers.filter(
        (user) =>
            user.id !== currentUser?.id &&
            (user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.display_name?.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (loading) {
        return (
            <div className="flex-1">
                <PageHeader title="Loading..." />
                <div className="p-8 flex items-center justify-center">
                    <p className="text-gray-600">Loading messages...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col">
            <PageHeader
                title="Messages"
                subtitle="Chat privately with other learners! 💬"
                action={
                    <Dialog open={newChatOpen} onOpenChange={setNewChatOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-orange-500 hover:bg-orange-600">
                                <UserPlus className="w-4 h-4 mr-2" />
                                New Chat
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Start New Chat</DialogTitle>
                                <DialogDescription>
                                    Choose a user to start chatting with
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        placeholder="Search users..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                                <ScrollArea className="h-[300px]">
                                    <div className="space-y-2">
                                        {filteredUsers.map((user) => (
                                            <button
                                                key={user.id}
                                                onClick={() => handleStartNewChat(user)}
                                                className="w-full p-3 flex items-center gap-3 hover:bg-gray-50 rounded-lg transition-colors"
                                            >
                                                <Avatar className="h-10 w-10 border-2 border-gray-300">
                                                    <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-400 text-white">
                                                        {user.username.slice(0, 2).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 text-left">
                                                    <p className="font-medium text-sm">{user.display_name || user.username}</p>
                                                    <p className="text-xs text-gray-500">Level {user.level}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </div>
                        </DialogContent>
                    </Dialog>
                }
            />

            <div className="flex-1 flex overflow-hidden">
                {/* Conversations List */}
                <div className="w-80 border-r-2 border-gray-200 bg-white">
                    <div className="p-4 border-b border-gray-200">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                placeholder="Search conversations..."
                                className="pl-10"
                            />
                        </div>
                    </div>
                    <ScrollArea className="h-[calc(100vh-16rem)]">
                        {conversations.length === 0 ? (
                            <div className="p-8 text-center">
                                <p className="text-gray-500 text-sm mb-4">No conversations yet</p>
                                <Button
                                    onClick={() => setNewChatOpen(true)}
                                    variant="outline"
                                    size="sm"
                                >
                                    Start a Chat
                                </Button>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {conversations.map((conv) => (
                                    <button
                                        key={conv.user.id}
                                        onClick={() => setSelectedConversation(conv.user)}
                                        className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors ${selectedConversation?.id === conv.user.id ? 'bg-orange-50' : ''
                                            }`}
                                    >
                                        <div className="relative">
                                            <Avatar className="h-12 w-12 border-2 border-gray-300">
                                                <AvatarFallback className="bg-gradient-to-br from-orange-400 to-pink-400 text-white">
                                                    {conv.user.username.slice(0, 2).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <Circle className="absolute bottom-0 right-0 w-3 h-3 fill-green-500 text-green-500" />
                                        </div>
                                        <div className="flex-1 text-left min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="font-medium text-sm truncate">
                                                    {conv.user.display_name || conv.user.username}
                                                </span>
                                                {conv.lastMessage && (
                                                    <span className="text-xs text-gray-500 ml-2">
                                                        {formatTime(conv.lastMessage.created_at)}
                                                    </span>
                                                )}
                                            </div>
                                            {conv.lastMessage && (
                                                <p className="text-xs text-gray-600 truncate">
                                                    {conv.lastMessage.sender_id === currentUser?.id ? 'You: ' : ''}
                                                    {conv.lastMessage.content}
                                                </p>
                                            )}
                                            {conv.unreadCount > 0 && (
                                                <Badge className="mt-1 bg-orange-500">
                                                    {conv.unreadCount} new
                                                </Badge>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </ScrollArea>
                </div>

                {/* Chat Window */}
                <div className="flex-1 flex flex-col bg-gradient-to-br from-orange-50/30 via-amber-50/30 to-pink-50/30">
                    {selectedConversation ? (
                        <>
                            {/* Chat Header */}
                            <div className="p-4 bg-white border-b-2 border-gray-200 flex items-center gap-3">
                                <Avatar className="h-10 w-10 border-2 border-orange-300">
                                    <AvatarFallback className="bg-gradient-to-br from-orange-400 to-pink-400 text-white">
                                        {selectedConversation.username.slice(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium">
                                        {selectedConversation.display_name || selectedConversation.username}
                                    </p>
                                    <div className="flex items-center gap-1 text-xs text-green-600">
                                        <Circle className="w-2 h-2 fill-green-500" />
                                        <span>Online</span>
                                    </div>
                                </div>
                            </div>

                            {/* Messages */}
                            <ScrollArea className="flex-1 p-4">
                                <div className="space-y-4 max-w-3xl mx-auto">
                                    {messages.map((message) => {
                                        const isOwn = message.sender_id === currentUser?.id;
                                        return (
                                            <div
                                                key={message.id}
                                                className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div className={`flex gap-2 max-w-[70%] ${isOwn ? 'flex-row-reverse' : ''}`}>
                                                    {!isOwn && (
                                                        <Avatar className="h-8 w-8 border-2 border-gray-300">
                                                            <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-400 text-white text-xs">
                                                                {message.sender?.username.slice(0, 2).toUpperCase()}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    )}
                                                    <div>
                                                        <div
                                                            className={`rounded-2xl px-4 py-2 ${isOwn
                                                                ? 'bg-orange-500 text-white rounded-tr-sm'
                                                                : 'bg-white border border-gray-200 rounded-tl-sm'
                                                                }`}
                                                        >
                                                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                                        </div>
                                                        <p className={`text-xs text-gray-500 mt-1 ${isOwn ? 'text-right' : ''}`}>
                                                            {formatTime(message.created_at)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div ref={messagesEndRef} />
                                </div>
                            </ScrollArea>

                            {/* Message Input */}
                            <div className="p-4 bg-white border-t-2 border-gray-200">
                                <div className="max-w-3xl mx-auto flex gap-2">
                                    <Input
                                        placeholder="Type a message..."
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSendMessage();
                                            }
                                        }}
                                        className="flex-1"
                                    />
                                    <Button
                                        onClick={handleSendMessage}
                                        disabled={!messageInput.trim()}
                                        className="bg-orange-500 hover:bg-orange-600"
                                    >
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
                                    <Send className="w-10 h-10 text-orange-500" />
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 mb-2">
                                    Start a Conversation
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Select a conversation or start a new chat
                                </p>
                                <Button
                                    onClick={() => setNewChatOpen(true)}
                                    className="bg-orange-500 hover:bg-orange-600"
                                >
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    New Chat
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}