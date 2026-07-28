import type z4 from "zod/v4";
import { AdminRepository } from "@/api/repositories/admin.repository";
import { UserRepository } from "@/api/repositories/user.repository";
import type { ProfileSchemaWithValidation } from "@/zod/user.schema";

class UserService {
    private repo = new UserRepository();
    private adminRepo = new AdminRepository();

    async getCurrUser() {
        return this.repo.getCurrUser();
    }

    async getAllMembers() {
        return this.adminRepo.getAllMembers();
    }

    async getAllUserBalance() {
        return this.repo.getAllUserBalance();
    }

    async createProfile(request: z4.infer<typeof ProfileSchemaWithValidation>) {
        return this.repo.createProfile(request);
    }

    async updateProfile(request: z4.infer<typeof ProfileSchemaWithValidation>) {
        return this.repo.updateProfile(request);
    }
}

export const userService = new UserService();
