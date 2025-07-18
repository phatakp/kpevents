'use client';
import type { TItemWithBookings } from '@/app/types';
import { Amount } from '@/components/layouts/amount';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuthContext } from '@/lib/providers/auth-provider';
import { allAnnadaanBookingOptions } from '@/query-options/annadaan';
import { eventBySlugOptions } from '@/query-options/events';
import { useQuery } from '@tanstack/react-query';
import { AnnadaanListItem } from './annadaan-list-item';
import { NewItemBtn } from './new-item-btn';

export function AnnadaanList({
  year,
  available,
}: {
  year: number;
  available?: boolean;
}) {
  const { profile } = useAuthContext();
  const { data: event, isLoading: isEventLoading } = useQuery(
    eventBySlugOptions(`annadaan-${year}`)
  );

  const { data: items, isLoading } = useQuery(allAnnadaanBookingOptions(year));

  if (isEventLoading || isLoading) return <ItemsLoader />;
  if (!event) return <Badge variant={'destructive'}>Event is not active</Badge>;

  const bookings = filteredData(items ?? [], available).sort(sortCriteria);

  const totalAvailable = bookings?.reduce((acc, b) => acc + b.amount, 0) ?? 0;

  const totalBookings =
    bookings?.reduce(
      (acc, i) =>
        acc + i.bookings.reduce((bcc, b) => bcc + b.booking_qty * i.price, 0),
      0
    ) ?? 0;

  return (
    <div className="*:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
      <Card className="">
        <CardHeader>
          <CardDescription>
            {available ? 'Total Available' : 'Total Bookings'}
          </CardDescription>
          <CardTitle>
            <Amount
              amount={available ? totalAvailable : totalBookings}
              containerClass="justify-start"
            />
          </CardTitle>
          <CardAction>
            <NewItemBtn isAdmin={!!profile?.is_admin} />
          </CardAction>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {event.is_active && available && (
                  <TableHead className="text-muted-foreground">Add</TableHead>
                )}
                {event.is_active && profile?.is_admin && !available && (
                  <TableHead className="text-muted-foreground">Del</TableHead>
                )}
                <TableHead className="w-[80px] text-muted-foreground">
                  Item
                </TableHead>
                {!available && (
                  <TableHead className="hidden text-muted-foreground text-sm md:table-cell">
                    Booked By
                  </TableHead>
                )}
                <TableHead className="hidden text-right text-muted-foreground md:table-cell">
                  {available ? 'Available Qty' : 'Booked Qty'}
                </TableHead>
                <TableHead className="text-right text-muted-foreground">
                  {available ? 'Price/unit' : 'Amount'}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings?.map((item) => (
                <AnnadaanListItem
                  available={available}
                  isEventActive={event.is_active}
                  item={item}
                  key={item.item_name}
                  year={year}
                />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function filteredData(data: TItemWithBookings[], available?: boolean) {
  if (available)
    return data.filter(
      (d) =>
        d.quantity > d?.bookings?.reduce((acc, b) => acc + b.booking_qty, 0)
    );
  return data.filter((d) => !!d?.bookings?.length);
}

function sortCriteria(a: TItemWithBookings, b: TItemWithBookings) {
  const t1 =
    a.quantity > (a?.bookings?.reduce((acc, b) => acc + b.booking_qty, 0) ?? 0)
      ? 1
      : 0;
  const t2 =
    b.quantity > (b?.bookings?.reduce((acc, b) => acc + b.booking_qty, 0) ?? 0)
      ? 1
      : 0;
  if (t1 === t2) return b.price * b.quantity < a.price * a.quantity ? -1 : 1;
  return t1 > t2 ? -1 : 1;
}

function ItemsLoader() {
  return (
    <div className="*:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
      <Card className="max-w-sm sm:max-w-md md:max-w-full">
        <CardHeader>
          <CardTitle>Total Bookings Made</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Item</TableHead>
                <TableHead className="text-right">Available Qty</TableHead>
                <TableHead className="text-right">Price/unit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...new Array(10).keys()].map((item) => (
                <TableRow key={item}>
                  <TableCell>
                    <Skeleton className="h-10 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-10 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-10 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-10 w-full" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
