import { createServerFn } from "@tanstack/react-start";
import {
    assertAuthMiddleware,
    authMiddleware,
} from "@/backend/middlewares/auth.middleware";
import { api, handleAPIError } from "@/integrations/axios";
import type { User, UserBalance } from "@/types";
import { CommitteeQuerySchema } from "@/zod/common.schema";
import { ProfileSchemaWithValidation } from "@/zod/user.schema";
// import { withMetaLogger } from "../middlewares/logging.middleware";

// Backend services
export const getCurrUserFromDB = createServerFn({
    method: "GET",
})
    .middleware([
        authMiddleware,
        // withMetaLogger("/users/me")
    ])
    .handler(async ({ context }) => {
        if (!context.userId) return null;
        try {
            const res = await api.get(`/users/me`);
            return res.data as User | null;
        } catch (_e) {
            return null;
        }
    });

export const createProfile = createServerFn({
    method: "POST",
})
    .middleware([
        assertAuthMiddleware,
        // withMetaLogger("/users")
    ])
    .validator(ProfileSchemaWithValidation)
    .handler(async ({ data }) => {
        try {
            const res = await api.post(`/users`, JSON.stringify({ ...data }));
            return res.data as User | null;
        } catch (error) {
            handleAPIError(error);
        }
    });

export const updateProfile = createServerFn({
    method: "POST",
})
    .middleware([
        assertAuthMiddleware,
        // withMetaLogger("/users")
    ])
    .validator(ProfileSchemaWithValidation)
    .handler(async ({ data }) => {
        try {
            const res = await api.put(`/users`, JSON.stringify({ ...data }));
            return res.data as User | null;
        } catch (error) {
            handleAPIError(error);
        }
    });

export const becomeMember = createServerFn({
    method: "POST",
})
    .middleware([
        assertAuthMiddleware,
        // withMetaLogger("/members/commmittee/<name>"),
    ])
    .validator(CommitteeQuerySchema)
    .handler(async ({ data }) => {
        try {
            await api.post(`/members/committee/${data.committee}`);
            return "success";
        } catch (error) {
            handleAPIError(error);
        }
    });

export const getMembersByCommittee = createServerFn({
    method: "GET",
})
    // .middleware([withMetaLogger("/members/committee/<name>")])
    .validator(CommitteeQuerySchema)
    .handler(async ({ data }) => {
        try {
            const res = await api.get(`/members/committee/${data.committee}`);
            return res.data as User[];
        } catch (e) {
            handleAPIError(e);
        }
    });

export const getCurrUserBalancesByCommittee = createServerFn({
    method: "GET",
})
    .middleware([
        assertAuthMiddleware,
        // withMetaLogger("/users/me/balances/committee/<name>"),
    ])
    .validator(CommitteeQuerySchema)
    .handler(async ({ data }) => {
        try {
            const res = await api.get(
                `/users/me/balances/committee/${data.committee}`,
            );
            return res.data as UserBalance;
        } catch (error) {
            handleAPIError(error);
        }
    });

export const getMemberBalancesByCommittee = createServerFn({
    method: "GET",
})
    .middleware([
        assertAuthMiddleware,
        // withMetaLogger("/users/balances/committee/<name>"),
    ])
    .validator(CommitteeQuerySchema)
    .handler(async ({ data }) => {
        try {
            const res = await api.get(
                `/users/balances/committee/${data.committee}`,
            );
            return res.data as UserBalance[];
        } catch (error) {
            handleAPIError(error);
        }
    });
