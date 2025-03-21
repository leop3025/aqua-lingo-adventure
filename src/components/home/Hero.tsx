
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, ChevronRight } from 'lucide-react';
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
      
      {/* Wave effect */}
      <div className="wave"></div>
      <div className="wave" style={{ animationDelay: '-5s', bottom: '10px', opacity: '0.05' }}></div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className={cn(
            "text-center lg:text-left lg:w-1/2 transition-all duration-700 transform",
            loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            <div className="inline-block mb-4 px-3 py-1 bg-ocean-light text-ocean-deep rounded-full">
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
                className="btn px-6 py-3 bg-primary text-white rounded-full font-medium text-lg flex items-center justify-center hover:bg-primary/90 transition shadow-lg"
              >
                Start Learning
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/practice"
                className="glass-button px-6 py-3 rounded-full font-medium text-lg flex items-center justify-center"
              >
                Practice Games
                <Play className="ml-2 h-5 w-5" />
              </Link>
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
          "grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 mx-auto max-w-4xl glass-card p-4 rounded-2xl transition-all duration-700",
          loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )} style={{ transitionDelay: '400ms' }}>
          {[
            { label: "Free Lessons", value: "50+" },
            { label: "Fun Games", value: "12" },
            { label: "Vocab Words", value: "1,000+" },
            { label: "Daily Challenges", value: "7" }
          ].map((stat, idx) => (
            <div key={idx} className="text-center p-2">
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
