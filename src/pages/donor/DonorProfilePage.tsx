import { useAuth } from '../../contexts/AuthContext';

export function DonorProfilePage() {
  const { user } = useAuth();

  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 md:px-8 max-w-2xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">Profile Settings</h1>

      <div className="space-y-6">
        <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <img
              src={user?.avatar || 'https://i.pravatar.cc/150'}
              alt={user?.name}
              className="w-20 h-20 rounded-full border-2 border-slate-100"
            />
            <div>
              <h3 className="font-semibold text-slate-900">{user?.name}</h3>
              <p className="text-slate-500">{user?.email}</p>
              <span className="inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-700">
                Donor
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
              <input
                type="text"
                defaultValue={user?.name}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input
                type="email"
                defaultValue={user?.email}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4">Notification Preferences</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-slate-700">Email notifications</span>
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-emerald-600" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-slate-700">Campaign updates</span>
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-emerald-600" />
            </label>
          </div>
        </div>

        <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
}
