import { Pen, ShoppingCart, Trash } from "lucide-react";
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
};

export function TxnButton({
    committee,
    year,
    txnType,
    donationType,
    txn,
    isDelete,
    isBooking,
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
                    size: !txn ? "sm" : "icon-xs",
                    variant: !txn
                        ? "success"
                        : isDelete
                          ? "destructive"
                          : "ghost",
                }),
                !txn && "w-full max-w-sm",
            )}
            title={
                !txn
                    ? `Add ${isBooking ? "Booking" : "Transaction"} Details`
                    : isDelete
                      ? `Delete Transaction`
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

            {!!txn?.id && isDelete && <Trash className="size-3" />}

            {!!txn?.id && !isDelete && <Pen className="size-3" />}
        </Modal>
    );
}
