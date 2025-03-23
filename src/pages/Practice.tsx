
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getActivities } from '@/services/learningService';
import { Activity } from '@/types/learning';
import Navbar from '@/components/layout/Navbar';
import VocabularyCategories from '@/components/learning/VocabularyCategories';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, MessageSquare, Gamepad2, Target } from 'lucide-react';

const iconMap = {
  BookOpen: <BookOpen className="h-5 w-5" />,
  MessageSquare: <MessageSquare className="h-5 w-5" />,
  Gamepad2: <Gamepad2 className="h-5 w-5" />,
  Target: <Target className="h-5 w-5" />
};

const Practice = () => {
  const activities = getActivities();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-aqua-lightest to-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-lumi-purple">
          Practice Your Spanish
        </h1>
        
        <p className="text-center text-ocean-deep/80 mb-8 max-w-3xl mx-auto">
          Improve your Spanish skills with these interactive activities designed to help you
          master vocabulary, practice conversations, and test your knowledge.
        </p>
        
        <Tabs defaultValue="activities" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="activities" className="text-base py-3">Activities</TabsTrigger>
            <TabsTrigger value="vocabulary" className="text-base py-3">Vocabulary</TabsTrigger>
          </TabsList>
          
          <TabsContent value="activities">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {activities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="vocabulary">
            <VocabularyCategories />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const ActivityCard = ({ activity }: { activity: Activity }) => {
  return (
    <Link to={`/practice/activity/${activity.id}`} className="block">
      <div 
        className={`p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ${activity.color} border ${activity.borderColor}`}
      >
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-full ${activity.color} ${activity.textColor}`}>
            {/* @ts-ignore */}
            {iconMap[activity.icon]}
          </div>
          
          <div>
            <h3 className={`text-xl font-semibold mb-2 ${activity.textColor}`}>
              {activity.title}
            </h3>
            <p className="text-ocean-deep/80">
              {activity.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Practice;
