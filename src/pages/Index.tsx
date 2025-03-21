
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import { ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const Index = () => {
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

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      <main>
        <Hero />
        <Features />
      </main>
      
      <footer className="bg-ocean-deep text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <img src="/lumi.png" alt="Lumi mascot" className="h-10 w-10 object-contain" />
                <span className="font-bold text-xl tracking-tight">Learning with Lumi</span>
              </div>
              <p className="text-white/80 max-w-md">
                Dive into Spanish with Lumi, your friendly underwater guide. Learn through engaging lessons and fun games.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-white/80 hover:text-white transition">Home</a></li>
                <li><a href="/learn" className="text-white/80 hover:text-white transition">Learn</a></li>
                <li><a href="/practice" className="text-white/80 hover:text-white transition">Practice</a></li>
                <li><a href="/profile" className="text-white/80 hover:text-white transition">Profile</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/80 hover:text-white transition">Contact Us</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition">About</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition">FAQ</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              &copy; {new Date().getFullYear()} Learning with Lumi. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <a href="#" className="text-white/60 hover:text-white transition">
                Terms
              </a>
              <a href="#" className="text-white/60 hover:text-white transition">
                Privacy
              </a>
              <a href="#" className="text-white/60 hover:text-white transition">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-6 right-6 p-3 rounded-full bg-primary text-white shadow-lg z-40 transition-opacity duration-300",
          showScrollTop ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Index;
