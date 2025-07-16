'use client';
import { useAuthContext } from '@/components/auth/auth-provider';
import { Amount } from '@/components/layouts/amount';
import { Modal } from '@/components/layouts/modal';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Collapsible } from '@/components/ui/collapsible';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { allTempleReqOptions } from '@/query-options/temple';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { AnnadaanItemForm } from '../annadaan/item-form';
import { TempleReqItem } from './item';

export function TempleReqList() {
  const { data: items, isLoading } = useQuery(allTempleReqOptions());
  const total = items?.reduce((acc, b) => acc + b.amount, 0) ?? 0;
  const { profile, isLoading: isAuthLoading } = useAuthContext();
  const isUserAdmin = !!profile?.is_admin;

  return (
    <div
      className="*:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card"
      // onSubmit={handleSubmitWithAction}
    >
      <Card className="max-w-sm sm:max-w-md md:max-w-full">
        <CardHeader>
          <CardDescription>Total Requirements</CardDescription>
          <CardTitle>
            <Amount amount={total} containerClass="justify-start" />
          </CardTitle>
          {isAuthLoading && <Skeleton className="h-10 w-32" />}
          {!isAuthLoading && isUserAdmin && (
            <CardAction>
              <Modal content={<AnnadaanItemForm />} title="Add Annadaan Item">
                <Button className="rounded-md" size={'sm'}>
                  <Plus />
                  <span className="hidden sm:flex">New Item</span>
                </Button>
              </Modal>
            </CardAction>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {/* {!form.formState.isSubmitSuccessful && <AnnadaanBookingForm />} */}
          <Table>
            <TableHeader>
              <TableRow className="bg-muted">
                <TableCell
                  className="text-lg text-muted-foreground"
                  colSpan={3}
                >
                  Total Required: ({items?.length ?? 0} items)
                </TableCell>
                <TableCell className="text-right">
                  <Amount amount={total} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Sel</TableHead>
                <TableHead className="w-fit md:w-[100px]">Item</TableHead>
                <TableHead className="text-right">Required Qty</TableHead>
                <TableHead className="text-right">Expected Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items?.map((item) => (
                <Collapsible asChild key={item.item_name}>
                  <TempleReqItem item={item} />
                </Collapsible>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
