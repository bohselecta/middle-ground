'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const navigation = [
  {
    name: 'My Work',
    href: '/my-work',
    icon: '🪷',
    description: 'Your patterns and reflections',
  },
  {
    name: 'Plan & Align',
    href: '/plan',
    icon: '💬',
    description: 'Agree on a method, together',
  },
  {
    name: 'AI Assistants',
    href: '/ai',
    icon: '🤖',
    description: 'AI planning partner and workers',
  },
  {
    name: 'Team Overview',
    href: '/team',
    icon: '🌡️',
    description: 'Team trends and suggestions',
  },
  {
    name: 'Kudos & Wins',
    href: '/kudos',
    icon: '🎉',
    description: 'Wins and appreciation',
  },
  {
    name: 'Settings & Privacy',
    href: '/settings',
    icon: '⚙️',
    description: 'Controls and integrations',
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
