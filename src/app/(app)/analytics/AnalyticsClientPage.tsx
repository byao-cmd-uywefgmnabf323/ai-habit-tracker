'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
    <div>
      <h1 className="text-2xl font-bold">Analytics</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Your habit completion trends for the last 7 days.</p>

      {hasData ? (
        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" fill="#8884d8" name="Completed Habits" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="text-center py-12 px-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 mt-8">
          <h3 className="text-lg font-medium">Not enough data yet!</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Complete some habits on the Today screen to see your progress here.
          </p>
        </div>
      )}
    </div>
  );
}
