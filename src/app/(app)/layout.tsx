import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import Header from './Header';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container relative py-6 lg:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
