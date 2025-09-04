'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { addHabit } from './actions';

export default function AddHabitDialog() {
  const router = useRouter();
  const [habitName, setHabitName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async () => {
    if (!habitName.trim()) return;
    setIsSaving(true);
    const result = await addHabit(habitName);
    setIsSaving(false);

    if (!result?.error) {
      setHabitName('');
      setIsOpen(false);
      router.refresh();
    }
    // Optionally, handle the error case with a toast notification
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Add New Habit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new habit</DialogTitle>
          <DialogDescription>
            What&apos;s a new habit you want to start building?
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Habit Name</Label>
            <Input
              id="name"
              placeholder="e.g., Read for 15 minutes"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              disabled={isSaving}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Habit'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

