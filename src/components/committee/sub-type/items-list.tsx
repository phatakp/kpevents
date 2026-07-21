import { CardLoader } from "@/components/shared/loaders/card-loader";
import { SuspenseErrorBoundary } from "@/components/shared/suspense-error-boundary";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { DONATION_TYPE, ROUTE_SUB_TYPE, USER_ROLE } from "@/lib/constants";
import { Route } from "@/routes/$committee.$subType.$year";
import { useCart } from "@/stores/cart.store";
import type { Committee } from "@/types";
import { SelectYear } from "../select-year";
import { TxnButton } from "../txns/txn-button";
import { ItemBookingContent } from "./booking-content";
import { ItemListContent } from "./items-content";

export function ItemsList() {
    const { committee, subType, year } = Route.useParams();
    const { isBooking } = Route.useSearch();
    const { auth, config } = Route.useRouteContext();
    const cartItems = useCart((state) => state.items);

    return (
        <Card className="w-full max-w-[calc(100vw-2rem)] md:max-w-full p-0 bg-background border-0 pr-4">
            <CardHeader className="py-4 px-0">
                <CardTitle className="title capitalize text-xl">
                    {`Annadaan ${year} ${isBooking ? "bookings" : "items"}`}
                </CardTitle>
                {auth.role === USER_ROLE.ADMIN && (
                    <CardDescription>
                        <SelectYear year={year} />
                    </CardDescription>
                )}
                {!isBooking && cartItems.length > 0 && (
                    <CardAction>
                        <TxnButton
                            committee={committee.toUpperCase() as Committee}
                            year={config.activeYear}
                            donationType={
                                subType === ROUTE_SUB_TYPE.ANNADAAN
                                    ? DONATION_TYPE.ANNADAAN
                                    : DONATION_TYPE.TEMPLE_ITEM
                            }
                            isBooking
                        />
                    </CardAction>
                )}
            </CardHeader>
            <CardContent className="px-0">
                <SuspenseErrorBoundary
                    id={`${subType}-list`}
                    fallback={<CardLoader className="h-[50vh]" />}
                >
                    {isBooking ? <ItemBookingContent /> : <ItemListContent />}
                </SuspenseErrorBoundary>
            </CardContent>
        </Card>
    );
}
