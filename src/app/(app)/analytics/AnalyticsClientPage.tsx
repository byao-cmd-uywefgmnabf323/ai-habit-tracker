'use client';

import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { PageHeader } from '../PageHeader';

interface AnalyticsData {
  name: string;
  completed: number;
}

interface AnalyticsClientPageProps {
  data: AnalyticsData[];
}

export default function AnalyticsClientPage({ data }: AnalyticsClientPageProps) {
  const hasData = data && data.some(d => d.completed > 0);

  return (
    <motion.div 
      className="space-y-8"
      initial="hidden"
      animate="show"
      variants={staggerContainer}
    >
      <motion.div variants={fadeInUp}>
        <PageHeader title="Analytics" />
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>Weekly Completions</CardTitle>
            <CardDescription>
              Here&apos;s a look at your completed habits over the last 7 days.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {hasData ? (
              <div className="h-[400px] w-full">
                <ResponsiveContainer>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="name" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      allowDecimals={false}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: 'var(--radius)',
                      }}
                    />
                    <Bar dataKey="completed" fill="hsl(var(--primary))" name="Completed Habits" radius={[16, 16, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="text-center py-20 px-8 rounded-4xl bg-muted/50 border-2 border-dashed">
                <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-3xl font-bold font-heading mb-4">Not enough data yet!</h3>
                <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                  Complete some habits on the Today screen to see your progress here.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
