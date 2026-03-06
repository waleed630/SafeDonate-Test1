import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getDonationsByUser, formatTimestamp, type Donation } from '../../data/mockData';
import { DonationReceiptModal } from '../../components/DonationReceiptModal';

export function DonationHistoryPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<'all' | 'verified'>('all');
  const [receiptDonation, setReceiptDonation] = useState<Donation | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);

  const donations = getDonationsByUser(user?.id || '1');
  const filtered = filter === 'verified' ? donations.filter((d) => d.verified) : donations;
  const verifiedCount = donations.filter((d) => d.verified).length;

  const openReceipt = (d: Donation) => {
    setReceiptDonation(d);
    setShowReceipt(true);
  };

  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Donation History</h1>
      <p className="text-slate-500 mb-4">View all your past donations</p>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'all' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          All ({donations.length})
        </button>
        <button
          onClick={() => setFilter('verified')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
            filter === 'verified' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <i className="fa-solid fa-shield-check" /> Verified ({verifiedCount})
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Campaign</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Date & Time</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Verified</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                  <td className="px-4 py-4 font-medium text-slate-800">{d.campaign}</td>
                  <td className="px-4 py-4 text-emerald-600 font-semibold">${d.amount}</td>
                  <td className="px-4 py-4 text-slate-600 text-sm">{formatTimestamp(d.timestamp)}</td>
                  <td className="px-4 py-4">
                    <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                      {d.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {d.verified ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 text-sm">
                        <i className="fa-solid fa-shield-check" /> Yes
                      </span>
                    ) : (
                      <span className="text-slate-400 text-sm">—</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => openReceipt(d)}
                      className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center gap-1"
                    >
                      <i className="fa-solid fa-receipt" /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-slate-500">
            <i className="fa-solid fa-inbox text-4xl mb-3 opacity-50" />
            <p>No donations found</p>
          </div>
        )}
      </div>

      <DonationReceiptModal isOpen={showReceipt} onClose={() => setShowReceipt(false)} donation={receiptDonation} />
    </div>
  );
}
