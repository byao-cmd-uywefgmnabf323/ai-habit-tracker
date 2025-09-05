'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
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
        <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-bold px-8 py-4 h-auto rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <Plus className="w-5 h-5 mr-3" />
          Add New Habit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-0 shadow-2xl rounded-3xl">
        <DialogHeader className="text-center pb-6">
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Create New Habit
          </DialogTitle>
          <DialogDescription className="text-lg text-slate-600 dark:text-slate-300 mt-2">
            What positive habit do you want to build? ✨
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-6">
          <div className="space-y-3">
            <Label htmlFor="name" className="text-lg font-semibold text-slate-700 dark:text-slate-300">
              Habit Name
            </Label>
            <Input
              id="name"
              placeholder="e.g., Read for 15 minutes, Exercise daily, Meditate..."
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              disabled={isSaving}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              className="h-14 text-lg rounded-xl border-2 border-purple-200 dark:border-purple-700 focus:border-purple-500 dark:focus:border-purple-400 bg-white/50 dark:bg-slate-700/50"
            />
          </div>
        </div>
        <DialogFooter className="pt-6">
          <Button 
            type="submit" 
            onClick={handleSubmit} 
            disabled={isSaving || !habitName.trim()}
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-bold px-8 py-4 h-auto w-full rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <div className="flex items-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                Creating Habit...
              </div>
            ) : (
              'Create Habit 🚀'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

