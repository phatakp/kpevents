import { EyeIcon, Pen, ShoppingCart, Trash } from "lucide-react";
import { Modal } from "@/components/shared/modal";
import { buttonVariants } from "@/components/ui/button";
import { TXN_TYPE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useCart } from "@/stores/cart.store";
import type { Committee, DonationType, Transaction, TxnType } from "@/types";
import { TransactionForm } from "./txn-form";

type Props = {
    committee: Committee;
    year: number;
    txnType?: TxnType;
    donationType?: DonationType;
    txn?: Transaction;
    isDelete?: boolean;
    isBooking?: boolean;
    isViewOnly?: boolean;
};

export function TxnButton({
    committee,
    year,
    txnType,
    donationType,
    txn,
    isDelete,
    isBooking,
    isViewOnly,
}: Props) {
    const items = useCart((state) => state.items);
    return (
        <Modal
            headerClass={cn(
                "bg-linear-to-br from-primary via-primary/60 to-primary/30 p-4 text-primary-foreground rounded-t-lg text-xl",
            )}
            closeBtnClass="text-primary-foreground hover:text-accent"
            btnClass={cn(
                buttonVariants({
                    size: "sm",
                    variant: !txn
                        ? "success"
                        : isDelete
                          ? "destructive"
                          : "default",
                }),
                !txn && "w-full max-w-sm",
            )}
            title={
                !txn
                    ? `Add ${isBooking ? "Booking" : "Transaction"} Details`
                    : isDelete
                      ? `Delete Transaction`
                      : isViewOnly
                        ? `View Transaction Details`
                        : `Edit Transaction Details`
            }
            content={
                <TransactionForm
                    txn={txn}
                    committee={
                        txn?.committee ?? (committee.toUpperCase() as Committee)
                    }
                    year={txn?.year ?? year}
                    txnType={txnType ?? TXN_TYPE.DONATION}
                    donationType={txn?.donation?.type ?? donationType}
                    isDelete={isDelete}
                    isViewOnly={isViewOnly}
                />
            }
        >
            {!txn && !isBooking && (
                <span className="capitalize">
                    Add {txnType?.toLowerCase() ?? "Transaction"}
                </span>
            )}

            {!txn && isBooking && (
                <>
                    <ShoppingCart className="size-3" />
                    {items.length}
                </>
            )}

            {!!txn?.id && isDelete && (
                <>
                    <Trash className="size-3" />
                    Delete
                </>
            )}

            {!!txn?.id && !isDelete && !isViewOnly && (
                <>
                    <Pen className="size-3" />
                    Edit
                </>
            )}

            {!!txn?.id && !isDelete && isViewOnly && (
                <>
                    <EyeIcon className="size-3" />
                    View
                </>
            )}
        </Modal>
    );
}
