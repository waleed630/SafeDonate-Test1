interface OnlineViewersProps {
  count: number;
  className?: string;
}

export function OnlineViewers({ count, className = '' }: OnlineViewersProps) {
  return (
    <div className={`flex items-center gap-2 text-sm text-slate-500 ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span>
        {count} {count === 1 ? 'person' : 'people'} viewing
      </span>
    </div>
  );
}
