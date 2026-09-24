import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { TxnButton } from "@/components/committee/txns/txn-button";
import { Amount } from "@/components/shared/amount";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { COMMITTEE, ROUTE_SUB_TYPE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Route } from "@/routes/__root";
import type { Committee, DonationType, RouteCommittee, TxnType } from "@/types";

type Props = {
    committee: Committee;
    totalBalance: number;
    addTxn?: boolean;
    showTxns?: boolean;
    txnType?: TxnType;
    donationType?: DonationType;
};
export function TotalBalanceCard({
    committee,
    totalBalance,
    addTxn,
    showTxns,
    txnType,
    donationType,
}: Props) {
    const { config } = Route.useRouteContext();
    return (
        <Card className="p-0 feature-card">
            <CardHeader className="bg-linear-to-br from-primary via-primary/60 to-primary/30 text-primary-foreground py-2">
                <CardTitle className="dark-title capitalize text-xl md:text-2xl">
                    Current {committee.toLowerCase()} Balance
                </CardTitle>
                {addTxn && (
                    <TxnButton
                        committee={committee}
                        year={config.activeYear}
                        txnType={txnType}
                        donationType={donationType}
                    />
                )}
            </CardHeader>
            <CardContent className="pb-4">
                <div className="flex flex-col gap-4">
                    <Amount
                        amount={totalBalance}
                        containerClass="justify-start"
                    />
                    {showTxns && (
                        <Link
                            to="/$committee/$subType/$year"
                            params={{
                                committee:
                                    committee.toLowerCase() as RouteCommittee,
                                year: config.activeYear,
                                subType:
                                    committee === COMMITTEE.CULTURAL
                                        ? ROUTE_SUB_TYPE.ANNADAAN
                                        : ROUTE_SUB_TYPE.TEMPLE,
                            }}
                            className={cn(
                                buttonVariants({ variant: "link" }),
                                "w-fit",
                            )}
                        >
                            {committee === COMMITTEE.CULTURAL
                                ? "View Annadaan Donations"
                                : "View Temple Item Donations"}
                            <ChevronRight />
                        </Link>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
