import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';

import { Sidebar } from './Sidebar';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <Sidebar />
      <main className="flex flex-col sm:gap-4 sm:py-4 sm:pl-20 w-full">
        <div className="p-4 sm:p-6">{children}</div>
      </main>
    </div>
  );
}
