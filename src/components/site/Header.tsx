import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-mark.svg"
            alt="Tablature"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="text-base font-semibold tracking-tight text-slate-900">
            Tablature
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-slate-700">
          <Link className="hover:opacity-80" href="/">Home</Link>
          <Link className="hover:opacity-80" href="/demo">Demo</Link>
          <Link className="hover:opacity-80" href="/about">About</Link>
          <Link className="hover:opacity-80" href="/privacy">Privacy</Link>
        </nav>
      </div>
    </header>
  );
}
