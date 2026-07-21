import { Dot, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { ITEM_TYPE } from "@/lib/constants";
import { useCart } from "@/stores/cart.store";
import type { ItemResponse } from "@/types";

type Props = {
    item: ItemResponse;
    isAvailable: boolean;
};
export function AddtoCartButton({ item, isAvailable }: Props) {
    const addToCart = useCart((state) => state.addToCart);
    return (
        <Button
            variant={"ghost"}
            size={"icon-sm"}
            onClick={() => {
                addToCart({
                    itemType: item.type,
                    itemName: item.itemName,
                    bookingAmt:
                        item.type === ITEM_TYPE.TEMPLE
                            ? item.availableAmt
                            : item.price * item.availableQty,
                    itemId: item.id,
                    bookingQty:
                        item.type === ITEM_TYPE.TEMPLE ? 0 : item.availableQty,
                    totalQty:
                        item.type === ITEM_TYPE.TEMPLE ? 0 : item.availableQty,
                    totalAmt:
                        item.type === ITEM_TYPE.TEMPLE
                            ? item.availableAmt
                            : item.price * item.availableQty,
                    price: item.type === ITEM_TYPE.TEMPLE ? 0 : item.price,
                });
                toast.success("Item added to cart");
            }}
        >
            {isAvailable ? (
                <ShoppingCart className="size-3 text-muted-foreground" />
            ) : (
                <Dot className="size-3 text-muted-foreground" />
            )}
        </Button>
    );
}
