import type z4 from "zod/v4";
import { api, handleAPIError } from "@/api/api-client";
import type { Control, ItemResponse, User } from "@/types";
import type {
    CommitteeUserQuerySchema,
    ControlRecordSchema,
} from "@/zod/common.schema";
import type { ItemRequestSchema, TransactionIDSchema } from "@/zod/txn.schema";

export class AdminRepository {
    url = "/admin";

    async getConfig() {
        try {
            const res = await api.get(`${this.url}/config`);
            return res.data as Control;
        } catch (error) {
            handleAPIError(error);
        }
    }

    async getAllMembers() {
        try {
            const res = await api.get(`${this.url}/members`);
            return res.data as User[];
        } catch (error) {
            handleAPIError(error);
        }
    }

    async updateConfig(request: z4.infer<typeof ControlRecordSchema>) {
        try {
            const res = await api.put(
                `${this.url}/config`,
                JSON.stringify(request),
            );
            return res.data as Control;
        } catch (error) {
            handleAPIError(error);
        }
    }

    async approveMember(request: z4.infer<typeof CommitteeUserQuerySchema>) {
        try {
            await api.put(
                `${this.url}/members/approve`,
                JSON.stringify(request),
            );
            return "success";
        } catch (error) {
            handleAPIError(error);
        }
    }

    async deleteMember(request: z4.infer<typeof CommitteeUserQuerySchema>) {
        try {
            await api.post(
                `${this.url}/members/delete`,
                JSON.stringify(request),
            );
            return "success";
        } catch (error) {
            handleAPIError(error);
        }
    }

    async deleteTransaction(request: z4.infer<typeof TransactionIDSchema>) {
        try {
            await api.delete(`${this.url}/transactions/${request.id}`);
            return "success";
        } catch (error) {
            handleAPIError(error);
        }
    }

    async getAnnadaanItems() {
        try {
            const res = await api.get(`${this.url}/items`);
            return res.data as ItemResponse[];
        } catch (error) {
            handleAPIError(error);
        }
    }

    async createItem(request: z4.infer<typeof ItemRequestSchema>) {
        try {
            const res = await api.post(
                `${this.url}/items`,
                JSON.stringify(request),
            );
            return res.data as ItemResponse;
        } catch (error) {
            handleAPIError(error);
        }
    }

    async updateItem(
        request: z4.infer<typeof ItemRequestSchema>,
        itemId: number,
    ) {
        try {
            const res = await api.put(
                `${this.url}/items/${itemId}`,
                JSON.stringify(request),
            );
            return res.data as ItemResponse;
        } catch (error) {
            handleAPIError(error);
        }
    }

    async deleteItem(itemId: number) {
        try {
            await api.delete(`${this.url}/items/${itemId}`);
            return "success";
        } catch (error) {
            handleAPIError(error);
        }
    }
}
