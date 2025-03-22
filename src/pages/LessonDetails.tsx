
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import CustomProgress from '@/components/ui/CustomProgress';
import { ChevronLeft, CheckCircle, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getLesson, updateLessonProgress, addUserXP } from '@/services/learningService';
import { Lesson, LessonContent } from '@/types/learning';
import { toast } from '@/components/ui/use-toast';

const LessonDetails = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (lessonId) {
      const lessonData = getLesson(parseInt(lessonId));
      if (lessonData) {
        setLesson(lessonData);
      } else {
        navigate('/learn');
        toast({
          title: "Lesson not found",
          description: "The requested lesson could not be found.",
          variant: "destructive"
        });
      }
    }
    setLoaded(true);
  }, [lessonId, navigate]);

  const handleNext = () => {
    if (!lesson || !lesson.content) return;
    
    if (currentStep < lesson.content.length - 1) {
      setCurrentStep(prev => prev + 1);
      
      // Update progress
      const newProgress = Math.round(((currentStep + 1) / lesson.content.length) * 100);
      updateLessonProgress(lesson.id, newProgress);
      
    } else {
      // Lesson completed
      completeLessonAndAwardXP();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const completeLessonAndAwardXP = () => {
    if (!lesson) return;
    
    // Mark lesson as complete
    updateLessonProgress(lesson.id, 100);
    setCompleted(true);
    
    // Show completion toast
    toast({
      title: "¡Muy bien! Lesson completed!",
      description: `You've earned ${lesson.xp} XP!`,
    });
  };

  const handleGoBack = () => {
    navigate('/learn');
  };

  if (!loaded || !lesson) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-primary">Loading lesson...</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className={cn(
          "transition-all duration-700 transform",
          loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}>
          <div className="mb-8">
            <Button 
              variant="outline" 
              className="mb-4" 
              onClick={handleGoBack}
            >
              <ChevronLeft className="mr-1 h-4 w-4" /> Back to Learn
            </Button>
            
            <h1 className="text-3xl font-bold text-ocean-deep mb-2">
              {lesson.title}
            </h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <div className="bg-ocean-light text-ocean-deep px-3 py-1 rounded-full text-sm inline-flex items-center">
                <BookOpen className="h-4 w-4 mr-1" />
                {lesson.difficulty}
              </div>
              
              <div className="text-ocean-deep/70">
                {lesson.xp} XP to earn
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-ocean-deep/70 mb-1">
                <span>Progress</span>
                <span>{lesson.progress}%</span>
              </div>
              <CustomProgress 
                value={lesson.progress} 
                max={100} 
                size="md" 
                animated
              />
            </div>
          </div>
          
          {completed ? (
            <div className="glass-card rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">¡Felicidades!</h2>
              <p className="text-ocean-deep/70 mb-6">
                You've completed this lesson and earned {lesson.xp} XP!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handleGoBack}>
                  Continue Learning
                </Button>
                <Button variant="outline" onClick={() => setCompleted(false)}>
                  Review Lesson
                </Button>
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-xl p-6 md:p-8">
              {lesson.content && lesson.content.length > 0 ? (
                <>
                  <div className="mb-6">
                    <div className="text-sm text-ocean-deep/70 mb-2">
                      Step {currentStep + 1} of {lesson.content.length}
                    </div>
                  </div>
                  
                  <div className="min-h-[200px] mb-8">
                    <LessonContentItem content={lesson.content[currentStep]} />
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={handlePrevious}
                      disabled={currentStep === 0}
                    >
                      Previous
                    </Button>
                    
                    <Button onClick={handleNext}>
                      {currentStep < lesson.content.length - 1 ? 'Next' : 'Complete Lesson'}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-ocean-deep/70">
                  <p>This lesson content is being developed.</p>
                  <p>Please check back soon!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const LessonContentItem = ({ content }: { content: LessonContent }) => {
  if (content.type === "text") {
    return (
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 text-ocean-deep">
          {content.content}
        </h3>
        {content.translation && (
          <p className="text-ocean-deep/70">
            {content.translation}
          </p>
        )}
      </div>
    );
  }
  
  return null; // For now, we only handle text content
};

export default LessonDetails;
