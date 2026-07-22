import { v4_default } from "../_libs/zod.mjs";
import { BUILDING_FLOORS, BalanceStatSchema, BuildingSchema, COMMITTEE, CommitteeSchema, DONATION_TYPE, TXN_MODE, TXN_TYPE, UserRoleSchema } from "./common.schema-CKnvY_hu.mjs";
import { formOptions } from "../_libs/@tanstack/form-core+[...].mjs";
import { clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { format } from "../_libs/date-fns.mjs";
import { twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/user.schema-YGQQHiqC.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function isValidDate(date) {
	if (!date) return false;
	return !Number.isNaN(date.getTime());
}
function amountFormatter(val, decimalPlaces = 0) {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		currencyDisplay: "code",
		minimumFractionDigits: decimalPlaces,
		maximumFractionDigits: decimalPlaces
	}).formatToParts(val).map((p) => p.type !== "literal" && p.type !== "currency" ? p.value : "").join("");
}
function amountShortener(val) {
	if (val < 1e3) return val;
	if (val < 1e5) return `${(val / 1e3).toFixed(2)}K`;
	return `${(val / 1e5).toFixed(2)}L`;
}
function getFlatsForBuilding(building) {
	const floors = BUILDING_FLOORS[building];
	const result = [];
	for (let i = 1; i <= floors; i++) for (let j = 1; j <= 4; j++) result.push(i * 100 + j);
	return result;
}
var getUserInfo = (user) => {
	if (!user) return "";
	return `${user.firstName.toLowerCase()} ${user.lastName?.toLowerCase()} (${user.building}-${user.flat})`;
};
var getUserOptions = (filteredTxns) => {
	const users = Object.groupBy(filteredTxns ?? [], (u) => `${getUserInfo(u.txnUser)}`);
	return Object.entries(users).filter(([_, txns]) => txns && txns.length > 0).map(([key, txns]) => ({
		value: txns?.[0].txnUser.clerkId,
		label: key
	}));
};
var getPaidByOptions = (filteredTxns) => {
	const users = Object.groupBy(filteredTxns ?? [], (u) => `${u.description?.toLowerCase().replace("received from", "")}`);
	return Object.entries(users).filter(([_, txns]) => txns && txns.length > 0).map(([key, _]) => ({
		value: key,
		label: key
	}));
};
var getFilteredTxns = (txns, filters) => txns.filter((t) => filters.mode ? t.txnMode === filters.mode : true).filter((t) => filters.user ? t.txnUser.clerkId === filters.user : true).filter((t) => filters.user2 && t.txnType === TXN_TYPE.TRANSFER ? t.description?.toLowerCase().includes(filters.user2.toLowerCase()) : true).filter((t) => {
	if (!filters.query) return true;
	const donor = t.donation?.donorName?.toLowerCase();
	const flat = donor ? `${t.donation?.building}${t.donation?.flat}`.toLowerCase() : void 0;
	let searchTerm = filters.query.toLowerCase();
	if (searchTerm.includes("-")) searchTerm = searchTerm.replace("-", "");
	return donor?.includes(searchTerm) || flat?.includes(searchTerm) || t.description?.toLowerCase().includes(searchTerm);
});
var getDefaultFormOptions = ({ committee, year, donationType, txn, fromUserId, loggedInUserId, items }) => formOptions({ defaultValues: {
	id: txn?.id,
	amount: txn?.amount ? txn.amount < 0 ? txn.amount * -1 : txn.amount : 0,
	date: format(txn?.date ? new Date(txn.date) : /* @__PURE__ */ new Date(), "yyyy-MM-dd"),
	committee: txn?.committee ?? committee,
	year: txn?.year ?? year,
	txnUserId: fromUserId ?? txn?.txnUser.clerkId ?? loggedInUserId,
	txnType: txn?.txnType ?? TXN_TYPE.DONATION,
	txnMode: txn?.txnMode ?? TXN_MODE.ONLINE,
	donationType: txn ? txn.donation?.type : donationType ?? (committee === COMMITTEE.CULTURAL ? DONATION_TYPE.CULTURAL : DONATION_TYPE.TEMPLE),
	description: txn?.description ?? void 0,
	donorName: txn?.donation?.donorName ?? void 0,
	flatNumber: {
		building: txn?.donation?.building ?? void 0,
		flat: txn?.donation?.flat ?? void 0
	},
	donorQuantity: txn?.donation?.quantity ?? void 0,
	toUserId: txn?.txnType === TXN_TYPE.TRANSFER ? txn.txnUser.clerkId : void 0,
	bookings: txn?.donation?.bookings ?? items ?? []
} });
function getStepAmount(currAmt) {
	return currAmt > 1e5 ? 1e4 : currAmt > 5e4 ? 5e3 : currAmt > 1e4 ? 1e3 : currAmt > 1e3 ? 500 : 100;
}
function getStepQty(currQty) {
	return currQty > 20 ? 2 : currQty > 2 ? 1 : .5;
}
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
UserShortSchema.extend({
	total: v4_default.coerce.number(),
	balances: v4_default.array(BalanceStatSchema)
});
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
export { FlatNumberSchema, ProfileSchemaWithValidation, UserShortSchema, amountFormatter, amountShortener, cn, getDefaultFormOptions, getFilteredTxns, getFlatsForBuilding, getPaidByOptions, getStepAmount, getStepQty, getUserInfo, getUserOptions, isValidDate };
