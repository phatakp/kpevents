import { useSuspenseQuery } from "@tanstack/react-query";
import { txnsOptions } from "@/api/queries/txn.queries";
import { Amount } from "@/components/shared/amount";
import { AnimatedList, AnimatedListItem } from "@/components/ui/animated-list";
import {
    DONATION_TYPE,
    ROUTE_SUB_TYPE,
    TXN_TYPE,
    USER_ROLE,
} from "@/lib/constants";
import { cn, getUserInfo } from "@/lib/utils";
import { Route } from "@/routes/$committee.$subType.$year";
import type { Committee } from "@/types";
import { TxnActions } from "../txns/txn-actions";

export function ItemBookingContent() {
    const { committee, subType, year } = Route.useParams();
    const { auth } = Route.useRouteContext();
    const { page = 0 } = Route.useSearch();
    const { data: pageResp } = useSuspenseQuery({
        ...txnsOptions({
            committee: committee.toUpperCase() as Committee,
            txnType: TXN_TYPE.DONATION,
            year: year,
            building: undefined,
            donationType:
                subType === ROUTE_SUB_TYPE.ANNADAAN
                    ? DONATION_TYPE.ANNADAAN
                    : DONATION_TYPE.TEMPLE_ITEM,
        }),
    });

    if (auth.role !== USER_ROLE.ADMIN) return null;

    if (pageResp?.totalElements === 0)
        return (
            <span className="title text-sm md:text-xl">
                No bookings found {`in ${year}`}
            </span>
        );

    const start = page === 0 ? 0 : page * 10;
    const end = start + 10;

    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-12 items-center w-full bg-secondary text-secondary-foreground rounded-md py-2 text-sm font-semibold">
                <span className="hidden md:flex ps-4">Act</span>
                <span className={cn("col-start-2 col-span-6 md:col-span-5")}>
                    Donor Name
                </span>
                <span className="hidden md:flex">Flat</span>
                <span className="hidden md:flex md:col-span-3">Receiver</span>
                <span className="col-span-5 md:col-span-2 text-right pr-4">
                    Amount
                </span>
            </div>
            <AnimatedList>
                {pageResp?.data.slice(start, end).map((txn) => (
                    <AnimatedListItem key={txn.id}>
                        <div className="grid grid-cols-12 w-full border-b pb-2 items-center text-sm">
                            <TxnActions txn={txn} isBooking />
                            <div
                                className={cn(
                                    "flex flex-col gap-2 col-start-2 col-span-7 md:col-span-5",
                                )}
                            >
                                <div className="flex items-center gap-1">
                                    <span
                                        className={cn(
                                            "text-xs md:text-sm truncate capitalize",
                                        )}
                                    >
                                        {txn.donation?.donorName?.toLowerCase()}
                                    </span>
                                    {txn.donation?.flat && (
                                        <span className="md:hidden text-xs bg-muted text-muted-foreground rounded-lg px-2 py-1">
                                            {txn.donation?.building}-
                                            {txn.donation?.flat}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <span className="hidden md:flex">
                                {txn.donation?.building}-{txn.donation?.flat}
                            </span>

                            <span className="hidden md:flex md:col-span-3 capitalize">
                                {getUserInfo(txn.txnUser)}
                            </span>

                            <div className="col-span-4 md:col-span-2 text-right pr-4">
                                <Amount
                                    amount={txn.amount}
                                    iconClass="size-3 md:size-4"
                                    className={cn(
                                        "text-base md:text-xl text-muted-foreground",
                                    )}
                                />
                            </div>

                            <TxnActions txn={txn} isMobile isBooking />
                            <span className="text-left text-xs capitalize text-muted-foreground md:hidden col-span-11 col-start-2">
                                {`Receiver: ${getUserInfo(txn.txnUser)}`}
                            </span>
                        </div>
                    </AnimatedListItem>
                ))}
            </AnimatedList>
        </div>
    );
}
