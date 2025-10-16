import SlackIcon from '@/components/icons/SlackIcon'

export default function IntegrationCard({
  title,
  desc,
  cta,
  onClick,
  icon = <SlackIcon className="h-5 w-5" />,
  disabled = false,
}: {
  title: string
  desc: string
  cta: string
  onClick?: () => void
  icon?: React.ReactNode
  disabled?: boolean
}) {
  return (
    <div className="rounded-2xl bg-white/70 p-4 shadow-soft">
      <div className="flex items-start gap-3">
        <div className="mt-1">{icon}</div>
        <div>
          <div className="text-base font-medium text-slate-900">{title}</div>
          <div className="mt-1 text-sm text-slate-600">{desc}</div>
        </div>
      </div>
      <div className="mt-4">
        <button
          disabled={disabled}
          onClick={onClick}
          className={`rounded-xl px-3 py-2 text-sm ${disabled ? 'bg-slate-200 text-slate-500' : 'bg-ink text-white'}`}
        >
          {cta}
        </button>
      </div>
    </div>
  )
}
