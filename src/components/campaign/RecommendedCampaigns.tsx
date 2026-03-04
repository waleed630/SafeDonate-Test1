import { Link } from 'react-router-dom';
import { campaigns } from '../../data/campaigns';
import { getDonationsByUser } from '../../data/mockData';
import { CampaignCard } from '../CampaignCard';
import { useAuth } from '../../contexts/AuthContext';

interface RecommendedCampaignsProps {
  title?: string;
  maxItems?: number;
  className?: string;
}

/**
 * Renders personalized or suggested campaigns.
 * If user is logged in as donor, uses donation history to prefer campaigns in categories they supported.
 * Otherwise shows a curated subset (e.g. by progress or shuffle).
 */
export function RecommendedCampaigns({
  title = 'Recommended for you',
  maxItems = 4,
  className = '',
}: RecommendedCampaignsProps) {
  const { user } = useAuth();

  let recommended = campaigns;
  if (user?.id && user.role === 'donor') {
    const donations = getDonationsByUser(user.id);
    const preferredCampaignIds = [...new Set(donations.map((d) => d.campaignId))];
    const preferredCategories = [...new Set(donations.map((d) => d.campaign))];
    const byCategory = campaigns.filter((c) =>
      preferredCategories.some((name) => name.toLowerCase().includes(c.category.toLowerCase()))
    );
    const byCampaign = campaigns.filter((c) => preferredCampaignIds.includes(c.id));
    recommended = byCategory.length > 0 ? byCategory : byCampaign.length > 0 ? byCampaign : campaigns;
  }

  const display = recommended.slice(0, maxItems);
  if (display.length === 0) return null;

  return (
    <section className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-xl font-bold text-slate-800">{title}</h3>
        <Link
          to="/campaigns"
          className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
        >
          View all <i className="fa-solid fa-arrow-right text-xs" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {display.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </section>
  );
}
