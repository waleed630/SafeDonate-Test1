import { DashboardCard } from '../../components/ui/DashboardCard';

export function FraudMonitoringPage() {
  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Fraud Monitoring</h1>
      <p className="text-slate-500 mb-8">AI-powered fraud detection dashboard</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DashboardCard title="Flagged Campaigns" value="2" icon="fa-flag" iconBg="bg-amber-100" iconColor="text-amber-600" />
        <DashboardCard title="Suspicious Activity" value="0" icon="fa-triangle-exclamation" iconBg="bg-rose-100" iconColor="text-rose-600" />
        <DashboardCard title="Verified Today" value="12" icon="fa-shield-halved" iconBg="bg-emerald-100" iconColor="text-emerald-600" />
        <DashboardCard title="Total Scans" value="1,458" icon="fa-magnifying-glass" iconBg="bg-blue-100" iconColor="text-blue-600" />
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">Recent Alerts</h2>
          <p className="text-sm text-slate-500 mt-1">AI-detected anomalies</p>
        </div>
        <div className="p-8 text-center text-slate-500">
          <i className="fa-solid fa-shield-check text-4xl text-emerald-200 mb-4" />
          <p>No active fraud alerts. All systems operating normally.</p>
        </div>
      </div>
    </div>
  );
}
