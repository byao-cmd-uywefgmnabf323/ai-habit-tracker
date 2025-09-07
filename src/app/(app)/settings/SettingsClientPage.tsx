'use client';

import { motion } from 'framer-motion';
import SignOutButton from './SignOutButton';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { User } from '@supabase/supabase-js';
import { PageHeader } from '../PageHeader';

interface SettingsClientPageProps {
  user: User | null;
}

export default function SettingsClientPage({ user }: SettingsClientPageProps) {
  return (
    <motion.div 
      className="space-y-8"
      initial="hidden"
      animate="show"
      variants={staggerContainer}
    >
      <motion.div variants={fadeInUp}>
        <PageHeader title="Settings" />
      </motion.div>

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
              {user ? user.email : 'Not signed in'}
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
