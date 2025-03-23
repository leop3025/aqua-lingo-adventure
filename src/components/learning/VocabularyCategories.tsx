
import React, { useState, useEffect } from 'react';
import { 
  getVocabularyCategories, 
  getVocabularyByCategory, 
  markWordAsLearned,
  getVocabularyStats
} from '@/services/learningService';
import { VocabularyCategory, Word } from '@/types/learning';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BookOpen, Check, Hash, Users, Map, Clock, ShoppingBag, Cloud, Utensils, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'Wave': return <span className="text-2xl">👋</span>;
    case 'Hash': return <Hash className="h-5 w-5" />;
    case 'Utensils': return <Utensils className="h-5 w-5" />;
    case 'Users': return <Users className="h-5 w-5" />;
    case 'Map': return <Map className="h-5 w-5" />;
    case 'Clock': return <Clock className="h-5 w-5" />;
    case 'ShoppingBag': return <ShoppingBag className="h-5 w-5" />;
    case 'Cloud': return <Cloud className="h-5 w-5" />;
    default: return <BookOpen className="h-5 w-5" />;
  }
};

const VocabularyItem = ({ word, onLearn }: { word: Word, onLearn: (id: string) => void }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const speakWord = () => {
    if ('speechSynthesis' in window) {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(word.spanish);
      utterance.lang = 'es-ES';
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
    } else {
      toast.error("Speech synthesis is not supported in your browser");
    }
  };

  return (
    <div className="border rounded-lg p-4 mb-3 bg-aqua-lightest/30 hover:shadow-sm transition-all">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center">
            <h4 className="font-semibold text-lg text-lumi-purple">{word.spanish}</h4>
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-2 p-1 h-auto" 
              onClick={speakWord}
              disabled={isPlaying}
            >
              <span className="text-sm">🔊</span>
            </Button>
          </div>
          <p className="text-ocean-deep">{word.english}</p>
          {word.pronunciation && (
            <p className="text-xs text-ocean-deep/70 mt-1">/{word.pronunciation}/</p>
          )}
          {word.example && (
            <p className="text-sm text-ocean-deep/80 italic mt-2 border-l-2 border-lumi-pink pl-2">
              {word.example}
            </p>
          )}
        </div>
        <div>
          {word.learned ? (
            <Badge variant="outline" className="bg-lumi-mint text-lumi-purple border-lumi-mint flex items-center">
              <Check className="h-3 w-3 mr-1" />
              Learned
            </Badge>
          ) : (
            <Button 
              variant="ghost" 
              size="sm" 
              className="bg-lumi-pink/10 text-lumi-pink hover:bg-lumi-pink/20 hover:text-lumi-pink-dark"
              onClick={() => onLearn(word.id)}
            >
              Mark as Learned
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const CategoryCard = ({ category }: { category: VocabularyCategory }) => {
  const [words, setWords] = useState<Word[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [learnedCount, setLearnedCount] = useState(0);

  useEffect(() => {
    if (isOpen && words.length === 0) {
      const categoryWords = getVocabularyByCategory(category.name.toLowerCase());
      setWords(categoryWords);
      setLearnedCount(categoryWords.filter(word => word.learned).length);
    }
  }, [isOpen, category.name, words.length]);

  const handleMarkAsLearned = (id: string) => {
    const updatedWords = markWordAsLearned(id);
    const categoryWords = updatedWords.filter(
      word => word.category === category.name.toLowerCase()
    );
    setWords(categoryWords);
    setLearnedCount(categoryWords.filter(word => word.learned).length);
    
    toast.success("Word marked as learned! 🎉", {
      description: "+5 XP earned! Keep going to improve your vocabulary!",
    });
  };

  const progressPercentage = words.length > 0 
    ? Math.round((learnedCount / words.length) * 100) 
    : 0;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className="p-5 cursor-pointer hover:shadow-md transition-all duration-300 hover:bg-aqua-lightest/50 border border-aqua-light">
          <div className="flex items-center space-x-4">
            <div className="bg-lumi-pink/10 p-3 rounded-full text-lumi-pink">
              {getIconComponent(category.iconName)}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lumi-purple">{category.name}</h3>
              <p className="text-sm text-ocean-deep/70">{category.description}</p>
            </div>
            <Badge variant="outline" className="bg-lumi-mint/30 text-lumi-purple border-lumi-mint">
              {category.wordCount} words
            </Badge>
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center space-x-2">
              <div className="bg-lumi-pink/10 p-2 rounded-full text-lumi-pink">
                {getIconComponent(category.iconName)}
              </div>
              <span>{category.name} Vocabulary</span>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-ocean-deep/70">Progress</span>
            <span className="text-sm text-ocean-deep/70">{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-amber-500 mr-1" />
            <span className="text-sm text-ocean-deep/70">Earn XP for each word you learn</span>
          </div>
          <Badge variant="outline" className="bg-white">
            <span className="text-ocean-deep">
              {learnedCount} / {words.length} learned
            </span>
          </Badge>
        </div>
        
        <div className="space-y-2 mt-4">
          {words.length > 0 ? (
            words.map(word => (
              <VocabularyItem key={word.id} word={word} onLearn={handleMarkAsLearned} />
            ))
          ) : (
            <div className="p-8 text-center">
              <p className="text-ocean-deep/70 mb-4">
                Loading vocabulary words...
              </p>
              <Button 
                variant="default" 
                className="bg-lumi-pink hover:bg-lumi-pink-dark text-white"
                onClick={() => {
                  const categoryWords = getVocabularyByCategory(category.name.toLowerCase());
                  setWords(categoryWords);
                  setLearnedCount(categoryWords.filter(word => word.learned).length);
                }}
              >
                Load {category.name} Words
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const VocabularyCategories = () => {
  const categories = getVocabularyCategories();
  const [stats, setStats] = useState<{ 
    totalWords: number; 
    learnedWords: number; 
    learnedPercentage: number;
  } | null>(null);

  useEffect(() => {
    const vocabStats = getVocabularyStats();
    setStats({
      totalWords: vocabStats.totalWords,
      learnedWords: vocabStats.learnedWords,
      learnedPercentage: vocabStats.learnedPercentage
    });
  }, []);

  return (
    <div className="p-4">
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <h3 className="text-lg font-semibold text-lumi-purple mb-2">Vocabulary Progress</h3>
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
            <div className="bg-aqua-lightest/30 p-3 rounded-lg">
              <p className="text-sm text-ocean-deep/70">Total Words</p>
              <p className="text-xl font-semibold text-ocean-deep">{stats.totalWords}</p>
            </div>
            <div className="bg-lumi-pink/10 p-3 rounded-lg">
              <p className="text-sm text-ocean-deep/70">Words Learned</p>
              <p className="text-xl font-semibold text-lumi-pink">{stats.learnedWords}</p>
            </div>
            <div className="bg-lumi-mint/20 p-3 rounded-lg">
              <p className="text-sm text-ocean-deep/70">Completion</p>
              <p className="text-xl font-semibold text-teal">{stats.learnedPercentage}%</p>
            </div>
          </div>
        )}
        <Progress value={stats?.learnedPercentage || 0} className="h-2" />
      </div>
      
      <h2 className="text-2xl font-bold mb-6 text-center text-lumi-purple">Vocabulary Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(category => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default VocabularyCategories;
