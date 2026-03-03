import { Link } from 'react-router-dom';
import { campaigns } from '../data/campaigns';
import { CampaignCard } from '../components/CampaignCard';

const featuredIds = [1, 2, 3];
const featuredCampaigns = campaigns.filter((c) => featuredIds.includes(c.id));

export function FeaturedCampaignsPage() {
  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
          <i className="fa-solid fa-star" />
          Hand-picked by our team
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Featured Campaigns</h1>
        <p className="text-slate-500 mt-2">Urgent causes needing your immediate support</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {featuredCampaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link to="/campaigns" className="inline-block px-8 py-3 bg-white border border-slate-200 text-slate-600 font-semibold rounded-lg hover:bg-slate-50 hover:text-emerald-600 transition-colors shadow-sm">
          Browse All Campaigns
        </Link>
      </div>
    </div>
  );
}
