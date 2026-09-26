import { useSuspenseQuery } from "@tanstack/react-query";
import { Image } from "@unpic/react";
import { apiQueries } from "@/api/queries";
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { MEMBER_STATUS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Route } from "@/routes/$committee.$year";
import type { Committee, MemberStatus } from "@/types";
import { CommitteeStat } from "./committee-stat";
import { TxnButton } from "./txns/txn-button";

type Props = {
    memberStatus: MemberStatus;
    className?: string;
};
export function CommitteeCard({ memberStatus, className }: Props) {
    const { committee, year } = Route.useParams();
    const { data: balance } = useSuspenseQuery(
        apiQueries.txn.committeeBalances(committee.toUpperCase() as Committee),
    );

    return (
        <div className={cn("flex items-center justify-center", className)}>
            <div className="container py-10 w-full">
                <Card className="relative feature-card">
                    <CardHeader>
                        <CardTitle className="title text-2xl md:text-4xl capitalize text-nowrap">
                            {committee} balance details
                        </CardTitle>
                        {memberStatus === MEMBER_STATUS.ACTIVE && (
                            <div className="md:hidden">
                                <TxnButton
                                    committee={
                                        committee.toUpperCase() as Committee
                                    }
                                    year={year}
                                />
                            </div>
                        )}
                        <CardAction>
                            {memberStatus === MEMBER_STATUS.ACTIVE && (
                                <div className="hidden md:block">
                                    <TxnButton
                                        committee={
                                            committee.toUpperCase() as Committee
                                        }
                                        year={year}
                                    />
                                </div>
                            )}
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <div className="py-4 flex flex-col gap-9 justify-between">
                            <div className="grid md:divide-x divide-y md:divide-y-0 sm:w-3/4">
                                <CommitteeStat
                                    committee={
                                        committee.toUpperCase() as Committee
                                    }
                                    balance={balance}
                                    memberStatus={memberStatus}
                                />
                            </div>
                        </div>

                        {/* image */}
                        <Image
                            src="https://images.shadcnspace.com/assets/backgrounds/stats-01.webp"
                            alt="user-img"
                            width={211}
                            height={168}
                            className="absolute bottom-0 right-0 hidden sm:block"
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
