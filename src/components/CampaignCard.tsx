import { Link } from 'react-router-dom';
import type { Campaign } from '../data/campaigns';
import { useRealtime } from '../contexts/RealtimeContext';

interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const { connected, getProgressOverride } = useRealtime();
  const progressOverride = connected ? getProgressOverride(campaign.id) : null;
  const display = progressOverride
    ? { ...campaign, raised: progressOverride.raised, goal: progressOverride.goal, percent: progressOverride.percent }
    : campaign;

  return (
    <Link to={`/campaigns/${display.id}`}>
    <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full">
      <div className="relative h-56 overflow-hidden">
        <img src={display.image} alt={display.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className={`bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold ${display.categoryBadge} shadow-sm`}>
            <i className={`fa-solid ${display.categoryIcon} mr-1`} /> {display.category}
          </span>
          <span className="bg-emerald-500/90 text-white px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
            <i className="fa-solid fa-shield-check" /> Verified
          </span>
        </div>
        <button type="button" className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-rose-500 transition-colors">
          <i className="fa-regular fa-heart" />
        </button>
      </div>
        <div className="p-4 sm:p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-3">
          <img src={display.avatar} alt={display.author} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" />
          <span className="text-sm text-slate-500">by <span className="text-slate-800 font-medium">{display.author}</span></span>
        </div>
        <h3 className={`text-xl font-bold text-slate-800 mb-2 ${display.titleHover} transition-colors line-clamp-2`}>{display.title}</h3>
        <p className="text-slate-500 text-sm mb-6 line-clamp-2">{display.description}</p>
        <div className="mt-auto space-y-4">
          <div>
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span className="text-emerald-600">${display.raised.toLocaleString()} raised</span>
              <span className="text-slate-400">{display.percent}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full relative overflow-hidden" style={{ width: `${display.percent}%` }}>
                {display.percent === 83 && <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />}
              </div>
            </div>
            <div className="mt-1 text-xs text-slate-400 text-right">Goal: ${display.goal.toLocaleString()}</div>
          </div>
          <button type="button" className="w-full py-3 rounded-xl border-2 border-emerald-100 text-emerald-700 font-bold hover:bg-emerald-50 hover:border-emerald-200 transition-all active:scale-[0.98]">Donate Now</button>
        </div>
      </div>
    </article>
    </Link>
  );
}
