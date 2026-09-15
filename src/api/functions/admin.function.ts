import { createServerFn } from "@tanstack/react-start";
import z4 from "zod/v4";
import { assertAdminMiddleware } from "@/api/middlewares/auth.middleware";
import { adminService } from "@/api/services/admin.service";
import { ControlRecordSchema } from "@/zod/common.schema";
import { ItemRequestSchema, ItemSchema } from "@/zod/txn.schema";

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

export const getAnnadaanItems = createServerFn({
    method: "GET",
}).handler(async () => {
    return adminService.getAnnadaanItems();
});

export const createItem = createServerFn({
    method: "POST",
})
    .middleware([assertAdminMiddleware])
    .validator(ItemRequestSchema)
    .handler(async ({ data }) => {
        return adminService.createItem(data);
    });

export const updateItem = createServerFn({
    method: "POST",
})
    .middleware([assertAdminMiddleware])
    .validator(ItemRequestSchema.extend({ itemId: z4.coerce.number<number>() }))
    .handler(async ({ data }) => {
        const { itemId, ...request } = data;
        return adminService.updateItem(request, itemId);
    });

export const deleteItem = createServerFn({
    method: "POST",
})
    .middleware([assertAdminMiddleware])
    .validator(ItemSchema.pick({ id: true }))
    .handler(async ({ data }) => {
        return adminService.deleteItem(data.id);
    });
