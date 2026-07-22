import { auth } from "@clerk/tanstack-react-start/server";
import { createServerFn } from "@tanstack/react-start";
import z4 from "zod/v4";
import {
    assertAdminMiddleware,
    assertAuthMiddleware,
} from "@/backend/middlewares/auth.middleware";
// import { withMetaLogger } from "@/backend/middlewares/logging.middleware";
import { api, handleAPIError } from "@/integrations/axios";
import { DONATION_TYPE } from "@/lib/constants";
import type {
    CommitteeBalance,
    DonationStat,
    ItemResponse,
    LinkedTransfer,
    Transaction,
    TransactionResponse,
} from "@/types";
import {
    CommitteeQuerySchema,
    CommitteeYearQuerySchema,
    TxnQuerySchema,
} from "@/zod/common.schema";
import {
    ItemQuerySchema,
    TransactionIDSchema,
    TransactionSchemaWithValidation,
} from "@/zod/txn.schema";

export const getBalancesByCommittee = createServerFn({
    method: "GET",
})
    // .middleware([withMetaLogger("/transactions/balances/committee/<name>")])
    .validator(CommitteeQuerySchema)
    .handler(async ({ data }) => {
        try {
            const res = await api.get(
                `/transactions/balances/committee/${data.committee}`,
            );
            return res.data as CommitteeBalance[];
        } catch (error) {
            handleAPIError(error);
        }
    });

export const getDonationStatsByCommittee = createServerFn({
    method: "GET",
})
    // .middleware([
    //     withMetaLogger("/transactions/donation/stats/<committee>/<year>"),
    // ])
    .validator(CommitteeYearQuerySchema)
    .handler(async ({ data }) => {
        const res = await api.get(
            `/transactions/donation/stats/${data.committee}/${data.year}`,
        );
        return res.data as DonationStat[];
    });

export const getTransactionsByCommittee = createServerFn({
    method: "GET",
})
    .middleware([
        assertAuthMiddleware,
        // withMetaLogger("/transactions/committee/<committee>/<txnType>/<year>"),
    ])
    .validator(TxnQuerySchema)
    .handler(async ({ data }) => {
        try {
            const search = data.donationType
                ? `?donationType=${data.donationType}`
                : data.building
                  ? `?building=${data.building}`
                  : "";
            const res = await api.get(
                `/transactions/committee/${data.committee}/${data.txnType}/${data.year}${search}`,
            );
            return res.data as TransactionResponse;
        } catch (error) {
            handleAPIError(error);
        }
    });

export const createTransaction = createServerFn({
    method: "POST",
})
    // .middleware([withMetaLogger("/transactions")])
    .validator(TransactionSchemaWithValidation)
    .handler(async ({ data }) => {
        const { flatNumber, amount, ...input } = data;
        try {
            const { userId } = await auth();
            if (
                !userId &&
                input.donationType !== DONATION_TYPE.ANNADAAN &&
                input.donationType !== DONATION_TYPE.TEMPLE_ITEM
            )
                throw new Error("You are not authenticated");

            let total = amount;

            if (
                input.donationType === DONATION_TYPE.ANNADAAN ||
                input.donationType === DONATION_TYPE.TEMPLE_ITEM
            ) {
                total = input.bookings.reduce(
                    (acc, b) => acc + b.bookingAmt,
                    0,
                );
            }

            const res = await api.post(
                `/transactions`,
                JSON.stringify({
                    ...input,
                    amount: total,
                    donorBuilding: flatNumber.building,
                    donorFlat: flatNumber.flat,
                }),
            );
            return res.data as Transaction;
        } catch (error) {
            handleAPIError(error);
        }
    });

export const updateTransaction = createServerFn({
    method: "POST",
})
    .middleware([
        assertAuthMiddleware,
        // withMetaLogger("/transactions")
    ])
    .validator(TransactionSchemaWithValidation)
    .handler(async ({ data }) => {
        const { flatNumber, ...input } = data;
        try {
            const res = await api.put(
                `/transactions/${data.id}`,
                JSON.stringify({
                    ...input,
                    donorBuilding: flatNumber.building,
                    donorFlat: flatNumber.flat,
                }),
            );
            return res.data as Transaction;
        } catch (error) {
            handleAPIError(error);
        }
    });

export const deleteTransaction = createServerFn({
    method: "POST",
})
    .middleware([
        assertAdminMiddleware,
        // withMetaLogger("/transactions")
    ])
    .validator(TransactionIDSchema)
    .handler(async ({ data }) => {
        try {
            await api.delete(`/admin/transactions/${data.id}`);
            return "success";
        } catch (error) {
            handleAPIError(error);
        }
    });

export const getLinkedTransfer = createServerFn({
    method: "GET",
})
    // .middleware([withMetaLogger("/transactions/linked/<txnId>")])
    .validator(z4.object({ txnId: z4.string().optional() }))
    .handler(async ({ data }) => {
        try {
            if (!data.txnId) return null;
            const res = await api.get(`/transactions/linked/${data.txnId}`);
            return res.data as LinkedTransfer;
        } catch (error) {
            handleAPIError(error);
        }
    });

export const getItems = createServerFn({
    method: "GET",
})
    // .middleware([withMetaLogger("/items/<itemType>/<year>")])
    .validator(ItemQuerySchema)
    .handler(async ({ data }) => {
        try {
            const res = await api.get(`/items/${data.type}/${data.year}`);
            return res.data as ItemResponse[];
        } catch (error) {
            handleAPIError(error);
        }
    });
