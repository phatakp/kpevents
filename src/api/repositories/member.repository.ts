import type z4 from "zod/v4";
import { api, handleAPIError } from "@/api/api-client";
import type { User } from "@/types";
import type { CommitteeQuerySchema } from "@/zod/common.schema";

export class MemberRepository {
    url = "/members";

    async getMemberShip(request: z4.infer<typeof CommitteeQuerySchema>) {
        try {
            const res = await api.get(
                `${this.url}/committee/${request.committee}`,
            );
            return res.data as User[];
        } catch (_) {
            return null;
        }
    }

    async requestMembership(request: z4.infer<typeof CommitteeQuerySchema>) {
        try {
            await api.post(`${this.url}/committee/${request.committee}`);
            return "success";
        } catch (error) {
            handleAPIError(error);
        }
    }
}
