import { mockLiveDonations, type LiveDonation } from '../../data/mockData';
import { useRealtime } from '../../contexts/RealtimeContext';

interface LiveDonationTickerProps {
  variant?: 'campaign' | 'discover';
  campaignId?: number;
  maxItems?: number;
  className?: string;
}

export function LiveDonationTicker({ variant = 'discover', campaignId, maxItems = 6, className = '' }: LiveDonationTickerProps) {
  const { connected, liveDonations: realtimeDonations } = useRealtime();
  const source = connected ? realtimeDonations : mockLiveDonations;

  let items: LiveDonation[] = source;
  if (variant === 'campaign' && campaignId) {
    items = source.filter((d) => d.campaignId === campaignId);
  }
  if (items.length === 0 && variant === 'campaign') {
    items = (connected ? source : mockLiveDonations).slice(0, 3).map((d) => ({ ...d, campaignId }));
  }
  items = items.slice(0, maxItems);

  return (
    <div className={`bg-slate-50 border border-slate-100 rounded-xl overflow-hidden ${className}`}>
      <div className="px-4 py-2 border-b border-slate-100 flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Recent donations</span>
      </div>
      <div className="divide-y divide-slate-100 max-h-48 overflow-y-auto">
        {items.map((d) => (
          <div key={d.id} className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50/50 transition-colors">
            <img src={d.donorAvatar || 'https://i.pravatar.cc/150'} alt="" className="w-8 h-8 rounded-full flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm text-slate-800 truncate">
                <span className="font-medium">{d.donorName}</span>
                <span className="text-slate-500"> donated </span>
                <span className="font-semibold text-emerald-600">${d.amount.toLocaleString()}</span>
                {variant === 'discover' && (
                  <span className="text-slate-500"> to {d.campaign}</span>
                )}
              </p>
              <p className="text-xs text-slate-400">{d.timeAgo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
