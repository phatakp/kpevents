import { v4_default } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/common.schema-rOPsTdW8.js
var BUILDING = {
	A: "A",
	B: "B",
	C: "C",
	D: "D",
	E: "E",
	F: "F",
	G: "G"
};
var BUILDING_FLOORS = {
	A: 12,
	B: 12,
	C: 11,
	D: 11,
	E: 12,
	F: 12,
	G: 12
};
var ROUTE_COMMITTEE = {
	CULTURAL: "cultural",
	TEMPLE: "temple"
};
var ROUTE_TXN_TYPE = {
	DONATION: "donation",
	EXPENSE: "expense",
	TRANSFER: "transfer"
};
var ROUTE_SUB_TYPE = {
	ANNADAAN: "annadaan",
	TEMPLE: "temple"
};
var COMMITTEE = {
	CULTURAL: "CULTURAL",
	TEMPLE: "TEMPLE"
};
var TXN_MODE = {
	CASH: "CASH",
	ONLINE: "ONLINE"
};
var TXN_TYPE = {
	DONATION: "DONATION",
	EXPENSE: "EXPENSE",
	TRANSFER: "TRANSFER"
};
var DONATION_TYPE = {
	ANNADAAN: "ANNADAAN",
	TEMPLE: "TEMPLE",
	CULTURAL: "CULTURAL",
	TEMPLE_ITEM: "TEMPLE_ITEM",
	OTHER: "OTHER"
};
var ITEM_TYPE = {
	ANNADAAN: "ANNADAAN",
	TEMPLE: "TEMPLE"
};
var USER_ROLE = {
	ADMIN: "ADMIN",
	USER: "USER"
};
var localization = {
	signUp: { start: {
		subtitle: "Create your {{applicationName}} account",
		title: "Only for Committee Members"
	} },
	signIn: { start: {
		title: "Only for Committee Members",
		subtitle: "Sign in to {{applicationName}}"
	} }
};
var BUILDING_OPTIONS = [
	BUILDING.A,
	BUILDING.B,
	BUILDING.C,
	BUILDING.D,
	BUILDING.E,
	BUILDING.F,
	BUILDING.G
];
var USER_ROLE_OPTIONS = [USER_ROLE.ADMIN, USER_ROLE.USER];
var COMMITTEE_OPTIONS = [COMMITTEE.CULTURAL, COMMITTEE.TEMPLE];
var ROUTE_COMMITTEE_OPTIONS = [ROUTE_COMMITTEE.CULTURAL, ROUTE_COMMITTEE.TEMPLE];
var ROUTE_TYPE_OPTIONS = [
	ROUTE_TXN_TYPE.DONATION,
	ROUTE_TXN_TYPE.EXPENSE,
	ROUTE_TXN_TYPE.TRANSFER
];
var ROUTE_SUBTYPE_OPTIONS = [ROUTE_SUB_TYPE.ANNADAAN, ROUTE_SUB_TYPE.TEMPLE];
var TXN_TYPE_OPTIONS = [
	TXN_TYPE.DONATION,
	TXN_TYPE.EXPENSE,
	TXN_TYPE.TRANSFER
];
var DONATION_TYPE_OPTIONS = [
	DONATION_TYPE.ANNADAAN,
	DONATION_TYPE.CULTURAL,
	DONATION_TYPE.OTHER,
	DONATION_TYPE.TEMPLE,
	DONATION_TYPE.TEMPLE_ITEM
];
var TXN_MODE_OPTIONS = [TXN_MODE.CASH, TXN_MODE.ONLINE];
var ITEM_TYPE_OPTIONS = [ITEM_TYPE.ANNADAAN, ITEM_TYPE.TEMPLE];
var SafeOptionalEnum = (enumSchema) => {
	return v4_default.preprocess((val) => val === "" ? void 0 : val, enumSchema.optional());
};
var UserRoleSchema = v4_default.enum(USER_ROLE_OPTIONS);
var BuildingSchema = v4_default.enum(BUILDING_OPTIONS);
var CommitteeSchema = v4_default.enum(COMMITTEE_OPTIONS, { error: "Committee is required" });
var DonationTypeSchema = v4_default.enum(DONATION_TYPE_OPTIONS);
var TxnTypeSchema = v4_default.enum(TXN_TYPE_OPTIONS, { error: "Txn Type is required" });
var TxnModeSchema = v4_default.enum(TXN_MODE_OPTIONS, { error: "Txn Mode is required" });
var ItemTypeSchema = v4_default.enum(ITEM_TYPE_OPTIONS);
v4_default.enum(ROUTE_COMMITTEE_OPTIONS);
v4_default.enum(ROUTE_TYPE_OPTIONS);
v4_default.enum(ROUTE_SUBTYPE_OPTIONS);
var ControlRecordSchema = v4_default.object({
	activeYear: v4_default.coerce.number(),
	isAnnadaanActive: v4_default.coerce.boolean()
});
var CommitteeBalanceSchema = v4_default.object({
	year: v4_default.coerce.number(),
	txnType: TxnTypeSchema,
	donationType: DonationTypeSchema.optional().nullable(),
	balance: v4_default.coerce.number()
}).extend({ committee: CommitteeSchema });
v4_default.object({
	building: BuildingSchema,
	amount: v4_default.coerce.number()
});
var CommitteeQuerySchema = v4_default.object({ committee: CommitteeSchema });
var OptionalCommitteeQuerySchema = v4_default.object({ committee: CommitteeSchema.optional() });
var CommitteeYearQuerySchema = CommitteeQuerySchema.extend({ year: v4_default.coerce.number() });
var CommitteeUserQuerySchema = CommitteeQuerySchema.extend({ userId: v4_default.string() });
var TxnQuerySchema = CommitteeYearQuerySchema.extend({
	txnType: TxnTypeSchema,
	building: BuildingSchema.optional(),
	donationType: DonationTypeSchema.optional()
});
var SearchSchema = v4_default.object({
	page: v4_default.coerce.number().optional(),
	building: SafeOptionalEnum(BuildingSchema),
	query: v4_default.string().optional(),
	user: v4_default.string().optional(),
	user2: v4_default.string().optional(),
	isConfirmed: v4_default.coerce.boolean().optional(),
	isBooking: v4_default.coerce.boolean().optional(),
	donationType: SafeOptionalEnum(DonationTypeSchema),
	mode: SafeOptionalEnum(TxnModeSchema)
});
//#endregion
export { BUILDING_FLOORS, BUILDING_OPTIONS, BuildingSchema, COMMITTEE, COMMITTEE_OPTIONS, CommitteeBalanceSchema, CommitteeQuerySchema, CommitteeSchema, CommitteeUserQuerySchema, CommitteeYearQuerySchema, ControlRecordSchema, DONATION_TYPE, DonationTypeSchema, ITEM_TYPE, ItemTypeSchema, OptionalCommitteeQuerySchema, ROUTE_SUB_TYPE, ROUTE_TXN_TYPE, ROUTE_TYPE_OPTIONS, SearchSchema, TXN_MODE, TXN_MODE_OPTIONS, TXN_TYPE, TXN_TYPE_OPTIONS, TxnModeSchema, TxnQuerySchema, TxnTypeSchema, USER_ROLE, UserRoleSchema, localization };
