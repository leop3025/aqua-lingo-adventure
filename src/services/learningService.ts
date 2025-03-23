import { 
  User, 
  Achievement, 
  Lesson, 
  Word, 
  QuizQuestion,
  Activity,
  VocabularyCategory
} from '@/types/learning';

// Mock user data
const userData: User = {
  id: "user1",
  username: "LearningLover",
  level: 5,
  xp: 1240,
  streak: 3,
  wordsLearned: 124,
  lessonsCompleted: 15,
  quizzesTaken: 12,
  joinedDate: "October 12, 2023"
};

// Mock achievements data
const achievementsData: Achievement[] = [
  {
    id: "ach1",
    title: "First Steps",
    description: "Complete your first lesson",
    icon: "Flag",
    progress: 100,
    completed: true,
    date: "3 days ago"
  },
  {
    id: "ach2",
    title: "Word Collector",
    description: "Learn 100 Spanish words",
    icon: "BookOpen",
    progress: 90,
    completed: false,
    date: null
  },
  {
    id: "ach3",
    title: "Quiz Master",
    description: "Get a perfect score on 5 quizzes",
    icon: "Award",
    progress: 60,
    completed: false,
    date: null
  },
  {
    id: "ach4",
    title: "Streak Keeper",
    description: "Maintain a 7-day streak",
    icon: "Crown",
    progress: 40,
    completed: false,
    date: null
  },
  {
    id: "ach5",
    title: "Conversation Starter",
    description: "Complete 10 dialogue practices",
    icon: "MessageSquare",
    progress: 20,
    completed: false,
    date: null
  }
];

// Mock lessons data
const lessonsData: Lesson[] = [
  {
    id: 1,
    title: "Greetings & Introductions",
    description: "Learn basic Spanish greetings and how to introduce yourself.",
    difficulty: "Beginner",
    complete: true,
    unlocked: true,
    progress: 100,
    xp: 30,
    icon: "👋",
    content: [
      {
        id: "l1c1",
        type: "text",
        content: "¡Hola! (Hello!)",
        translation: "Hello!"
      },
      {
        id: "l1c2",
        type: "text",
        content: "Buenos días (Good morning)",
        translation: "Good morning"
      },
      {
        id: "l1c3",
        type: "text",
        content: "¿Cómo estás? (How are you?)",
        translation: "How are you?"
      },
      {
        id: "l1c4",
        type: "text",
        content: "Me llamo... (My name is...)",
        translation: "My name is..."
      }
    ]
  },
  {
    id: 2,
    title: "Basic Conversations",
    description: "Practice everyday conversations in Spanish.",
    difficulty: "Beginner",
    complete: true,
    unlocked: true,
    progress: 100,
    xp: 35,
    icon: "💬",
    content: [
      {
        id: "l2c1",
        type: "text",
        content: "¿De dónde eres? (Where are you from?)",
        translation: "Where are you from?"
      },
      {
        id: "l2c2",
        type: "text",
        content: "Soy de... (I am from...)",
        translation: "I am from..."
      }
    ]
  },
  {
    id: 3,
    title: "Numbers & Counting",
    description: "Learn numbers and how to count in Spanish.",
    difficulty: "Beginner",
    complete: false,
    unlocked: true,
    progress: 60,
    xp: 40,
    icon: "🔢",
    content: [
      {
        id: "l3c1",
        type: "text",
        content: "Uno, dos, tres (One, two, three)",
        translation: "One, two, three"
      },
      {
        id: "l3c2",
        type: "text",
        content: "Cuatro, cinco, seis (Four, five, six)",
        translation: "Four, five, six"
      }
    ]
  },
  {
    id: 4,
    title: "Food & Dining",
    description: "Learn vocabulary related to food and dining out.",
    difficulty: "Beginner",
    complete: false,
    unlocked: true,
    progress: 25,
    xp: 45,
    icon: "🍽️"
  },
  {
    id: 5,
    title: "Family & Relationships",
    description: "Learn vocabulary for family members and relationships.",
    difficulty: "Intermediate",
    complete: false,
    unlocked: false,
    progress: 0,
    xp: 50,
    icon: "👪"
  },
  {
    id: 6,
    title: "Travel & Directions",
    description: "Navigate and ask for directions in Spanish.",
    difficulty: "Intermediate",
    complete: false,
    unlocked: false,
    progress: 0,
    xp: 55,
    icon: "🧭"
  }
];

// Vocabulary categories
const vocabularyCategoriesData: VocabularyCategory[] = [
  {
    id: "cat1",
    name: "Greetings",
    description: "Common phrases for greeting people",
    iconName: "Wave",
    wordCount: 15
  },
  {
    id: "cat2",
    name: "Numbers",
    description: "Numbers and counting",
    iconName: "Hash",
    wordCount: 40
  },
  {
    id: "cat3",
    name: "Food & Dining",
    description: "Food, restaurants, and eating",
    iconName: "Utensils",
    wordCount: 50
  },
  {
    id: "cat4",
    name: "Family",
    description: "Family members and relationships",
    iconName: "Users",
    wordCount: 25
  },
  {
    id: "cat5",
    name: "Travel",
    description: "Travel, directions, and transportation",
    iconName: "Map",
    wordCount: 45
  },
  {
    id: "cat6",
    name: "Time & Date",
    description: "Telling time and dates",
    iconName: "Clock",
    wordCount: 30
  },
  {
    id: "cat7",
    name: "Shopping",
    description: "Shopping and money",
    iconName: "ShoppingBag",
    wordCount: 35
  },
  {
    id: "cat8",
    name: "Weather",
    description: "Weather expressions",
    iconName: "Cloud",
    wordCount: 20
  }
];

// Extended vocabulary words
const vocabularyData: Word[] = [
  { id: "w1", spanish: "hola", english: "hello", category: "greetings", learned: true, pronunciation: "OH-lah", example: "¡Hola! ¿Cómo estás?" },
  { id: "w2", spanish: "adiós", english: "goodbye", category: "greetings", learned: true, pronunciation: "ah-DYOHS", example: "Adiós, hasta mañana." },
  { id: "w3", spanish: "gracias", english: "thank you", category: "greetings", learned: true, pronunciation: "GRAH-syahs", example: "Muchas gracias por tu ayuda." },
  { id: "w4", spanish: "por favor", english: "please", category: "greetings", learned: true, pronunciation: "pohr fah-VOHR", example: "Por favor, pásame el agua." },
  { id: "w5", spanish: "buenos días", english: "good morning", category: "greetings", learned: false, pronunciation: "BWEH-nohs DEE-ahs", example: "Buenos días, ¿cómo amaneciste?" },
  { id: "w6", spanish: "buenas tardes", english: "good afternoon", category: "greetings", learned: false, pronunciation: "BWEH-nahs TAR-dehs", example: "Buenas tardes a todos." },
  { id: "w7", spanish: "buenas noches", english: "good evening/night", category: "greetings", learned: false, pronunciation: "BWEH-nahs NOH-chehs", example: "Buenas noches, que descanses." },
  { id: "w8", spanish: "hasta luego", english: "see you later", category: "greetings", learned: false, pronunciation: "AHS-tah LWEH-goh", example: "Hasta luego, nos vemos mañana." },
  { id: "w9", spanish: "bienvenido", english: "welcome", category: "greetings", learned: false, pronunciation: "byen-beh-NEE-doh", example: "¡Bienvenido a nuestra casa!" },
  { id: "w10", spanish: "mucho gusto", english: "nice to meet you", category: "greetings", learned: false, pronunciation: "MOO-choh GOOS-toh", example: "Mucho gusto, me llamo Juan." },
  
  { id: "w11", spanish: "uno", english: "one", category: "numbers", learned: true, pronunciation: "OO-noh", example: "Tengo un perro." },
  { id: "w12", spanish: "dos", english: "two", category: "numbers", learned: true, pronunciation: "dohs", example: "Hay dos libros en la mesa." },
  { id: "w13", spanish: "tres", english: "three", category: "numbers", learned: true, pronunciation: "trehs", example: "Necesito tres manzanas." },
  { id: "w14", spanish: "cuatro", english: "four", category: "numbers", learned: true, pronunciation: "KWAH-troh", example: "Hay cuatro personas en mi familia." },
  { id: "w15", spanish: "cinco", english: "five", category: "numbers", learned: false, pronunciation: "SEEN-koh", example: "Tengo cinco dedos en cada mano." },
  { id: "w16", spanish: "seis", english: "six", category: "numbers", learned: false, pronunciation: "sehs", example: "El partido empieza a las seis." },
  { id: "w17", spanish: "siete", english: "seven", category: "numbers", learned: false, pronunciation: "SYEH-teh", example: "Son las siete de la noche." },
  { id: "w18", spanish: "ocho", english: "eight", category: "numbers", learned: false, pronunciation: "OH-choh", example: "Hay ocho planetas en el sistema solar." },
  { id: "w19", spanish: "nueve", english: "nine", category: "numbers", learned: false, pronunciation: "NWEH-beh", example: "Mi cumpleaños es el nueve de julio." },
  { id: "w20", spanish: "diez", english: "ten", category: "numbers", learned: false, pronunciation: "dyehs", example: "Necesito diez dólares." },
  
  { id: "w21", spanish: "agua", english: "water", category: "food", learned: true, pronunciation: "AH-gwah", example: "Me gustaría un vaso de agua, por favor." },
  { id: "w22", spanish: "pan", english: "bread", category: "food", learned: true, pronunciation: "pahn", example: "Me gusta comer pan fresco." },
  { id: "w23", spanish: "queso", english: "cheese", category: "food", learned: false, pronunciation: "KEH-soh", example: "Este sandwich tiene queso y jamón." },
  { id: "w24", spanish: "manzana", english: "apple", category: "food", learned: false, pronunciation: "mahn-SAH-nah", example: "Como una manzana cada día." },
  { id: "w25", spanish: "café", english: "coffee", category: "food", learned: false, pronunciation: "kah-FEH", example: "Me gusta el café con leche." },
  { id: "w26", spanish: "leche", english: "milk", category: "food", learned: false, pronunciation: "LEH-cheh", example: "Los niños beben leche." },
  { id: "w27", spanish: "pollo", english: "chicken", category: "food", learned: false, pronunciation: "POH-yoh", example: "Vamos a comer pollo para la cena." },
  { id: "w28", spanish: "arroz", english: "rice", category: "food", learned: false, pronunciation: "ah-ROHS", example: "El arroz es un acompañamiento común." },
  { id: "w29", spanish: "huevo", english: "egg", category: "food", learned: false, pronunciation: "WEH-boh", example: "Me gustan los huevos revueltos." },
  { id: "w30", spanish: "pescado", english: "fish", category: "food", learned: false, pronunciation: "pehs-KAH-doh", example: "El pescado es saludable." },
  
  { id: "w31", spanish: "madre", english: "mother", category: "family", learned: false, pronunciation: "MAH-dreh", example: "Mi madre es muy cariñosa." },
  { id: "w32", spanish: "padre", english: "father", category: "family", learned: false, pronunciation: "PAH-dreh", example: "Mi padre trabaja mucho." },
  { id: "w33", spanish: "hermano", english: "brother", category: "family", learned: false, pronunciation: "ehr-MAH-noh", example: "Mi hermano es mayor que yo." },
  { id: "w34", spanish: "hermana", english: "sister", category: "family", learned: false, pronunciation: "ehr-MAH-nah", example: "Mi hermana vive en Madrid." },
  { id: "w35", spanish: "hijo", english: "son", category: "family", learned: false, pronunciation: "EE-hoh", example: "Su hijo tiene cinco años." },
  
  { id: "w36", spanish: "coche", english: "car", category: "travel", learned: false, pronunciation: "KOH-cheh", example: "Vamos en coche a la playa." },
  { id: "w37", spanish: "tren", english: "train", category: "travel", learned: false, pronunciation: "trehn", example: "El tren llega a las tres." },
  { id: "w38", spanish: "avión", english: "airplane", category: "travel", learned: false, pronunciation: "ah-BYOHN", example: "Viajamos en avión a España." },
  { id: "w39", spanish: "hotel", english: "hotel", category: "travel", learned: false, pronunciation: "oh-TEHL", example: "Nos hospedamos en un hotel cerca de la playa." },
  { id: "w40", spanish: "pasaporte", english: "passport", category: "travel", learned: false, pronunciation: "pah-sah-POHR-teh", example: "No olvides tu pasaporte." }
];

// Quiz questions
const quizQuestionsData: QuizQuestion[] = [
  {
    id: 1,
    question: "¿Cómo estás?",
    options: ["How old are you?", "How are you?", "What's your name?", "Where are you from?"],
    correctAnswer: 1,
    hint: "This is a common greeting asking about someone's state or condition."
  },
  {
    id: 2,
    question: "¿Cómo te llamas?",
    options: ["What's your name?", "How old are you?", "Where do you live?", "What do you do?"],
    correctAnswer: 0,
    hint: "Think about introductions when you meet someone for the first time."
  },
  {
    id: 3,
    question: "What is the Spanish word for 'cat'?",
    options: ["Perro", "Gato", "Pájaro", "Ratón"],
    correctAnswer: 1,
    hint: "This animal is known for purring and chasing mice."
  },
  {
    id: 4,
    question: "Translate: 'I like to read books'",
    options: ["Me gusta leer libros", "Quiero escribir libros", "Tengo muchos libros", "Voy a la biblioteca"],
    correctAnswer: 0,
    hint: "Focus on the verb 'gustar' (to like) and 'leer' (to read)."
  },
  {
    id: 5,
    question: "Which is the correct way to say 'good night' in Spanish?",
    options: ["Buenos días", "Buenas tardes", "Buenas noches", "Buen provecho"],
    correctAnswer: 2,
    hint: "Think about what you say before going to bed."
  }
];

// Activities data
const activitiesData: Activity[] = [
  {
    id: "a1",
    title: "Vocabulary Match",
    description: "Match Spanish words with their English translations",
    icon: "BookOpen",
    color: "bg-ocean-light",
    borderColor: "border-ocean",
    textColor: "text-ocean-deep",
    type: "vocabulary"
  },
  {
    id: "a2",
    title: "Conversation Challenge",
    description: "Practice dialogue with common phrases",
    icon: "MessageSquare",
    color: "bg-coral-light",
    borderColor: "border-coral",
    textColor: "text-coral-deep",
    type: "conversation"
  },
  {
    id: "a3",
    title: "Memory Game",
    description: "Test your memory with Spanish vocabulary",
    icon: "Gamepad2",
    color: "bg-sand-light",
    borderColor: "border-sand",
    textColor: "text-sand-deep",
    type: "memory"
  },
  {
    id: "a4",
    title: "Listening Challenge",
    description: "Understand spoken Spanish and select the correct meaning",
    icon: "Target",
    color: "bg-primary/10",
    borderColor: "border-primary",
    textColor: "text-primary",
    type: "listening"
  }
];

// Local storage keys
const STORAGE_KEYS = {
  USER: 'lumi-user',
  LESSONS: 'lumi-lessons',
  ACHIEVEMENTS: 'lumi-achievements',
  VOCABULARY: 'lumi-vocabulary',
  LAST_ACTIVE: 'lumi-last-active'
};

// Initialize data if not exists in localStorage
const initializeData = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USER)) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.LESSONS)) {
    localStorage.setItem(STORAGE_KEYS.LESSONS, JSON.stringify(lessonsData));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS)) {
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievementsData));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.VOCABULARY)) {
    localStorage.setItem(STORAGE_KEYS.VOCABULARY, JSON.stringify(vocabularyData));
  }
  
  // Update last active date
  localStorage.setItem(STORAGE_KEYS.LAST_ACTIVE, new Date().toISOString());
};

// Helper to get data from localStorage
const getData = <T>(key: string): T => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

// Helper to set data to localStorage
const setData = <T>(key: string, data: T): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

// User related methods
export const getUserData = (): User => {
  initializeData();
  return getData<User>(STORAGE_KEYS.USER);
};

export const updateUserData = (userData: Partial<User>): User => {
  const currentUser = getUserData();
  const updatedUser = { ...currentUser, ...userData };
  setData(STORAGE_KEYS.USER, updatedUser);
  return updatedUser;
};

export const addUserXP = (xp: number): User => {
  const currentUser = getUserData();
  let newXP = currentUser.xp + xp;
  let newLevel = currentUser.level;
  
  // Level up if XP threshold is reached (500 XP per level)
  if (newXP >= newLevel * 500) {
    newLevel += 1;
  }
  
  const updatedUser = { 
    ...currentUser, 
    xp: newXP, 
    level: newLevel 
  };
  
  setData(STORAGE_KEYS.USER, updatedUser);
  return updatedUser;
};

// Check and update streak
export const updateStreak = (): User => {
  const currentUser = getUserData();
  const lastActive = localStorage.getItem(STORAGE_KEYS.LAST_ACTIVE);
  
  if (!lastActive) {
    return currentUser;
  }
  
  const lastActiveDate = new Date(lastActive);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - lastActiveDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  let newStreak = currentUser.streak;
  
  if (diffDays === 1) {
    // User was active yesterday, increment streak
    newStreak += 1;
  } else if (diffDays > 1) {
    // User missed a day, reset streak
    newStreak = 1;
  }
  // If diffDays === 0, user was already active today, keep streak
  
  const updatedUser = { ...currentUser, streak: newStreak };
  setData(STORAGE_KEYS.USER, updatedUser);
  localStorage.setItem(STORAGE_KEYS.LAST_ACTIVE, new Date().toISOString());
  
  return updatedUser;
};

// Lessons related methods
export const getLessons = (): Lesson[] => {
  initializeData();
  return getData<Lesson[]>(STORAGE_KEYS.LESSONS);
};

export const getLesson = (id: number): Lesson | undefined => {
  const lessons = getLessons();
  return lessons.find(lesson => lesson.id === id);
};

export const updateLessonProgress = (id: number, progress: number): Lesson[] => {
  const lessons = getLessons();
  const updatedLessons = lessons.map(lesson => {
    if (lesson.id === id) {
      const isComplete = progress >= 100;
      const nextLesson = lessons.find(l => l.id === id + 1);
      
      // If lesson is completed, unlock the next one
      if (isComplete && nextLesson && !nextLesson.unlocked) {
        const lessonIndex = lessons.findIndex(l => l.id === id + 1);
        if (lessonIndex >= 0) {
          lessons[lessonIndex].unlocked = true;
        }
      }
      
      return {
        ...lesson,
        progress,
        complete: isComplete
      };
    }
    return lesson;
  });
  
  setData(STORAGE_KEYS.LESSONS, updatedLessons);
  
  // Update user stats if lesson is completed
  if (progress >= 100) {
    const currentUser = getUserData();
    updateUserData({ 
      lessonsCompleted: currentUser.lessonsCompleted + 1 
    });
    addUserXP(lessons.find(l => l.id === id)?.xp || 0);
  }
  
  return updatedLessons;
};

// Quiz related methods
export const getQuizQuestions = (): QuizQuestion[] => {
  return quizQuestionsData;
};

export const completeQuiz = (score: number, totalQuestions: number): void => {
  const currentUser = getUserData();
  
  updateUserData({ 
    quizzesTaken: currentUser.quizzesTaken + 1 
  });
  
  // Award XP based on score
  const xpPerQuestion = 10;
  const earnedXP = Math.round(score * xpPerQuestion);
  addUserXP(earnedXP);
  
  // Update achievements
  const achievements = getAchievements();
  const quizMasterAchievement = achievements.find(a => a.title === "Quiz Master");
  
  if (quizMasterAchievement && score === totalQuestions) {
    const progress = Math.min(100, quizMasterAchievement.progress + 20);
    updateAchievement(quizMasterAchievement.id, { 
      progress,
      completed: progress >= 100
    });
  }
};

// Achievements related methods
export const getAchievements = (): Achievement[] => {
  initializeData();
  return getData<Achievement[]>(STORAGE_KEYS.ACHIEVEMENTS);
};

export const updateAchievement = (id: string, data: Partial<Achievement>): Achievement[] => {
  const achievements = getAchievements();
  
  const updatedAchievements = achievements.map(achievement => {
    if (achievement.id === id) {
      const updatedAchievement = { ...achievement, ...data };
      
      // If achievement is newly completed, set completion date
      if (!achievement.completed && updatedAchievement.completed) {
        updatedAchievement.date = "Just now";
      }
      
      return updatedAchievement;
    }
    return achievement;
  });
  
  setData(STORAGE_KEYS.ACHIEVEMENTS, updatedAchievements);
  return updatedAchievements;
};

// Vocabulary related methods
export const getVocabulary = (): Word[] => {
  initializeData();
  return getData<Word[]>(STORAGE_KEYS.VOCABULARY);
};

export const getVocabularyByCategory = (category: string): Word[] => {
  const vocabulary = getVocabulary();
  return vocabulary.filter(word => word.category === category);
};

export const getVocabularyCategories = (): VocabularyCategory[] => {
  return vocabularyCategoriesData;
};

export const markWordAsLearned = (id: string): Word[] => {
  const vocabulary = getVocabulary();
  
  const updatedVocabulary = vocabulary.map(word => {
    if (word.id === id && !word.learned) {
      return { ...word, learned: true };
    }
    return word;
  });
  
  setData(STORAGE_KEYS.VOCABULARY, updatedVocabulary);
  
  // Update user stats
  const learnedWords = updatedVocabulary.filter(word => word.learned).length;
  updateUserData({ wordsLearned: learnedWords });
  
  // Check achievements
  const achievements = getAchievements();
  const wordCollectorAchievement = achievements.find(a => a.title === "Word Collector");
  
  if (wordCollectorAchievement) {
    const progress = Math.min(100, (learnedWords / 100) * 100);
    updateAchievement(wordCollectorAchievement.id, { 
      progress,
      completed: progress >= 100
    });
  }
  
  return updatedVocabulary;
};

// Activities related methods
export const getActivities = (): Activity[] => {
  return activitiesData;
};

// Get vocabulary statistics
export const getVocabularyStats = () => {
  const vocabulary = getVocabulary();
  const totalWords = vocabulary.length;
  const learnedWords = vocabulary.filter(word => word.learned).length;
  const learnedPercentage = totalWords > 0 ? Math.round((learnedWords / totalWords) * 100) : 0;
  
  const categoryCounts = vocabulary.reduce((acc, word) => {
    acc[word.category] = (acc[word.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    totalWords,
    learnedWords,
    learnedPercentage,
    categoryCounts
  };
};

// Initialize data when the service is first imported
initializeData();
