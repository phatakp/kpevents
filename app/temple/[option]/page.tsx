import { ReceiverTotals } from '@/components/collections/receiver-totals';
import { TempleTabs } from '@/components/events/temple/temple-tabs';
import Background from '@/components/layouts/background';
import { ReceiverLoader } from '@/components/layouts/receiver-loader';
import { Skeleton } from '@/components/ui/skeleton';
import { getQueryClient } from '@/lib/react-query/get-query-client';
import { allTempleReqOptions } from '@/query-options/temple';
import { isCommitteeMember } from '@/server/actions/committee.actions';
import { Suspense } from 'react';

type PageProps = {
  params: Promise<{ option: 'collections' | 'payments' | 'requirements' }>;
};

export default async function TemplePage({ params }: PageProps) {
  const { option } = await params;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(allTempleReqOptions());
  const { data: isMember } = await isCommitteeMember({
    committee: 'temple',
  });

  return (
    <Background className="items-start justify-start">
      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-4xl">Society Temple</h1>
        <Suspense fallback={<TabsLoader />}>
          <TempleTabs defaultOption={option} />
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
