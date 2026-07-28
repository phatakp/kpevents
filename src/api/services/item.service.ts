import type z4 from "zod/v4";
import { ItemRepository } from "@/api/repositories/item.repository";
import type { ItemQuerySchema } from "@/zod/txn.schema";

class ItemService {
    private repo = new ItemRepository();

    async getItems(request: z4.infer<typeof ItemQuerySchema>) {
        return this.repo.getItems(request);
    }
}
export const itemService = new ItemService();
