
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Quiz from '@/components/learning/Quiz';
import Confetti from '@/components/ui/Confetti';
import { Gamepad2, MessageSquare, BookOpen, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getActivities, getQuizQuestions, completeQuiz } from '@/services/learningService';
import { Activity } from '@/types/learning';

const Practice = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('games');
  const [showConfetti, setShowConfetti] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  
  useEffect(() => {
    setLoaded(true);
    setActivities(getActivities());
    setQuizQuestions(getQuizQuestions());
  }, []);
  
  const handleQuizComplete = (score: number) => {
    // Save quiz results
    completeQuiz(score, quizQuestions.length);
    
    if (score >= 3) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }
  };

  const handleActivityClick = (activityId: string) => {
    navigate(`/practice/activity/${activityId}`);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Confetti active={showConfetti} />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <section className={cn(
          "transition-all duration-700 transform",
          loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}>
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-ocean-deep mb-2">
              Practice Your Spanish
            </h1>
            <p className="text-ocean-deep/70">
              Strengthen your skills with fun games and quizzes
            </p>
          </div>
          
          <div className="mb-8">
            <div className="flex space-x-2 overflow-x-auto pb-2">
              <button
                onClick={() => setActiveTab('games')}
                className={cn(
                  "px-4 py-2 rounded-full font-medium transition-all",
                  activeTab === 'games' 
                    ? "bg-primary text-white" 
                    : "bg-secondary hover:bg-secondary/80"
                )}
              >
                Games & Activities
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={cn(
                  "px-4 py-2 rounded-full font-medium transition-all",
                  activeTab === 'quiz' 
                    ? "bg-primary text-white" 
                    : "bg-secondary hover:bg-secondary/80"
                )}
              >
                Daily Quiz
              </button>
            </div>
          </div>
          
          {activeTab === 'games' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activities.map((activity, index) => (
                <div 
                  key={index}
                  className={cn(
                    "p-6 rounded-xl border transition-all",
                    activity.color,
                    activity.borderColor,
                    "hover:shadow-lg cursor-pointer",
                    "transform transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => handleActivityClick(activity.id)}
                >
                  <div className="flex items-start">
                    <div className={cn(
                      "p-3 rounded-lg mr-4",
                      activity.color
                    )}>
                      {activity.icon === "BookOpen" && <BookOpen className="h-8 w-8" />}
                      {activity.icon === "MessageSquare" && <MessageSquare className="h-8 w-8" />}
                      {activity.icon === "Gamepad2" && <Gamepad2 className="h-8 w-8" />}
                      {activity.icon === "Target" && <Target className="h-8 w-8" />}
                    </div>
                    <div>
                      <h3 className={cn(
                        "text-xl font-semibold mb-2",
                        activity.textColor
                      )}>
                        {activity.title}
                      </h3>
                      <p className="text-ocean-deep/70">
                        {activity.description}
                      </p>
                      <div className="mt-4">
                        <span className={cn(
                          "inline-flex items-center text-sm font-medium",
                          activity.textColor
                        )}>
                          Play Now
                          <svg className="ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-ocean-deep">
                Daily Spanish Quiz
              </h2>
              <Quiz 
                questions={quizQuestions} 
                onComplete={handleQuizComplete} 
              />
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Practice;
