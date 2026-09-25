import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { apiQueries } from "@/api/queries";

import { CommitteeCard } from "@/components/committee/committee-card";
import { CommitteeMemberList } from "@/components/committee/committee-member-list";
import { DonationStatsByBuilding } from "@/components/committee/txns/donation-stats";
import { Background } from "@/components/shared/background";
import { CardLoader } from "@/components/shared/loaders/card-loader";
import { CardStatsLoader } from "@/components/shared/loaders/card-stats-loader";
import { SuspenseErrorBoundary } from "@/components/shared/suspense-error-boundary";
import { MEMBER_STATUS } from "@/lib/constants";
import { cn, getMemberStatus } from "@/lib/utils";
import type { Committee, RouteCommittee, User } from "@/types";

export const Route = createFileRoute("/$committee/$year")({
    component: RouteComponent,
    params: {
        parse: (rawParams) => ({
            committee: rawParams.committee as RouteCommittee, // Keep as string,
            year: parseInt(rawParams.year, 10),
        }),
    },
    loader: async ({ context, params }) => {
        // get user profile from db
        context.queryClient.query(apiQueries.user.currDBUser());

        // get committee members
        context.queryClient.query(
            apiQueries.user.membership(
                params.committee.toUpperCase() as Committee,
            ),
        );

        // get committee balances
        context.queryClient.query(
            apiQueries.txn.committeeBalances(
                params.committee.toUpperCase() as Committee,
            ),
        );

        // get stats for each building
        context.queryClient.query(
            apiQueries.txn.donationStats(
                params.committee.toUpperCase() as Committee,
                params.year ?? context.config.activeYear,
            ),
        );
    },
    pendingComponent: () => {
        return (
            <Background className="items-start">
                <section className="container py-8">
                    <div
                        className={cn(
                            "grid md:grid-cols-3 gap-x-4 gap-y-6 w-full max-w-[calc(100vw-1rem)] mx-auto md:max-w-full",
                        )}
                    >
                        <CardStatsLoader className="md:col-span-2 order-1 mx-auto w-full" />
                        <CardLoader className="md:col-span-2 md:order-3 order-2 mx-auto w-full" />
                        <CardLoader className="md:order-2 md:row-span-2 mx-auto h-full" />
                    </div>
                </section>
            </Background>
        );
    },
});

function RouteComponent() {
    const { committee, year } = Route.useParams();
    const { config } = Route.useRouteContext();

    const { data: user } = useSuspenseQuery(apiQueries.user.currDBUser());

    const memberStatus = user
        ? getMemberStatus(user as User, committee.toUpperCase() as Committee)
        : MEMBER_STATUS.NON;

    const { data: stats } = useSuspenseQuery(
        apiQueries.txn.donationStats(
            committee.toUpperCase() as Committee,
            year ?? config.activeYear,
        ),
    );

    const { data: members } = useSuspenseQuery(
        apiQueries.user.membership(committee.toUpperCase() as Committee),
    );

    return (
        <Background className="items-start">
            <section className="container py-8">
                <div
                    className={cn(
                        "grid gap-6 w-full max-w-[calc(100vw-1rem)] mx-auto md:max-w-full",

                        stats && stats.length > 0 && members.length > 0
                            ? "md:grid-cols-3"
                            : stats && stats.length > 0
                              ? "md:grid-cols-1"
                              : members.length > 0
                                ? "md:grid-cols-3"
                                : "md:grid-cols-1",
                    )}
                >
                    <SuspenseErrorBoundary
                        id={`committee-card`}
                        fallback={
                            <CardStatsLoader className="md:col-span-2 order-1 mx-auto" />
                        }
                    >
                        <CommitteeCard
                            memberStatus={memberStatus}
                            className={cn(
                                "md:col-span-2 order-1",
                                members.length > 0
                                    ? ""
                                    : "md:max-w-3xl mx-auto",
                            )}
                        />
                    </SuspenseErrorBoundary>

                    {stats && stats.length > 0 && (
                        <DonationStatsByBuilding
                            data={stats}
                            className={cn(
                                "md:col-span-2 md:order-3 order-2",
                                members.length > 0
                                    ? ""
                                    : "md:max-w-3xl mx-auto",
                            )}
                        />
                    )}

                    {members && (
                        <CommitteeMemberList
                            data={members as User[]}
                            className={cn(
                                "md:order-2 order-3 mx-auto",
                                stats && stats.length > 0
                                    ? "md:row-span-2"
                                    : "md:row-span-3",
                            )}
                        />
                    )}
                </div>
            </section>
        </Background>
    );
}
