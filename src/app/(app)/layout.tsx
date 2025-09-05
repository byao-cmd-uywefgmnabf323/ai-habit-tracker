import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import Sidebar from './Sidebar';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="relative flex min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-purple-900/10 dark:to-indigo-900/20">
      <Sidebar />
      <main className="flex-1 ml-72">
        <div className="container relative py-12 lg:py-16 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
