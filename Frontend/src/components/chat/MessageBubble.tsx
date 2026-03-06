interface MessageBubbleProps {
  message: string;
  isOwn: boolean;
  sender?: string;
  time?: string;
}

export function MessageBubble({ message, isOwn, sender, time }: MessageBubbleProps) {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[75%] sm:max-w-[85%] rounded-2xl px-4 py-2.5 ${
          isOwn ? 'bg-emerald-600 text-white rounded-br-md' : 'bg-slate-100 text-slate-800 rounded-bl-md'
        }`}
      >
        {sender && !isOwn && <p className="text-xs font-medium text-emerald-600 mb-0.5">{sender}</p>}
        <p className="text-sm whitespace-pre-wrap break-words">{message}</p>
        {time && <p className={`text-[10px] mt-1 ${isOwn ? 'text-emerald-200' : 'text-slate-400'}`}>{time}</p>}
      </div>
    </div>
  );
}
