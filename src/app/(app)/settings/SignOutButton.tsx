'use client';

import { signOut } from '@/app/auth/actions';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export default function SignOutButton() {
  return (
    <Button variant="destructive" onClick={() => signOut()}>
      <LogOut className="w-5 h-5 mr-2" />
      Sign Out
    </Button>
  );
}
