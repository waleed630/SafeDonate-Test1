import { Link } from 'react-router-dom';

export function AboutPage() {
  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8">About SafeDonate</h1>
      <div className="prose prose-slate max-w-none space-y-6">
        <p className="text-slate-600 leading-relaxed text-lg">
          SafeDonate is a secure crowdfunding platform built to empower changemakers. We combine transparency, AI-powered
          fraud detection, and real-time tracking to ensure every donation reaches those who need it most.
        </p>
        <div className="grid sm:grid-cols-2 gap-6 mt-10">
          <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
              <i className="fa-solid fa-shield-halved text-xl" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Verified Campaigns</h3>
            <p className="text-slate-600 text-sm">Every campaign undergoes strict verification to protect donors.</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
              <i className="fa-solid fa-chart-line text-xl" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Transparent Tracking</h3>
            <p className="text-slate-600 text-sm">Real-time updates on how funds are used and distributed.</p>
          </div>
        </div>
        <div className="pt-8">
          <Link to="/campaigns" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors">
            Browse Campaigns <i className="fa-solid fa-arrow-right" />
          </Link>
        </div>
      </div>
    </div>
  );
}
