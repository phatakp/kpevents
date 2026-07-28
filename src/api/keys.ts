import type {
    CommitteeQueryOptions,
    CommitteeYearQueryOptions,
    ItemQueryOptions,
    TxnQueryOptions,
} from "@/types";

export const QUERY_KEYS = {
    config: ["config"] as const,
    users: {
        allUsers: ["users"] as const,
        currUser: ["users", "curr-user"] as const,
        currSessionUser: ["users", "session-user"] as const,
        committeeMembers: ({
            committee,
            optionsOnly,
        }: CommitteeQueryOptions & { optionsOnly?: boolean }) => [
            "users",
            "members",
            committee,
            optionsOnly,
        ],
    },
    txns: {
        allTxns: ["txns"] as const,
        committeeBalance: ({ committee }: CommitteeQueryOptions) => [
            "txns",
            "balance",
            committee,
        ],

        allUserBalances: ["txns", "users", "balances"],
        donationStats: ({ committee, year }: CommitteeYearQueryOptions) => [
            "txns",
            "donation-stats",
            committee,
            year,
        ],
        allTransactions: ({
            committee,
            txnType,
            year,
            building,
            donationType,
        }: TxnQueryOptions) => [
            "txns",
            committee,
            txnType,
            year,
            building,
            donationType,
        ],
        linkedTransfer: (txnId: string) => ["txns", "linked", txnId],
        avaliableItems: ({ type, year }: ItemQueryOptions) => [
            "txns",
            "items",
            type,
            year,
        ],
    },
};
