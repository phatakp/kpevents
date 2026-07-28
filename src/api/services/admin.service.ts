import type z4 from "zod/v4";
import { AdminRepository } from "@/api/repositories/admin.repository";
import type { ControlRecordSchema } from "@/zod/common.schema";

class AdminService {
    private repo = new AdminRepository();

    async getConfig() {
        return this.repo.getConfig();
    }

    async updateConfig(request: z4.infer<typeof ControlRecordSchema>) {
        return this.repo.updateConfig(request);
    }
}

export const adminService = new AdminService();
