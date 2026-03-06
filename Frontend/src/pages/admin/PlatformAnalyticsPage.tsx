import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartCard } from '../../components/ui/ChartCard';
import { DashboardCard } from '../../components/ui/DashboardCard';
import { mockChartData } from '../../data/mockData';

export function PlatformAnalyticsPage() {
  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Platform Analytics</h1>
      <p className="text-slate-500 mb-8">Platform-wide metrics and trends</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DashboardCard title="Total Donations" value="$2.4M" icon="fa-hand-holding-dollar" trend={{ value: 12, positive: true }} />
        <DashboardCard title="Active Campaigns" value="142" icon="fa-rocket" iconBg="bg-blue-100" iconColor="text-blue-600" />
        <DashboardCard title="Total Users" value="12,458" icon="fa-users" iconBg="bg-amber-100" iconColor="text-amber-600" />
        <DashboardCard title="Success Rate" value="94%" icon="fa-chart-pie" iconBg="bg-purple-100" iconColor="text-purple-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Weekly Donations" subtitle="Amount raised per day">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Bar dataKey="amount" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Donation Count Trend" subtitle="Number of donations per day">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Bar dataKey="donations" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
