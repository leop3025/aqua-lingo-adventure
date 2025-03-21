
import { useState, useEffect } from 'react';
import { ChevronRight, Check, Lock, Star } from 'lucide-react';
import LessonCard from './LessonCard';
import { cn } from '@/lib/utils';

// Sample lesson data
const lessons = [
  {
    id: 1,
    title: "Greetings & Introductions",
    description: "Learn basic Spanish greetings and how to introduce yourself.",
    difficulty: "Beginner",
    complete: true,
    unlocked: true,
    progress: 100,
    xp: 30,
    icon: "👋"
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
    icon: "💬"
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
    icon: "🔢"
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

const LearningPath = () => {
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Find the first incomplete lesson
    const incompleteLesson = lessons.find(lesson => !lesson.complete && lesson.unlocked);
    if (incompleteLesson) {
      setActiveLessonId(incompleteLesson.id);
    } else {
      setActiveLessonId(lessons[0].id);
    }
    
    setLoaded(true);
  }, []);

  const getStatusIcon = (lesson: typeof lessons[0]) => {
    if (lesson.complete) {
      return <Check className="h-5 w-5 text-white" />;
    }
    if (!lesson.unlocked) {
      return <Lock className="h-5 w-5 text-white/70" />;
    }
    return <ChevronRight className="h-5 w-5 text-white" />;
  };

  const getBgColor = (lesson: typeof lessons[0]) => {
    if (lesson.complete) return "bg-ocean";
    if (!lesson.unlocked) return "bg-muted-foreground/40";
    return "bg-primary";
  };

  return (
    <div className="py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
        Your Learning Adventure
      </h2>

      <div className="max-w-4xl mx-auto">
        <div className="space-y-6">
          {lessons.map((lesson, index) => (
            <div 
              key={lesson.id} 
              className={cn(
                "lesson-item transition-all duration-500 transform",
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div 
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-full text-white",
                      getBgColor(lesson)
                    )}
                  >
                    {getStatusIcon(lesson)}
                  </div>
                </div>
                
                <div className="flex-1">
                  <LessonCard 
                    lesson={lesson} 
                    isActive={activeLessonId === lesson.id}
                    onClick={() => {
                      if (lesson.unlocked) {
                        setActiveLessonId(lesson.id);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningPath;
