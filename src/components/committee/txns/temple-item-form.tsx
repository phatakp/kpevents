import { Trash } from "lucide-react";
import { useEffect } from "react";
import { Amount } from "@/components/shared/amount";
import { useTypedAppFormContext } from "@/components/shared/form-inputs/hooks";
import { useModal } from "@/components/shared/modal";
import { Button } from "@/components/ui/button";
import { cn, getStepAmount } from "@/lib/utils";
import { useCart, useCartTotal } from "@/stores/cart.store";
import type { BookingRequest, Transaction } from "@/types";
import { useTxnFormContext } from "./txn-form";

type Props = {
    txn?: Transaction;
    isDelete?: boolean | undefined;
};
export function TempleItemForm({ txn, isDelete }: Props) {
    const { defaultValues, memberOptions } = useTxnFormContext();
    const form = useTypedAppFormContext({ defaultValues });
    const items = useCart((state) => state.items);
    const { modalId, isOpen } = useModal();
    const deleteFromCart = useCart((state) => state.deleteFromCart);
    const incrementAmt = useCart((state) => state.incrementAmt);
    const decrementAmt = useCart((state) => state.decrementAmt);
    const initCart = useCart((state) => state.initCart);
    const clearCart = useCart((state) => state.clearCart);
    const totalAmount = useCartTotal();

    const onDecrement = (i: number, item: BookingRequest) => {
        decrementAmt(item.itemId);
        form.setFieldValue(`bookings[${i}].bookingAmt`, item.bookingAmt);
    };

    const onIncrement = (i: number, item: BookingRequest) => {
        incrementAmt(item.itemId);
        form.setFieldValue(`bookings[${i}].bookingAmt`, item.bookingAmt);
    };

    useEffect(() => {
        if (isOpen(modalId) && txn?.donation?.bookings)
            initCart(txn.donation.bookings);
    }, []);

    return (
        <>
            <div className="flex flex-col md:flex-row gap-6">
                <form.AppField name={"donorName"}>
                    {(field) => (
                        <field.TextInput
                            label={"Donor Name"}
                            disabled={isDelete}
                        />
                    )}
                </form.AppField>
                <form.AppField name={"flatNumber"}>
                    {(field) => (
                        <field.FlatNumberInput
                            field={field}
                            className="w-full sm:w-fit"
                            disabled={isDelete}
                        />
                    )}
                </form.AppField>
            </div>

            <form.AppField name="txnUserId">
                {(field) => (
                    <field.SelectInput
                        label="Amount Paid to"
                        options={memberOptions}
                        disabled={isDelete}
                    />
                )}
            </form.AppField>

            <div className="grid grid-cols-12 items-center gap-4 border-b-2 py-2 text-muted-foreground text-sm">
                <div className="col-span-6 col-start-2">Item Name</div>
                <div className="flex items-center justify-end col-span-5">
                    Amount
                </div>
            </div>
            <form.AppField name="bookings" mode="array">
                {(field) => (
                    <>
                        {field.state.value.map(
                            (_: BookingRequest, i: number) => {
                                const cartItem = items.find(
                                    (itm) =>
                                        itm.itemId ===
                                        form.getFieldValue(
                                            `bookings[${i}].itemId`,
                                        ),
                                );
                                if (!cartItem) return null;
                                const onMinusClick = () =>
                                    onDecrement(i, cartItem);
                                const onPlusClick = () =>
                                    onIncrement(i, cartItem);
                                const stepAmt = getStepAmount(
                                    cartItem.bookingAmt,
                                );

                                return (
                                    <div
                                        key={i}
                                        className="grid grid-cols-12 items-center gap-4 py-2 border-b -mt-6"
                                    >
                                        <div className="">
                                            <form.AppField
                                                name={`bookings[${i}].itemId`}
                                            >
                                                {(subField) => (
                                                    <Button
                                                        variant={"destructive"}
                                                        size={"icon-sm"}
                                                        disabled={!!txn?.id}
                                                        onClick={() => {
                                                            deleteFromCart(
                                                                subField.state
                                                                    .value,
                                                            );
                                                            field.removeValue(
                                                                i,
                                                            );
                                                        }}
                                                    >
                                                        <Trash className="size-3.5" />
                                                    </Button>
                                                )}
                                            </form.AppField>
                                        </div>
                                        <div className="col-span-6 flex flex-col">
                                            <form.AppField
                                                name={`bookings[${i}].itemName`}
                                            >
                                                {(subField) => (
                                                    <span
                                                        className={cn(
                                                            "text-xs md:text-sm truncate capitalize",
                                                            txn?.id &&
                                                                " text-muted-foreground",
                                                        )}
                                                    >
                                                        {subField.state.value}
                                                    </span>
                                                )}
                                            </form.AppField>
                                        </div>

                                        <div className="flex items-center gap-1 col-span-5">
                                            <form.AppField
                                                name={`bookings[${i}].bookingAmt`}
                                            >
                                                {(subField) => (
                                                    <subField.NumberInput
                                                        field={subField}
                                                        fraction={0}
                                                        value={
                                                            subField.state.value
                                                        }
                                                        onDecrement={
                                                            onMinusClick
                                                        }
                                                        onIncrement={
                                                            onPlusClick
                                                        }
                                                        isMinusDisabled={
                                                            subField.state
                                                                .value <=
                                                                stepAmt ||
                                                            !!txn?.id
                                                        }
                                                        isPlusDisabled={
                                                            subField.state
                                                                .value >=
                                                                cartItem.totalAmt ||
                                                            !!txn?.id
                                                        }
                                                    />
                                                )}
                                            </form.AppField>
                                        </div>
                                    </div>
                                );
                            },
                        )}
                    </>
                )}
            </form.AppField>

            <div className="grid grid-cols-12 items-center gap-4 bg-secondary text-secondary-foreground px-4 py-2 -mt-6">
                <span className="col-span-2"> Total</span>
                <div className="flex items-center justify-end col-span-10">
                    <Amount
                        amount={totalAmount}
                        className={cn(
                            "text-xl md:text-2xl text-muted-foreground",
                        )}
                    />
                </div>
            </div>

            <Button variant={"outline"} onClick={clearCart} type="button">
                Clear Cart
            </Button>
        </>
    );
}
