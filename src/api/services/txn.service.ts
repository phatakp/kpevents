import type z4 from "zod/v4";
import { AdminRepository } from "@/api/repositories/admin.repository";
import { TransactionRepository } from "@/api/repositories/txn.repository";
import { isBookingType } from "@/lib/utils";
import type {
    CommitteeQuerySchema,
    CommitteeYearQuerySchema,
    TxnQuerySchema,
} from "@/zod/common.schema";
import type {
    TransactionIDSchema,
    TransactionSchemaWithValidation,
} from "@/zod/txn.schema";

class TransactionService {
    private repo = new TransactionRepository();
    private adminRepo = new AdminRepository();

    async getTransactions(request: z4.infer<typeof TxnQuerySchema>) {
        return this.repo.getTransactions(request);
    }

    async getCommitteeBalance(request: z4.infer<typeof CommitteeQuerySchema>) {
        return this.repo.getCommitteeBalance(request);
    }

    async getDonationStats(request: z4.infer<typeof CommitteeYearQuerySchema>) {
        return this.repo.getDonationStats(request);
    }

    async getLinkedTransfer(request: z4.infer<typeof TransactionIDSchema>) {
        return this.repo.getLinkedTransfer(request);
    }

    async createTransaction(
        request: z4.infer<typeof TransactionSchemaWithValidation>,
    ) {
        const { flatNumber, amount, ...input } = request;
        let total = amount;

        if (isBookingType(input.donationType)) {
            total = input.bookings.reduce((acc, b) => acc + b.bookingAmt, 0);
        }
        return this.repo.createTransaction({
            ...input,
            amount: total,
            donorBuilding: flatNumber.building,
            donorFlat: flatNumber.flat,
        });
    }

    async updateTransaction(
        request: z4.infer<typeof TransactionSchemaWithValidation>,
    ) {
        const { flatNumber, amount, ...input } = request;
        let total = amount;

        if (isBookingType(input.donationType)) {
            total = input.bookings.reduce((acc, b) => acc + b.bookingAmt, 0);
        }
        return this.repo.updateTransaction({
            ...input,
            amount: total,
            donorBuilding: flatNumber.building,
            donorFlat: flatNumber.flat,
        });
    }

    async deleteTransaction(request: z4.infer<typeof TransactionIDSchema>) {
        return this.adminRepo.deleteTransaction(request);
    }
}

export const txnService = new TransactionService();
