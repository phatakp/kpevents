import type z4 from "zod/v4";
import { AdminRepository } from "@/api/repositories/admin.repository";
import type { ControlRecordSchema } from "@/zod/common.schema";
import type { ItemRequestSchema } from "@/zod/txn.schema";

class AdminService {
    private repo = new AdminRepository();

    async getConfig() {
        return this.repo.getConfig();
    }

    async updateConfig(request: z4.infer<typeof ControlRecordSchema>) {
        return this.repo.updateConfig(request);
    }

    async getAnnadaanItems() {
        return this.repo.getAnnadaanItems();
    }

    async createItem(request: z4.infer<typeof ItemRequestSchema>) {
        return this.repo.createItem(request);
    }

    async updateItem(
        request: z4.infer<typeof ItemRequestSchema>,
        itemId: number,
    ) {
        return this.repo.updateItem(request, itemId);
    }

    async deleteItem(itemId: number) {
        return this.repo.deleteItem(itemId);
    }
}

export const adminService = new AdminService();
