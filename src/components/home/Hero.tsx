
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, ChevronRight, Sparkles, PartyPopper } from 'lucide-react';
import { cn } from '@/lib/utils';

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  // Generate random bubbles
  const bubbles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1, // 1-4
    x: Math.random() * 100, // 0-100%
    delay: Math.random() * 5, // 0-5s
  }));

  return (
    <div className="underwater-section min-h-screen pt-24 pb-16 flex flex-col items-center justify-center relative animated-gradient overflow-hidden">
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
      
      {/* Fish swimming across screen */}
      <div className="fish top-1/4" style={{ animationDelay: '0s' }}>
        <div className="text-4xl">🐠</div>
      </div>
      <div className="fish top-1/3" style={{ animationDelay: '5s' }}>
        <div className="text-5xl">🐟</div>
      </div>
      <div className="fish bottom-1/4" style={{ animationDelay: '8s' }}>
        <div className="text-3xl">🐡</div>
      </div>
      
      {/* Seaweed decorations */}
      <div className="seaweed left-10 h-32 text-4xl">🌿</div>
      <div className="seaweed left-1/4 h-40 text-5xl" style={{ animationDelay: '0.5s' }}>🌿</div>
      <div className="seaweed right-20 h-36 text-4xl" style={{ animationDelay: '1s' }}>🌿</div>
      
      {/* Wave effect */}
      <div className="wave"></div>
      <div className="wave" style={{ animationDelay: '-5s', bottom: '10px', opacity: '0.05' }}></div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className={cn(
            "text-center lg:text-left lg:w-1/2 transition-all duration-700 transform",
            loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            <div className="inline-block mb-4 px-4 py-2 bg-ocean-light text-ocean-deep rounded-full flex items-center gap-2 shadow-md">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">¡Aprende español con Lumi!</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 drop-shadow-md">
              Dive Into Spanish Learning
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Explore the depths of Spanish language with Lumi, your friendly underwater guide. Learn through fun, engaging lessons and games.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/learn"
                className="btn px-6 py-4 bg-primary text-white rounded-full font-medium text-lg flex items-center justify-center hover:bg-primary/90 transition shadow-lg"
              >
                Start Learning
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/practice"
                className="glass-button px-6 py-4 rounded-full font-medium text-lg flex items-center justify-center"
              >
                Practice Games
                <Play className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="mt-6 flex items-center justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                    <img 
                      src={`https://i.pravatar.cc/100?img=${i+10}`} 
                      alt={`User ${i}`}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                ))}
              </div>
              <div className="ml-3 flex items-center">
                <PartyPopper className="h-4 w-4 text-coral mr-1" />
                <span className="text-white/80 text-sm">Join 1,000+ happy learners!</span>
              </div>
            </div>
          </div>
          
          <div className={cn(
            "lg:w-1/2 flex justify-center items-center transition-all duration-700 transform",
            loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )} style={{ transitionDelay: '200ms' }}>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full transform -translate-y-10"></div>
              <img
                src="/lumi.png"
                alt="Lumi the friendly underwater guide"
                className="floating relative max-w-xs md:max-w-sm lg:max-w-md"
                style={{ objectFit: 'contain', maxHeight: '400px' }}
              />
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className={cn(
          "grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 mx-auto max-w-4xl glass-card p-6 rounded-2xl transition-all duration-700",
          loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )} style={{ transitionDelay: '400ms' }}>
          {[
            { label: "Free Lessons", value: "50+", icon: "📚" },
            { label: "Fun Games", value: "12", icon: "🎮" },
            { label: "Vocab Words", value: "1,000+", icon: "🔤" },
            { label: "Daily Challenges", value: "7", icon: "🏆" }
          ].map((stat, idx) => (
            <div key={idx} className="text-center p-2 transform hover:scale-105 transition-transform">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-white/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
