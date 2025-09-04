import AnalyticsClientPage from './AnalyticsClientPage';
import { createClient } from '@/lib/supabase/server';
import { getCurrentUser } from '@/lib/auth';

// Helper to get the last 7 days, which will be used to structure the chart data
const getLast7Days = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const result = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    result.push({
      name: days[d.getDay()],
      date: d.toISOString().split('T')[0], // YYYY-MM-DD format
      completed: 0,
    });
  }
  return result;
};

export default async function AnalyticsPage() {
  const user = await getCurrentUser();
  const supabase = await createClient();

  if (!user) {
    // Render with empty data if no user is found
    return <AnalyticsClientPage data={[]} />;
  }

  // Get the date from 7 days ago to set the query range
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // Fetch all habit completions for the user from the last 7 days
  const { data: completions, error } = await supabase
    .from('habit_completions')
    .select('created_at')
    .eq('user_id', user.id)
    .gte('created_at', sevenDaysAgo.toISOString());

  if (error) {
    console.error('Error fetching habit completions:', error);
    return <AnalyticsClientPage data={[]} />;
  }

  // Process the data to count completions for each of the last 7 days
  const analyticsData = getLast7Days();
  if (completions) {
    for (const completion of completions) {
      const completionDate = new Date(completion.created_at).toISOString().split('T')[0];
      const dayData = analyticsData.find((d) => d.date === completionDate);
      if (dayData) {
        dayData.completed++;
      }
    }
  }

  return <AnalyticsClientPage data={analyticsData} />;
}
