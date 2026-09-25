import type z4 from "zod/v4";
import { api, handleAPIError } from "@/api/api-client";
import type {
    CommitteeBalance,
    DonationStat,
    LinkedTransfer,
    Transaction,
    TransactionResponse,
} from "@/types";
import type {
    CommitteeQuerySchema,
    CommitteeYearQuerySchema,
    TxnQuerySchema,
} from "@/zod/common.schema";
import type {
    TransactionIDSchema,
    TransactionRequestSchema,
} from "@/zod/txn.schema";

export class TransactionRepository {
    url = "/transactions";

    async getTransactions(request: z4.infer<typeof TxnQuerySchema>) {
        try {
            let search = "";
            let params = 0;
            if (request.building)
                search += `${params++ > 0 ? "&" : "?"}building=${request.building}`;
            if (request.donationType)
                search += `${params++ > 0 ? "&" : "?"}donationType=${request.donationType}`;
            if (request.txnMode)
                search += `${params++ > 0 ? "&" : "?"}txnMode=${request.txnMode}`;
            if (request.txnUserId)
                search += `${params++ > 0 ? "&" : "?"}txnUserId=${request.txnUserId}`;
            if (request.userName)
                search += `${params++ > 0 ? "&" : "?"}userName=${request.userName}`;
            if (request.searchTerm)
                search += `${params++ > 0 ? "&" : "?"}searchTerm=${request.searchTerm}`;
            if (request.page)
                search += `${params++ > 0 ? "&" : "?"}page=${request.page}`;
            if (request.size)
                search += `${params++ > 0 ? "&" : "?"}size=${request.size}`;

            const res = await api.get(
                `${this.url}/committee/${request.committee}/${request.txnType}/${request.year}${search}`,
            );
            return res.data as TransactionResponse;
        } catch (error) {
            handleAPIError(error);
        }
    }

    async getDonationStats(request: z4.infer<typeof CommitteeYearQuerySchema>) {
        try {
            const res = await api.get(
                `${this.url}/donation/stats/${request.committee}/${request.year}`,
            );
            return res.data as DonationStat[];
        } catch (error) {
            handleAPIError(error);
        }
    }

    async getLinkedTransfer(request: z4.infer<typeof TransactionIDSchema>) {
        try {
            const res = await api.get(`${this.url}/linked/${request.id}`);
            return res.data as LinkedTransfer;
        } catch (error) {
            handleAPIError(error);
        }
    }

    async getCommitteeBalance(request: z4.infer<typeof CommitteeQuerySchema>) {
        try {
            const res = await api.get(
                `${this.url}/balances/committee/${request.committee}`,
            );
            return res.data as CommitteeBalance;
        } catch (error) {
            handleAPIError(error);
        }
    }

    async createTransaction(
        request: z4.infer<typeof TransactionRequestSchema>,
    ) {
        try {
            const res = await api.post(this.url, JSON.stringify(request));
            return res.data as Transaction;
        } catch (error) {
            handleAPIError(error);
        }
    }

    async updateTransaction(
        request: z4.infer<typeof TransactionRequestSchema>,
    ) {
        try {
            const res = await api.put(
                `${this.url}/${request.id}`,
                JSON.stringify(request),
            );
            return res.data as Transaction;
        } catch (error) {
            handleAPIError(error);
        }
    }
}
