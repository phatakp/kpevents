import { v4_default } from "../_libs/zod.mjs";
import { BuildingSchema, CommitteeSchema, DONATION_TYPE, DonationTypeSchema, ItemTypeSchema, TXN_TYPE, TxnModeSchema, TxnTypeSchema } from "./common.schema-CKnvY_hu.mjs";
import { FlatNumberSchema, UserShortSchema, getFlatsForBuilding } from "./user.schema-YGQQHiqC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/txn.schema-Cr59gknt.js
var BookingSchema = v4_default.object({
	itemId: v4_default.coerce.number(),
	itemName: v4_default.string(),
	itemType: ItemTypeSchema,
	price: v4_default.coerce.number(),
	bookingQty: v4_default.coerce.number(),
	bookingAmt: v4_default.coerce.number(),
	totalQty: v4_default.coerce.number(),
	totalAmt: v4_default.coerce.number()
});
var DonationSchema = v4_default.object({
	type: DonationTypeSchema,
	donorName: v4_default.union([v4_default.string(), v4_default.undefined()]).transform((e) => e === "" ? void 0 : e),
	building: v4_default.union([BuildingSchema, v4_default.undefined()]),
	flat: v4_default.coerce.number(),
	quantity: v4_default.coerce.number(),
	bookings: v4_default.array(BookingSchema).transform((e) => e ?? [])
});
v4_default.object({
	txnId: v4_default.string(),
	fromUserId: v4_default.string(),
	toUserId: v4_default.string()
});
var TransactionSchema = v4_default.object({
	id: v4_default.string(),
	description: v4_default.union([v4_default.string(), v4_default.undefined()]).transform((e) => e === "" ? void 0 : e),
	amount: v4_default.coerce.number({ error: "Amount is required" }),
	date: v4_default.string({ error: "Date is required" }),
	committee: CommitteeSchema,
	year: v4_default.coerce.number({ error: "Year is required" }),
	txnUser: UserShortSchema,
	txnType: TxnTypeSchema,
	txnMode: TxnModeSchema,
	donation: DonationSchema.optional().nullable()
});
v4_default.object({
	totalElements: v4_default.coerce.number(),
	totalPages: v4_default.coerce.number(),
	totalAmount: v4_default.coerce.number()
}).extend({ data: v4_default.array(TransactionSchema) });
var TransactionFormSchema = TransactionSchema.omit({
	id: true,
	txnUser: true,
	donation: true
}).extend({ flatNumber: FlatNumberSchema }).extend({
	id: v4_default.union([v4_default.string(), v4_default.undefined()]).transform((e) => e === "" ? void 0 : e),
	year: v4_default.coerce.number({ error: "Year is required" }),
	txnUserId: v4_default.string({ error: "User is required" }),
	donationType: v4_default.union([DonationTypeSchema, v4_default.undefined()]),
	donorName: v4_default.union([v4_default.string(), v4_default.undefined()]).transform((e) => e === "" ? void 0 : e),
	donorQuantity: v4_default.union([v4_default.coerce.number(), v4_default.undefined()]),
	toUserId: v4_default.union([v4_default.string(), v4_default.undefined()]).transform((e) => e === "" ? void 0 : e),
	bookings: v4_default.array(BookingSchema).transform((e) => e ?? [])
});
var TransactionIDSchema = TransactionSchema.pick({ id: true });
var TransactionSchemaWithValidation = TransactionFormSchema.check((ctx) => {
	if (ctx.value.txnType === TXN_TYPE.DONATION && !ctx.value.donationType) ctx.issues.push({
		code: "custom",
		message: "Donation Type is required",
		input: ctx.value.donationType,
		path: ["donationType"],
		continue: true
	});
	if (ctx.value.txnType !== TXN_TYPE.DONATION && ctx.value.donationType) ctx.issues.push({
		code: "custom",
		message: `Invalid Donation Type: ${ctx.value.donationType}`,
		input: ctx.value.donationType,
		path: ["donationType"],
		continue: true
	});
	if (ctx.value.txnType !== TXN_TYPE.DONATION && ctx.value.donorName) ctx.issues.push({
		code: "custom",
		message: `Invalid Donor Name: ${ctx.value.donorName}`,
		input: ctx.value.donorName,
		path: ["donorName"],
		continue: true
	});
	if (ctx.value.txnType !== TXN_TYPE.DONATION && ctx.value.flatNumber?.building) ctx.issues.push({
		code: "custom",
		message: "Invalid Building",
		input: ctx.value.flatNumber.building,
		path: ["flatNumber.building"],
		continue: true
	});
	if (ctx.value.txnType !== TXN_TYPE.DONATION && ctx.value.flatNumber.flat) ctx.issues.push({
		code: "custom",
		message: "Invalid Flat Number",
		input: ctx.value.flatNumber.flat,
		path: ["flatNumber.flat"],
		continue: true
	});
	if (ctx.value.txnType !== TXN_TYPE.DONATION && ctx.value.donorQuantity) ctx.issues.push({
		code: "custom",
		message: "Mahaprasad count should be blank",
		input: ctx.value.donorQuantity,
		path: ["donorQuantity"],
		continue: true
	});
	if ((ctx.value.txnType !== TXN_TYPE.DONATION || ctx.value.donationType === DONATION_TYPE.OTHER) && !ctx.value.description) ctx.issues.push({
		code: "custom",
		message: "Description is required",
		input: ctx.value.description,
		path: ["description"],
		continue: true
	});
	if (ctx.value.donationType && ctx.value.donationType !== DONATION_TYPE.OTHER && !ctx.value.donorName) ctx.issues.push({
		code: "custom",
		message: "Donor Name is required",
		input: ctx.value.donorName,
		path: ["donorName"],
		continue: true
	});
	if (ctx.value.donationType && ctx.value.donationType !== DONATION_TYPE.OTHER && !ctx.value.flatNumber?.building) ctx.issues.push({
		code: "custom",
		message: "Donor Building is required",
		input: ctx.value.flatNumber?.building,
		path: ["flatNumber.building"],
		continue: true
	});
	if (ctx.value.donationType && ctx.value.donationType !== DONATION_TYPE.OTHER && !ctx.value.flatNumber?.flat) ctx.issues.push({
		code: "custom",
		message: "Donor Flat is required",
		input: ctx.value.flatNumber?.flat,
		path: ["flatNumber.flat"],
		continue: true
	});
	if (ctx.value.donationType && ctx.value.flatNumber?.building && ctx.value.flatNumber?.flat && !getFlatsForBuilding(ctx.value.flatNumber.building).includes(ctx.value.flatNumber.flat)) ctx.issues.push({
		code: "custom",
		message: "Invalid Flat Number",
		input: ctx.value.flatNumber.flat,
		path: ["flatNumber.flat"],
		continue: true
	});
	if (ctx.value.txnType === TXN_TYPE.TRANSFER && !ctx.value.toUserId) ctx.issues.push({
		code: "custom",
		message: "Receiver is required",
		input: ctx.value.toUserId,
		path: ["toUserId"],
		continue: true
	});
	if (ctx.value.txnType !== TXN_TYPE.TRANSFER && ctx.value.toUserId) ctx.issues.push({
		code: "custom",
		message: "Receiver should be blank",
		input: ctx.value.toUserId,
		path: ["toUserId"],
		continue: true
	});
	if (ctx.value.donationType && (ctx.value.donationType === DONATION_TYPE.ANNADAAN || ctx.value.donationType === DONATION_TYPE.TEMPLE_ITEM) && ctx.value.bookings.length === 0) ctx.issues.push({
		code: "custom",
		message: "Items required for booking",
		input: ctx.value.bookings,
		path: ["bookings"],
		continue: true
	});
	if (ctx.value.donationType && !(ctx.value.donationType === DONATION_TYPE.ANNADAAN || ctx.value.donationType === DONATION_TYPE.TEMPLE_ITEM) && ctx.value.bookings.length > 0) ctx.issues.push({
		code: "custom",
		message: "Item booking should be blank",
		input: ctx.value.bookings,
		path: ["bookings"],
		continue: true
	});
});
var ItemQuerySchema = v4_default.object({
	id: v4_default.coerce.number(),
	itemName: v4_default.string(),
	price: v4_default.coerce.number(),
	quantity: v4_default.coerce.number(),
	amount: v4_default.coerce.number(),
	availableQty: v4_default.coerce.number(),
	availableAmt: v4_default.coerce.number(),
	type: ItemTypeSchema
}).pick({ type: true }).extend({ year: v4_default.coerce.number() });
//#endregion
export { ItemQuerySchema, TransactionIDSchema, TransactionSchemaWithValidation };
