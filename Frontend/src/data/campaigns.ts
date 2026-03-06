export const categories = [
  { id: 'medical', icon: 'fa-heart-pulse', label: 'Medical', badge: 'text-emerald-700', hover: 'group-hover:text-emerald-700' },
  { id: 'education', icon: 'fa-graduation-cap', label: 'Education', badge: 'text-blue-700', hover: 'group-hover:text-blue-700' },
  { id: 'animals', icon: 'fa-paw', label: 'Animals', badge: 'text-amber-700', hover: 'group-hover:text-amber-700' },
  { id: 'disaster', icon: 'fa-house-chimney-crack', label: 'Disaster', badge: 'text-rose-700', hover: 'group-hover:text-rose-700' },
  { id: 'creative', icon: 'fa-palette', label: 'Creative', badge: 'text-purple-700', hover: 'group-hover:text-purple-700' },
  { id: 'environment', icon: 'fa-leaf', label: 'Environment', badge: 'text-teal-700', hover: 'group-hover:text-teal-700' },
];

export interface Campaign {
  id: number;
  image: string;
  category: string;
  categoryIcon: string;
  categoryBadge: string;
  titleHover: string;
  avatar: string;
  author: string;
  title: string;
  description: string;
  raised: number;
  goal: number;
  percent: number;
}

export const campaigns: Campaign[] = [
  { id: 1, image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Medical', categoryIcon: 'fa-heart-pulse', categoryBadge: 'text-emerald-700', titleHover: 'group-hover:text-emerald-700', avatar: 'https://i.pravatar.cc/150?u=12', author: 'Sarah Mitchell', title: 'Urgent Heart Surgery for Little Leo', description: 'Leo was born with a congenital heart defect. We need your help to fund his life-saving surgery scheduled for next month.', raised: 12450, goal: 15000, percent: 83 },
  { id: 2, image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Education', categoryIcon: 'fa-book-open', categoryBadge: 'text-blue-700', titleHover: 'group-hover:text-blue-700', avatar: 'https://i.pravatar.cc/150?u=44', author: 'David Kim', title: 'Tech Lab for Rural High School', description: 'Help us provide 50 laptops and coding resources to underprivileged students in rural districts.', raised: 5200, goal: 11500, percent: 45 },
  { id: 3, image: 'https://images.pexels.com/photos/414928/pexels-photo-414928.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Environment', categoryIcon: 'fa-leaf', categoryBadge: 'text-teal-700', titleHover: 'group-hover:text-teal-700', avatar: 'https://i.pravatar.cc/150?u=88', author: 'Green Earth Org', title: 'Community Solar Power Project', description: 'Installing solar panels on the community center roof to reduce carbon footprint.', raised: 28900, goal: 30000, percent: 96 },
  { id: 4, image: 'https://images.pexels.com/photos/1667843/pexels-photo-1667843.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Animals', categoryIcon: 'fa-paw', categoryBadge: 'text-amber-700', titleHover: 'group-hover:text-amber-700', avatar: 'https://i.pravatar.cc/150?u=22', author: 'Animal Rescue Co', title: 'Save Shelter Dogs This Winter', description: 'Funds for heated shelters, food, and medical care for 200 dogs at our rescue center.', raised: 8900, goal: 20000, percent: 45 },
  { id: 5, image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Creative', categoryIcon: 'fa-palette', categoryBadge: 'text-purple-700', titleHover: 'group-hover:text-purple-700', avatar: 'https://i.pravatar.cc/150?u=55', author: 'Arts Collective', title: 'Community Mural Project', description: 'Bringing local artists together to paint a 100ft mural celebrating our heritage.', raised: 15000, goal: 18000, percent: 83 },
];
