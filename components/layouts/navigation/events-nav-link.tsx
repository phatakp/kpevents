'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EVENT_TYPES } from '@/lib/constants';
import { slugify } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function EventsNavLink() {
  const path = usePathname();
  const isActive = path.includes('events');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={isActive ? 'link' : 'ghost'}>Events</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[999]">
        {EVENT_TYPES.filter((e) => e !== 'temple').map((e) => (
          <DropdownMenuItem asChild key={e}>
            <Button asChild variant={isActive ? 'link' : 'ghost'}>
              <Link
                className="capitalize"
                href={`/events/${slugify(e)}/${new Date().getFullYear()}`}
              >
                {e}
              </Link>
            </Button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
