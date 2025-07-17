import type { TCommittee, TMemberWithProfile } from '@/app/types';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { amountFormatter, cn } from '@/lib/utils';
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
import { buttonVariants } from '../ui/button';
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
    <div className="w-[350px] *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-secondary/20 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
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
          {members && members.length > 0 && (
            <Table>
              <TableCaption>A list of committee members</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] text-muted-foreground">
                    Member Name
                  </TableHead>
                  <TableHead className="text-right text-muted-foreground">
                    Flat
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members?.map((m) => (
                  <TableRow key={m.member_id}>
                    <TableCell className="font-medium">{m.user.name}</TableCell>
                    <TableCell className="text-right">
                      {m.user.building}-{m.user.flat}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
        {member?.is_active && (
          <CardFooter>
            {events && events.length > 0 && (
              <Table>
                <TableCaption>A list of planned events</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] text-muted-foreground">
                      Event Name
                    </TableHead>
                    <TableHead className="text-right text-muted-foreground">
                      Link
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((e) => (
                    <TableRow key={e.slug}>
                      <TableCell className="font-medium capitalize">
                        {e.slug}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link
                          className={cn(
                            buttonVariants({ variant: 'link' }),
                            'h-auto p-0'
                          )}
                          href={`/events/${e.type}/${e.year}`}
                        >
                          Visit Now
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
