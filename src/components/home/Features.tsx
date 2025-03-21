
import { MessageSquare, BookOpen, Trophy, Award, Target, HeartHandshake } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: <BookOpen className="h-8 w-8 text-ocean" />,
    title: "Immersive Lessons",
    description: "Dive into engaging lessons that make learning Spanish feel natural and enjoyable."
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-ocean" />,
    title: "Conversation Practice",
    description: "Practice real-world Spanish conversations in our interactive dialogue exercises."
  },
  {
    icon: <Target className="h-8 w-8 text-ocean" />,
    title: "Adaptive Learning",
    description: "Our lessons adapt to your progress, focusing on areas where you need more practice."
  },
  {
    icon: <Trophy className="h-8 w-8 text-ocean" />,
    title: "Achievement System",
    description: "Earn rewards and track your progress with our comprehensive achievement system."
  },
  {
    icon: <HeartHandshake className="h-8 w-8 text-ocean" />,
    title: "Cultural Context",
    description: "Learn not just the language but also the rich cultural contexts in which it's used."
  },
  {
    icon: <Award className="h-8 w-8 text-ocean" />,
    title: "Milestone Rewards",
    description: "Reach learning milestones to unlock special rewards and new content."
  }
];

const Features = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden bg-secondary/50">
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
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
                "glass-card rounded-xl p-6 hover:shadow-neon transition-all duration-300 animate-fade-in-up",
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-ocean-deep">{feature.title}</h3>
              <p className="text-ocean-deep/70">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="/learn" 
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition shadow-lg"
          >
            Start Your Learning Journey
          </a>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-ocean/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-ocean/10 rounded-full filter blur-3xl"></div>
    </section>
  );
};

export default Features;
