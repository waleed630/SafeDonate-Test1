import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { campaigns } from '../data/campaigns';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Modal } from '../components/ui/Modal';
import { LiveBadge } from '../components/live/LiveBadge';
import { OnlineViewers } from '../components/live/OnlineViewers';
import { LiveDonationTicker } from '../components/live/LiveDonationTicker';
import { mockCampaignUpdates, getDonationsByCampaign, formatTimestamp } from '../data/mockData';
import { useRealtime } from '../contexts/RealtimeContext';
import { CampaignComments } from '../components/campaign/CampaignComments';

export function CampaignDetailsPage() {
  const { id } = useParams();
  const realtime = useRealtime();
  const campaignFromData = campaigns.find((c) => c.id === Number(id)) || campaigns[0];
  const progressOverride = realtime.getProgressOverride(campaignFromData.id);
  const campaign = useMemo(() => {
    if (!progressOverride) return campaignFromData;
    return { ...campaignFromData, raised: progressOverride.raised, goal: progressOverride.goal, percent: progressOverride.percent };
  }, [campaignFromData, progressOverride]);
  const viewerCount = realtime.connected ? realtime.getViewerCount(campaign.id) : 12;
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState(25);
  const [donationSuccess, setDonationSuccess] = useState(false);

  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto">
      <Link to="/campaigns" className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-2 mb-6">
        <i className="fa-solid fa-arrow-left" /> Back to campaigns
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative rounded-2xl overflow-hidden shadow-sm border border-slate-100">
            <img src={campaign.image} alt={campaign.title} className="w-full h-64 sm:h-80 object-cover" />
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <LiveBadge />
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${campaign.categoryBadge} bg-white/90`}>
                <i className={`fa-solid ${campaign.categoryIcon} mr-1`} /> {campaign.category}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">{campaign.title}</h1>
            <div className="flex items-center gap-3 mb-6">
              <img src={campaign.avatar} alt={campaign.author} className="w-12 h-12 rounded-full border-2 border-white shadow" />
              <div>
                <p className="font-semibold text-slate-800">by {campaign.author}</p>
                <p className="text-sm text-slate-500">Campaign organizer</p>
              </div>
            </div>
            <p className="text-slate-600 leading-relaxed">{campaign.description}</p>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <h3 className="font-semibold text-slate-900 mb-4">Recent Donations</h3>
              <div className="space-y-3 mb-6">
                {getDonationsByCampaign(campaign.id).slice(0, 5).map((d) => (
                  <div key={d.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                    <div className="flex items-center gap-3">
                      <img src={d.donorAvatar || 'https://i.pravatar.cc/150'} alt="" className="w-8 h-8 rounded-full" />
                      <div>
                        <p className="font-medium text-slate-800 text-sm">{d.donorName}</p>
                        <p className="text-xs text-slate-500">{formatTimestamp(d.timestamp)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-emerald-600">${d.amount}</span>
                      {d.verified && (
                        <span className="text-emerald-500" title="Verified">
                          <i className="fa-solid fa-shield-check text-xs" />
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <h3 className="font-semibold text-slate-900 mb-4">Campaign Updates</h3>
              <div className="space-y-4">
                {mockCampaignUpdates.map((u) => (
                  <div key={u.id} className="p-4 bg-slate-50 rounded-xl">
                    <p className="text-slate-700">{u.text}</p>
                    <p className="text-xs text-slate-500 mt-2">{u.date}</p>
                  </div>
                ))}
              </div>
            </div>

            <CampaignComments campaignId={campaign.id} organizerName={campaign.author} />
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <div className="mb-6">
                <div className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
                  <span className="text-emerald-600">${campaign.raised.toLocaleString()} raised</span>
                  <span>of ${campaign.goal.toLocaleString()}</span>
                </div>
                <ProgressBar value={campaign.percent} showLabel size="md" />
              </div>
              <OnlineViewers count={viewerCount > 0 ? viewerCount : 12} className="mb-6" />
              <p className="text-slate-500 text-sm mb-6">{getDonationsByCampaign(campaign.id).length} donors</p>
            <button
              onClick={() => setShowDonateModal(true)}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-600/20 transition-colors"
            >
              Donate Now
            </button>
            <button className="w-full mt-3 py-3 border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors">
              <i className="fa-regular fa-heart mr-2" /> Save
            </button>
            </div>
            <LiveDonationTicker variant="campaign" campaignId={campaign.id} maxItems={5} />
          </div>
        </div>
      </div>

      <Modal isOpen={showDonateModal} onClose={() => { setShowDonateModal(false); setDonationSuccess(false); }} title={donationSuccess ? 'Donation Successful' : 'Make a Donation'} size="md">
        <div className="space-y-6">
          {donationSuccess ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto mb-4">
                <i className="fa-solid fa-check text-2xl" />
              </div>
              <p className="font-semibold text-slate-800 mb-2">Thank you for your donation!</p>
              <p className="text-slate-600 text-sm mb-4">Your ${donationAmount} contribution to {campaign.title} is complete.</p>
              <Link to="/donor/donation-history" className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center justify-center gap-2">
                <i className="fa-solid fa-receipt" /> View receipt in Donation History
              </Link>
            </div>
          ) : (
            <>
          <p className="text-slate-600">Support {campaign.title}</p>
          <div className="grid grid-cols-4 gap-2">
            {[25, 50, 100, 250].map((amt) => (
              <button
                key={amt}
                onClick={() => setDonationAmount(amt)}
                className={`py-2 rounded-lg font-medium transition-colors ${
                  donationAmount === amt ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                ${amt}
              </button>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Custom amount ($)</label>
            <input
              type="number"
              value={donationAmount}
              onChange={(e) => setDonationAmount(Number(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
          <div className="border-t border-slate-100 pt-4 space-y-2">
            <button
              onClick={() => setDonationSuccess(true)}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl"
            >
              Donate ${donationAmount}
            </button>
            <p className="text-xs text-slate-500 text-center">Secure payment powered by Stripe (mock)</p>
          </div>
          </>
          )}
        </div>
      </Modal>
    </div>
  );
}
