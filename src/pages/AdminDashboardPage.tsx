import { Link } from 'react-router-dom';
import { campaigns } from '../data/campaigns';
import { mockDonations, formatTimestamp } from '../data/mockData';

export function AdminDashboardPage() {
  const pendingCampaigns = campaigns.slice(0, 3);
  const recentDonations = mockDonations.slice(0, 5).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Admin Panel</h1>
        <p className="text-slate-500 mt-2">Manage campaigns and platform oversight</p>
        <div className="flex flex-wrap gap-2 mt-4">
          <Link to="/admin/users" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">Manage Users</Link>
          <span className="text-slate-300">•</span>
          <Link to="/admin/campaigns" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">Manage Campaigns</Link>
          <span className="text-slate-300">•</span>
          <Link to="/admin/verification" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">Verification</Link>
          <span className="text-slate-300">•</span>
          <Link to="/admin/fraud" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">Fraud Monitoring</Link>
          <span className="text-slate-300">•</span>
          <Link to="/admin/analytics" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">Analytics</Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
              <i className="fa-solid fa-clock-rotate-left text-xl" />
            </div>
            <span className="text-sm font-medium text-slate-500">Pending Review</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">3</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
              <i className="fa-solid fa-check-circle text-xl" />
            </div>
            <span className="text-sm font-medium text-slate-500">Active Campaigns</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">142</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
              <i className="fa-solid fa-user-group text-xl" />
            </div>
            <span className="text-sm font-medium text-slate-500">Total Users</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">2,458</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
              <i className="fa-solid fa-flag text-xl" />
            </div>
            <span className="text-sm font-medium text-slate-500">Reports</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">2</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Pending Campaigns */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-800">Campaigns Pending Review</h2>
            <p className="text-sm text-slate-500 mt-1">Verify and approve new campaigns</p>
          </div>
          <div className="divide-y divide-slate-100">
            {pendingCampaigns.map((campaign) => (
              <div key={campaign.id} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <img src={campaign.image} alt="" className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-800 truncate">{campaign.title}</p>
                    <p className="text-sm text-slate-500">by {campaign.author}</p>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button type="button" className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-700 text-sm font-medium hover:bg-emerald-200 transition-colors">
                    Approve
                  </button>
                  <button type="button" className="px-3 py-1.5 rounded-lg bg-rose-100 text-rose-700 text-sm font-medium hover:bg-rose-200 transition-colors">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Donations */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-800">Recent Donations</h2>
            <p className="text-sm text-slate-500 mt-1">Latest platform activity</p>
          </div>
          <div className="divide-y divide-slate-100">
            {recentDonations.map((d) => (
              <div key={d.id} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50/50 transition-colors">
                <div className="min-w-0">
                  <p className="font-semibold text-slate-800">{d.donorName} donated ${d.amount}</p>
                  <p className="text-sm text-slate-500 truncate">to {d.campaign}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{formatTimestamp(d.timestamp)}</p>
                </div>
                <span className="flex items-center gap-1 flex-shrink-0">
                  {d.verified && <span className="text-emerald-500" title="Verified"><i className="fa-solid fa-shield-check text-xs" /></span>}
                  <span className="text-xs text-slate-400">{d.transactionId}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
