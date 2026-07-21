import { Amount } from "@/components/shared/amount";
import { AnimatedList, AnimatedListItem } from "@/components/ui/animated-list";
import { Badge } from "@/components/ui/badge";

import { TXN_MODE } from "@/lib/constants";
import { cn, getUserInfo } from "@/lib/utils";
import { Route } from "@/routes/transactions.$committee.$type.$year";
import type { Transaction } from "@/types";
import { TxnActions } from "./txn-actions";

type Props = {
    txns: Transaction[];
};
export function DonationList({ txns }: Props) {
    const { type, year } = Route.useParams();
    const { query, donationType, building = "A" } = Route.useSearch();

    if (txns.length === 0)
        return (
            <span className="title text-sm md:text-xl">
                No {type}s found{" "}
                {query
                    ? `for ${query}`
                    : building
                      ? `for ${building} building in ${year}`
                      : `in ${year}`}
            </span>
        );

    return (
        <AnimatedList>
            {txns.map((txn) => {
                return (
                    <AnimatedListItem key={txn.id}>
                        <div className="grid grid-cols-12 w-full border-b pb-2 items-center">
                            <TxnActions txn={txn} />
                            <div
                                className={cn(
                                    "flex flex-col gap-2 col-span-7",
                                    donationType
                                        ? " md:col-span-5"
                                        : " md:col-span-4",
                                )}
                            >
                                <div className="flex items-center gap-1">
                                    <span className="text-xs md:text-sm truncate capitalize">
                                        {txn.description?.toLowerCase() ??
                                            txn.donation?.donorName?.toLowerCase()}
                                    </span>
                                    {txn.donation?.flat && (
                                        <span className="md:hidden text-xs md:text-sm bg-muted text-muted-foreground rounded-lg px-2 py-1">
                                            {txn.donation?.building}-
                                            {txn.donation?.flat}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {txn.donation?.flat && (
                                <span className="hidden md:inline-flex text-xs md:text-sm bg-muted text-muted-foreground rounded-lg px-2 py-1 w-fit">
                                    {txn.donation?.building}-
                                    {txn.donation?.flat}
                                </span>
                            )}

                            <span className="text-left text-xs md:text-sm capitalize text-muted-foreground md:inline-flex md:col-span-3 hidden">
                                {`${getUserInfo(txn.txnUser)}`}
                            </span>

                            <Badge
                                variant={
                                    txn.txnMode === TXN_MODE.CASH
                                        ? "destructive"
                                        : "secondary"
                                }
                                className="hidden md:inline-flex rounded-lg"
                            >
                                {txn.txnMode}
                            </Badge>

                            <div className="flex items-center justify-end col-span-4 md:col-span-2 pr-2">
                                <Amount
                                    amount={txn.amount}
                                    iconClass="size-3 md:size-4"
                                    className={cn(
                                        "text-base md:text-xl text-muted-foreground",
                                    )}
                                />
                            </div>

                            <TxnActions txn={txn} isMobile />
                            <span className="text-left text-xs capitalize text-muted-foreground md:hidden col-span-11 col-start-2">
                                {`Receiver: ${getUserInfo(txn.txnUser)}`}
                            </span>
                        </div>
                    </AnimatedListItem>
                );
            })}
        </AnimatedList>
    );
}
