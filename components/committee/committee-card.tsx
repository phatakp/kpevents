import type { TCommittee, TMemberWithProfile } from '@/app/types';
import { amountFormatter } from '@/lib/utils';
import { isLoggedInProfile } from '@/server/actions/auth.actions';
import {
  getAllCommitteeMembers,
  getCommitteeBalance,
  getCommitteeMember,
} from '@/server/actions/committee.actions';
import { IndianRupee } from 'lucide-react';
import { Badge } from '../ui/badge';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
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
          <div className="flex flex-wrap items-center gap-4">
            {members?.map((m) => (
              <Badge key={m.member_id}>
                {m.user.name} ({m.user.building}/{m.user.flat})
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
