import { AgeGroup } from "../components/AgeSelectorPage";

export interface Lesson {
    id: number;
    title: string;
    description: string;
    icon: string;
    completed: boolean;
    locked: boolean;
    stars: number;
    category?: string;
}

export interface Question {
    id: number;
    type: "multiple-choice";
    question: string;
    options: string[];
    correctAnswer: string;
    image?: string;
}

// Elementary School Lessons (6-11 tuổi)
const elementaryLessons: Lesson[] = [
    { id: 1, title: "Chào Hỏi", description: "Học cách chào hỏi bạn bè", icon: "👋", completed: true, locked: false, stars: 3, category: "Cơ Bản" },
    { id: 2, title: "Màu Sắc", description: "Nhận biết tất cả màu sắc", icon: "🎨", completed: true, locked: false, stars: 2, category: "Cơ Bản" },
    { id: 3, title: "Động Vật", description: "Gặp gỡ những người bạn đáng yêu", icon: "🐶", completed: false, locked: false, stars: 0, category: "Thú Vị" },
    { id: 4, title: "Số Đếm", description: "Đếm từ 1 đến 100", icon: "🔢", completed: false, locked: false, stars: 0, category: "Cơ Bản" },
    { id: 5, title: "Đồ Ăn", description: "Món ăn yêu thích", icon: "🍕", completed: false, locked: true, stars: 0, category: "Thú Vị" },
    { id: 6, title: "Gia Đình", description: "Giới thiệu gia đình", icon: "👨‍👩‍👧‍👦", completed: false, locked: true, stars: 0, category: "Cơ Bản" },
    { id: 7, title: "Thời Tiết", description: "Nắng hay mưa?", icon: "⛅", completed: false, locked: true, stars: 0, category: "Thú Vị" },
    { id: 8, title: "Đồ Chơi", description: "Đồ chơi của bạn", icon: "🧸", completed: false, locked: true, stars: 0, category: "Thú Vị" },
    { id: 9, title: "Thể Thao", description: "Cùng chơi thể thao!", icon: "⚽", completed: false, locked: true, stars: 0, category: "Vui Chơi" },
    { id: 10, title: "Bài Hát", description: "Học qua nhạc", icon: "🎵", completed: false, locked: true, stars: 0, category: "Vui Chơi" },
];

// Middle School Lessons (12-17 tuổi)
const middleLessons: Lesson[] = [
    { id: 1, title: "Greetings & Intros", description: "Master first impressions", icon: "👋", completed: true, locked: false, stars: 3, category: "Foundation" },
    { id: 2, title: "Daily Conversations", description: "Talk about your day", icon: "💬", completed: true, locked: false, stars: 2, category: "Speaking" },
    { id: 3, title: "School Life", description: "Classroom vocabulary", icon: "📚", completed: false, locked: false, stars: 0, category: "Academic" },
    { id: 4, title: "Social Media", description: "Digital communication", icon: "📱", completed: false, locked: false, stars: 0, category: "Modern" },
    { id: 5, title: "Food & Dining", description: "Restaurant English", icon: "🍔", completed: false, locked: true, stars: 0, category: "Practical" },
    { id: 6, title: "Travel & Tourism", description: "Navigate the world", icon: "✈️", completed: false, locked: true, stars: 0, category: "Adventure" },
    { id: 7, title: "Technology", description: "Tech vocabulary", icon: "💻", completed: false, locked: true, stars: 0, category: "Modern" },
    { id: 8, title: "Entertainment", description: "Music, movies, games", icon: "🎮", completed: false, locked: true, stars: 0, category: "Fun" },
    { id: 9, title: "Sports & Fitness", description: "Active lifestyle", icon: "🏀", completed: false, locked: true, stars: 0, category: "Health" },
    { id: 10, title: "Future Plans", description: "Dreams & goals", icon: "🎯", completed: false, locked: true, stars: 0, category: "Aspirations" },
];

// Adult Lessons (18+)
const adultLessons: Lesson[] = [
    { id: 1, title: "Business Greetings", description: "Professional introductions", icon: "🤝", completed: true, locked: false, stars: 3, category: "Business" },
    { id: 2, title: "Email Writing", description: "Professional correspondence", icon: "📧", completed: true, locked: false, stars: 2, category: "Business" },
    { id: 3, title: "Meetings & Calls", description: "Conference essentials", icon: "📞", completed: false, locked: false, stars: 0, category: "Business" },
    { id: 4, title: "Presentations", description: "Public speaking skills", icon: "📊", completed: false, locked: false, stars: 0, category: "Career" },
    { id: 5, title: "Negotiations", description: "Deal-making language", icon: "💼", completed: false, locked: true, stars: 0, category: "Business" },
    { id: 6, title: "Travel English", description: "Airport & hotels", icon: "✈️", completed: false, locked: true, stars: 0, category: "Travel" },
    { id: 7, title: "Banking & Finance", description: "Money matters", icon: "💰", completed: false, locked: true, stars: 0, category: "Practical" },
    { id: 8, title: "Healthcare", description: "Medical vocabulary", icon: "🏥", completed: false, locked: true, stars: 0, category: "Practical" },
    { id: 9, title: "Networking", description: "Build connections", icon: "🌐", completed: false, locked: true, stars: 0, category: "Career" },
    { id: 10, title: "Interview Skills", description: "Land your dream job", icon: "👔", completed: false, locked: true, stars: 0, category: "Career" },
];

export const getLessonsForAgeGroup = (ageGroup: AgeGroup): Lesson[] => {
    switch (ageGroup) {
        case "elementary":
            return elementaryLessons;
        case "middle":
            return middleLessons;
        case "adult":
            return adultLessons;
        default:
            return middleLessons;
    }
};

// Elementary Questions
const elementaryQuestions: Question[] = [
    {
        id: 1,
        type: "multiple-choice",
        question: "Chọn lời chào đúng:",
        options: ["Goodbye", "Hello", "Thank you", "Sorry"],
        correctAnswer: "Hello",
        image: "👋"
    },
    {
        id: 2,
        type: "multiple-choice",
        question: "Đây là con gì?",
        options: ["Cat 🐱", "Dog 🐶", "Bird 🐦", "Fish 🐠"],
        correctAnswer: "Dog 🐶",
    },
    {
        id: 3,
        type: "multiple-choice",
        question: "Màu của bầu trời là gì?",
        options: ["Red (Đỏ)", "Blue (Xanh)", "Green (Lục)", "Yellow (Vàng)"],
        correctAnswer: "Blue (Xanh)",
        image: "☁️"
    },
    {
        id: 4,
        type: "multiple-choice",
        question: "Chọn 'Good morning' (Chào buổi sáng):",
        options: ["Good night", "Good morning", "Good afternoon", "Good evening"],
        correctAnswer: "Good morning",
    },
    {
        id: 5,
        type: "multiple-choice",
        question: "Câu nào đúng?",
        options: ["I am happy 😊", "I is happy", "I are happy", "Happy I am"],
        correctAnswer: "I am happy 😊",
    },
];

// Middle School Questions
const middleQuestions: Question[] = [
    {
        id: 1,
        type: "multiple-choice",
        question: "How do you respond to 'How are you?'",
        options: ["I'm fine, thanks!", "Yes, please", "Goodbye", "Nice to meet you"],
        correctAnswer: "I'm fine, thanks!",
        image: "👋"
    },
    {
        id: 2,
        type: "multiple-choice",
        question: "Which is the correct question form?",
        options: ["Where you are going?", "Where are you going?", "Where going you are?", "You where are going?"],
        correctAnswer: "Where are you going?",
    },
    {
        id: 3,
        type: "multiple-choice",
        question: "Complete: 'I ___ to school every day.'",
        options: ["go", "goes", "going", "went"],
        correctAnswer: "go",
    },
    {
        id: 4,
        type: "multiple-choice",
        question: "What's the past tense of 'eat'?",
        options: ["eated", "ate", "eaten", "eat"],
        correctAnswer: "ate",
    },
    {
        id: 5,
        type: "multiple-choice",
        question: "Which word is an adjective?",
        options: ["quickly", "beautiful", "run", "happiness"],
        correctAnswer: "beautiful",
    },
];

// Adult Questions
const adultQuestions: Question[] = [
    {
        id: 1,
        type: "multiple-choice",
        question: "How do you start a formal email?",
        options: ["Hey!", "Dear Sir/Madam,", "Yo,", "Hi there,"],
        correctAnswer: "Dear Sir/Madam,",
        image: "📧"
    },
    {
        id: 2,
        type: "multiple-choice",
        question: "Which phrase is most professional?",
        options: ["I need this ASAP", "Could you please prioritize this?", "Do this now!", "This is urgent!!!"],
        correctAnswer: "Could you please prioritize this?",
    },
    {
        id: 3,
        type: "multiple-choice",
        question: "How do you politely disagree in a meeting?",
        options: ["You're wrong", "I see your point, however...", "That's stupid", "No way"],
        correctAnswer: "I see your point, however...",
    },
    {
        id: 4,
        type: "multiple-choice",
        question: "What's the best way to end a business call?",
        options: ["Bye!", "Thank you for your time. Have a great day.", "See ya!", "Later!"],
        correctAnswer: "Thank you for your time. Have a great day.",
    },
    {
        id: 5,
        type: "multiple-choice",
        question: "Which is correct for a job interview?",
        options: ["I'm the best", "I believe my skills align with this role", "I'm okay I guess", "Whatever you need"],
        correctAnswer: "I believe my skills align with this role",
    },
];

export const getQuestionsForAgeGroup = (ageGroup: AgeGroup): Question[] => {
    switch (ageGroup) {
        case "elementary":
            return elementaryQuestions;
        case "middle":
            return middleQuestions;
        case "adult":
            return adultQuestions;
        default:
            return middleQuestions;
    }
};
