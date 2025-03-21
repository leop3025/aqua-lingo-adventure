
import { useState } from 'react';
import { ChevronRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Lesson {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  complete: boolean;
  unlocked: boolean;
  progress: number;
  xp: number;
  icon: string;
}

interface LessonCardProps {
  lesson: Lesson;
  isActive: boolean;
  onClick: () => void;
}

const LessonCard = ({ lesson, isActive, onClick }: LessonCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={cn(
        "rounded-xl p-4 transition-all duration-300 cursor-pointer relative",
        lesson.unlocked ? "hover:shadow-lg" : "opacity-70 cursor-not-allowed",
        isActive ? "bg-primary/10 border border-primary/30" : "bg-white/30 border border-white/10"
      )}
      onClick={lesson.unlocked ? onClick : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center justify-center w-12 h-12 text-2xl bg-white rounded-full shadow-sm">
          {lesson.icon}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className={cn(
              "text-lg font-semibold",
              isActive ? "text-primary" : "text-ocean-deep"
            )}>
              {lesson.title}
            </h3>
            
            <div className="flex items-center">
              {lesson.complete && (
                <div className="bg-ocean text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center mr-2">
                  <Check className="h-3 w-3 mr-1" />
                  Complete
                </div>
              )}

              <div className="flex items-center text-ocean-deep/70 text-sm">
                <Star className="h-4 w-4 mr-1 text-sand-deep" />
                {lesson.xp} XP
              </div>
            </div>
          </div>
          
          <p className="text-sm text-ocean-deep/70 mt-1">{lesson.description}</p>
          
          <div className="mt-3 flex items-center justify-between">
            <div className="flex-1 max-w-xs">
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full rounded-full",
                    lesson.complete ? "bg-ocean" : "bg-primary"
                  )}
                  style={{ width: `${lesson.progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="text-xs text-ocean-deep/70 ml-2">
              {lesson.progress}%
            </div>
            
            <div className={cn(
              "ml-4 p-1.5 rounded-full transition-all duration-300",
              isHovered && lesson.unlocked ? "bg-primary text-white" : "bg-ocean-light/50 text-ocean-deep/70"
            )}>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add missing import
const Check = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default LessonCard;
