
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVocabularyCategories, getVocabularyByCategory, markWordAsLearned } from '@/services/learningService';
import { VocabularyCategory, Word } from '@/types/learning';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BookOpen, Check, Hash, Users, Map, Clock, ShoppingBag, Cloud, Utensils } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

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
  return (
    <div className="border rounded-lg p-4 mb-3 bg-aqua-lightest/30">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold text-lg text-lumi-purple">{word.spanish}</h4>
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

  const handleMarkAsLearned = (id: string) => {
    const updatedWords = markWordAsLearned(id);
    setWords(getVocabularyByCategory(category.name.toLowerCase()));
    toast("Word marked as learned! 🎉", {
      description: "Keep going to improve your vocabulary!",
    });
  };

  return (
    <Dialog>
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
        <div className="space-y-2 mt-4">
          {words.length === 0 ? (
            <div className="p-8 text-center">
              <Button 
                variant="default" 
                className="bg-lumi-pink hover:bg-lumi-pink-dark text-white"
                onClick={() => setWords(getVocabularyByCategory(category.name.toLowerCase()))}
              >
                Load {category.name} Words
              </Button>
            </div>
          ) : (
            words.map(word => (
              <VocabularyItem key={word.id} word={word} onLearn={handleMarkAsLearned} />
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const VocabularyCategories = () => {
  const categories = getVocabularyCategories();

  return (
    <div className="p-4">
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
