import { createServerFn } from "@tanstack/react-start";
import z4 from "zod/v4";
import { assertAdminMiddleware } from "@/backend/middlewares/auth.middleware";
import { api, handleAPIError } from "@/integrations/axios";
import type { Control, User } from "@/types";
import { CommitteeUserQuerySchema } from "@/zod/common.schema";

export const getConfig = createServerFn({
    method: "GET",
}).handler(async () => {
    const res = await api.get(`/admin/config`);
    return res.data as Control;
});

export const updateConfigYear = createServerFn({
    method: "POST",
})
    .middleware([assertAdminMiddleware])
    .validator(
        z4.object({
            year: z4.coerce.number<number>(),
            isAnnadaanActive: z4.coerce.boolean<boolean>(),
        }),
    )
    .handler(async ({ data }) => {
        const res = await api.put(
            `/control`,
            JSON.stringify({
                activeYear: data.year,
                isAnnadaanActive: data.isAnnadaanActive,
            }),
        );
        return res.data as Control;
    });

export const getPendingMembers = createServerFn({
    method: "GET",
})
    .middleware([assertAdminMiddleware])
    .handler(async () => {
        try {
            const res = await api.get(`/admin/members`);
            return res.data as User[];
        } catch (e) {
            handleAPIError(e);
        }
    });

export const approveMember = createServerFn({
    method: "POST",
})
    .middleware([assertAdminMiddleware])
    .validator(CommitteeUserQuerySchema)
    .handler(async ({ data }) => {
        try {
            await api.put(
                `/admin/members/approve`,
                JSON.stringify({ ...data }),
            );
            return "success";
        } catch (error) {
            handleAPIError(error);
        }
    });

export const deleteMember = createServerFn({
    method: "POST",
})
    .middleware([assertAdminMiddleware])
    .validator(CommitteeUserQuerySchema)
    .handler(async ({ data }) => {
        try {
            await api.post(
                `/admin/members/delete`,
                JSON.stringify({ ...data }),
            );
            return "success";
        } catch (error) {
            handleAPIError(error);
        }
    });
