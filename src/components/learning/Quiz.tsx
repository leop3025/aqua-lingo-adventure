
import { useState, useEffect } from 'react';
import { Check, X, ChevronRight, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { QuizQuestion } from '@/types/learning';
import { toast } from 'sonner';

type QuizProps = {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
};

const Quiz = ({ questions, onComplete }: QuizProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shake, setShake] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (index: number) => {
    if (showAnswer) return;
    setSelectedOption(index);
  };

  const checkAnswer = () => {
    if (selectedOption === null) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setShowAnswer(true);
    
    if (selectedOption === currentQuestion.correctAnswer) {
      setCorrectAnswers(prev => prev + 1);
      toast("¡Correcto! 🎉", {
        description: "Great job!",
      });
    } else {
      toast("Incorrect", {
        description: "Don't worry, you'll get it next time!",
        style: { backgroundColor: "#FEE2E2", color: "#991B1B" }
      });
    }
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    setShowAnswer(false);
    setShowHint(false);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
      onComplete(correctAnswers);
    }
  };

  const toggleHint = () => {
    setShowHint(prev => !prev);
  };

  return (
    <div className="glass-card rounded-xl p-6 max-w-2xl mx-auto bg-white/30 backdrop-blur-sm border border-aqua/20 shadow-lg">
      {!isCompleted ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-lumi-purple/70">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
            <div className="bg-lumi-mint/30 text-lumi-purple px-2 py-1 rounded-full text-sm flex items-center">
              <Check className="h-3.5 w-3.5 mr-1" />
              {correctAnswers} Correct
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="h-2 bg-gray-100 rounded-full mb-6">
            <div 
              className="h-full bg-lumi-pink rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
            ></div>
          </div>
          
          <h3 className="text-xl font-medium mb-6 text-lumi-purple">
            {currentQuestion.question}
          </h3>
          
          <div className={cn("space-y-3", shake && "animate-[shake_0.5s_ease-in-out]")}>
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className={cn(
                  "p-4 rounded-lg border-2 cursor-pointer transition-all",
                  selectedOption === index && !showAnswer && "border-lumi-pink bg-lumi-pink/5",
                  showAnswer && index === currentQuestion.correctAnswer && "border-lumi-mint bg-lumi-mint/10",
                  showAnswer && selectedOption === index && selectedOption !== currentQuestion.correctAnswer && "border-red-400 bg-red-50",
                  showAnswer && selectedOption !== index && index !== currentQuestion.correctAnswer && "opacity-50",
                  selectedOption !== index && !showAnswer && "border-gray-100 hover:border-lumi-pink/50"
                )}
                onClick={() => handleOptionSelect(index)}
              >
                <div className="flex items-center justify-between">
                  <span className={cn(
                    showAnswer && index === currentQuestion.correctAnswer && "text-lumi-purple",
                    showAnswer && selectedOption === index && selectedOption !== currentQuestion.correctAnswer && "text-red-600"
                  )}>
                    {option}
                  </span>
                  
                  {showAnswer && index === currentQuestion.correctAnswer && (
                    <Check className="h-5 w-5 text-lumi-mint" />
                  )}
                  
                  {showAnswer && selectedOption === index && selectedOption !== currentQuestion.correctAnswer && (
                    <X className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {currentQuestion.hint && (
            <div className="mt-4">
              <button 
                onClick={toggleHint}
                className="text-sm flex items-center text-lumi-purple/70 hover:text-lumi-pink transition"
              >
                <HelpCircle className="h-4 w-4 mr-1" />
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>
              
              {showHint && (
                <div className="mt-2 p-3 bg-lumi-pink/10 rounded-lg text-sm text-lumi-purple/80">
                  {currentQuestion.hint}
                </div>
              )}
            </div>
          )}
          
          <div className="mt-6 flex justify-end">
            {!showAnswer ? (
              <button
                onClick={checkAnswer}
                className="px-5 py-2 bg-lumi-pink text-white rounded-lg hover:bg-lumi-pink-dark transition"
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="px-5 py-2 bg-lumi-pink text-white rounded-lg hover:bg-lumi-pink-dark transition flex items-center"
              >
                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                <ChevronRight className="ml-1 h-4 w-4" />
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold mb-2 text-lumi-purple">Quiz Complete!</h3>
          <p className="text-lumi-purple/70 mb-6">
            You got {correctAnswers} out of {questions.length} questions correct.
          </p>
          <div className="w-64 h-6 bg-gray-100 rounded-full mx-auto mb-6">
            <div 
              className={cn(
                "h-full rounded-full transition-all duration-1000",
                correctAnswers / questions.length >= 0.7 ? "bg-lumi-mint" : 
                correctAnswers / questions.length >= 0.4 ? "bg-yellow-400" : "bg-red-400"
              )}
              style={{ width: `${(correctAnswers / questions.length) * 100}%` }}
            ></div>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-lumi-pink text-white rounded-lg hover:bg-lumi-pink-dark transition"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
