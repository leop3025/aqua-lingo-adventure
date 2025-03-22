
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ProgressProps {
  value: number;
  max: number;
  className?: string;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'ocean' | 'coral' | 'sand';
  animated?: boolean;
}

const Progress = ({
  value,
  max,
  className,
  showValue = false,
  size = 'md',
  color = 'primary',
  animated = false
}: ProgressProps) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Animate progress value
    const timer = setTimeout(() => {
      setProgress((value / max) * 100);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [value, max]);
  
  const getHeight = () => {
    switch (size) {
      case 'sm': return 'h-2';
      case 'lg': return 'h-6';
      default: return 'h-4';
    }
  };
  
  const getColor = () => {
    switch (color) {
      case 'ocean': return 'bg-gradient-to-r from-ocean-light to-ocean-deep';
      case 'coral': return 'bg-gradient-to-r from-coral-light to-coral-deep';
      case 'sand': return 'bg-gradient-to-r from-sand-light to-sand-deep';
      default: return 'bg-gradient-to-r from-primary to-ocean-deep';
    }
  };
  
  return (
    <div className={cn('w-full', className)}>
      <div className={cn(
        'w-full bg-secondary/60 rounded-full overflow-hidden shadow-inner',
        getHeight()
      )}>
        <div
          className={cn(
            'h-full rounded-full transition-all duration-1000',
            getColor(),
            animated && 'relative overflow-hidden'
          )}
          style={{ width: `${progress}%` }}
        >
          {animated && (
            <div className="absolute inset-0 overflow-hidden">
              <div className="animate-[wave_2s_linear_infinite] absolute inset-0 opacity-30 bg-white" 
                style={{
                  backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                  backgroundSize: '200% 100%'
                }}
              />
            </div>
          )}
          
          {showValue && size === 'lg' && (
            <div className="h-full flex items-center justify-center text-xs font-semibold text-white drop-shadow-md">
              {Math.round(progress)}%
            </div>
          )}
        </div>
      </div>
      
      {showValue && size !== 'lg' && (
        <div className="mt-1 text-xs text-ocean-deep/90 font-medium text-right">
          {value} / {max}
        </div>
      )}
    </div>
  );
};

export default Progress;
