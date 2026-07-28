import { useSuspenseQuery } from "@tanstack/react-query";
import { itemsOptions } from "@/api/queries/txn.queries";
import { PaginationComponent } from "@/components/shadcn-space/pagination/pagination";
import { Amount } from "@/components/shared/amount";
import { AnimatedList, AnimatedListItem } from "@/components/ui/animated-list";
import { ROUTE_SUB_TYPE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Route } from "@/routes/$committee.$subType.$year";
import { useCart } from "@/stores/cart.store";
import type { ItemType } from "@/types";
import { AddtoCartButton } from "./add-to-cart-btn";

export function ItemListContent() {
    const { subType, year } = Route.useParams();
    const { page = 0 } = Route.useSearch();
    const cartItems = useCart((state) => state.items);

    const { data: items } = useSuspenseQuery(
        itemsOptions({ type: subType.toUpperCase() as ItemType, year }),
    );

    if (items?.length === 0)
        return <span className="title text-sm md:text-xl">No items found</span>;

    const start = page === 0 ? 0 : page * 10;
    const end = start + 10;
    const totalElements = items?.length ?? 0;
    const totalPages = Math.ceil(totalElements / 10);

    return (
        <div className="flex flex-col gap-6">
            {subType === ROUTE_SUB_TYPE.ANNADAAN && (
                <div className="grid grid-cols-12 items-center w-full bg-secondary text-secondary-foreground rounded-md py-2 text-sm font-semibold pr-4">
                    <span className="ps-4 hidden md:inline-flex">Add</span>
                    <span className="md:col-span-4 col-span-6 col-start-2">
                        Item
                    </span>
                    <span className="hidden md:block col-span-2 text-right">
                        Price
                    </span>
                    <span className="hidden md:block col-span-2 text-right">
                        Available
                    </span>
                    <span className="md:col-span-3 text-right col-span-5">
                        Amount
                    </span>
                </div>
            )}

            {subType === ROUTE_SUB_TYPE.TEMPLE && (
                <div className="grid grid-cols-12 items-center w-full bg-secondary text-secondary-foreground rounded-md py-2 text-sm font-semibold pr-4">
                    <span className="ps-4 hidden md:inline-flex">Add</span>
                    <span className="col-span-7 col-start-2">Item</span>
                    <span className="text-right col-span-4">Amount</span>
                </div>
            )}

            <AnimatedList>
                {items?.slice(start, end).map((item) => {
                    const cartItem = cartItems.find(
                        (i) => i.itemId === item.id,
                    );

                    return (
                        <AnimatedListItem key={item.id}>
                            <div className="grid grid-cols-12 w-full border-b pb-2 items-center pr-4">
                                <AddtoCartButton
                                    item={item}
                                    isAvailable={!cartItem}
                                />

                                <div
                                    className={cn(
                                        "col-start-2 ",
                                        subType === ROUTE_SUB_TYPE.ANNADAAN &&
                                            "md:col-span-4 col-span-6",
                                        subType === ROUTE_SUB_TYPE.TEMPLE &&
                                            "col-span-7",
                                    )}
                                >
                                    <span className="text-sm truncate capitalize">
                                        {item.itemName}
                                    </span>
                                </div>

                                {subType === ROUTE_SUB_TYPE.ANNADAAN && (
                                    <>
                                        <div className="items-center justify-end col-span-2 hidden md:flex">
                                            <Amount
                                                amount={item.price}
                                                iconClass="size-3"
                                                className={cn(
                                                    "text-sm text-muted-foreground",
                                                )}
                                            />
                                        </div>

                                        <div className="hidden md:flex items-center justify-end col-span-2 text-sm text-muted-foreground">
                                            {item.availableQty}
                                        </div>
                                    </>
                                )}

                                <div
                                    className={cn(
                                        "flex items-center justify-end",
                                        subType === ROUTE_SUB_TYPE.ANNADAAN &&
                                            " md:col-span-3 col-span-5",
                                        subType === ROUTE_SUB_TYPE.TEMPLE &&
                                            "col-span-4",
                                    )}
                                >
                                    <Amount
                                        amount={item.availableAmt}
                                        iconClass="size-3 md:size-4"
                                        className={cn(
                                            "text-base md:text-xl text-muted-foreground",
                                        )}
                                    />
                                </div>

                                {subType === ROUTE_SUB_TYPE.ANNADAAN && (
                                    <div className="col-start-2 md:hidden col-span-11 flex items-center gap-2 text-xs text-muted-foreground">
                                        <span className="text-muted-foreground">
                                            Available
                                        </span>
                                        <Amount
                                            amount={item.price}
                                            iconClass="size-3"
                                            className={cn(
                                                "text-xs text-muted-foreground",
                                            )}
                                        />
                                        <span>X</span>
                                        <span>{item.availableQty}</span>
                                    </div>
                                )}
                            </div>
                        </AnimatedListItem>
                    );
                })}
            </AnimatedList>
            <PaginationComponent totalPages={totalPages} page={page} />
        </div>
    );
}
