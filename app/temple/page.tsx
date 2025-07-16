import { PaymentTabs } from '@/components/collections/payment-tabs';
import { ReceiverTotals } from '@/components/collections/receiver-totals';
import Background from '@/components/layouts/background';
import { ReceiverLoader } from '@/components/layouts/receiver-loader';
import { Skeleton } from '@/components/ui/skeleton';
import { isCommitteeMember } from '@/server/actions/committee.actions';
import { Suspense } from 'react';

export default async function TemplePage() {
  const { data: isMember } = await isCommitteeMember({
    committee: 'temple',
  });

  return (
    <Background className="items-start justify-start">
      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-4xl">Society Temple</h1>
        <Suspense fallback={<TabsLoader />}>
          <PaymentTabs
            committee="temple"
            isMember={!!isMember}
            type="temple"
            year={new Date().getFullYear()}
          />
        </Suspense>
        {isMember && (
          <Suspense fallback={<ReceiverLoader />}>
            <ReceiverTotals committee="temple" />
          </Suspense>
        )}
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
