export interface DiscoverCampaign {
  id: number;
  image: string;
  category: string;
  categoryId: string;
  title: string;
  description: string;
  location: string;
  raised: number;
  percent: number;
  author: string;
  authorAvatar: string;
  daysLeft: number;
  urgent?: boolean;
}

export const discoverCampaigns: DiscoverCampaign[] = [
  { id: 1, image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Education', categoryId: 'education', title: 'Tech Lab for Underprivileged Youth', description: 'Help us equip a modern computer laboratory to teach coding and digital skills to 200+ students.', location: 'Lagos, Nigeria', raised: 12450, percent: 62, author: 'Sarah J.', authorAvatar: 'https://i.pravatar.cc/150?u=1', daysLeft: 12 },
  { id: 2, image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Medical', categoryId: 'medical', title: 'Emergency Surgery for Baby Leo', description: 'Leo was born with a rare heart condition. We need your support to fund his life-saving procedure.', location: 'Chicago, USA', raised: 45100, percent: 90, author: 'Mark D.', authorAvatar: 'https://i.pravatar.cc/150?u=2', daysLeft: 2, urgent: true },
  { id: 3, image: 'https://images.pexels.com/photos/1089840/pexels-photo-1089840.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Green Energy', categoryId: 'environment', title: 'Urban Rooftop Gardens Project', description: 'Transforming unused city rooftops into sustainable community gardens to fight urban heat islands.', location: 'Berlin, Germany', raised: 8200, percent: 41, author: 'Eco Collective', authorAvatar: 'https://i.pravatar.cc/150?u=3', daysLeft: 24 },
  { id: 4, image: 'https://images.pexels.com/photos/3628100/pexels-photo-3628100.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Animals', categoryId: 'animals', title: 'Shelter Expansion for Strays', description: 'Our local shelter is at capacity. Help us build a new wing to house 50 more dogs and cats this winter.', location: 'Austin, TX', raised: 5600, percent: 28, author: 'Austin Rescue', authorAvatar: 'https://i.pravatar.cc/150?u=4', daysLeft: 18 },
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
