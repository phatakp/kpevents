import { EllipsisIcon } from "lucide-react";
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
    isMobile?: boolean;
    isBooking?: boolean;
};

export function TxnActions({ txn, isMobile, isBooking }: Props) {
    const [open, setOpen] = useState(false);
    const { auth } = Route.useRouteContext();

    // if (isMobile && auth.role !== USER_ROLE.ADMIN) return;

    // if (isMobile && auth.role === USER_ROLE.ADMIN)
    //     return (
    //         <div className="md:hidden">
    //             <TxnButton
    //                 txn={txn}
    //                 committee={txn.committee}
    //                 year={txn.year}
    //                 donationType={txn.donation?.type}
    //                 isDelete
    //                 isBooking={isBooking}
    //             />
    //         </div>
    //     );

    // return (
    //     <div className="flex items-center justify-start gap-1 w-fit">
    //         <TxnButton
    //             txn={txn}
    //             committee={txn.committee}
    //             year={txn.year}
    //             donationType={txn.donation?.type}
    //             isBooking={isBooking}
    //         />
    //         <div className="md:flex hidden">
    //             {auth.role === USER_ROLE.ADMIN && (
    //                 <TxnButton
    //                     txn={txn}
    //                     committee={txn.committee}
    //                     year={txn.year}
    //                     donationType={txn.donation?.type}
    //                     isDelete
    //                     isBooking={isBooking}
    //                 />
    //             )}
    //         </div>
    //     </div>
    // );

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" size={"icon-sm"}>
                    <EllipsisIcon />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full feature-card">
                <div className="grid gap-4">
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
