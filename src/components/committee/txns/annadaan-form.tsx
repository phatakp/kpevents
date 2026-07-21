import { Trash } from "lucide-react";
import { useEffect } from "react";
import { Amount } from "@/components/shared/amount";
import { useTypedAppFormContext } from "@/components/shared/form-inputs/hooks";
import { useModal } from "@/components/shared/modal";
import { Button } from "@/components/ui/button";
import { cn, getStepQty } from "@/lib/utils";
import { useCart, useCartTotal } from "@/stores/cart.store";
import type { BookingRequest, Transaction } from "@/types";
import { useTxnFormContext } from "./txn-form";

type Props = {
    txn?: Transaction;
    isDelete?: boolean | undefined;
};
export function AnnadaanForm({ txn, isDelete }: Props) {
    const { defaultValues, memberOptions } = useTxnFormContext();
    const form = useTypedAppFormContext({ defaultValues });
    const totalAmount = useCartTotal();
    const deleteFromCart = useCart((state) => state.deleteFromCart);
    const decrementQty = useCart((state) => state.decrementQty);
    const incrementQty = useCart((state) => state.incrementQty);
    const initCart = useCart((state) => state.initCart);
    const clearCart = useCart((state) => state.clearCart);
    const items = useCart((state) => state.items);
    const { isOpen, modalId } = useModal();

    const onDecrement = (i: number, item: BookingRequest) => {
        decrementQty(item.itemId);
        form.setFieldValue(`bookings[${i}].bookingQty`, item.bookingQty);
        form.setFieldValue(
            `bookings[${i}].bookingAmt`,
            item.bookingQty * item.price,
        );
    };

    const onIncrement = (i: number, item: BookingRequest) => {
        incrementQty(item.itemId);
        form.setFieldValue(`bookings[${i}].bookingQty`, item.bookingQty);
        form.setFieldValue(
            `bookings[${i}].bookingAmt`,
            item.bookingQty * item.price,
        );
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
                <div className="col-span-8 md:col-span-6 col-start-3 md:col-start-2">
                    Item Name
                </div>
                <div className="md:flex md:col-span-3 hidden">Quantity</div>
                <div className="flex items-center justify-end md:justify-start col-span-2">
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
                                const stepQty = getStepQty(cartItem.bookingQty);

                                return (
                                    <div
                                        key={i}
                                        className="grid grid-cols-12 items-center gap-4 py-2 border-b -mt-6"
                                    >
                                        <div className="col-span-2 md:col-span-1">
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
                                        <div className="col-span-8 md:col-span-6 flex flex-col">
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

                                            <div className="flex items-center justify-between gap-1 pr-4">
                                                <form.AppField
                                                    name={`bookings[${i}].price`}
                                                >
                                                    {(subField) => (
                                                        <Amount
                                                            amount={
                                                                subField.state
                                                                    .value
                                                            }
                                                            iconClass="size-3"
                                                            containerClass="justify-start"
                                                            className={cn(
                                                                "text-sm text-muted-foreground",
                                                            )}
                                                        />
                                                    )}
                                                </form.AppField>

                                                <span className="md:hidden text-muted-foreground text-sm">
                                                    X
                                                </span>
                                                <div className="flex md:hidden col-span-4">
                                                    <form.AppField
                                                        name={`bookings[${i}].bookingQty`}
                                                    >
                                                        {(subField) => (
                                                            <subField.NumberInput
                                                                field={subField}
                                                                value={
                                                                    subField
                                                                        .state
                                                                        .value
                                                                }
                                                                onDecrement={
                                                                    onMinusClick
                                                                }
                                                                onIncrement={
                                                                    onPlusClick
                                                                }
                                                                isMinusDisabled={
                                                                    subField
                                                                        .state
                                                                        .value <=
                                                                        stepQty ||
                                                                    !!txn?.id
                                                                }
                                                                isPlusDisabled={
                                                                    subField
                                                                        .state
                                                                        .value >=
                                                                        cartItem.totalQty ||
                                                                    !!txn?.id
                                                                }
                                                            />
                                                        )}
                                                    </form.AppField>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="md:flex items-center gap-1 md:col-span-3 hidden">
                                            <form.AppField
                                                name={`bookings[${i}].bookingQty`}
                                            >
                                                {(subField) => (
                                                    <subField.NumberInput
                                                        field={subField}
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
                                                                stepQty ||
                                                            !!txn?.id
                                                        }
                                                        isPlusDisabled={
                                                            subField.state
                                                                .value >=
                                                                cartItem.totalQty ||
                                                            !!txn?.id
                                                        }
                                                    />
                                                )}
                                            </form.AppField>
                                        </div>

                                        <div className="flex items-center justify-end col-span-2">
                                            <form.Subscribe
                                                selector={(state) => ({
                                                    bookingQty:
                                                        state.values.bookings[i]
                                                            .bookingQty,
                                                    price: state.values
                                                        .bookings[i].price,
                                                })}
                                            >
                                                {({ bookingQty, price }) => (
                                                    <form.AppField
                                                        name={`bookings[${i}].bookingAmt`}
                                                    >
                                                        {() => (
                                                            <Amount
                                                                amount={
                                                                    bookingQty *
                                                                    price
                                                                }
                                                                iconClass="size-3 md:size-4"
                                                                className={cn(
                                                                    "text-base text-muted-foreground",
                                                                )}
                                                            />
                                                        )}
                                                    </form.AppField>
                                                )}
                                            </form.Subscribe>
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
