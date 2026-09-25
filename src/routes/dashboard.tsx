import { createFileRoute } from "@tanstack/react-router";
import { apiQueries } from "@/api/queries";
import { CommitteeTabs } from "@/components/dashboard/committee-tabs";
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
        context.queryClient.query(apiQueries.user.currDBUser()); 

        // get balances for all members
        context.queryClient.query(apiQueries.txn.allUserBalances());
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
