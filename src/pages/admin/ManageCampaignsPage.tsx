import { campaigns } from '../../data/campaigns';
import { ProgressBar } from '../../components/ui/ProgressBar';

export function ManageCampaignsPage() {
  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Manage Campaigns</h1>
      <p className="text-slate-500 mb-8">Oversee all platform campaigns</p>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Campaign</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Organizer</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Progress</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr key={c.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <img src={c.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                      <p className="font-medium text-slate-800">{c.title}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-slate-600">{c.author}</td>
                  <td className="px-4 py-4 w-32">
                    <ProgressBar value={c.percent} size="sm" />
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                      Active
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium mr-3">View</button>
                    <button className="text-rose-600 hover:text-rose-700 text-sm font-medium">Suspend</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
