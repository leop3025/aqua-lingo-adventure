
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import LearningPath from '@/components/learning/LearningPath';
import CustomProgress from '@/components/ui/CustomProgress';
import { BookOpen, Target, Trophy, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getUserData, updateStreak } from '@/services/learningService';
import { User } from '@/types/learning';

const Learn = () => {
  const [loaded, setLoaded] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    // Get user data from the learning service
    const user = getUserData();
    
    // Update streak when the page loads
    const updatedUser = updateStreak();
    
    setUserData(updatedUser);
    setLoaded(true);
  }, []);

  // Stats data
  const stats = userData ? [
    {
      label: "Current Streak",
      value: `${userData.streak} days`,
      icon: <Trophy className="h-5 w-5 text-sand-deep" />,
      color: "bg-sand-light"
    },
    {
      label: "Words Learned",
      value: `${userData.wordsLearned}`,
      icon: <BookOpen className="h-5 w-5 text-ocean" />,
      color: "bg-ocean-light"
    },
    {
      label: "XP Earned",
      value: `${userData.xp.toLocaleString()}`,
      icon: <Target className="h-5 w-5 text-coral" />,
      color: "bg-coral-light"
    },
    {
      label: "Achievements",
      value: "8/30",
      icon: <Award className="h-5 w-5 text-primary" />,
      color: "bg-primary/10"
    }
  ] : [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <section className={cn(
          "transition-all duration-700 transform",
          loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}>
          {userData && (
            <>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-ocean-deep mb-2">
                    ¡Hola, {userData.username}!
                  </h1>
                  <p className="text-ocean-deep/70">Continue your Spanish learning journey</p>
                </div>
                
                <div className="mt-4 md:mt-0">
                  <div className="glass-card px-4 py-2 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-ocean-deep font-semibold mr-2">Level {userData.level}</span>
                      <CustomProgress 
                        value={userData.xp % 500} 
                        max={500} 
                        showValue 
                        size="sm" 
                        className="w-32 md:w-48" 
                        animated
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                {stats.map((stat, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      "p-4 rounded-xl border border-white/20 transition-all",
                      stat.color,
                      "hover:shadow-md"
                    )}
                  >
                    <div className="flex items-center">
                      <div className="mr-3">
                        {stat.icon}
                      </div>
                      <div>
                        <p className="text-sm text-ocean-deep/70">{stat.label}</p>
                        <p className="text-xl font-semibold text-ocean-deep">{stat.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          
          <div className="glass-card rounded-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-ocean-deep">Your Learning Path</h2>
            <LearningPath />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Learn;
