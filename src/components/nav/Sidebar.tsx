'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const navigation = [
  {
    name: 'My Flow Map',
    href: '/(dashboard)/my-flow',
    icon: '🪷',
    description: 'Personal rhythm & insights',
  },
  {
    name: 'Alignment Canvas',
    href: '/(dashboard)/alignment',
    icon: '💬',
    description: 'Intent meets method',
  },
  {
    name: 'Team Pulse',
    href: '/(dashboard)/team-pulse',
    icon: '🌡️',
    description: 'Team climate overview',
  },
  {
    name: 'Culture Moments',
    href: '/(dashboard)/culture',
    icon: '🎉',
    description: 'Celebrations & wins',
  },
  {
    name: 'Settings & Privacy',
    href: '/(dashboard)/settings',
    icon: '⚙️',
    description: 'Privacy controls',
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex w-64 flex-col bg-white/70 backdrop-blur border-r border-white/60">
      {/* Logo */}
      <div className="flex h-16 items-center px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-mark.svg"
            alt="Tablature"
            width={28}
            height={28}
            className="h-7 w-7"
          />
          <span className="text-lg font-semibold tracking-tight text-slate-900">
            Tablature
          </span>
        </Link>
      </div>

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
