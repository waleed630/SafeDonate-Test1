import { campaigns } from '../../data/campaigns';

const PENDING_CAMPAIGNS = campaigns.slice(0, 2);

export function CampaignVerificationPage() {
  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Campaign Verification</h1>
      <p className="text-slate-500 mb-8">Review and approve pending campaigns</p>

      <div className="space-y-6">
        {PENDING_CAMPAIGNS.map((c) => (
          <div key={c.id} className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <img src={c.image} alt="" className="md:w-48 h-48 object-cover" />
              <div className="flex-1 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-slate-900">{c.title}</h3>
                    <p className="text-sm text-slate-500">by {c.author}</p>
                    <p className="text-slate-600 mt-2 text-sm">{c.description}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button className="px-4 py-2 rounded-lg bg-emerald-100 text-emerald-700 font-medium hover:bg-emerald-200 transition-colors">
                      Approve
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-rose-100 text-rose-700 font-medium hover:bg-rose-200 transition-colors">
                      Reject
                    </button>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <span className="inline-flex items-center gap-1 text-amber-600 text-sm">
                    <i className="fa-solid fa-clock" /> Pending review
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
