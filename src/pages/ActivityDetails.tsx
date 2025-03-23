
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { ChevronLeft, BookOpen, MessageSquare, Gamepad2, Target, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getActivities, getVocabularyByCategory, markWordAsLearned, addUserXP } from '@/services/learningService';
import { Activity, Word } from '@/types/learning';
import { toast } from "sonner";
import Confetti, { confettiController } from '@/components/ui/Confetti';

const ActivityDetails = () => {
  const { activityId } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [vocabularyWords, setVocabularyWords] = useState<Word[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [activityCompleted, setActivityCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (activityId) {
      const foundActivity = getActivities().find(a => a.id === activityId);
      if (foundActivity) {
        setActivity(foundActivity);
        
        // If this is a vocabulary activity, load words
        if (foundActivity.type === "vocabulary") {
          // Get different category words based on activity
          let words: Word[] = [];
          if (foundActivity.id === "a1") { // Vocabulary Match
            words = getVocabularyByCategory("greetings")
              .concat(getVocabularyByCategory("numbers").slice(0, 5))
              .slice(0, 10);
          } else if (foundActivity.id === "a3") { // Memory Game
            words = getVocabularyByCategory("food").slice(0, 8);
          } else {
            words = getVocabularyByCategory("greetings").slice(0, 10);
          }
          
          setVocabularyWords(words);
        }
      } else {
        navigate('/practice');
        toast.error("Activity not found", {
          description: "The requested activity could not be found."
        });
      }
    }
    
    // Add a small delay for animation
    setTimeout(() => {
      setLoaded(true);
    }, 300);
  }, [activityId, navigate]);

  const handleGoBack = () => {
    navigate('/practice');
  };

  // Handle word selection for vocabulary matching
  const handleWordSelect = (word: Word, language: 'spanish' | 'english') => {
    const wordKey = language === 'spanish' ? word.spanish : word.english;
    
    if (selectedWord === null) {
      setSelectedWord(wordKey);
      return;
    }
    
    // If a word is already selected
    const currentWord = vocabularyWords.find(w => 
      w.spanish === selectedWord || w.english === selectedWord
    );
    
    if (!currentWord) {
      setSelectedWord(wordKey);
      return;
    }
    
    // Check if this creates a match
    if (
      (language === 'spanish' && currentWord.english === word.english) ||
      (language === 'english' && currentWord.spanish === word.spanish)
    ) {
      // It's a match!
      const newMatchedPairs = { ...matchedPairs };
      newMatchedPairs[currentWord.spanish] = currentWord.english;
      setMatchedPairs(newMatchedPairs);
      
      // Mark word as learned
      markWordAsLearned(word.id);
      
      toast.success("¡Correcto!", {
        description: `${word.spanish} = ${word.english}`,
      });
      
      // Check if activity is complete
      if (Object.keys(newMatchedPairs).length === vocabularyWords.length) {
        setTimeout(() => {
          confettiController.start();
          setShowConfetti(true);
          setActivityCompleted(true);
          addUserXP(25);
          toast.success("Activity Complete!", {
            description: "You've earned 25 XP!",
          });
        }, 500);
        
        // Stop confetti after 3 seconds
        setTimeout(() => {
          confettiController.stop();
          setShowConfetti(false);
        }, 3000);
      }
    } else {
      // Not a match
      toast.error("Try again", {
        description: "That's not a match.",
      });
    }
    
    setSelectedWord(null);
  };

  // Start conversation activity with mock data
  const startConversation = () => {
    if (!activity) return;
    
    toast.info("Starting conversation practice...", {
      description: "This feature will be available soon."
    });
    
    // For demo purposes, show activity completed
    setTimeout(() => {
      confettiController.start();
      setShowConfetti(true);
      setActivityCompleted(true);
      addUserXP(30);
      toast.success("Conversation Completed!", {
        description: "You've earned 30 XP!",
      });
      
      // Stop confetti after 3 seconds
      setTimeout(() => {
        confettiController.stop();
        setShowConfetti(false);
      }, 3000);
    }, 1500);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "vocabulary":
        return <BookOpen className="h-5 w-5" />;
      case "conversation":
        return <MessageSquare className="h-5 w-5" />;
      case "memory":
        return <Gamepad2 className="h-5 w-5" />;
      case "listening":
        return <Target className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  if (!loaded || !activity) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-primary">Loading activity...</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Confetti active={showConfetti} duration={3000} />
      
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
              <ChevronLeft className="mr-1 h-4 w-4" /> Back to Practice
            </Button>
            
            <h1 className="text-3xl font-bold text-ocean-deep mb-2">
              {activity.title}
            </h1>
            
            <div className="flex items-center gap-2 mb-6">
              <div className={cn(
                "px-3 py-1 rounded-full text-sm inline-flex items-center",
                activity.color,
                activity.textColor
              )}>
                {getActivityIcon(activity.type)}
                <span className="ml-1">Activity</span>
              </div>
            </div>
            
            <p className="text-ocean-deep/70 mb-6">
              {activity.description}
            </p>
          </div>
          
          {activityCompleted ? (
            <div className="glass-card rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">¡Felicidades!</h2>
              <p className="text-ocean-deep/70 mb-6">
                You've completed this activity and earned XP!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handleGoBack}>
                  Continue Practice
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setActivityCompleted(false)}
                >
                  Try Again
                </Button>
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-xl p-6 md:p-8">
              {activity.type === "vocabulary" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-ocean-deep">
                    Match the Spanish words with their English translations
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3 text-ocean-deep">Spanish</h3>
                      <div className="space-y-2">
                        {vocabularyWords.map(word => (
                          <button
                            key={word.spanish}
                            onClick={() => handleWordSelect(word, 'spanish')}
                            className={cn(
                              "w-full text-left px-4 py-3 rounded-lg transition-all",
                              matchedPairs[word.spanish] 
                                ? "bg-green-100 text-green-800 cursor-default"
                                : selectedWord === word.spanish
                                  ? "bg-primary/20 border-2 border-primary"
                                  : "bg-white border border-secondary hover:bg-secondary/10"
                            )}
                            disabled={!!matchedPairs[word.spanish]}
                          >
                            {word.spanish}
                            {matchedPairs[word.spanish] && (
                              <Check className="h-4 w-4 inline ml-2 text-green-600" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3 text-ocean-deep">English</h3>
                      <div className="space-y-2">
                        {vocabularyWords.map(word => (
                          <button
                            key={word.english}
                            onClick={() => handleWordSelect(word, 'english')}
                            className={cn(
                              "w-full text-left px-4 py-3 rounded-lg transition-all",
                              Object.values(matchedPairs).includes(word.english)
                                ? "bg-green-100 text-green-800 cursor-default"
                                : selectedWord === word.english
                                  ? "bg-primary/20 border-2 border-primary"
                                  : "bg-white border border-secondary hover:bg-secondary/10"
                            )}
                            disabled={Object.values(matchedPairs).includes(word.english)}
                          >
                            {word.english}
                            {Object.values(matchedPairs).includes(word.english) && (
                              <Check className="h-4 w-4 inline ml-2 text-green-600" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-ocean-deep/70 mb-4">
                      Matched: {Object.keys(matchedPairs).length} of {vocabularyWords.length}
                    </p>
                    <Button 
                      onClick={handleGoBack}
                      variant="outline"
                    >
                      Exit Activity
                    </Button>
                  </div>
                </div>
              )}
              
              {activity.type === "conversation" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-ocean-deep">
                    Practice Spanish Conversation
                  </h2>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                    <p className="mb-4 text-ocean-deep/80">
                      This activity will help you practice common Spanish phrases and responses.
                      Click the button below to start the conversation practice.
                    </p>
                    
                    <Button 
                      className={activity.color}
                      onClick={startConversation}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Start Conversation
                    </Button>
                  </div>
                </div>
              )}
              
              {(activity.type !== "vocabulary" && activity.type !== "conversation") && (
                <div className="text-center py-8">
                  <p className="text-ocean-deep/70 mb-6">
                    This activity is currently being developed.
                  </p>
                  <Button 
                    onClick={handleGoBack}
                    variant="outline"
                  >
                    Back to Practice
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ActivityDetails;
