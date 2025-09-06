import { getCurrentUser } from '@/lib/auth';
import SettingsClientPage from './SettingsClientPage';

export default async function SettingsPage() {
  const user = await getCurrentUser();

  return <SettingsClientPage user={user} />;
}
