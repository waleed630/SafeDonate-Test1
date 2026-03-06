import { Link } from 'react-router-dom';
import { campaigns } from '../../data/campaigns';
import { ProgressBar } from '../../components/ui/ProgressBar';

const myCampaigns = campaigns.slice(0, 2);

export function MyCampaignsPage() {
  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">My Campaigns</h1>
          <p className="text-slate-500 mt-1">Manage and track your campaigns</p>
        </div>
        <Link
          to="/fundraiser/create-campaign"
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
        >
          <i className="fa-solid fa-plus" /> Create Campaign
        </Link>
      </div>

      <div className="space-y-6">
        {myCampaigns.map((c) => (
          <div key={c.id} className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-64 h-48 md:h-auto flex-shrink-0">
                <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${c.categoryBadge} mb-2`}>
                    {c.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-800">{c.title}</h3>
                  <p className="text-emerald-600 font-semibold mt-1">${c.raised.toLocaleString()} raised</p>
                  <div className="mt-2 w-full max-w-xs">
                    <ProgressBar value={c.percent} size="sm" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/fundraiser/campaigns/${c.id}/edit`}
                    className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 font-medium hover:bg-slate-50"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/fundraiser/campaigns/${c.id}/analytics`}
                    className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700"
                  >
                    Analytics
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
