import type { TEventType } from '@/app/types';
import { amountFormatter, slugify } from '@/lib/utils';
import { getTotalCollectionsBySlug } from '@/server/actions/booking.actions';
import { IndianRupee } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';

type Props = { type: TEventType; year: number };

export async function TotalCollections({ type, year }: Props) {
  const { data } = await getTotalCollectionsBySlug({
    slug: `${slugify(type)}-${year}`,
  });

  return (
    <Card className="my-4 w-full max-w-sm">
      <CardHeader>
        <CardDescription>Overall Collections</CardDescription>
        <CardTitle>
          <div className="flex items-center font-bold text-2xl">
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
            {amountFormatter(data?.total ?? 0)}
            {type === 'ganpati' && (
              <span className="ml-2 text-muted-foreground text-sm">
                (Mahaprasad Count: {data?.totalQty ?? 0})
              </span>
            )}
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
