import { createFileRoute } from "@tanstack/react-router";
import {
    allUserBalancesOptions,
    currDBUserQueryOptions,
} from "@/api/queries/user.queries";
import { CommitteeTabs } from "@/components/dashboard/new/committee-tabs";
import { Background } from "@/components/shared/background";
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
    return (
        <Background className="items-start">
            <section className="container py-8">
                <div className="flex flex-col gap-8">
                    <SuspenseErrorBoundary
                        id={`committee-tabs`}
                        fallback={<TabsLoader className="h-[50vh]" />}
                    >
                        <CommitteeTabs />
                    </SuspenseErrorBoundary>
                </div>
            </section>
        </Background>
    );
}
