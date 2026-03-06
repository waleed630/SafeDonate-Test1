export function FundraiserNotificationsPage() {
  const notifications = [
    { id: '1', type: 'donation', title: 'New donation!', message: 'John donated $50 to Urgent Heart Surgery.', time: '1 hour ago', read: false },
    { id: '2', type: 'campaign', title: 'Campaign verified', message: 'Your campaign has been approved by our team.', time: '2 days ago', read: true },
  ];

  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 md:px-8 max-w-2xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Notifications</h1>
      <p className="text-slate-500 mb-8">Campaign and donation updates</p>

      <div className="space-y-4">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded-xl border transition-colors ${
              n.read ? 'bg-white border-slate-100' : 'bg-emerald-50/50 border-emerald-100'
            }`}
          >
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                <i className="fa-solid fa-bell" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800">{n.title}</p>
                <p className="text-sm text-slate-600">{n.message}</p>
                <p className="text-xs text-slate-400 mt-1">{n.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
