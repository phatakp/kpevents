import { createServerFn } from "@tanstack/react-start";
import { assertAuthMiddleware } from "@/api/middlewares/auth.middleware";
import { withMetaLogger } from "@/api/middlewares/logging.middleware";
import { txnService } from "@/api/services/txn.service";
import {
    CommitteeQuerySchema,
    CommitteeYearQuerySchema,
    TxnQuerySchema,
} from "@/zod/common.schema";
import {
    TransactionIDSchema,
    TransactionSchemaWithValidation,
} from "@/zod/txn.schema";

export const getTransactions = createServerFn({
    method: "GET",
})
    .middleware([
        assertAuthMiddleware,
        withMetaLogger(
            "/transactions/committee/{committeeName}/{txnType}/{year}",
        ),
    ])
    .validator(TxnQuerySchema)
    .handler(async ({ data }) => {
        return txnService.getTransactions(data);
    });

export const getDonationStats = createServerFn({
    method: "GET",
})
    .middleware([
        withMetaLogger("/transactions/donation/stats/{committeeName}/{year}"),
    ])
    .validator(CommitteeYearQuerySchema)
    .handler(async ({ data }) => {
        return txnService.getDonationStats(data);
    });

export const getCommitteeBalance = createServerFn({
    method: "GET",
})
    .middleware([
        withMetaLogger("/transactions/balances/committee/{committeeName}"),
    ])
    .validator(CommitteeQuerySchema)
    .handler(async ({ data }) => {
        return txnService.getCommitteeBalance(data);
    });

export const getLinkedTransfer = createServerFn({
    method: "GET",
})
    .middleware([withMetaLogger("/transactions/linked/<txnId>")])
    .validator(TransactionIDSchema.optional())
    .handler(async ({ data }) => {
        if (!data?.id) return null;
        return txnService.getLinkedTransfer(data);
    });

export const createTransaction = createServerFn({
    method: "POST",
})
    .middleware([withMetaLogger("/transactions")])
    .validator(TransactionSchemaWithValidation)
    .handler(async ({ data }) => {
        return txnService.createTransaction(data);
    });

export const updateTransaction = createServerFn({
    method: "POST",
})
    .middleware([withMetaLogger("/transactions")])
    .validator(TransactionSchemaWithValidation)
    .handler(async ({ data }) => {
        if (!data.id) throw new Error("Transaction ID required");
        return txnService.updateTransaction(data);
    });

export const deleteTransaction = createServerFn({
    method: "POST",
})
    .middleware([withMetaLogger("/transactions/{txnId}")])
    .validator(TransactionIDSchema)
    .handler(async ({ data }) => {
        return txnService.deleteTransaction(data);
    });
