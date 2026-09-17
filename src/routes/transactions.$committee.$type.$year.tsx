import { createFileRoute } from "@tanstack/react-router";
import { apiQueries } from "@/api/queries";
import { TxnTypeTabs } from "@/components/committee/txns/txn-type-tabs";
import { Background } from "@/components/shared/background";
import { TabsLoader } from "@/components/shared/loaders/tabs-loader";
import { cn } from "@/lib/utils";
import type {
    Building,
    Committee,
    RouteCommittee,
    RouteType,
    TxnType,
} from "@/types";
import { SearchSchema } from "@/zod/common.schema";

export const Route = createFileRoute("/transactions/$committee/$type/$year")({
    component: RouteComponent,
    validateSearch: (search) => SearchSchema.parse(search),
    loaderDeps: ({ search }) => ({
        page: search.page,
        building: search.building ?? "A",
        query: search.query,
        user: search.user,
        user2: search.user2,
        donationType: search.donationType,
        mode: search.mode,
    }),

    params: {
        parse: (rawParams) => ({
            committee: rawParams.committee as RouteCommittee, // Keep as string,
            type: rawParams.type as RouteType, // Keep as string
            // Handle the fact that below could be undefined
            year: parseInt(rawParams.year, 10),
        }),
    },
    loader: async ({ context, params, deps }) => {
        // get user profile from db
        context.queryClient.prefetchQuery(apiQueries.user.currDBUser());

        // get committee members
        context.queryClient.prefetchQuery(
            apiQueries.user.membership(
                params.committee.toUpperCase() as Committee,
            ),
        );

        // get balances for all members
        context.queryClient.prefetchQuery(apiQueries.txn.allUserBalances());

        // get transactions
        context.queryClient.prefetchQuery(
            apiQueries.txn.filtered({
                committee: params.committee.toUpperCase() as Committee,
                year: params.year,
                txnType: params.type.toUpperCase() as TxnType,
                building: deps.building as Building,
                donationType: deps.donationType,
            }),
        );
    },
    pendingComponent: () => <TabsLoader cnt={3} />,
});

function RouteComponent() {
    return (
        <Background className="items-start">
            <section className="container py-8">
                <div
                    className={cn(
                        "grid w-full max-w-[calc(100vw-1rem)] mx-auto md:max-w-full",
                    )}
                >
                    <TxnTypeTabs className={cn()} />
                </div>
            </section>
        </Background>
    );
}
