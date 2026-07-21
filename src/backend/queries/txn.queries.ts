import { queryOptions } from "@tanstack/react-query";
import {
    getBalancesByCommittee,
    getDonationStatsByCommittee,
    getItems,
    getLinkedTransfer,
    getTransactionsByCommittee,
} from "@/backend/services/txn.services";
import { QUERY_KEYS, TXN_TYPE } from "@/lib/constants";
import type {
    CommitteeQueryOptions,
    CommitteeYearQueryOptions,
    ItemQueryOptions,
    Transaction,
    TxnQueryOptions,
} from "@/types";

export const balancesByCommitteeOptions = (data: CommitteeQueryOptions) =>
    queryOptions({
        queryKey: QUERY_KEYS.balancesByCommittee(data),
        queryFn: () => getBalancesByCommittee({ data }),
        staleTime: 1000 * 60 * 60 * 24,
    });

export const linkedTransferOptions = (txn: Transaction | undefined) =>
    queryOptions({
        queryKey: QUERY_KEYS.linkedTransfer(txn?.id ?? ""),
        queryFn: () =>
            getLinkedTransfer({
                data: {
                    txnId:
                        txn && txn.txnType === TXN_TYPE.TRANSFER
                            ? txn.id
                            : undefined,
                },
            }),

        staleTime: 1000 * 60 * 60 * 24,
    });

export const donationStatsByCommitteeOptions = (
    data: CommitteeYearQueryOptions,
) =>
    queryOptions({
        queryKey: QUERY_KEYS.donationStatsByCommittee(data),
        queryFn: () => getDonationStatsByCommittee({ data }),
        staleTime: 1000 * 60 * 60 * 24,
    });

export const txnsByCommitteeOptions = (data: TxnQueryOptions) =>
    queryOptions({
        queryKey: QUERY_KEYS.txnsByCommittee(data),
        queryFn: () =>
            getTransactionsByCommittee({
                data,
            }),
        staleTime: 1000 * 60 * 60 * 24,
    });

export const itemsOptions = (data: ItemQueryOptions) =>
    queryOptions({
        queryKey: QUERY_KEYS.items(data),
        queryFn: () => getItems({ data }),
        staleTime: 1000 * 60 * 60 * 24,
    });
