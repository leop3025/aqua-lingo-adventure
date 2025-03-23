
import { Star, MessageSquare, Target, Award, BookOpen, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: <BookOpen className="h-8 w-8 text-aqua-medium" />,
    emoji: "📚",
    title: "Immersive Lessons",
    description: "Dive into engaging lessons that make learning Spanish feel natural and enjoyable."
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-aqua-medium" />,
    emoji: "💬",
    title: "Conversation Practice",
    description: "Practice real-world Spanish conversations in our interactive dialogue exercises."
  },
  {
    icon: <Target className="h-8 w-8 text-aqua-medium" />,
    emoji: "🎯",
    title: "Adaptive Learning",
    description: "Our lessons adapt to your progress, focusing on areas where you need more practice."
  },
  {
    icon: <Award className="h-8 w-8 text-aqua-medium" />,
    emoji: "🏆",
    title: "Achievement System",
    description: "Earn rewards and track your progress with our comprehensive achievement system."
  },
  {
    icon: <Star className="h-8 w-8 text-aqua-medium" />,
    emoji: "🌊",
    title: "Underwater Theme",
    description: "Enjoy a unique underwater learning environment that makes language acquisition fun."
  },
  {
    icon: <Sparkles className="h-8 w-8 text-aqua-medium" />,
    emoji: "✨",
    title: "Daily Challenges",
    description: "Complete fun daily challenges to reinforce your Spanish language skills."
  }
];

const Features = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden bg-white">
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy-deep">How AquaLearn Works</h2>
          <p className="text-lg text-navy-deep/80">
            Our underwater adventure makes learning Spanish fun and effective, with features designed to keep you engaged and motivated.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={cn(
                "bg-white shadow-sm hover:shadow-md border border-aqua-lightest rounded-xl p-6 transition-all duration-300 hover:translate-y-[-4px]",
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-aqua-lightest w-14 h-14 rounded-full flex items-center justify-center mb-4 text-2xl">
                {feature.emoji}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-navy-deep">
                {feature.title}
              </h3>
              <p className="text-navy-deep/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Underwater decorations */}
      <div className="absolute bottom-0 left-10 text-5xl">🐳</div>
      <div className="absolute bottom-20 right-10 text-4xl">🐬</div>
      <div className="absolute top-20 left-1/4 text-3xl">🐙</div>
    </section>
  );
};

export default Features;
