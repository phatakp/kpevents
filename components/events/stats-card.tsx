import { Amount } from '@/components/layouts/amount';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type Props = {
  title: string;
  total: number;
  totalQty: number;
  showQty?: boolean;
};

export function StatsCard({ title, total, totalQty, showQty }: Props) {
  return (
    <div className="w-full max-w-sm *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-secondary/20 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs md:max-w-full dark:*:data-[slot=card]:bg-card">
      <Card>
        <CardHeader>
          <CardDescription>{title}</CardDescription>
          <CardTitle>
            <div className="flex items-center font-bold text-2xl">
              <Amount amount={total} containerClass="justify-start" />
              {showQty && (
                <span className="ml-2 text-muted-foreground text-sm">
                  (Mahaprasad Count: {totalQty})
                </span>
              )}
            </div>
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
