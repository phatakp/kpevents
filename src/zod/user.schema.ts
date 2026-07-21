import z4 from "zod/v4";
import { getFlatsForBuilding } from "@/lib/utils";
import {
    BalanceStatSchema,
    BuildingSchema,
    CommitteeSchema,
    UserRoleSchema,
} from "./common.schema";

export const UserMembershipSchema = z4.object({
    committee: CommitteeSchema,
    isActive: z4.coerce.boolean<boolean>(),
});

export const UserSchema = z4.object({
    clerkId: z4.string({ error: "Clerk ID is required" }),
    email: z4.email({ error: "Email is required" }),
    firstName: z4.string({ error: "First Name is required" }),
    lastName: z4
        .union([z4.string(), z4.undefined()])
        .transform((e) => (e === "" ? undefined : e)),
    imageUrl: z4
        .union([z4.string(), z4.undefined()])
        .transform((e) => (e === "" ? undefined : e)),
    building: BuildingSchema,
    role: UserRoleSchema,
    flat: z4.coerce.number<number>(),
    memberships: z4.array(UserMembershipSchema).transform((e) => e ?? []),
});

export const UserShortSchema = UserSchema.pick({
    clerkId: true,
    firstName: true,
    lastName: true,
    building: true,
    flat: true,
});

export const UserBalanceSchema = UserShortSchema.extend({
    total: z4.coerce.number<number>(),
    balances: z4.array(BalanceStatSchema),
});

export const FlatNumberSchema = z4.object({
    building: z4.union([BuildingSchema, z4.undefined()]),
    flat: z4.union([z4.coerce.number<number>(), z4.undefined()]),
});

export const ProfileSchema = UserSchema.omit({
    building: true,
    flat: true,
    role: true,
    memberships: true,
}).extend({ flatNumber: FlatNumberSchema });

export const ProfileSchemaWithValidation = ProfileSchema.check((ctx) => {
    if (
        ctx.value.flatNumber?.building &&
        ctx.value.flatNumber?.flat &&
        !getFlatsForBuilding(ctx.value.flatNumber?.building).includes(
            ctx.value.flatNumber.flat,
        )
    ) {
        ctx.issues.push({
            code: "custom",
            message: "Invalid Flat Number",
            input: ctx.value.flatNumber.flat,
            path: ["flatNumber.flat"],
            continue: true, // make this issue continuable (default: false)
        });
    }
});
