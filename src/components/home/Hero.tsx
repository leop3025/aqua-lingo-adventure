
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  // Generate random bubbles
  const bubbles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1, // 1-4
    x: Math.random() * 100, // 0-100%
    delay: Math.random() * 5, // 0-5s
  }));

  return (
    <div className="min-h-screen pt-24 pb-16 flex flex-col items-center justify-center relative overflow-hidden bg-aqua-light-gradient">
      {/* Animated bubbles */}
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            '--delay': bubble.delay,
            '--size': bubble.size,
            '--x': bubble.x,
          } as React.CSSProperties}
        />
      ))}
      
      {/* Decorative fish */}
      <div className="absolute bottom-20 right-10 text-5xl transform -rotate-12">🐡</div>
      <div className="absolute top-40 left-10 text-3xl transform rotate-12">🐠</div>
      
      {/* Wave effect */}
      <div className="wave"></div>
      <div className="wave" style={{ animationDelay: '-5s', bottom: '10px', opacity: '0.05' }}></div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className={cn(
            "text-center lg:text-left lg:w-1/2 transition-all duration-700 transform",
            loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-navy-deep mb-4">
              Dive into Spanish with <span className="text-aqua-medium">AquaLearn</span>
            </h1>
            <p className="text-xl text-navy-deep/80 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Learn Spanish in a fun, immersive underwater-themed experience. Master vocabulary, grammar, and pronunciation with interactive lessons and games.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/learn"
                className="primary-button px-6 py-3 flex items-center justify-center text-lg shadow-md"
              >
                <Book className="mr-2 h-5 w-5" />
                Start Learning
              </Link>
              <Link
                to="/practice"
                className="glass-button px-6 py-3 flex items-center justify-center text-lg shadow-sm"
              >
                <Gamepad className="mr-2 h-5 w-5" />
                Quick Quiz
              </Link>
            </div>
            <div className="flex justify-center lg:justify-start mt-8 gap-12">
              <div className="flex flex-col items-center">
                <Star className="h-6 w-6 text-coral mb-1" />
                <p className="font-medium">Fun, interactive lessons</p>
              </div>
              <div className="flex flex-col items-center">
                <Chart className="h-6 w-6 text-coral mb-1" />
                <p className="font-medium">Track your progress</p>
              </div>
              <div className="flex flex-col items-center">
                <UserIcon className="h-6 w-6 text-coral mb-1" />
                <p className="font-medium">Personalized learning</p>
              </div>
            </div>
          </div>
          
          <div className={cn(
            "lg:w-1/2 flex justify-center items-center transition-all duration-700 transform",
            loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )} style={{ transitionDelay: '200ms' }}>
            <div className="relative">
              <div className="absolute inset-0 bg-aqua/20 blur-3xl rounded-full transform -translate-y-10"></div>
              <div className="bg-aqua-lightest rounded-full p-8 relative">
                <img
                  src="/lovable-uploads/844eae2a-50a8-472a-bab4-19ab855d4155.png"
                  alt="Lumi the friendly mascot"
                  className="floating relative max-w-xs md:max-w-sm"
                  style={{ objectFit: 'contain', maxHeight: '300px' }}
                />
                <div className="absolute top-10 right-0 text-4xl animate-float" style={{ animationDelay: '1s' }}>🐙</div>
                <div className="absolute bottom-10 left-0 text-3xl animate-float" style={{ animationDelay: '0.5s' }}>🦀</div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Pathways */}
        <div className={cn(
          "mt-20 transition-all duration-700",
          loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )} style={{ transitionDelay: '400ms' }}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-navy-deep">Popular Pathways</h2>
            <Link to="/learn" className="text-aqua-medium font-medium flex items-center">
              View all <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="pathway-card">
              <div className="flex items-start">
                <div className="icon-container bg-aqua-lightest text-2xl mb-3">
                  👋
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Beginner Basics</h3>
              <p className="text-navy-deep/70">
                Start with essential greetings and simple conversations
              </p>
            </div>
            
            <div className="pathway-card">
              <div className="flex items-start">
                <div className="icon-container bg-aqua-lightest text-2xl mb-3">
                  🍽️
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Food & Dining</h3>
              <p className="text-navy-deep/70">
                Learn to order food and navigate restaurants in Spanish
              </p>
            </div>
            
            <div className="pathway-card">
              <div className="flex items-start">
                <div className="icon-container bg-aqua-lightest text-2xl mb-3">
                  💪
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Daily Practice</h3>
              <p className="text-navy-deep/70">
                Strengthen your skills with targeted daily exercises
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Icons
const Book = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
  </svg>
);

const Gamepad = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="6" x2="10" y1="12" y2="12"></line>
    <line x1="8" x2="8" y1="10" y2="14"></line>
    <line x1="15" x2="15.01" y1="13" y2="13"></line>
    <line x1="18" x2="18.01" y1="11" y2="11"></line>
    <rect width="20" height="12" x="2" y="6" rx="2"></rect>
  </svg>
);

const Chart = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 3v18h18"></path>
    <path d="M18 17V9"></path>
    <path d="M13 17V5"></path>
    <path d="M8 17v-3"></path>
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

export default Hero;
