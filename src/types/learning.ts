
export interface User {
  id: string;
  username: string;
  level: number;
  xp: number;
  streak: number;
  wordsLearned: number;
  lessonsCompleted: number;
  quizzesTaken: number;
  joinedDate: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  completed: boolean;
  date: string | null;
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  complete: boolean;
  unlocked: boolean;
  progress: number;
  xp: number;
  icon: string;
  content?: LessonContent[];
}

export interface LessonContent {
  id: string;
  type: "text" | "image" | "audio" | "quiz";
  content: string;
  translation?: string;
}

export interface Word {
  id: string;
  spanish: string;
  english: string;
  category: string;
  learned: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  hint?: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  borderColor: string;
  textColor: string;
  type: "vocabulary" | "conversation" | "memory" | "listening";
  content?: any;
}
