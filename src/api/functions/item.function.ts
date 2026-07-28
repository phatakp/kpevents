import { createServerFn } from "@tanstack/react-start";
import { withMetaLogger } from "@/api/middlewares/logging.middleware";
import { itemService } from "@/api/services/item.service";
import { ItemQuerySchema } from "@/zod/txn.schema";

export const getItems = createServerFn({
    method: "GET",
})
    .middleware([withMetaLogger("/items/{itemType}/{year}")])
    .validator(ItemQuerySchema)
    .handler(async ({ data }) => {
        return itemService.getItems(data);
    });
