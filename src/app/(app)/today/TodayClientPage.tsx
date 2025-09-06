'use client';

import { User } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import { Habit } from '@/types/habit';
import HabitItem from './HabitItem';
import AddHabitDialog from './AddHabitDialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressCircle } from '@/components/ui/progress-circle';
import { Target } from 'lucide-react';
import { staggerContainer, fadeInUp } from '@/lib/animations';

interface TodayClientPageProps {
  user: User | null;
  habits: Habit[];
}

export default function TodayClientPage({ user, habits }: TodayClientPageProps) {
  const completedCount = habits.filter(h => h.completed_today).length;
  const totalCount = habits.length;
  const completionPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <motion.div 
      className="space-y-8"
      initial="hidden"
      animate="show"
      variants={staggerContainer}
    >
      <motion.header variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="font-heading text-5xl font-extrabold tracking-tighter">
            Welcome back, {user?.user_metadata.name || 'friend'}!
          </h1>
          <p className="mt-2 text-xl text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <ProgressCircle progress={completionPercentage} />
          <div>
            <p className="font-bold text-2xl">{completedCount}/{totalCount}</p>
            <p className="text-muted-foreground">habits completed</p>
          </div>
        </div>
      </motion.header>

      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Today&apos;s Habits</CardTitle>
            <AddHabitDialog />
          </CardHeader>
          <CardContent>
            {habits.length === 0 ? (
              <div className="text-center py-20 px-8 rounded-4xl bg-muted/50 border-2 border-dashed">
                <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Target className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-3xl font-bold font-heading mb-4">Your habit list is empty!</h3>
                <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                  Ready to build a better you? Add your first habit to get started.
                </p>
                <AddHabitDialog />
              </div>
            ) : (
              <motion.ul variants={staggerContainer} className="space-y-4">
                {habits.map((habit) => (
                  <motion.li variants={fadeInUp} key={habit.id}>
                    <HabitItem habit={habit} />
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
