import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
    createTransaction,
    deleteTransaction,
    updateTransaction,
} from "@/api/functions/txn.function";
import { QUERY_KEYS } from "@/api/keys";
import { useModal } from "@/components/shared/modal";
import { DONATION_TYPE } from "@/lib/constants";
import { useCart } from "@/stores/cart.store";

export function useCreateTransaction() {
    const queryClient = useQueryClient();
    const clearCart = useCart((state) => state.clearCart);
    const { closeModal, modalId } = useModal();
    return useMutation({
        mutationFn: createTransaction,
        onSuccess: (data) => {
            if (
                data?.donation?.type === DONATION_TYPE.ANNADAAN ||
                data?.donation?.type === DONATION_TYPE.TEMPLE_ITEM
            ) {
                clearCart();
            }
            closeModal(modalId);
            toast.success(`Transaction created successfully`);

            return queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.allTxns,
            });
        },
        onError: (error) => {
            toast.error(error.message ?? "Could not process request");
        },
    });
}

export function useUpdateTransaction() {
    const queryClient = useQueryClient();
    const { closeModal, modalId } = useModal();
    const clearCart = useCart((state) => state.clearCart);
    return useMutation({
        mutationFn: updateTransaction,
        onSuccess: (data) => {
            if (
                data?.donation?.type === DONATION_TYPE.ANNADAAN ||
                data?.donation?.type === DONATION_TYPE.TEMPLE_ITEM
            ) {
                clearCart();
            }
            closeModal(modalId);
            toast.success(`Transaction updated successfully`);
            return queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.allTxns,
            });
        },
        onError: (error) => {
            toast.error(error.message ?? "Could not process request");
        },
    });
}

export function useDeleteTransaction() {
    const queryClient = useQueryClient();
    const { closeModal, modalId } = useModal();
    return useMutation({
        mutationFn: deleteTransaction,
        onSuccess: () => {
            closeModal(modalId);
            toast.success(`Transaction deleted successfully`);
            return queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.allTxns,
            });
        },
        onError: (error) => {
            toast.error(error.message ?? "Could not process request");
        },
    });
}
