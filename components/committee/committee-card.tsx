import type { TCommittee, TMemberWithProfile } from '@/app/types';
import { amountFormatter } from '@/lib/utils';
import { isLoggedInProfile } from '@/server/actions/auth.actions';
import {
  getAllCommitteeMembers,
  getCommitteeBalance,
  getCommitteeMember,
} from '@/server/actions/committee.actions';
import { getAllEventsByCommittee } from '@/server/actions/event.actions';
import { IndianRupee } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { JoinCommitteeBtn } from './join-committee-btn';

type Props = {
  name: TCommittee;
};

export async function CommitteeCard({ name }: Props) {
  let member: TMemberWithProfile | undefined | null = null;
  const { data: balance } = await getCommitteeBalance({ committee: name });
  const { data: members } = await getAllCommitteeMembers({ committee: name });
  const { data } = await isLoggedInProfile();
  const { data: events } = await getAllEventsByCommittee({ committee: name });
  if (data?.profile?.id) {
    const { data: mem } = await getCommitteeMember({
      committee: name,
      member_id: data.profile.id,
    });

    member = mem;
  }

  return (
    <div className="w-full *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-secondary/20 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
      <Card>
        <CardHeader>
          <CardDescription>Total Balance</CardDescription>
          <CardTitle>
            <div className="flex items-center font-semibold text-2xl">
              <IndianRupee className="size-4 text-muted-foreground" />
              {amountFormatter(balance ?? 0)}
            </div>
          </CardTitle>
          <CardAction>
            {data?.profile?.id && member?.is_active && (
              <Badge variant={'success'}>You are a member</Badge>
            )}
            {data?.profile?.id && !member && (
              <JoinCommitteeBtn committee={name} userId={data.profile.id} />
            )}
            {data?.profile?.id && member && !member.is_active && (
              <Badge variant={'destructive'}>Membership request sent</Badge>
            )}
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <span className="font-semibold text-muted-foreground">
              Committee Members
            </span>
            <div className="mt-4 grid items-center gap-1">
              {members?.map((m) => (
                <li className="text-sm capitalize" key={m.member_id}>
                  {m.user.name} ({m.user.building}/{m.user.flat})
                </li>
              ))}
            </div>
          </div>
        </CardContent>
        {member?.is_active && (
          <CardFooter>
            <div className="flex w-full flex-col">
              <span className="font-semibold text-muted-foreground">
                Events Planned
              </span>
              <div className="flex flex-col">
                {events?.map((e) =>
                  e.is_active ? (
                    <li
                      className="flex items-center justify-between"
                      key={e.slug}
                    >
                      <Button asChild className="p-0" variant={'link'}>
                        <Link
                          className="text-sm capitalize"
                          href={`/events/${e.type}/${e.year}`}
                        >
                          {e.type}-{e.year}{' '}
                          <span className="text-muted-foreground underline">
                            (Visit Now)
                          </span>
                        </Link>
                      </Button>
                    </li>
                  ) : null
                )}
              </div>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
