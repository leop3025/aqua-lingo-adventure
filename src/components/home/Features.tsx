
import { MessageSquare, BookOpen, Trophy, Award, Target, HeartHandshake, Sparkles, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: <BookOpen className="h-8 w-8 text-ocean" />,
    emoji: "📚",
    title: "Immersive Lessons",
    description: "Dive into engaging lessons that make learning Spanish feel natural and enjoyable."
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-ocean" />,
    emoji: "💬",
    title: "Conversation Practice",
    description: "Practice real-world Spanish conversations in our interactive dialogue exercises."
  },
  {
    icon: <Target className="h-8 w-8 text-ocean" />,
    emoji: "🎯",
    title: "Adaptive Learning",
    description: "Our lessons adapt to your progress, focusing on areas where you need more practice."
  },
  {
    icon: <Trophy className="h-8 w-8 text-ocean" />,
    emoji: "🏆",
    title: "Achievement System",
    description: "Earn rewards and track your progress with our comprehensive achievement system."
  },
  {
    icon: <HeartHandshake className="h-8 w-8 text-ocean" />,
    emoji: "🌍",
    title: "Cultural Context",
    description: "Learn not just the language but also the rich cultural contexts in which it's used."
  },
  {
    icon: <Award className="h-8 w-8 text-ocean" />,
    emoji: "🎁",
    title: "Milestone Rewards",
    description: "Reach learning milestones to unlock special rewards and new content."
  }
];

const Features = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden bg-secondary/50">
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-ocean-deep bg-ocean-light/70 rounded-full px-4 py-2 mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="font-medium">Awesome Features</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-ocean-deep">Why Learn With Lumi?</h2>
          <p className="text-lg text-ocean-deep/80">
            Our underwater adventure makes learning Spanish fun and effective, with features designed to keep you engaged and motivated.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={cn(
                "glass-card rounded-xl p-8 hover:shadow-neon transition-all duration-300 animate-fade-in-up transform hover:scale-105",
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 text-4xl">{feature.emoji}</div>
              <h3 className="text-xl font-semibold mb-2 text-ocean-deep flex items-center gap-2">
                {feature.title}
                {index === 2 && (
                  <span className="inline-flex items-center bg-coral text-white text-xs px-2 py-0.5 rounded-full">
                    <Flame className="h-3 w-3 mr-1" /> Popular
                  </span>
                )}
              </h3>
              <p className="text-ocean-deep/70">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="/learn" 
            className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition shadow-lg btn"
          >
            Start Your Learning Journey
            <ChevronRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-ocean/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-ocean/10 rounded-full filter blur-3xl"></div>
      
      {/* Extra underwater elements */}
      <div className="absolute bottom-0 left-10 text-5xl animate-float" style={{ animationDelay: "0.5s" }}>🐙</div>
      <div className="absolute bottom-10 right-10 text-4xl animate-float" style={{ animationDelay: "1.5s" }}>🐬</div>
      <div className="absolute top-20 left-1/4 text-3xl animate-float" style={{ animationDelay: "1s" }}>🦀</div>
    </section>
  );
};

// Add missing import
const ChevronRight = ({ className }: { className?: string }) => (
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
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default Features;
