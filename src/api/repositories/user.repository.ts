import type z4 from "zod/v4";
import { api, handleAPIError } from "@/api/api-client";
import type { User, UserBalance } from "@/types";
import type { CommitteeQuerySchema } from "@/zod/common.schema";
import type { ProfileSchemaWithValidation } from "@/zod/user.schema";

export class UserRepository {
    url = "/users";

    async getCurrUser() {
        try {
            const res = await api.get(`${this.url}/me`);
            return res.data as User;
        } catch (_) {
            return null;
        }
    }

    async getCurrUserBalance(request: z4.infer<typeof CommitteeQuerySchema>) {
        try {
            const res = await api.get(
                `${this.url}/me/balances/committee/${request.committee}`,
            );
            return res.data as UserBalance;
        } catch (error) {
            handleAPIError(error);
        }
    }

    async getAllUserBalance() {
        try {
            const res = await api.get(`${this.url}/balances`);
            return res.data as UserBalance[];
        } catch (error) {
            handleAPIError(error);
        }
    }

    async createProfile(request: z4.infer<typeof ProfileSchemaWithValidation>) {
        try {
            const res = await api.post(this.url, JSON.stringify(request));
            return res.data as User;
        } catch (error) {
            handleAPIError(error);
        }
    }

    async updateProfile(request: z4.infer<typeof ProfileSchemaWithValidation>) {
        try {
            const res = await api.put(this.url, JSON.stringify(request));
            return res.data as User;
        } catch (error) {
            handleAPIError(error);
        }
    }
}
