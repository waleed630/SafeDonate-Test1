import { useParams, Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartCard } from '../../components/ui/ChartCard';
import { DashboardCard } from '../../components/ui/DashboardCard';
import { mockChartData } from '../../data/mockData';

export function CampaignAnalyticsPage() {
  const { id } = useParams();

  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
      <Link to="/fundraiser/my-campaigns" className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-2 mb-6">
        <i className="fa-solid fa-arrow-left" /> Back to My Campaigns
      </Link>
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Campaign Analytics</h1>
      <p className="text-slate-500 mb-8">Campaign #{id || '1'}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DashboardCard title="Total Raised" value="$12,450" icon="fa-hand-holding-dollar" />
        <DashboardCard title="Donors" value="234" icon="fa-users" iconBg="bg-blue-100" iconColor="text-blue-600" />
        <DashboardCard title="Shares" value="89" icon="fa-share-nodes" iconBg="bg-amber-100" iconColor="text-amber-600" />
        <DashboardCard title="Avg. Donation" value="$53" icon="fa-chart-pie" iconBg="bg-purple-100" iconColor="text-purple-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Donation Trends" subtitle="Last 7 days">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                formatter={(value) => [`$${Number(value)}`, 'Amount']}
              />
              <Line type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Donation Count" subtitle="Daily donations">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Line type="monotone" dataKey="donations" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
