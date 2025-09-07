import ChatPanel from './ChatPanel';
import { PageHeader } from '../PageHeader';

export default function CoachPage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader title="AI Coach" />
      <div className="flex-1">
        <ChatPanel />
      </div>
    </div>
  );
}
