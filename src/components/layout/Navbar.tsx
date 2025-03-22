
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Book, Play, User, Crown, Bell, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [bellHovered, setBellHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { path: '/', label: 'Home', icon: <Home className="h-5 w-5" /> },
    { path: '/learn', label: 'Learn', icon: <Book className="h-5 w-5" /> },
    { path: '/practice', label: 'Practice', icon: <Play className="h-5 w-5" /> },
    { path: '/profile', label: 'Profile', icon: <User className="h-5 w-5" /> },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-3 md:px-8",
        scrolled ? "glass-card shadow-md backdrop-blur-lg" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2"
          onClick={closeMenu}
        >
          <img 
            src="/lovable-uploads/51785a16-8be3-4d70-ad98-532fb4ed9105.png" 
            alt="Lumi mascot" 
            className="h-12 w-12 object-contain animate-float" 
          />
          <span className="font-bold text-xl md:text-2xl tracking-tight text-ocean-deep">
            Learning with Lumi
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-1">
          {links.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center px-4 py-2 rounded-full transition-all duration-300",
                location.pathname === link.path 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-secondary"
              )}
            >
              {link.icon}
              <span className="ml-2">{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Desktop Right Menu */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Notification Bell */}
          <div 
            className="relative p-2 rounded-full hover:bg-secondary cursor-pointer transition-all"
            onMouseEnter={() => setBellHovered(true)}
            onMouseLeave={() => setBellHovered(false)}
          >
            <Bell className="h-5 w-5 text-ocean-deep" />
            <span className="absolute top-1 right-1 bg-coral w-2 h-2 rounded-full"></span>
            {bellHovered && (
              <span className="absolute top-full right-0 mt-2 w-56 p-3 bg-white rounded-xl shadow-lg text-sm text-ocean-deep z-50 animate-fade-in-up">
                <div className="font-medium mb-1">🎉 New lesson unlocked!</div>
                <div className="text-xs text-ocean-deep/70">Check out "Food & Dining" in your learning path</div>
              </span>
            )}
          </div>
          
          {/* Streak Counter */}
          <div className="bg-sand-deep/90 text-white px-3 py-1.5 rounded-full flex items-center">
            <Crown className="h-4 w-4 mr-1 text-sand" />
            <span className="font-medium">3</span>
          </div>
          
          {/* Avatar */}
          <div className="ml-2 w-9 h-9 rounded-full bg-primary/10 overflow-hidden flex items-center justify-center border-2 border-primary/30">
            <div className="text-lg">👤</div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          {/* Mobile Streak */}
          <div className="bg-sand-deep/90 text-white px-2 py-1 rounded-full flex items-center">
            <Crown className="h-3 w-3 mr-0.5 text-sand" />
            <span className="font-medium text-sm">3</span>
          </div>
          
          <button 
            className="text-ocean-deep bg-secondary/80 p-2 rounded-full" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 top-16 bg-background backdrop-blur-lg md:hidden transition-transform duration-300 ease-in-out z-40",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col p-4 space-y-2">
          {links.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center px-4 py-3 rounded-xl transition-all",
                location.pathname === link.path 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-white/50 hover:bg-secondary"
              )}
              onClick={closeMenu}
            >
              {link.icon}
              <span className="ml-3 text-lg">{link.label}</span>
              {link.path === '/learn' && (
                <div className="ml-auto bg-coral/80 text-white text-xs px-2 py-0.5 rounded-full flex items-center">
                  <Sparkles className="h-3 w-3 mr-1" /> New
                </div>
              )}
            </Link>
          ))}

          {/* Streak Counter - Mobile */}
          <div className="flex items-center p-4 bg-white/50 rounded-xl mt-4">
            <div className="bg-sand-deep/90 text-white px-3 py-1 rounded-full flex items-center">
              <Crown className="h-4 w-4 mr-1 text-sand" />
              <span className="font-medium">3</span>
              <span className="ml-2 text-sm">day streak</span>
            </div>
            <div className="ml-auto text-2xl">🔥</div>
          </div>
          
          {/* Profile Info - Mobile */}
          <div className="flex items-center p-4 bg-white/50 rounded-xl">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/30 overflow-hidden">
              <div className="text-2xl">👤</div>
            </div>
            <div className="ml-3">
              <div className="font-medium">Guest User</div>
              <div className="text-sm text-ocean-deep/70">Level 2 Explorer</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
