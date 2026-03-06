import { Link } from 'react-router-dom';
import { campaigns } from '../data/campaigns';

const myCampaigns = campaigns.slice(0, 2);

export function FundraiserDashboardPage() {
  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Fundraiser Dashboard</h1>
          <p className="text-slate-500 mt-2">Manage your campaigns and track progress</p>
          <div className="flex flex-wrap gap-2 mt-4">
            <Link to="/fundraiser/my-campaigns" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">My Campaigns</Link>
            <span className="text-slate-300">•</span>
            <Link to="/fundraiser/messages" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">Messages</Link>
            <span className="text-slate-300">•</span>
            <Link to="/fundraiser/notifications" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">Notifications</Link>
            <span className="text-slate-300">•</span>
            <Link to="/fundraiser/profile" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">Profile</Link>
          </div>
        </div>
        <Link
          to="/fundraiser/create-campaign"
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20"
        >
          <i className="fa-solid fa-plus" />
          Create Campaign
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
              <i className="fa-solid fa-rocket text-xl" />
            </div>
            <span className="text-sm font-medium text-slate-500">Active Campaigns</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">2</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
              <i className="fa-solid fa-coins text-xl" />
            </div>
            <span className="text-sm font-medium text-slate-500">Total Raised</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">$17,650</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
              <i className="fa-solid fa-users text-xl" />
            </div>
            <span className="text-sm font-medium text-slate-500">Supporters</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">89</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
              <i className="fa-solid fa-chart-line text-xl" />
            </div>
            <span className="text-sm font-medium text-slate-500">Avg. Progress</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">64%</p>
        </div>
      </div>

      {/* My Campaigns */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-6">Your Campaigns</h2>
        <div className="space-y-6">
          {myCampaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-64 h-48 md:h-auto flex-shrink-0">
                  <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 p-4 sm:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${campaign.categoryBadge} mb-2`}>{campaign.category}</span>
                    <h3 className="text-lg font-bold text-slate-800">{campaign.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                      <span className="text-emerald-600 font-semibold">${campaign.raised.toLocaleString()} raised</span>
                      <span>{campaign.percent}% of goal</span>
                    </div>
                    <div className="mt-2 h-2 w-full max-w-xs bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${campaign.percent}%` }} />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <button type="button" className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors">
                      Edit
                    </button>
                    <button type="button" className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors">
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
