
import { useState, useEffect } from 'react';

interface ConfettiProps {
  active: boolean;
  duration?: number;
}

const Confetti = ({ active, duration = 3000 }: ConfettiProps) => {
  const [pieces, setPieces] = useState<React.ReactNode[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  
  useEffect(() => {
    if (active) {
      const newPieces = [];
      const colors = [
        '#0EA5E9', // ocean
        '#FB7185', // coral
        '#FDE047', // sand
        '#FFFFFF', // white
      ];
      
      // Generate 100 confetti pieces
      for (let i = 0; i < 100; i++) {
        const style = {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 10 + 5}px`,
          height: `${Math.random() * 10 + 5}px`,
          backgroundColor: colors[Math.floor(Math.random() * colors.length)],
          transform: `rotate(${Math.random() * 360}deg)`,
          animationDelay: `${Math.random() * 2}s`,
          animationDuration: `${Math.random() * 3 + 2}s`,
        };
        
        newPieces.push(
          <div
            key={i}
            className="confetti-piece absolute"
            style={style}
          />
        );
      }
      
      setPieces(newPieces);
      setShowConfetti(true);
      
      // Remove confetti after duration
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [active, duration]);
  
  if (!showConfetti) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <style>
        {`
          @keyframes confetti-fall {
            0% { transform: translateY(-100%) rotate(0deg); }
            100% { transform: translateY(100vh) rotate(360deg); }
          }
          
          .confetti-piece {
            position: absolute;
            top: -20px;
            animation: confetti-fall linear forwards;
          }
        `}
      </style>
      {pieces}
    </div>
  );
};

export default Confetti;
