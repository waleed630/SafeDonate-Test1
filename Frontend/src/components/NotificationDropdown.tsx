import { useState, useRef, useEffect } from 'react';
import { useRealtime } from '../contexts/RealtimeContext';

interface Notification {
  id: string;
  type: 'donation' | 'campaign' | 'message' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: '1', type: 'donation', title: 'New donation received', message: 'Someone donated $50 to your campaign.', time: '2m ago', read: false },
  { id: '2', type: 'campaign', title: 'Campaign approved', message: 'Your campaign "Tech Lab" has been verified.', time: '1h ago', read: false },
  { id: '3', type: 'message', title: 'New message', message: 'Sarah sent you a message.', time: '3h ago', read: true },
  { id: '4', type: 'system', title: 'Password updated', message: 'Your password was changed successfully.', time: '1d ago', read: true },
];

const typeIcons: Record<string, string> = {
  donation: 'fa-hand-holding-dollar',
  campaign: 'fa-rocket',
  message: 'fa-envelope',
  system: 'fa-bell',
};

const typeColors: Record<string, string> = {
  donation: 'bg-emerald-100 text-emerald-600',
  campaign: 'bg-blue-100 text-blue-600',
  message: 'bg-amber-100 text-amber-600',
  system: 'bg-slate-100 text-slate-600',
};

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const ref = useRef<HTMLDivElement>(null);
  const { hasNewNotification, setHasNewNotification } = useRealtime();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) setHasNewNotification(false);
  }, [isOpen, setHasNewNotification]);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const showBadge = unreadCount > 0 || hasNewNotification;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
      >
        <i className="fa-regular fa-bell text-xl" />
        {showBadge && (
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Notifications</h3>
            <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">Mark all read</button>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 cursor-pointer ${
                  !n.read ? 'bg-emerald-50/30' : ''
                }`}
              >
                <div className="flex gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${typeColors[n.type]}`}>
                    <i className={`fa-solid ${typeIcons[n.type]} text-sm`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-800 text-sm">{n.title}</p>
                    <p className="text-xs text-slate-500 truncate">{n.message}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 py-2 bg-slate-50 text-center">
            <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">View all</button>
          </div>
        </div>
      )}
    </div>
  );
}
