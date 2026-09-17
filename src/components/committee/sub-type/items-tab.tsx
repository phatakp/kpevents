import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { apiQueries } from "@/api/queries";
import {
    Tabs,
    TabsContent,
    TabsContents,
    TabsList,
    TabsTrigger,
} from "@/components/animate-ui/components/radix/tabs";
import { MEMBER_STATUS, USER_ROLE } from "@/lib/constants";
import { cn, getMemberStatus } from "@/lib/utils";
import { Route } from "@/routes/$committee.$subType.$year";
import type { Committee, MemberStatus } from "@/types";
import { ItemsList } from "./items-list";

type Props = {
    className?: string;
};
export function ItemsTabs({ className }: Props) {
    const { auth } = Route.useRouteContext();
    const { committee } = Route.useParams();
    const { isBooking } = Route.useSearch();
    const { data: user } = useSuspenseQuery(apiQueries.user.currDBUser());
    let memberStatus: MemberStatus = MEMBER_STATUS.NON;
    if (user)
        memberStatus = getMemberStatus(
            user,
            committee.toUpperCase() as Committee,
        );

    if (auth.role !== USER_ROLE.ADMIN || memberStatus !== MEMBER_STATUS.ACTIVE)
        return <ItemsList />;

    return (
        <div
            className={cn(
                "flex flex-col gap-6 w-full max-w-[calc(100vw-1rem)] md:max-w-full",
                className,
            )}
        >
            <Tabs value={isBooking ? "bookings" : "items"}>
                <TabsList>
                    {["items", "bookings"].map((typ) => (
                        <TabsTrigger key={typ} value={typ} asChild>
                            <Link
                                className="capitalize"
                                to="."
                                search={(old) => ({
                                    ...old,
                                    isBooking: typ === "bookings",
                                })}
                            >
                                {typ}
                            </Link>
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContents className="py-6">
                    {["items", "bookings"].map((typ) => (
                        <TabsContent key={typ} value={typ}>
                            <ItemsList />
                        </TabsContent>
                    ))}
                </TabsContents>
            </Tabs>
        </div>
    );
}
