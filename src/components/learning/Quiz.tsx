
import { useState, useEffect } from 'react';
import { Check, X, ChevronRight, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  hint?: string;
};

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
    <div className="glass-card rounded-xl p-6 max-w-2xl mx-auto">
      {!isCompleted ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-ocean-deep/70">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
            <div className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
              {correctAnswers} Correct
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="h-2 bg-secondary rounded-full mb-6">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
            ></div>
          </div>
          
          <h3 className="text-xl font-medium mb-6 text-ocean-deep">
            {currentQuestion.question}
          </h3>
          
          <div className={cn("space-y-3", shake && "animate-[shake_0.5s_ease-in-out]")}>
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className={cn(
                  "p-4 rounded-lg border-2 cursor-pointer transition-all",
                  selectedOption === index && !showAnswer && "border-primary bg-primary/5",
                  showAnswer && index === currentQuestion.correctAnswer && "border-green-500 bg-green-100",
                  showAnswer && selectedOption === index && selectedOption !== currentQuestion.correctAnswer && "border-red-500 bg-red-100",
                  showAnswer && selectedOption !== index && index !== currentQuestion.correctAnswer && "opacity-50",
                  selectedOption !== index && !showAnswer && "border-secondary hover:border-primary/50"
                )}
                onClick={() => handleOptionSelect(index)}
              >
                <div className="flex items-center justify-between">
                  <span className={cn(
                    showAnswer && index === currentQuestion.correctAnswer && "text-green-700",
                    showAnswer && selectedOption === index && selectedOption !== currentQuestion.correctAnswer && "text-red-700"
                  )}>
                    {option}
                  </span>
                  
                  {showAnswer && index === currentQuestion.correctAnswer && (
                    <Check className="h-5 w-5 text-green-500" />
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
                className="text-sm flex items-center text-ocean-deep/70 hover:text-primary transition"
              >
                <HelpCircle className="h-4 w-4 mr-1" />
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>
              
              {showHint && (
                <div className="mt-2 p-3 bg-ocean-light/50 rounded-lg text-sm text-ocean-deep/80">
                  {currentQuestion.hint}
                </div>
              )}
            </div>
          )}
          
          <div className="mt-6 flex justify-end">
            {!showAnswer ? (
              <button
                onClick={checkAnswer}
                className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition flex items-center"
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
          <h3 className="text-2xl font-bold mb-2 text-ocean-deep">Quiz Complete!</h3>
          <p className="text-ocean-deep/70 mb-6">
            You got {correctAnswers} out of {questions.length} questions correct.
          </p>
          <div className="w-64 h-6 bg-secondary rounded-full mx-auto mb-6">
            <div 
              className={cn(
                "h-full rounded-full transition-all duration-1000",
                correctAnswers / questions.length >= 0.7 ? "bg-green-500" : 
                correctAnswers / questions.length >= 0.4 ? "bg-yellow-500" : "bg-red-500"
              )}
              style={{ width: `${(correctAnswers / questions.length) * 100}%` }}
            ></div>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
