import { Link } from "@tanstack/react-router";
import {
    Tabs,
    TabsContent,
    TabsContents,
    TabsList,
    TabsTrigger,
} from "@/components/animate-ui/components/radix/tabs";
import { USER_ROLE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Route } from "@/routes/$committee.$subType.$year";
import { ItemsList } from "./items-list";

type Props = {
    className?: string;
};
export function ItemsTabs({ className }: Props) {
    const { auth } = Route.useRouteContext();
    const { isBooking } = Route.useSearch();

    if (auth.role !== USER_ROLE.ADMIN) return <ItemsList />;

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
