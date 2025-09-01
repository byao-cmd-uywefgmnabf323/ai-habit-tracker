export type Habit = {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  frequency_type: 'daily' | 'weekly';
  frequency_details?: any;
  target: number;
  category?: string;
  color?: string;
  created_at: string;
};
