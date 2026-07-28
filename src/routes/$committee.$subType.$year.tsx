import { createFileRoute } from "@tanstack/react-router";
import { itemsOptions } from "@/api/queries/txn.queries";
import { ItemsTabs } from "@/components/committee/sub-type/items-tab";
import { Background } from "@/components/shared/background";
import { TabsLoader } from "@/components/shared/loaders/tabs-loader";
import { cn } from "@/lib/utils";
import type { ItemType, RouteCommittee, RouteSubType } from "@/types";
import { SearchSchema } from "@/zod/common.schema";

export const Route = createFileRoute("/$committee/$subType/$year")({
    component: RouteComponent,
    validateSearch: (search) => SearchSchema.parse(search),
    loaderDeps: ({ search }) => ({
        page: search.page,
        user: search.user,
        mode: search.mode,
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
    loader: async ({ context, params }) => {
        // get items from db
        context.queryClient.ensureQueryData({
            ...itemsOptions({
                type: params.subType.toUpperCase() as ItemType,
                year: params.year,
            }),
            revalidateIfStale: true,
        });
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
