interface ProgressBarProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  size?: 'sm' | 'md';
  className?: string;
  barClassName?: string;
}

export function ProgressBar({
  value,
  max = 100,
  showLabel = false,
  size = 'md',
  className = '',
  barClassName = 'bg-emerald-500',
}: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  const height = size === 'sm' ? 'h-1.5' : 'h-2';

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
          <span>{percent.toFixed(0)}%</span>
        </div>
      )}
      <div className={`w-full ${height} bg-slate-100 rounded-full overflow-hidden`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ${barClassName}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
