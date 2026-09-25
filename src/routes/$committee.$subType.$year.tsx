import { createFileRoute } from "@tanstack/react-router";
import { apiQueries } from "@/api/queries";
import { ItemsTabs } from "@/components/committee/sub-type/items-tab";
import { Background } from "@/components/shared/background";
import { TabsLoader } from "@/components/shared/loaders/tabs-loader";
import { DONATION_TYPE, ROUTE_SUB_TYPE, TXN_TYPE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type {
    Committee,
    ItemType,
    RouteCommittee,
    RouteSubType,
} from "@/types";
import { SearchSchema } from "@/zod/common.schema";

export const Route = createFileRoute("/$committee/$subType/$year")({
    component: RouteComponent,
    validateSearch: (search) => SearchSchema.parse(search),
    loaderDeps: ({ search }) => ({
        page: search.page ?? 0,
        size: search.size ?? 10,
        txnUserId: search.txnUserId,
        txnMode: search.txnMode,
        isConfirmed: search.isConfirmed,
        isBooking: search.isBooking,
    }),
    params: {
        parse: (rawParams) => ({
            committee: rawParams.committee as RouteCommittee, // Keep as string,
            subType: rawParams.subType as RouteSubType, // Keep as string
            // Handle the fact that below could be undefined
            year: parseInt(rawParams.year, 10),
        }),
    },
    loader: async ({ context, params, deps }) => {
        // get items from db
        context.queryClient.query(
            apiQueries.txn.availableItems(
                params.subType.toUpperCase() as ItemType,
                params.year,
                deps.page,
                deps.size,
            ),
        );
        if (deps.isBooking)
            context.queryClient.query(
                apiQueries.txn.filtered({
                    committee: params.committee.toUpperCase() as Committee,
                    txnType: TXN_TYPE.DONATION,
                    year: params.year,
                    building: undefined,
                    donationType:
                        params.subType === ROUTE_SUB_TYPE.ANNADAAN
                            ? DONATION_TYPE.ANNADAAN
                            : DONATION_TYPE.TEMPLE_ITEM,
                    txnUserId: deps.txnUserId,
                    txnMode: deps.txnMode,
                    page: deps.page,
                    size: deps.size,
                }),
            );
    },
    pendingComponent: () => <TabsLoader />,
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
                    <ItemsTabs className={cn()} />
                </div>
            </section>
        </Background>
    );
}
