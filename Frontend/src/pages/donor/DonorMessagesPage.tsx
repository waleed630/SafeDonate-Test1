import { useState } from 'react';
import { ChatWindow } from '../../components/chat/ChatWindow';

const MOCK_CONVERSATIONS = [
  { id: '1', name: 'Sarah Mitchell', campaign: 'Urgent Heart Surgery', unread: 2 },
  { id: '2', name: 'David Kim', campaign: 'Tech Lab', unread: 0 },
];

export function DonorMessagesPage() {
  const [selected, setSelected] = useState<string | null>('1');

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col lg:flex-row gap-4 p-4 sm:p-6">
      <div className="lg:w-80 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">Messages</h2>
          <p className="text-sm text-slate-500">2 conversations</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {MOCK_CONVERSATIONS.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(c.id)}
              className={`w-full p-4 text-left hover:bg-slate-50 transition-colors border-b border-slate-50 ${
                selected === c.id ? 'bg-emerald-50 border-l-4 border-l-emerald-600' : ''
              }`}
            >
              <div className="flex justify-between">
                <span className="font-medium text-slate-800">{c.name}</span>
                {c.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center">
                    {c.unread}
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-500 truncate">{c.campaign}</p>
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 min-h-0">
        {selected ? (
          <ChatWindow title={MOCK_CONVERSATIONS.find((c) => c.id === selected)?.name || 'Chat'} />
        ) : (
          <div className="h-full flex items-center justify-center bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-slate-500">Select a conversation</p>
          </div>
        )}
      </div>
    </div>
  );
}
