
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import { ChevronUp, Heart, MessageCircle, Mail, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSocialClick = (platform: string) => {
    toast({
      title: "Coming Soon",
      description: `Follow us on ${platform} for updates and language tips!`,
    });
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      <main>
        <Hero />
        <Features />
      </main>
      
      <footer className="bg-navy-deep text-white py-12 rounded-t-3xl relative overflow-hidden">
        {/* Underwater bubbles in footer */}
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="bubble"
            style={{
              '--delay': i * 0.7,
              '--size': Math.random() * 2 + 0.5,
              '--x': Math.random() * 100,
            } as React.CSSProperties}
          />
        ))}
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-lumi-pink w-10 h-10 rounded-full flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/844eae2a-50a8-472a-bab4-19ab855d4155.png" 
                    alt="Lumi mascot" 
                    className="h-8 w-8 object-contain" 
                  />
                </div>
                <span className="font-bold text-xl tracking-tight">Learning with Lumi</span>
              </div>
              <p className="text-white/80 max-w-md">
                Dive into Spanish with Lumi, your friendly underwater guide. Learn through engaging lessons and fun games.
              </p>
              
              <div className="mt-6 flex items-center space-x-4">
                <button 
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition"
                  onClick={() => handleSocialClick("Twitter")}
                >
                  <Heart className="h-5 w-5" />
                </button>
                <button 
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition"
                  onClick={() => handleSocialClick("Discord")}
                >
                  <MessageCircle className="h-5 w-5" />
                </button>
                <button 
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition"
                  onClick={() => handleSocialClick("Email")}
                >
                  <Mail className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'Learn', path: '/learn' },
                  { name: 'Practice', path: '/practice' },
                  { name: 'Profile', path: '/profile' }
                ].map(link => (
                  <li key={link.name}>
                    <button 
                      onClick={() => handleNavigation(link.path)}
                      className="text-white/80 hover:text-white transition flex items-center"
                    >
                      <span className="mr-2 text-aqua">→</span>
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Connect</h3>
              <ul className="space-y-3">
                {[
                  { label: 'Contact Us', icon: '📧' },
                  { label: 'About', icon: '👋' },
                  { label: 'FAQ', icon: '❓' },
                  { label: 'Privacy Policy', icon: '🔒' }
                ].map(item => (
                  <li key={item.label}>
                    <button 
                      className="text-white/80 hover:text-white transition flex items-center"
                      onClick={() => toast({
                        title: "Coming Soon",
                        description: `Our ${item.label} page is under construction.`
                      })}
                    >
                      <span className="mr-2">{item.icon}</span>
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              &copy; {new Date().getFullYear()} Learning with Lumi. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-4">
              <button className="text-white/60 hover:text-white transition text-sm flex items-center">
                Terms <ExternalLink className="ml-1 h-3 w-3" />
              </button>
              <button className="text-white/60 hover:text-white transition text-sm flex items-center">
                Privacy <ExternalLink className="ml-1 h-3 w-3" />
              </button>
              <button className="text-white/60 hover:text-white transition text-sm flex items-center">
                Cookies <ExternalLink className="ml-1 h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-6 right-6 p-3 rounded-full bg-aqua text-white shadow-md z-40 transition-all duration-300 transform hover:scale-110",
          showScrollTop ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
        )}
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Index;
