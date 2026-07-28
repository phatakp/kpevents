import { createServerFn } from "@tanstack/react-start";
import {
    assertAuthMiddleware,
    authMiddleware,
} from "@/api/middlewares/auth.middleware";
import { withMetaLogger } from "@/api/middlewares/logging.middleware";
import { userService } from "@/api/services/user.service";
import { ProfileSchemaWithValidation } from "@/zod/user.schema";

export const getCurrUserFromDB = createServerFn({
    method: "GET",
})
    .middleware([authMiddleware, withMetaLogger("/users/me")])
    .handler(async ({ context }) => {
        if (!context.userId) return null;
        return userService.getCurrUser();
    });

export const getAllUserBalances = createServerFn({
    method: "GET",
})
    .middleware([assertAuthMiddleware, withMetaLogger("/users/balances")])
    .handler(async () => {
        return userService.getAllUserBalance();
    });

export const createProfile = createServerFn({
    method: "POST",
})
    .middleware([assertAuthMiddleware, withMetaLogger("/users")])
    .validator(ProfileSchemaWithValidation)
    .handler(async ({ data }) => {
        return userService.createProfile(data);
    });

export const updateProfile = createServerFn({
    method: "POST",
})
    .middleware([assertAuthMiddleware, withMetaLogger("/users")])
    .validator(ProfileSchemaWithValidation)
    .handler(async ({ data }) => {
        return userService.updateProfile(data);
    });
