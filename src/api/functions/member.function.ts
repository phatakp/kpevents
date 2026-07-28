import { createServerFn } from "@tanstack/react-start";
import z4 from "zod/v4";
import {
    assertAdminMiddleware,
    assertAuthMiddleware,
} from "@/api/middlewares/auth.middleware";
import { withMetaLogger } from "@/api/middlewares/logging.middleware";
import { memberService } from "@/api/services/member.service";
import { userService } from "@/api/services/user.service";
import { getUserInfo } from "@/lib/utils";
import {
    CommitteeQuerySchema,
    CommitteeUserQuerySchema,
} from "@/zod/common.schema";

export const getMembership = createServerFn({
    method: "GET",
})
    .middleware([withMetaLogger("/members/committee/{commiteeName}")])
    .validator(
        CommitteeQuerySchema.extend({
            optionsOnly: z4.coerce.boolean<boolean>().optional(),
        }),
    )
    .handler(async ({ data }) => {
        const members = await memberService.getMemberShip(data);
        if (data.optionsOnly)
            return (
                members?.map((u) => ({
                    label: getUserInfo(u),
                    value: u.clerkId,
                })) ?? []
            );
        return members ?? [];
    });

export const getAllMembers = createServerFn({
    method: "GET",
})
    .middleware([assertAdminMiddleware])
    .handler(async () => {
        return userService.getAllMembers();
    });

export const requestMemberShip = createServerFn({
    method: "POST",
})
    .middleware([
        assertAuthMiddleware,
        withMetaLogger("/members/commmittee/{committeeName}"),
    ])
    .validator(CommitteeQuerySchema)
    .handler(async ({ data }) => {
        return memberService.requestMemberShip(data);
    });

export const approveMember = createServerFn({
    method: "POST",
})
    .middleware([assertAdminMiddleware])
    .validator(CommitteeUserQuerySchema)
    .handler(async ({ data }) => {
        return memberService.approveMember(data);
    });

export const deleteMember = createServerFn({
    method: "POST",
})
    .middleware([assertAdminMiddleware])
    .validator(CommitteeUserQuerySchema)
    .handler(async ({ data }) => {
        return memberService.deleteMember(data);
    });
