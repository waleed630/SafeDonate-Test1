import { useState, useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';

interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  isOwn: boolean;
  time: string;
}

const MOCK_MESSAGES: Message[] = [
  { id: '1', text: 'Hi! I\'d like to support your campaign.', senderId: '2', senderName: 'Sarah', isOwn: false, time: '10:30 AM' },
  { id: '2', text: 'Thank you so much! Every contribution helps.', senderId: '1', senderName: 'You', isOwn: true, time: '10:32 AM' },
  { id: '3', text: 'When will the campaign end?', senderId: '2', senderName: 'Sarah', isOwn: false, time: '10:35 AM' },
];

interface ChatWindowProps {
  title?: string;
  onClose?: () => void;
}

export function ChatWindow({ title = 'Chat', onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [input, setInput] = useState('');
  const [typing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((m) => [
      ...m,
      { id: Date.now().toString(), text: input.trim(), senderId: '1', senderName: 'You', isOwn: true, time: 'Now' },
    ]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-slate-100 shadow-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
            <i className="fa-solid fa-user" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">{title}</h3>
            <p className="text-xs text-slate-500">2 online</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-2 text-slate-500 hover:text-slate-700">
            <i className="fa-solid fa-times" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m.text} isOwn={m.isOwn} sender={!m.isOwn ? m.senderName : undefined} time={m.time} />
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="bg-slate-100 rounded-2xl px-4 py-2 rounded-bl-md">
              <span className="inline-flex gap-1">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </span>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 border-t border-slate-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-sm"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors"
          >
            <i className="fa-solid fa-paper-plane" />
          </button>
        </div>
      </form>
    </div>
  );
}
