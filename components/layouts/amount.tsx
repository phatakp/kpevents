import { amountFormatter, cn } from '@/lib/utils';
import { IndianRupee } from 'lucide-react';

type Props = { amount: number; className?: string; containerClass?: string };

export function Amount({ amount, className, containerClass }: Props) {
  return (
    <div className={cn('flex items-center justify-end', containerClass)}>
      <IndianRupee className="size-3.5 text-muted-foreground" />
      <span className={cn('font-semibold text-2xl tabular-nums', className)}>
        {amountFormatter(amount)}
      </span>
    </div>
  );
}
