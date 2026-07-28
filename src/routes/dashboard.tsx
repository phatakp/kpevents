import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
    allUserBalancesOptions,
    currDBUserQueryOptions,
} from "@/api/queries/user.queries";
import { CommitteeTabs } from "@/components/dashboard/committee-tabs";
import { UserCard } from "@/components/dashboard/user-card";
import { Background } from "@/components/shared/background";
import { CardStatsLoader } from "@/components/shared/loaders/card-stats-loader";
import { TabsLoader } from "@/components/shared/loaders/tabs-loader";
import { SuspenseErrorBoundary } from "@/components/shared/suspense-error-boundary";
import { COMMITTEE } from "@/lib/constants";
import { OptionalCommitteeQuerySchema } from "@/zod/common.schema";

export const Route = createFileRoute("/dashboard")({
    component: RouteComponent,
    validateSearch: (search) => OptionalCommitteeQuerySchema.parse(search),
    loaderDeps: ({ search }) => ({
        committee: search?.committee ?? COMMITTEE.CULTURAL,
    }),
    loader: async ({ context }) => {
        // get user profile
        context.queryClient.ensureQueryData({
            ...currDBUserQueryOptions,
            revalidateIfStale: true,
        });

        // get committee balances by member
        context.queryClient.ensureQueryData({
            ...allUserBalancesOptions,
            revalidateIfStale: true,
        });
    },
});

function RouteComponent() {
    const { config } = Route.useRouteContext();
    const [year, setYear] = useState(config.activeYear);
    const handleSelect = (selectedYear: string) => {
        setYear(Number(selectedYear));
    };

    return (
        <Background className="items-start">
            <section className="container py-8">
                <div className="flex flex-col gap-8">
                    <SuspenseErrorBoundary
                        id={`user-card`}
                        fallback={<CardStatsLoader />}
                    >
                        <UserCard year={year} handleSelect={handleSelect} />
                    </SuspenseErrorBoundary>

                    <SuspenseErrorBoundary
                        id={`committee-tabs`}
                        fallback={<TabsLoader className="h-[50vh]" />}
                    >
                        <CommitteeTabs
                            year={year}
                            handleSelect={handleSelect}
                        />
                    </SuspenseErrorBoundary>
                </div>
            </section>
        </Background>
    );
}
