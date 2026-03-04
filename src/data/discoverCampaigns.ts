export interface DiscoverCampaign {
  id: number;
  image: string;
  category: string;
  categoryId: string;
  title: string;
  description: string;
  location: string;
  raised: number;
  goal: number;
  percent: number;
  author: string;
  authorAvatar: string;
  daysLeft: number;
  donors: number;
  createdAt: string;
  urgent?: boolean;
  tagIds?: string[];
}

export const discoverCampaigns: DiscoverCampaign[] = [
  { id: 1, image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Education', categoryId: 'education', title: 'Tech Lab for Underprivileged Youth', description: 'Help us equip a modern computer laboratory to teach coding and digital skills to 200+ students.', location: 'Lagos, Nigeria', raised: 12450, goal: 20000, percent: 62, author: 'Sarah J.', authorAvatar: 'https://i.pravatar.cc/150?u=1', daysLeft: 12, donors: 156, createdAt: '2024-02-01T10:00:00Z', tagIds: ['2', '3'] },
  { id: 2, image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Medical', categoryId: 'medical', title: 'Emergency Surgery for Baby Leo', description: 'Leo was born with a rare heart condition. We need your support to fund his life-saving procedure.', location: 'Chicago, USA', raised: 45100, goal: 50000, percent: 90, author: 'Mark D.', authorAvatar: 'https://i.pravatar.cc/150?u=2', daysLeft: 2, donors: 892, createdAt: '2024-01-15T08:30:00Z', urgent: true, tagIds: ['1', '2'] },
  { id: 3, image: 'https://images.pexels.com/photos/1089840/pexels-photo-1089840.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Green Energy', categoryId: 'environment', title: 'Urban Rooftop Gardens Project', description: 'Transforming unused city rooftops into sustainable community gardens to fight urban heat islands.', location: 'Berlin, Germany', raised: 8200, goal: 20000, percent: 41, author: 'Eco Collective', authorAvatar: 'https://i.pravatar.cc/150?u=3', daysLeft: 24, donors: 78, createdAt: '2024-02-10T14:00:00Z', tagIds: ['3'] },
  { id: 4, image: 'https://images.pexels.com/photos/3628100/pexels-photo-3628100.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Animals', categoryId: 'animals', title: 'Shelter Expansion for Strays', description: 'Our local shelter is at capacity. Help us build a new wing to house 50 more dogs and cats this winter.', location: 'Austin, TX', raised: 5600, goal: 20000, percent: 28, author: 'Austin Rescue', authorAvatar: 'https://i.pravatar.cc/150?u=4', daysLeft: 18, donors: 45, createdAt: '2024-02-12T09:00:00Z', tagIds: ['1'] },
  { id: 5, image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Creative', categoryId: 'creative', title: 'Community Mural Project', description: 'Bringing local artists together to paint a 100ft mural celebrating our neighborhood heritage.', location: 'Lagos, Nigeria', raised: 15000, goal: 18000, percent: 83, author: 'Arts Collective', authorAvatar: 'https://i.pravatar.cc/150?u=5', daysLeft: 5, donors: 234, createdAt: '2024-01-20T11:00:00Z', tagIds: ['2', '3'] },
];

export const discoverCategories = [
  { id: 'all', icon: 'fa-border-all', label: 'All Causes' },
  { id: 'medical', icon: 'fa-heart-pulse', label: 'Medical' },
  { id: 'education', icon: 'fa-graduation-cap', label: 'Education' },
  { id: 'environment', icon: 'fa-leaf', label: 'Environment' },
  { id: 'animals', icon: 'fa-paw', label: 'Animals' },
  { id: 'disaster', icon: 'fa-house-chimney', label: 'Disaster Relief' },
  { id: 'creative', icon: 'fa-palette', label: 'Creative' },
];

export const discoverLocations = [
  { id: 'all', label: 'All Locations' },
  { id: 'Lagos, Nigeria', label: 'Lagos, Nigeria' },
  { id: 'Chicago, USA', label: 'Chicago, USA' },
  { id: 'Berlin, Germany', label: 'Berlin, Germany' },
  { id: 'Austin, TX', label: 'Austin, TX' },
];

export const targetAmountRanges = [
  { id: 'all', label: 'Any', min: 0, max: Infinity },
  { id: 'under10k', label: 'Under $10k', min: 0, max: 10000 },
  { id: '10k-25k', label: '$10k - $25k', min: 10000, max: 25000 },
  { id: '25k-50k', label: '$25k - $50k', min: 25000, max: 50000 },
  { id: '50k+', label: '$50k+', min: 50000, max: Infinity },
];

export const progressRanges = [
  { id: 'all', label: 'Any', min: 0, max: 101 },
  { id: '0-25', label: '0 - 25%', min: 0, max: 25 },
  { id: '25-50', label: '25 - 50%', min: 25, max: 50 },
  { id: '50-75', label: '50 - 75%', min: 50, max: 75 },
  { id: '75-100', label: '75 - 100%', min: 75, max: 101 },
];

export type SortOption = 'newest' | 'oldest' | 'popularity' | 'most-funded';
