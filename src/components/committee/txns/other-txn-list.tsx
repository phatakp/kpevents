import { format } from "date-fns";
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
export function OtherTxnList({ txns }: Props) {
    const { type, year } = Route.useParams();
    const { query } = Route.useSearch();

    if (txns.length === 0)
        return (
            <span className="title text-lg">
                No {type}s found{" "}
                {query ? `for ${query} in ${year}` : `in ${year}`}
            </span>
        );

    const dateWiseTxns = Object.groupBy(txns, (txn) => txn.date);

    return (
        <AnimatedList>
            {Object.entries(dateWiseTxns).map(([date, txns]) => (
                <div className="flex flex-col gap-4 py-4">
                    <Badge className="rounded-sm" variant={"secondary"}>
                        {format(new Date(date), "PP")}
                    </Badge>
                    {txns?.map((txn) => {
                        const description = txn.description
                            ?.toLowerCase()
                            .replace("received from", "");
                        return (
                            <AnimatedListItem key={txn.id}>
                                <div className="grid grid-cols-12 w-full border-b pb-2 items-center">
                                    <TxnActions txn={txn} />

                                    <div className="flex flex-col gap-2 col-span-7 md:col-span-5 truncate">
                                        <span className="text-left text-sm truncate capitalize">
                                            {description}
                                        </span>
                                    </div>

                                    <span className="text-left text-xs md:text-sm capitalize text-muted-foreground md:inline-flex col-span-3 hidden">
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
                                            amount={
                                                type === "expense"
                                                    ? txn.amount * -1
                                                    : txn.amount
                                            }
                                            iconClass="size-3 md:size-4"
                                            className={cn(
                                                "text-base md:text-xl text-muted-foreground",
                                            )}
                                        />
                                    </div>

                                    <TxnActions txn={txn} isMobile />
                                    <span className="text-left text-xs capitalize text-muted-foreground w-full md:hidden col-span-11 col-start-2">
                                        {`Receiver: ${getUserInfo(txn.txnUser)}`}
                                    </span>
                                </div>
                            </AnimatedListItem>
                        );
                    })}
                </div>
            ))}
        </AnimatedList>
    );
}
