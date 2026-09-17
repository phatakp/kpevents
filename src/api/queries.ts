import { queryOptions } from "@tanstack/react-query";
import { TXN_TYPE } from "@/lib/constants";
import type {
    Committee,
    ItemType,
    Transaction,
    TxnQueryOptions,
} from "@/types";
import { getAnnadaanItems, getConfig } from "./functions/admin.function";
import { getItems } from "./functions/item.function";
import { getAllMembers, getMembership } from "./functions/member.function";
import {
    getCommitteeBalance,
    getDonationStats,
    getLinkedTransfer,
    getTransactions,
} from "./functions/txn.function";
import {
    getAllUserBalances,
    getCurrUserFromDB,
} from "./functions/user.function";

export const apiQueries = {
    admin: {
        all: () => ["admin"] as const,
        config: () =>
            queryOptions({
                queryKey: [...apiQueries.admin.all(), "config"] as const,
                queryFn: getConfig,
            }),
        annadaanItems: () =>
            queryOptions({
                queryKey: [...apiQueries.txn.all(), "items"] as const,
                queryFn: getAnnadaanItems,
            }),
    },
    user: {
        all: () => ["users"] as const,
        currDBUser: () =>
            queryOptions({
                queryKey: [...apiQueries.user.all(), "curr"] as const,
                queryFn: getCurrUserFromDB,
                staleTime: 1000 * 60 * 60 * 24,
            }),
        allMembers: () =>
            queryOptions({
                queryKey: [...apiQueries.user.all()] as const,
                queryFn: getAllMembers,
            }),
        membership: (committee: Committee, optionsOnly?: boolean) =>
            queryOptions({
                queryKey: [
                    ...apiQueries.user.all(),
                    "members",
                    committee,
                    optionsOnly,
                ] as const,
                queryFn: () =>
                    getMembership({ data: { committee, optionsOnly } }),
            }),
    },
    txn: {
        all: () => ["txns"] as const,
        filtered: (data: TxnQueryOptions) =>
            queryOptions({
                queryKey: [
                    ...apiQueries.txn.all(),
                    data.committee,
                    data.txnType,
                    data.year,
                    data.building,
                    data.donationType,
                ] as const,
                queryFn: () => getTransactions({ data }),
            }),
        allUserBalances: () =>
            queryOptions({
                queryKey: [
                    ...apiQueries.txn.all(),
                    ...apiQueries.user.all(),
                    "balances",
                ] as const,
                queryFn: getAllUserBalances,
            }),
        committeeBalances: (committee: Committee) =>
            queryOptions({
                queryKey: [
                    ...apiQueries.txn.all(),
                    "balances",
                    committee,
                ] as const,
                queryFn: () => getCommitteeBalance({ data: { committee } }),
            }),
        donationStats: (committee: Committee, year: number) =>
            queryOptions({
                queryKey: [
                    ...apiQueries.txn.all(),
                    "donation-stats",
                    committee,
                    year,
                ] as const,
                queryFn: () => getDonationStats({ data: { committee, year } }),
            }),
        availableItems: (type: ItemType, year: number) =>
            queryOptions({
                queryKey: [
                    ...apiQueries.txn.all(),
                    "items",
                    type,
                    year,
                ] as const,
                queryFn: () => getItems({ data: { type, year } }),
            }),
        linkedTransfer: (txn: Transaction | undefined) => {
            const txnId = txn?.id ?? "";
            return queryOptions({
                queryKey: [...apiQueries.txn.all(), "balances", txnId] as const,
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
        },
    },
};
