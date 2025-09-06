import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { LandingPage } from '@/components/landing-page';

export default async function Home() {
  const user = await getCurrentUser();

  if (user) {
    redirect('/today');
  }

  return <LandingPage />;
}

