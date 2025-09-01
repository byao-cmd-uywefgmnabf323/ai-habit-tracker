'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', completed: 4 },
  { name: 'Tue', completed: 3 },
  { name: 'Wed', completed: 5 },
  { name: 'Thu', completed: 2 },
  { name: 'Fri', completed: 6 },
  { name: 'Sat', completed: 7 },
  { name: 'Sun', completed: 5 },
];

export default function AnalyticsClientPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Analytics</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Your habit completion trends.</p>
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="completed" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
