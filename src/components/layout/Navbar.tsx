
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Book, Play, User, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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
            src="/lumi.png" 
            alt="Lumi mascot" 
            className="h-10 w-10 object-contain animate-float" 
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

        {/* Streak Counter - Desktop */}
        <div className="hidden md:flex items-center space-x-1">
          <div className="bg-sand-deep/90 text-white px-3 py-1 rounded-full flex items-center">
            <Crown className="h-4 w-4 mr-1 text-sand" />
            <span className="font-medium">3</span>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-ocean-deep" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 top-16 bg-background backdrop-blur-lg md:hidden transition-transform duration-300 ease-in-out z-40",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col p-4 space-y-4">
          {links.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center px-4 py-3 rounded-lg transition-all",
                location.pathname === link.path 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-secondary"
              )}
              onClick={closeMenu}
            >
              {link.icon}
              <span className="ml-3 text-lg">{link.label}</span>
            </Link>
          ))}

          {/* Streak Counter - Mobile */}
          <div className="flex items-center p-4">
            <div className="bg-sand-deep/90 text-white px-3 py-1 rounded-full flex items-center">
              <Crown className="h-4 w-4 mr-1 text-sand" />
              <span className="font-medium">3</span>
              <span className="ml-2 text-sm">day streak</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
