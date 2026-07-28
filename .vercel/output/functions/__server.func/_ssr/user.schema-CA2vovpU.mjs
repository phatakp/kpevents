import { v4_default } from "../_libs/zod.mjs";
import { BuildingSchema, CommitteeBalanceSchema, CommitteeSchema, UserRoleSchema } from "./common.schema-rOPsTdW8.mjs";
import { getFlatsForBuilding } from "./utils-lKLyXhB7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/user.schema-CA2vovpU.js
var UserMembershipSchema = v4_default.object({
	committee: CommitteeSchema,
	isActive: v4_default.coerce.boolean()
});
var UserSchema = v4_default.object({
	clerkId: v4_default.string({ error: "Clerk ID is required" }),
	email: v4_default.email({ error: "Email is required" }),
	firstName: v4_default.string({ error: "First Name is required" }),
	lastName: v4_default.union([v4_default.string(), v4_default.undefined()]).transform((e) => e === "" ? void 0 : e),
	imageUrl: v4_default.union([v4_default.string(), v4_default.undefined()]).transform((e) => e === "" ? void 0 : e),
	building: BuildingSchema,
	role: UserRoleSchema,
	flat: v4_default.coerce.number(),
	memberships: v4_default.array(UserMembershipSchema).transform((e) => e ?? [])
});
var UserShortSchema = UserSchema.pick({
	clerkId: true,
	firstName: true,
	lastName: true,
	building: true,
	flat: true
});
v4_default.intersection(UserShortSchema, CommitteeBalanceSchema);
var FlatNumberSchema = v4_default.object({
	building: v4_default.union([BuildingSchema, v4_default.undefined()]),
	flat: v4_default.union([v4_default.coerce.number(), v4_default.undefined()])
});
var ProfileSchemaWithValidation = UserSchema.omit({
	building: true,
	flat: true,
	role: true,
	memberships: true
}).extend({ flatNumber: FlatNumberSchema }).check((ctx) => {
	if (ctx.value.flatNumber?.building && ctx.value.flatNumber?.flat && !getFlatsForBuilding(ctx.value.flatNumber?.building).includes(ctx.value.flatNumber.flat)) ctx.issues.push({
		code: "custom",
		message: "Invalid Flat Number",
		input: ctx.value.flatNumber.flat,
		path: ["flatNumber.flat"],
		continue: true
	});
});
//#endregion
export { FlatNumberSchema, ProfileSchemaWithValidation, UserShortSchema };
