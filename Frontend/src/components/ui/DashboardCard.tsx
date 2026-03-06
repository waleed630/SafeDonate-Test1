interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: string;
  iconBg?: string;
  iconColor?: string;
  subtitle?: string;
  trend?: { value: number; positive: boolean };
  className?: string;
}

export function DashboardCard({
  title,
  value,
  icon,
  iconBg = 'bg-emerald-100',
  iconColor = 'text-emerald-600',
  subtitle,
  trend,
  className = '',
}: DashboardCardProps) {
  return (
    <div
      className={`bg-white rounded-xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-slate-800">{value}</p>
          {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
          {trend && (
            <span
              className={`inline-flex items-center gap-1 mt-2 text-sm font-medium ${
                trend.positive ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              <i className={`fa-solid fa-arrow-${trend.positive ? 'up' : 'down'} text-xs`} />
              {Math.abs(trend.value)}%
            </span>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center text-xl`}>
          <i className={`fa-solid ${icon}`} />
        </div>
      </div>
    </div>
  );
}
