import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import SidebarNav from './SidebarNav';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-100 dark:bg-gray-800 p-4 flex flex-col">
        <h2 className="font-bold text-lg mb-8">Habit Tracker</h2>
        <SidebarNav />
        <div className="mt-auto">
          {/* User profile / logout button can go here */}
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}

