import type z4 from "zod/v4";
import { AdminRepository } from "@/api/repositories/admin.repository";
import { MemberRepository } from "@/api/repositories/member.repository";
import type {
    CommitteeQuerySchema,
    CommitteeUserQuerySchema,
} from "@/zod/common.schema";

class MemberService {
    private repo = new MemberRepository();
    private adminRepo = new AdminRepository();

    async requestMemberShip(request: z4.infer<typeof CommitteeQuerySchema>) {
        return this.repo.requestMembership(request);
    }

    async getMemberShip(request: z4.infer<typeof CommitteeQuerySchema>) {
        return this.repo.getMemberShip(request);
    }

    async approveMember(request: z4.infer<typeof CommitteeUserQuerySchema>) {
        return this.adminRepo.approveMember(request);
    }

    async deleteMember(request: z4.infer<typeof CommitteeUserQuerySchema>) {
        return this.adminRepo.deleteMember(request);
    }
}

export const memberService = new MemberService();
