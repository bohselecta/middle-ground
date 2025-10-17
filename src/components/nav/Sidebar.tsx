'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const navigation = [
  {
    name: 'My Flow Map',
    href: '/my-flow',
    icon: '🪷',
    description: 'Personal rhythm & insights',
  },
  {
    name: 'Alignment Canvas',
    href: '/alignment',
    icon: '💬',
    description: 'Intent meets method',
  },
  {
    name: 'AI Team',
    href: '/ai-team',
    icon: '🤖',
    description: 'AI managers & workers',
  },
  {
    name: 'Team Pulse',
    href: '/team-pulse',
    icon: '🌡️',
    description: 'Team climate overview',
  },
  {
    name: 'Culture Moments',
    href: '/culture',
    icon: '🎉',
    description: 'Celebrations & wins',
  },
  {
    name: 'Settings & Privacy',
    href: '/settings',
    icon: '⚙️',
    description: 'Privacy controls',
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex w-64 flex-col bg-white/70 backdrop-blur border-r border-white/60">
      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                'group flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition-all',
                isActive
                  ? 'bg-mint text-slate-900 shadow-soft'
                  : 'text-slate-600 hover:bg-white/70 hover:text-slate-900 hover:shadow-soft'
              )}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              <div className="flex-1">
                <div className="font-medium">{item.name}</div>
                <div className="text-xs opacity-70">{item.description}</div>
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/60 p-4">
        <div className="text-xs text-slate-500">
          <div className="font-medium text-slate-700">Coordinate the work.</div>
          <div>Stay aligned.</div>
        </div>
      </div>
    </div>
  )
}
