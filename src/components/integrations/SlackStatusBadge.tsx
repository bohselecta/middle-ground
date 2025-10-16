import SlackIcon from '@/components/icons/SlackIcon'

export default function SlackStatusBadge({ connected }: { connected: boolean }){
  return (
    <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs shadow-soft ${connected ? 'bg-mint/70' : 'bg-white/70'}`}>
      <SlackIcon className="h-3.5 w-3.5" />
      <span className="text-slate-700">{connected ? 'Slack connected' : 'Slack not connected'}</span>
    </div>
  )
}
