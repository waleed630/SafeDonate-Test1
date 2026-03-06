import { Link } from 'react-router-dom';

const categories = [
  { icon: 'fa-heart-pulse', label: 'Medical', bg: 'bg-emerald-50', text: 'text-emerald-600', hoverBg: 'group-hover:bg-emerald-600', hoverText: 'group-hover:text-emerald-700' },
  { icon: 'fa-graduation-cap', label: 'Education', bg: 'bg-blue-50', text: 'text-blue-600', hoverBg: 'group-hover:bg-blue-600', hoverText: 'group-hover:text-blue-700' },
  { icon: 'fa-paw', label: 'Animals', bg: 'bg-amber-50', text: 'text-amber-600', hoverBg: 'group-hover:bg-amber-600', hoverText: 'group-hover:text-amber-700' },
  { icon: 'fa-house-chimney-crack', label: 'Disaster', bg: 'bg-rose-50', text: 'text-rose-600', hoverBg: 'group-hover:bg-rose-600', hoverText: 'group-hover:text-rose-700' },
  { icon: 'fa-palette', label: 'Creative', bg: 'bg-purple-50', text: 'text-purple-600', hoverBg: 'group-hover:bg-purple-600', hoverText: 'group-hover:text-purple-700' },
  { icon: 'fa-leaf', label: 'Environment', bg: 'bg-teal-50', text: 'text-teal-600', hoverBg: 'group-hover:bg-teal-600', hoverText: 'group-hover:text-teal-700' },
];

const campaigns = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Medical',
    categoryIcon: 'fa-heart-pulse',
    categoryBadge: 'text-emerald-700',
    titleHover: 'group-hover:text-emerald-700',
    avatar: 'https://i.pravatar.cc/150?u=12',
    author: 'Sarah Mitchell',
    title: 'Urgent Heart Surgery for Little Leo',
    description: 'Leo was born with a congenital heart defect. We need your help to fund his life-saving surgery scheduled for next month.',
    raised: 12450,
    goal: 15000,
    percent: 83,
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Education',
    categoryIcon: 'fa-book-open',
    categoryBadge: 'text-blue-700',
    titleHover: 'group-hover:text-blue-700',
    avatar: 'https://i.pravatar.cc/150?u=44',
    author: 'David Kim',
    title: 'Tech Lab for Rural High School',
    description: 'Help us provide 50 laptops and coding resources to underprivileged students in rural districts to bridge the digital divide.',
    raised: 5200,
    goal: 11500,
    percent: 45,
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/414928/pexels-photo-414928.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Environment',
    categoryIcon: 'fa-leaf',
    categoryBadge: 'text-teal-700',
    titleHover: 'group-hover:text-teal-700',
    avatar: 'https://i.pravatar.cc/150?u=88',
    author: 'Green Earth Org',
    title: 'Community Solar Power Project',
    description: 'Installing solar panels on the community center roof to reduce carbon footprint and energy costs for local non-profits.',
    raised: 28900,
    goal: 30000,
    percent: 96,
  },
  {
    id: 4,
    image: 'https://images.pexels.com/photos/1667843/pexels-photo-1667843.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Animals',
    categoryIcon: 'fa-paw',
    categoryBadge: 'text-amber-700',
    titleHover: 'group-hover:text-amber-700',
    avatar: 'https://i.pravatar.cc/150?u=22',
    author: 'Animal Rescue Co',
    title: 'Save Shelter Dogs This Winter',
    description: 'We need funds for heated shelters, food, and medical care for 200 dogs at our rescue center during the cold months.',
    raised: 8900,
    goal: 20000,
    percent: 45,
  },
  {
    id: 5,
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Creative',
    categoryIcon: 'fa-palette',
    categoryBadge: 'text-purple-700',
    titleHover: 'group-hover:text-purple-700',
    avatar: 'https://i.pravatar.cc/150?u=55',
    author: 'Arts Collective',
    title: 'Community Mural Project',
    description: 'Bringing local artists together to paint a 100ft mural celebrating our neighborhood heritage and diversity.',
    raised: 15000,
    goal: 18000,
    percent: 83,
  },
];

export function LandingPage() {
  return (
    <>
      <section id="section-hero" className="relative min-h-[500px] sm:h-[600px] md:h-[650px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/3656066/pexels-photo-3656066.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Happy family outdoors"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-900/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl w-full px-4 sm:px-6 md:px-8 pt-8 sm:pt-12">
          <div className="max-w-2xl space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-sm text-emerald-100 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Over $10M raised this month
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight drop-shadow-lg">
              Empower Dreams,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200">Fund the Future.</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-200 leading-relaxed max-w-xl drop-shadow-md">
              Join a global community of changemakers. Whether it&apos;s medical emergencies, creative projects, or community causes, your contribution sparks real change.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-4">
              <button
                type="button"
                className="group relative px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-emerald-500/40 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Donate Now
                  <i className="fa-solid fa-heart text-sm group-hover:animate-bounce" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              <Link
                to="/fundraiser/create-campaign"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold rounded-xl transition-all duration-300 hover:-translate-y-1 inline-block"
              >
                Start Campaign
              </Link>
            </div>

            <div className="pt-6 sm:pt-8 flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-300 font-medium">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-shield-halved text-emerald-400" />
                Verified Charities
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-lock text-emerald-400" />
                Secure Payments
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-globe text-emerald-400" />
                Global Reach
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-20 -mt-12 sm:-mt-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="text-center space-y-1">
            <p className="text-3xl font-bold text-slate-800">2.5M+</p>
            <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Donors</p>
          </div>
          <div className="text-center space-y-1 pt-4 md:pt-0">
            <p className="text-3xl font-bold text-emerald-600">$140M+</p>
            <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Funds Raised</p>
          </div>
          <div className="text-center space-y-1 pt-4 md:pt-0">
            <p className="text-3xl font-bold text-slate-800">150k+</p>
            <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Campaigns</p>
          </div>
          <div className="text-center space-y-1 pt-4 md:pt-0">
            <p className="text-3xl font-bold text-slate-800">100%</p>
            <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Transparency</p>
          </div>
        </div>
      </div>

      <section id="section-categories" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Browse by Category</h2>
            <p className="text-slate-500 mt-1">Find causes that matter to you</p>
          </div>
          <Link to="/campaigns" className="text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-2 transition-colors">
            View all <i className="fa-solid fa-arrow-right text-sm" />
          </Link>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-6 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {categories.map((cat) => (
            <a
              key={cat.label}
              href="#"
              className={`group flex-shrink-0 w-40 flex flex-col items-center gap-3 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300`}
            >
              <div className={`w-14 h-14 rounded-full ${cat.bg} ${cat.text} flex items-center justify-center text-xl ${cat.hoverBg} group-hover:text-white transition-colors duration-300`}>
                <i className={`fa-solid ${cat.icon}`} />
              </div>
              <span className={`font-semibold text-slate-700 ${cat.hoverText}`}>{cat.label}</span>
            </a>
          ))}
        </div>
      </section>

      <section id="section-featured" className="py-8 sm:py-10 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto bg-slate-50 pb-16 sm:pb-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Featured Campaigns</h2>
            <p className="text-slate-500 mt-2">Urgent causes needing your immediate support</p>
          </div>
          <div className="flex gap-2">
            <button type="button" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-white hover:shadow-sm transition-all">
              <i className="fa-solid fa-chevron-left" />
            </button>
            <button type="button" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-white hover:shadow-sm transition-all">
              <i className="fa-solid fa-chevron-right" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {campaigns.slice(0, 3).map((campaign) => (
            <article
              key={campaign.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className={`absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold ${campaign.categoryBadge} shadow-sm`}>
                  <i className={`fa-solid ${campaign.categoryIcon} mr-1`} /> {campaign.category}
                </div>
                <button type="button" className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-rose-500 transition-colors">
                  <i className="fa-regular fa-heart" />
                </button>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <img src={campaign.avatar} alt={campaign.author} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" />
                  <span className="text-sm text-slate-500">
                    by <span className="text-slate-800 font-medium">{campaign.author}</span>
                  </span>
                </div>

                <h3 className={`text-xl font-bold text-slate-800 mb-2 ${campaign.titleHover} transition-colors line-clamp-2`}>
                  {campaign.title}
                </h3>
                <p className="text-slate-500 text-sm mb-6 line-clamp-2">{campaign.description}</p>

                <div className="mt-auto space-y-4">
                  <div>
                    <div className="flex justify-between text-sm font-semibold mb-2">
                      <span className="text-emerald-600">${campaign.raised.toLocaleString()} raised</span>
                      <span className="text-slate-400">{campaign.percent}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full relative overflow-hidden"
                        style={{ width: `${campaign.percent}%` }}
                      >
                        {campaign.percent === 83 && (
                          <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
                        )}
                      </div>
                    </div>
                    <div className="mt-1 text-xs text-slate-400 text-right">Goal: ${campaign.goal.toLocaleString()}</div>
                  </div>

                  <button
                    type="button"
                    className="w-full py-3 rounded-xl border-2 border-emerald-100 text-emerald-700 font-bold hover:bg-emerald-50 hover:border-emerald-200 transition-all active:scale-[0.98]"
                  >
                    Donate Now
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/campaigns"
            className="inline-block px-8 py-3 bg-white border border-slate-200 text-slate-600 font-semibold rounded-lg hover:bg-slate-50 hover:text-emerald-600 transition-colors shadow-sm"
          >
            See All Campaigns
          </Link>
        </div>
      </section>

      <section className="bg-emerald-900 text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-800/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-800/30 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4" />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
              Trusted by millions.
              <br />
              <span className="text-emerald-300">Built for impact.</span>
            </h2>
            <p className="text-emerald-100 text-lg leading-relaxed">
              SafeDonate ensures your generosity reaches those who need it most. With our SafeGive Guarantee, every donation is protected, verified, and transparent.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-800 flex items-center justify-center flex-shrink-0 text-emerald-300">
                  <i className="fa-solid fa-check text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Verified Fundraisers</h4>
                  <p className="text-emerald-200/80 text-sm">Every campaign undergoes a strict 5-step verification process.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-800 flex items-center justify-center flex-shrink-0 text-emerald-300">
                  <i className="fa-solid fa-bolt text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Direct Payouts</h4>
                  <p className="text-emerald-200/80 text-sm">Funds are sent directly to beneficiaries, not intermediaries.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/fundraiser/create-campaign"
                className="inline-block px-8 py-4 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold rounded-xl shadow-lg shadow-amber-900/20 transition-all duration-200 hover:-translate-y-1"
              >
                Start Your Fundraiser
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-emerald-500/20 rounded-2xl blur-lg" />
            <div className="relative w-full h-64 bg-emerald-800/30 rounded-2xl flex items-center justify-center">
              <i className="fa-solid fa-shield-halved text-6xl text-emerald-400/50" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
