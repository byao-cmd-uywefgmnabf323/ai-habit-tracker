'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { getCurrentUser } from '@/lib/auth';
import SignOutButton from './SignOutButton';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { User } from '@supabase/supabase-js';

export default function SettingsPage() {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  return (
    <motion.div 
      className="space-y-8"
      initial="hidden"
      animate="show"
      variants={staggerContainer}
    >
      <motion.header variants={fadeInUp}>
        <h1 className="font-heading text-5xl font-extrabold tracking-tighter">
          Settings
        </h1>
        <p className="mt-2 text-xl text-muted-foreground">
          Manage your account and preferences.
        </p>
      </motion.header>

      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              This is the email address associated with your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold p-4 rounded-2xl bg-muted">
              {user ? user.email : 'Loading...'}
            </p>
          </CardContent>
          <CardFooter className="border-t pt-6">
            <SignOutButton />
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
}
