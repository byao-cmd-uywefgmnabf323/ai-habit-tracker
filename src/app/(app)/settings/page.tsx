import { createClient } from '@/utils/supabase/server';
import SignOutButton from './SignOutButton';

export default async function SettingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Account</h2>
          <p className="text-sm text-gray-500">
            {user ? `Signed in as ${user.email}` : 'Not signed in'}
          </p>
        </div>
        <SignOutButton />
      </div>
    </div>
  );
}
