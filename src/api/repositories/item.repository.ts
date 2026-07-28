import type z4 from "zod/v4";
import { api, handleAPIError } from "@/api/api-client";
import type { ItemResponse } from "@/types";
import type { ItemQuerySchema } from "@/zod/txn.schema";

export class ItemRepository {
    url = "/items";

    async getItems(request: z4.infer<typeof ItemQuerySchema>) {
        try {
            const res = await api.get(
                `${this.url}/${request.type}/${request.year}`,
            );
            return res.data as ItemResponse[];
        } catch (error) {
            handleAPIError(error);
        }
    }
}
