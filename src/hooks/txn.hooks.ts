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
import { mapReqToTransaction } from "@/lib/utils";
import { useCart } from "@/stores/cart.store";
import type { Building, TransactionResponse } from "@/types";

export function useCreateTransaction() {
    const queryClient = useQueryClient();
    const clearCart = useCart((state) => state.clearCart);
    const { closeModal, modalId } = useModal();
    return useMutation({
        mutationFn: createTransaction,
        onMutate: async (variables) => {
            // 1) Cancel in-flight refetches to prevent race conditions
            await queryClient.cancelQueries({
                queryKey: QUERY_KEYS.txns.allTxns,
            });
            // 2) Snapshot the previous state (for rollback)
            const previousTxns = queryClient.getQueryData<TransactionResponse>(
                QUERY_KEYS.txns.allTxns,
            );
            // 3) Optimistically update the cache
            queryClient.setQueryData(
                QUERY_KEYS.txns.allTxns,
                (old?: TransactionResponse) =>
                    old
                        ? {
                              totalElements: old.totalElements + 1,
                              totalPages: old.totalPages,
                              totalAmount:
                                  old.totalAmount + variables.data.amount,
                              data: [
                                  mapReqToTransaction({
                                      ...variables.data,
                                      donorBuilding: variables.data.flatNumber
                                          .building as Building,
                                  }),
                                  ...old.data,
                              ],
                          }
                        : undefined,
            );
            return { previousTxns };
        },
        onSettled: () => {
            return queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.txns.allTxns,
            });
        },
        onError: (error, _, context) => {
            toast.error(error.message ?? "Could not process request");
            queryClient.setQueryData(
                QUERY_KEYS.txns.allTxns,
                context?.previousTxns,
            );
        },
        onSuccess: (data) => {
            if (
                data?.donation?.type === DONATION_TYPE.ANNADAAN ||
                data?.donation?.type === DONATION_TYPE.TEMPLE_ITEM
            ) {
                clearCart();
            }
            closeModal(modalId);
            toast.success(`Transaction created successfully`);
        },
    });
}

export function useUpdateTransaction() {
    const queryClient = useQueryClient();
    const { closeModal, modalId } = useModal();
    const clearCart = useCart((state) => state.clearCart);
    return useMutation({
        mutationFn: updateTransaction,
        onMutate: async (variables) => {
            // 1) Cancel in-flight refetches to prevent race conditions
            await queryClient.cancelQueries({
                queryKey: QUERY_KEYS.txns.allTxns,
            });
            // 2) Snapshot the previous state (for rollback)
            const previousTxns = queryClient.getQueryData<TransactionResponse>(
                QUERY_KEYS.txns.allTxns,
            );
            // 3) Optimistically update the cache
            queryClient.setQueryData(
                QUERY_KEYS.txns.allTxns,
                (old?: TransactionResponse) =>
                    old
                        ? {
                              ...old,
                              data: old.data.map((t) =>
                                  t.id === variables.data.id
                                      ? mapReqToTransaction({
                                            ...variables.data,
                                            donorBuilding: variables.data
                                                .flatNumber
                                                .building as Building,
                                        })
                                      : t,
                              ),
                          }
                        : undefined,
            );
            return { previousTxns };
        },
        onSettled: () => {
            return queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.txns.allTxns,
            });
        },
        onError: (error, _, context) => {
            toast.error(error.message ?? "Could not process request");
            queryClient.setQueryData(
                QUERY_KEYS.txns.allTxns,
                context?.previousTxns,
            );
        },
        onSuccess: (data) => {
            if (
                data?.donation?.type === DONATION_TYPE.ANNADAAN ||
                data?.donation?.type === DONATION_TYPE.TEMPLE_ITEM
            ) {
                clearCart();
            }
            closeModal(modalId);
            toast.success(`Transaction updated successfully`);
        },
    });
}

export function useDeleteTransaction() {
    const queryClient = useQueryClient();
    const { closeModal, modalId } = useModal();
    return useMutation({
        mutationFn: deleteTransaction,
        onMutate: async (variables) => {
            // 1) Cancel in-flight refetches to prevent race conditions
            await queryClient.cancelQueries({
                queryKey: QUERY_KEYS.txns.allTxns,
            });
            // 2) Snapshot the previous state (for rollback)
            const previousTxns = queryClient.getQueryData<TransactionResponse>(
                QUERY_KEYS.txns.allTxns,
            );
            // 3) Optimistically update the cache
            queryClient.setQueryData(
                QUERY_KEYS.txns.allTxns,
                (old?: TransactionResponse) =>
                    old
                        ? {
                              ...old,
                              totalElements: old.totalElements - 1,
                              totalPages: old.totalPages,
                              data: old.data.filter(
                                  (t) => t.id !== variables.data.id,
                              ),
                          }
                        : undefined,
            );
            return { previousTxns };
        },
        onSettled: () => {
            return queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.txns.allTxns,
            });
        },
        onError: (error, _, context) => {
            toast.error(error.message ?? "Could not process request");
            queryClient.setQueryData(
                QUERY_KEYS.txns.allTxns,
                context?.previousTxns,
            );
        },
        onSuccess: () => {
            closeModal(modalId);
            toast.success(`Transaction deleted successfully`);
        },
    });
}
