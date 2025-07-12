import { SignInOutButton } from '@/components/auth/sign-out-btn';
import { Crown } from 'lucide-react';
import Link from 'next/link';
import { MobileNav } from './mobile-nav';
import { NavLink } from './navlink';
import { ThemeToggle } from './theme-toggle';

export function Navbar() {
  return (
    <header className="sticky inset-x-0 top-0 z-[99] mb-8 bg-background">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 shadow-lg">
        <Link className="flex items-center gap-1" href={'/'}>
          <Crown className="size-6" />
          <span className="font-bold text-lg">KP Events</span>
        </Link>
        <div className="hidden items-center justify-end lg:flex">
          <NavLink href={'/'} title="Home" />
          <NavLink href={'/events'} title="Events" />
          <NavLink href={'/temple'} title="Temple" />
          <NavLink href={'/admin'} title="Admin" />

          <ThemeToggle />
          <SignInOutButton />
        </div>
        <MobileNav />
      </nav>
    </header>
  );
}
