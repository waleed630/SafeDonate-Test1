import { Link } from 'react-router-dom';
import { campaigns } from '../data/campaigns';
import { CampaignCard } from '../components/CampaignCard';

const myDonations = campaigns.slice(0, 2);

export function DonorDashboardPage() {
  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Donor Hub</h1>
        <p className="text-slate-500 mt-2">Track your donations and impact</p>
        <div className="flex flex-wrap gap-2 mt-4">
          <Link to="/donor/donation-history" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">Donation History</Link>
          <span className="text-slate-300">•</span>
          <Link to="/donor/messages" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">Messages</Link>
          <span className="text-slate-300">•</span>
          <Link to="/donor/notifications" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">Notifications</Link>
          <span className="text-slate-300">•</span>
          <Link to="/donor/profile" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">Profile</Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
              <i className="fa-solid fa-hand-holding-dollar text-xl" />
            </div>
            <span className="text-sm font-medium text-slate-500">Total Donated</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">$2,450</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
              <i className="fa-solid fa-heart text-xl" />
            </div>
            <span className="text-sm font-medium text-slate-500">Campaigns Backed</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">12</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
              <i className="fa-solid fa-trophy text-xl" />
            </div>
            <span className="text-sm font-medium text-slate-500">Impact Score</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">Gold</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
              <i className="fa-solid fa-bolt text-xl" />
            </div>
            <span className="text-sm font-medium text-slate-500">This Month</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">$150</p>
        </div>
      </div>

      {/* Recent Donations */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <h2 className="text-xl font-bold text-slate-900">Campaigns You&apos;ve Backed</h2>
          <Link to="/campaigns" className="text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-2">
            Discover more <i className="fa-solid fa-arrow-right text-sm" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {myDonations.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </div>
    </div>
  );
}
