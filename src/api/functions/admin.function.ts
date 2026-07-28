import { createServerFn } from "@tanstack/react-start";
import { assertAdminMiddleware } from "@/api/middlewares/auth.middleware";
import { adminService } from "@/api/services/admin.service";
import { ControlRecordSchema } from "@/zod/common.schema";

export const getConfig = createServerFn({
    method: "GET",
}).handler(async () => {
    return adminService.getConfig();
});

export const updateConfig = createServerFn({
    method: "POST",
})
    .middleware([assertAdminMiddleware])
    .validator(ControlRecordSchema)
    .handler(async ({ data }) => {
        return adminService.updateConfig(data);
    });
