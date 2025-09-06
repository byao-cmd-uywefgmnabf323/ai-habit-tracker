'use client';

import * as React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getCurrentUser } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Blob1, Blob2, Blob3 } from '@/components/blobs';
import { CheckCircle2, Bot, BarChart } from 'lucide-react';
import { staggerContainer, fadeInUp } from '@/lib/animations';

const MotionCard = motion(Card);

export default function Home() {
  React.useEffect(() => {
    getCurrentUser().then(user => {
      if (user) {
        redirect('/today');
      }
    });
  }, []);

  const features = [
    { 
      icon: <CheckCircle2 className="h-8 w-8 text-primary" />,
      title: "Track Your Habits", 
      description: "Easily log your daily habits and see your progress over time with a simple, fun interface."
    },
    { 
      icon: <Bot className="h-8 w-8 text-secondary" />,
      title: "AI-Powered Coach", 
      description: "Get personalized insights and encouragement from your AI coach to stay motivated."
    },
    { 
      icon: <BarChart className="h-8 w-8 text-accent" />,
      title: "Visualize Progress", 
      description: "Beautiful charts and analytics help you understand your streaks and patterns."
    },
  ];

  return (
    <div className="relative overflow-hidden">
      <Blob1 />
      <Blob2 />
      <Blob3 />
      <motion.div 
        className="container relative z-10"
        initial="hidden"
        animate="show"
        variants={staggerContainer}
      >
        <motion.section variants={fadeInUp} className="text-center py-24 md:py-40">
          <h1 className="font-heading text-5xl md:text-7xl font-extrabold tracking-tighter">
            Build Better Habits, <span className="text-primary">The Fun Way</span>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-muted-foreground">
            Your personal AI-powered coach to help you build streaks, stay motivated, and achieve your goals. No more boring spreadsheets.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/login">Get Started for Free</Link>
            </Button>
          </div>
        </motion.section>

        <motion.section variants={staggerContainer} className="py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <MotionCard variants={fadeInUp} key={feature.title} className="text-center items-center flex flex-col">
                <CardHeader className="items-center">
                  <div className="p-4 bg-primary/10 rounded-3xl mb-4">{feature.icon}</div>
                  <CardTitle className="font-heading text-2xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground text-lg">{feature.description}</p>
                </CardContent>
              </MotionCard>
            ))}
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}

