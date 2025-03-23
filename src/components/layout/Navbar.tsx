
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Book, Play, User, Crown, Bell } from 'lucide-react';
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
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2"
          onClick={closeMenu}
        >
          <div className="rounded-full bg-lumi-pink w-10 h-10 flex items-center justify-center">
            <img 
              src="/lovable-uploads/106d3c10-76c0-4fd6-bc8e-7c19c7850852.png" 
              alt="Lumi mascot" 
              className="h-9 w-9 object-contain" 
            />
          </div>
          <span className="font-bold text-xl tracking-tight text-lumi-pink">
            Learning with <span className="text-aqua-medium">Lumi</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex bg-white/80 backdrop-blur-md shadow-sm rounded-full px-1 py-1">
          {links.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center px-6 py-2 rounded-full transition-all duration-300",
                location.pathname === link.path 
                  ? "bg-aqua text-white" 
                  : "hover:bg-aqua-lightest"
              )}
            >
              {link.icon}
              <span className="ml-2">{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Desktop Right Menu */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Streak Counter */}
          <div className="bg-coral/90 text-white px-3 py-1.5 rounded-full flex items-center">
            <Crown className="h-4 w-4 mr-1 text-white" />
            <span className="font-medium">3</span>
            <span className="ml-1">day streak</span>
          </div>
          
          {/* Avatar */}
          <div className="ml-2 w-9 h-9 rounded-full bg-aqua-light overflow-hidden flex items-center justify-center border-2 border-white">
            <div className="text-lg">👤</div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          {/* Mobile Streak */}
          <div className="bg-coral/90 text-white px-2 py-1 rounded-full flex items-center">
            <Crown className="h-3 w-3 mr-0.5 text-white" />
            <span className="font-medium text-sm">3</span>
          </div>
          
          <button 
            className="text-navy-deep bg-white/80 p-2 rounded-full shadow-sm" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 top-16 bg-white/95 backdrop-blur-lg md:hidden transition-transform duration-300 ease-in-out z-40",
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
                  ? "bg-aqua text-white" 
                  : "bg-white/50 hover:bg-aqua-lightest"
              )}
              onClick={closeMenu}
            >
              {link.icon}
              <span className="ml-3 text-lg">{link.label}</span>
            </Link>
          ))}

          {/* Streak Counter - Mobile */}
          <div className="flex items-center p-4 bg-white/50 rounded-xl mt-4">
            <div className="bg-coral/90 text-white px-3 py-1 rounded-full flex items-center">
              <Crown className="h-4 w-4 mr-1 text-white" />
              <span className="font-medium">3</span>
              <span className="ml-2 text-sm">day streak</span>
            </div>
            <div className="ml-auto text-2xl">🔥</div>
          </div>
          
          {/* Profile Info - Mobile */}
          <div className="flex items-center p-4 bg-white/50 rounded-xl">
            <div className="w-12 h-12 rounded-full bg-aqua-light flex items-center justify-center border-2 border-white overflow-hidden">
              <div className="text-2xl">👤</div>
            </div>
            <div className="ml-3">
              <div className="font-medium">Guest User</div>
              <div className="text-sm text-navy-deep/70">Level 2 Explorer</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
