'use client';

import { SignInOutButton } from '@/components/auth/sign-out-btn';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useAuthContext } from '@/lib/providers/auth-provider';
import { cn } from '@/lib/utils';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export function MobileNav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const { user, profile } = useAuthContext();

  return (
    <div className="md:hidden">
      <Drawer direction="top" onOpenChange={setOpen} open={open}>
        <DrawerTrigger>
          <MenuIcon className="size-4" />
        </DrawerTrigger>
        <DrawerContent className="absolute inset-0">
          <DrawerHeader>
            <DrawerTitle>KP Events</DrawerTitle>
          </DrawerHeader>
          <div className="grid w-full place-items-center gap-12 py-12">
            <Link
              className={cn(
                'mx-auto font-bold text-4xl',
                path.includes('events') && 'text-primary'
              )}
              href={`/events/ganpati/${new Date().getFullYear()}`}
              onClick={() => setOpen(false)}
            >
              Events
            </Link>

            <Link
              className={cn(
                'mx-auto font-bold text-4xl',
                path.includes('temple') && 'text-primary'
              )}
              href={'/temple/collections'}
              onClick={() => setOpen(false)}
            >
              Temple
            </Link>

            {profile?.is_admin && (
              <Link
                className={cn(
                  'mx-auto font-bold text-4xl',
                  path === '/admin' && 'text-primary'
                )}
                href={'/admin'}
                onClick={() => setOpen(false)}
              >
                Admin
              </Link>
            )}

            <SignInOutButton setOpen={setOpen} />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
