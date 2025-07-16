import type { TRequirement } from '@/app/types';
import { Amount } from '@/components/layouts/amount';
import { Checkbox } from '@/components/ui/checkbox';
import { CollapsibleTrigger } from '@/components/ui/collapsible';
import { TableCell, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import type { CheckedState } from '@radix-ui/react-checkbox';
import { X } from 'lucide-react';

type Props = { item: TRequirement };

export function TempleReqItem({ item }: Props) {
  return (
    <>
      <CollapsibleTrigger asChild>
        <TableRow
          className={cn(
            // !isAvailable && 'cursor-pointer py-1 text-muted-foreground'
          )}
        >
          <TableCell>
            <div className="flex items-center">
              {/* <ActionIcon
                handleClick={handleClick}
                isActive={isActive}
                isAvailable={isAvailable}
              /> */}
              {/* {profile?.is_admin && <EditButton item={item} />} */}
            </div>
          </TableCell>

          <TableCell className="font-medium">{item.item_name}</TableCell>
          <TableCell className="text-right">{item.quantity ?? 'TBD'}</TableCell>
          <TableCell className="text-right">
            <div className="flex items-center justify-end">
              <Amount amount={item.amount} className="font-normal text-base" />
              {/* {item?.bookings?.length ? (
                <ChevronDown className="size-3 text-muted-foreground" />
              ) : (
                <Dot className="size-3 text-muted-foreground" />
              )} */}
            </div>
          </TableCell>
        </TableRow>
      </CollapsibleTrigger>

      {/* {item.bookings.length > 0 && (
        <CollapsibleContent asChild>
          <BookingDetails
            bookings={item.bookings}
            price={item.price}
            year={year}
          />
        </CollapsibleContent>
      )} */}
    </>
  );
}

const ActionIcon = ({
  isAvailable,
  handleClick,
  isActive,
}: {
  isActive: boolean;
  isAvailable: boolean;
  handleClick: (checked: CheckedState) => void;
}) => {
  if (isAvailable)
    return (
      <Checkbox
        disabled={!isActive}
        onCheckedChange={(checked) => handleClick(checked)}
      />
    );
  return <X className="size-5 translate-x-[3px] text-destructive" />;
};

// const EditButton = ({ item }: { item: TRequirement }) => {
//   return (
//     <Modal
//       content={<AnnadaanItemForm item={item} />}
//       title="Edit Annadaan Item"
//     >
//       <Button size={'icon'} variant={'ghost'}>
//         <Pen className="size-4 text-muted-foreground" />
//       </Button>
//     </Modal>
//   );
// };
