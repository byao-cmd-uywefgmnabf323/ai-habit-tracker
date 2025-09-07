'use client';

import { motion } from 'framer-motion';
import { Habit } from '@/types/habit';
import HabitItem from '@/app/(app)/today/HabitItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { List } from 'lucide-react';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { PageHeader } from '../PageHeader';

interface HabitsClientPageProps {
  habits: Habit[];
}

export default function HabitsClientPage({ habits }: HabitsClientPageProps) {
  return (
    <motion.div 
      className="space-y-8"
      initial="hidden"
      animate="show"
      variants={staggerContainer}
    >
      <PageHeader title="All Habits" showAddHabit />

      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>Your Habit Library</CardTitle>
          </CardHeader>
          <CardContent>
            {habits.length === 0 ? (
              <div className="text-center py-20 px-8 rounded-4xl bg-muted/50 border-2 border-dashed">
                <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <List className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-3xl font-bold font-heading mb-4">No habits yet!</h3>
                <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                  Your library is empty. Add a new habit to start your journey.
                </p>
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
