import { amountFormatter } from '@/lib/utils';
import { IndianRupee } from 'lucide-react';

type Props = { amount: number };

export function Amount({ amount }: Props) {
  return (
    <div className="flex items-center">
      <IndianRupee className="size-4 text-muted-foreground" />
      <span className="font-semibold text-2xl">{amountFormatter(amount)}</span>
    </div>
  );
}
