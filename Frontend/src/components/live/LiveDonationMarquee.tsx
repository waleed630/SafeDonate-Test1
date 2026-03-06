import { mockLiveDonations } from '../../data/mockData';

interface LiveDonationMarqueeProps {
  className?: string;
}

export function LiveDonationMarquee({ className = '' }: LiveDonationMarqueeProps) {
  const items = [...mockLiveDonations, ...mockLiveDonations];

  return (
    <div className={`overflow-hidden border-b border-slate-100 bg-white/80 backdrop-blur-sm ${className}`}>
      <div className="flex items-center gap-6 py-2">
        <span className="flex-shrink-0 flex items-center gap-2 px-4">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Live donations</span>
        </span>
        <div className="flex-1 min-w-0 overflow-hidden">
          <div className="flex animate-marquee hover:[animation-play-state:paused]">
            {items.map((d, i) => (
              <span key={`${d.id}-${i}`} className="flex-shrink-0 mx-4 text-sm text-slate-600 whitespace-nowrap">
                <span className="font-medium text-slate-800">{d.donorName}</span>
                <span className="text-slate-500"> donated </span>
                <span className="font-semibold text-emerald-600">${d.amount}</span>
                <span className="text-slate-500"> to {d.campaign}</span>
                <span className="text-slate-400 text-xs ml-1">• {d.timeAgo}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
