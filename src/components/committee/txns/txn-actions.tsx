import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { USER_ROLE } from "@/lib/constants";
import { Route } from "@/routes/__root";
import type { Transaction } from "@/types";
import { TxnButton } from "./txn-button";

type Props = {
    txn: Transaction;
    isBooking?: boolean;
};

export function TxnActions({ txn, isBooking }: Props) {
    const [open, setOpen] = useState(false);
    const { auth } = Route.useRouteContext();

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" size={"icon-sm"} type="button">
                    {open ? (
                        <ChevronUp />
                    ) : (
                        <ChevronDown className="text-muted-foreground" />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full feature-card">
                <div className="flex items-center gap-4">
                    <TxnButton
                        txn={txn}
                        committee={txn.committee}
                        year={txn.year}
                        donationType={txn.donation?.type}
                        isBooking={isBooking}
                        isViewOnly
                    />
                    <TxnButton
                        txn={txn}
                        committee={txn.committee}
                        year={txn.year}
                        donationType={txn.donation?.type}
                        isBooking={isBooking}
                    />

                    {auth.role === USER_ROLE.ADMIN && (
                        <TxnButton
                            txn={txn}
                            committee={txn.committee}
                            year={txn.year}
                            donationType={txn.donation?.type}
                            isDelete
                            isBooking={isBooking}
                        />
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}
