import { queryOptions } from "@tanstack/react-query";
import { getItems } from "@/api/functions/item.function";
import {
    getCommitteeBalance,
    getDonationStats,
    getLinkedTransfer,
    getTransactions,
} from "@/api/functions/txn.function";
import { QUERY_KEYS } from "@/api/keys";
import { TXN_TYPE } from "@/lib/constants";
import type {
    CommitteeQueryOptions,
    CommitteeYearQueryOptions,
    ItemQueryOptions,
    Transaction,
    TxnQueryOptions,
} from "@/types";

export const committeeBalancesOptions = (data: CommitteeQueryOptions) =>
    queryOptions({
        queryKey: QUERY_KEYS.txns.committeeBalance(data),
        queryFn: () => getCommitteeBalance({ data }),
    });

export const linkedTransferOptions = (txn: Transaction | undefined) =>
    queryOptions({
        queryKey: QUERY_KEYS.txns.linkedTransfer(txn?.id ?? ""),
        queryFn: () =>
            getLinkedTransfer({
                data:
                    txn && txn.txnType === TXN_TYPE.TRANSFER
                        ? {
                              id: txn.id,
                          }
                        : undefined,
            }),
    });

export const donationStatsOptions = (data: CommitteeYearQueryOptions) =>
    queryOptions({
        queryKey: QUERY_KEYS.txns.donationStats(data),
        queryFn: () => getDonationStats({ data }),
    });

export const txnsOptions = (data: TxnQueryOptions) =>
    queryOptions({
        queryKey: QUERY_KEYS.txns.allTransactions(data),
        queryFn: () =>
            getTransactions({
                data,
            }),
    });

export const itemsOptions = (data: ItemQueryOptions) =>
    queryOptions({
        queryKey: QUERY_KEYS.txns.avaliableItems(data),
        queryFn: () => getItems({ data }),
    });
