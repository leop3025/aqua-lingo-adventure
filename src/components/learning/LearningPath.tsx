
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Check, Lock, Star } from 'lucide-react';
import LessonCard from './LessonCard';
import { cn } from '@/lib/utils';
import { getLessons } from '@/services/learningService';
import { Lesson } from '@/types/learning';

const LearningPath = () => {
  const navigate = useNavigate();
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Get lessons from the learning service
    const lessonData = getLessons();
    setLessons(lessonData);
    
    // Find the first incomplete lesson
    const incompleteLesson = lessonData.find(lesson => !lesson.complete && lesson.unlocked);
    if (incompleteLesson) {
      setActiveLessonId(incompleteLesson.id);
    } else {
      setActiveLessonId(lessonData[0].id);
    }
    
    setLoaded(true);
  }, []);

  const handleLessonClick = (lessonId: number) => {
    setActiveLessonId(lessonId);
    navigate(`/learn/lesson/${lessonId}`);
  };

  const getStatusIcon = (lesson: Lesson) => {
    if (lesson.complete) {
      return <Check className="h-5 w-5 text-white" />;
    }
    if (!lesson.unlocked) {
      return <Lock className="h-5 w-5 text-white/70" />;
    }
    return <ChevronRight className="h-5 w-5 text-white" />;
  };

  const getBgColor = (lesson: Lesson) => {
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
                        handleLessonClick(lesson.id);
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
