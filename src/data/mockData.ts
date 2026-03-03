export interface Donation {
  id: string;
  transactionId: string;
  campaignId: number;
  campaign: string;
  amount: number;
  userId: string;
  donorName: string;
  donorAvatar?: string;
  date: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
  verified: boolean;
}

export const mockDonations: Donation[] = [
  { id: '1', transactionId: 'TXN-2024-001', campaignId: 1, campaign: 'Urgent Heart Surgery', amount: 50, userId: '1', donorName: 'John Donor', donorAvatar: 'https://i.pravatar.cc/150?u=donor', date: '2024-02-18', timestamp: '2024-02-18T14:32:00Z', status: 'completed', verified: true },
  { id: '2', transactionId: 'TXN-2024-002', campaignId: 2, campaign: 'Tech Lab for Rural School', amount: 100, userId: '1', donorName: 'John Donor', donorAvatar: 'https://i.pravatar.cc/150?u=donor', date: '2024-02-15', timestamp: '2024-02-15T09:15:00Z', status: 'completed', verified: true },
  { id: '3', transactionId: 'TXN-2024-003', campaignId: 3, campaign: 'Community Solar Project', amount: 25, userId: '1', donorName: 'John Donor', donorAvatar: 'https://i.pravatar.cc/150?u=donor', date: '2024-02-10', timestamp: '2024-02-10T16:45:00Z', status: 'completed', verified: true },
  { id: '4', transactionId: 'TXN-2024-004', campaignId: 1, campaign: 'Urgent Heart Surgery', amount: 75, userId: '2', donorName: 'Sarah M.', donorAvatar: 'https://i.pravatar.cc/150?u=44', date: '2024-02-17', timestamp: '2024-02-17T11:20:00Z', status: 'completed', verified: true },
  { id: '5', transactionId: 'TXN-2024-005', campaignId: 2, campaign: 'Tech Lab for Rural School', amount: 200, userId: '2', donorName: 'Sarah M.', donorAvatar: 'https://i.pravatar.cc/150?u=44', date: '2024-02-16', timestamp: '2024-02-16T08:30:00Z', status: 'completed', verified: false },
  { id: '6', transactionId: 'TXN-2024-006', campaignId: 1, campaign: 'Urgent Heart Surgery', amount: 30, userId: '1', donorName: 'John Donor', donorAvatar: 'https://i.pravatar.cc/150?u=donor', date: '2024-02-14', timestamp: '2024-02-14T13:00:00Z', status: 'completed', verified: true },
];

export const mockUsers = [
  { id: '1', name: 'John Donor', email: 'john@example.com', role: 'donor', joined: '2024-01-15', status: 'active' },
  { id: '2', name: 'Jane Fundraiser', email: 'fundraiser@example.com', role: 'fundraiser', joined: '2024-02-01', status: 'active' },
  { id: '3', name: 'Admin User', email: 'admin@example.com', role: 'admin', joined: '2024-01-01', status: 'active' },
];

export const mockChartData = [
  { name: 'Mon', donations: 12, amount: 450 },
  { name: 'Tue', donations: 19, amount: 620 },
  { name: 'Wed', donations: 15, amount: 380 },
  { name: 'Thu', donations: 22, amount: 910 },
  { name: 'Fri', donations: 18, amount: 720 },
  { name: 'Sat', donations: 25, amount: 1100 },
  { name: 'Sun', donations: 14, amount: 550 },
];

export const mockCampaignUpdates = [
  { id: '1', text: 'Surgery scheduled for next week. Thank you all!', date: '2024-02-17' },
  { id: '2', text: 'We reached 80% of our goal. Amazing support!', date: '2024-02-14' },
];

export function getDonationsByCampaign(campaignId: number): Donation[] {
  return mockDonations.filter((d) => d.campaignId === campaignId).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export function getDonationsByUser(userId: string): Donation[] {
  return mockDonations.filter((d) => d.userId === userId).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export function formatTimestamp(ts: string): string {
  const d = new Date(ts);
  return d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}

export interface LiveDonation {
  id: string;
  donorName: string;
  donorAvatar?: string;
  amount: number;
  campaign: string;
  campaignId?: number;
  timeAgo: string;
}

/** Mock live donations for real-time ticker (WebSocket-ready) */
export const mockLiveDonations: LiveDonation[] = [
  { id: 'L1', donorName: 'Alex M.', donorAvatar: 'https://i.pravatar.cc/150?u=alex', amount: 50, campaign: 'Urgent Heart Surgery', campaignId: 1, timeAgo: 'Just now' },
  { id: 'L2', donorName: 'Sarah K.', donorAvatar: 'https://i.pravatar.cc/150?u=sarah', amount: 100, campaign: 'Tech Lab for Rural School', campaignId: 2, timeAgo: '1m ago' },
  { id: 'L3', donorName: 'Mike T.', donorAvatar: 'https://i.pravatar.cc/150?u=mike', amount: 25, campaign: 'Community Solar Project', campaignId: 3, timeAgo: '2m ago' },
  { id: 'L4', donorName: 'Anonymous', amount: 150, campaign: 'Urgent Heart Surgery', campaignId: 1, timeAgo: '3m ago' },
  { id: 'L5', donorName: 'Emma L.', donorAvatar: 'https://i.pravatar.cc/150?u=emma', amount: 75, campaign: 'Save Shelter Dogs', campaignId: 4, timeAgo: '4m ago' },
  { id: 'L6', donorName: 'James R.', donorAvatar: 'https://i.pravatar.cc/150?u=james', amount: 200, campaign: 'Community Mural Project', campaignId: 5, timeAgo: '5m ago' },
];
