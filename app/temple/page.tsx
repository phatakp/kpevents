import { PaymentTabs } from '@/components/collections/payment-tabs';
import { ReceiverTotals } from '@/components/collections/receiver-totals';
import Background from '@/components/layouts/background';
import { DefaultPage } from '@/components/layouts/default-page';
import { NotAuthenticated } from '@/components/layouts/not-authenticated';
import { NotMember } from '@/components/layouts/not-member';
import { ReceiverLoader } from '@/components/layouts/receiver-loader';
import { Skeleton } from '@/components/ui/skeleton';
import { isLoggedInProfile } from '@/server/actions/auth.actions';
import { getCommitteeMember } from '@/server/actions/committee.actions';
import { Suspense } from 'react';

export default async function TemplePage() {
  const { data } = await isLoggedInProfile();
  if (!data?.profile?.id) return <NotAuthenticated />;

  const { data: member } = await getCommitteeMember({
    committee: 'temple',
    member_id: data.profile.id,
  });
  if (!member) return <NotMember userId={data.profile.id} />;

  if (!member.is_active)
    return <DefaultPage message="Your membership request is pending" />;

  return (
    <Background>
      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-4xl">Society Temple</h1>
        <Suspense fallback={<TabsLoader />}>
          <PaymentTabs committee="temple" type="temple" />
        </Suspense>
        <Suspense fallback={<ReceiverLoader />}>
          <ReceiverTotals committee="temple" />
        </Suspense>
      </div>
    </Background>
  );
}

function TabsLoader() {
  return (
    <div className="flex items-center">
      <Skeleton className="h-10 w-24" />
      <Skeleton className="h-10 w-24" />
    </div>
  );
}
