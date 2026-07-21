import z4 from "zod/v4";
import { DONATION_TYPE, TXN_TYPE } from "@/lib/constants";
import { getFlatsForBuilding } from "@/lib/utils";
import {
    BuildingSchema,
    CommitteeSchema,
    DonationTypeSchema,
    ItemTypeSchema,
    TxnModeSchema,
    TxnTypeSchema,
} from "./common.schema";
import { FlatNumberSchema, UserShortSchema } from "./user.schema";

export const BookingSchema = z4.object({
    itemId: z4.coerce.number<number>(),
    itemName: z4.string(),
    itemType: ItemTypeSchema,
    price: z4.coerce.number<number>(),
    bookingQty: z4.coerce.number<number>(),
    bookingAmt: z4.coerce.number<number>(),
    totalQty: z4.coerce.number<number>(),
    totalAmt: z4.coerce.number<number>(),
});

export const DonationSchema = z4.object({
    type: DonationTypeSchema,
    donorName: z4
        .union([z4.string(), z4.undefined()])
        .transform((e) => (e === "" ? undefined : e)),
    building: z4.union([BuildingSchema, z4.undefined()]),
    flat: z4.coerce.number<number>(),
    quantity: z4.coerce.number<number>(),
    bookings: z4.array(BookingSchema).transform((e) => e ?? []),
});

export const LinkedTransferSchema = z4.object({
    txnId: z4.string(),
    fromUserId: z4.string(),
    toUserId: z4.string(),
});

export const TransactionSchema = z4.object({
    id: z4.string(),
    description: z4
        .union([z4.string(), z4.undefined()])
        .transform((e) => (e === "" ? undefined : e)),
    amount: z4.coerce.number<number>({ error: "Amount is required" }),
    date: z4.string({ error: "Date is required" }),
    committee: CommitteeSchema,
    year: z4.coerce.number<number>({ error: "Year is required" }),
    txnUser: UserShortSchema,
    txnType: TxnTypeSchema,
    txnMode: TxnModeSchema,
    donation: DonationSchema.optional().nullable(),
});

export const PageSchema = z4.object({
    totalElements: z4.coerce.number<number>(),
    totalPages: z4.coerce.number<number>(),
    totalAmount: z4.coerce.number<number>(),
});

export const TransactionResponseSchema = PageSchema.extend({
    data: z4.array(TransactionSchema),
});

export const TransactionFormSchema = TransactionSchema.omit({
    id: true,
    txnUser: true,
    donation: true,
})
    .extend({ flatNumber: FlatNumberSchema })
    .extend({
        id: z4
            .union([z4.string(), z4.undefined()])
            .transform((e) => (e === "" ? undefined : e)),
        year: z4.coerce.number<number>({ error: "Year is required" }),
        txnUserId: z4.string({ error: "User is required" }),
        donationType: z4.union([DonationTypeSchema, z4.undefined()]),
        donorName: z4
            .union([z4.string(), z4.undefined()])
            .transform((e) => (e === "" ? undefined : e)),
        donorQuantity: z4.union([z4.coerce.number<number>(), z4.undefined()]),
        toUserId: z4
            .union([z4.string(), z4.undefined()])
            .transform((e) => (e === "" ? undefined : e)),
        bookings: z4.array(BookingSchema).transform((e) => e ?? []),
    });

export const TransactionIDSchema = TransactionSchema.pick({ id: true });

export const TransactionSchemaWithValidation = TransactionFormSchema.check(
    (ctx) => {
        if (
            ctx.value.txnType === TXN_TYPE.DONATION &&
            !ctx.value.donationType
        ) {
            ctx.issues.push({
                code: "custom",
                message: "Donation Type is required",
                input: ctx.value.donationType,
                path: ["donationType"],
                continue: true, // make this issue continuable (default: false)
            });
        }

        if (ctx.value.txnType !== TXN_TYPE.DONATION && ctx.value.donationType) {
            ctx.issues.push({
                code: "custom",
                message: `Invalid Donation Type: ${ctx.value.donationType}`,
                input: ctx.value.donationType,
                path: ["donationType"],
                continue: true, // make this issue continuable (default: false)
            });
        }

        if (ctx.value.txnType !== TXN_TYPE.DONATION && ctx.value.donorName) {
            ctx.issues.push({
                code: "custom",
                message: `Invalid Donor Name: ${ctx.value.donorName}`,
                input: ctx.value.donorName,
                path: ["donorName"],
                continue: true, // make this issue continuable (default: false)
            });
        }

        if (
            ctx.value.txnType !== TXN_TYPE.DONATION &&
            ctx.value.flatNumber?.building
        ) {
            ctx.issues.push({
                code: "custom",
                message: "Invalid Building",
                input: ctx.value.flatNumber.building,
                path: ["flatNumber.building"],
                continue: true, // make this issue continuable (default: false)
            });
        }

        if (
            ctx.value.txnType !== TXN_TYPE.DONATION &&
            ctx.value.flatNumber.flat
        ) {
            ctx.issues.push({
                code: "custom",
                message: "Invalid Flat Number",
                input: ctx.value.flatNumber.flat,
                path: ["flatNumber.flat"],
                continue: true, // make this issue continuable (default: false)
            });
        }

        if (
            ctx.value.txnType !== TXN_TYPE.DONATION &&
            ctx.value.donorQuantity
        ) {
            ctx.issues.push({
                code: "custom",
                message: "Mahaprasad count should be blank",
                input: ctx.value.donorQuantity,
                path: ["donorQuantity"],
                continue: true, // make this issue continuable (default: false)
            });
        }

        if (
            (ctx.value.txnType !== TXN_TYPE.DONATION ||
                ctx.value.donationType === DONATION_TYPE.OTHER) &&
            !ctx.value.description
        ) {
            ctx.issues.push({
                code: "custom",
                message: "Description is required",
                input: ctx.value.description,
                path: ["description"],
                continue: true, // make this issue continuable (default: false)
            });
        }

        if (
            ctx.value.donationType &&
            ctx.value.donationType !== DONATION_TYPE.OTHER &&
            !ctx.value.donorName
        ) {
            ctx.issues.push({
                code: "custom",
                message: "Donor Name is required",
                input: ctx.value.donorName,
                path: ["donorName"],
                continue: true, // make this issue continuable (default: false)
            });
        }

        if (
            ctx.value.donationType &&
            ctx.value.donationType !== DONATION_TYPE.OTHER &&
            !ctx.value.flatNumber?.building
        ) {
            ctx.issues.push({
                code: "custom",
                message: "Donor Building is required",
                input: ctx.value.flatNumber?.building,
                path: ["flatNumber.building"],
                continue: true, // make this issue continuable (default: false)
            });
        }

        if (
            ctx.value.donationType &&
            ctx.value.donationType !== DONATION_TYPE.OTHER &&
            !ctx.value.flatNumber?.flat
        ) {
            ctx.issues.push({
                code: "custom",
                message: "Donor Flat is required",
                input: ctx.value.flatNumber?.flat,
                path: ["flatNumber.flat"],
                continue: true, // make this issue continuable (default: false)
            });
        }

        if (
            ctx.value.donationType &&
            ctx.value.flatNumber?.building &&
            ctx.value.flatNumber?.flat &&
            !getFlatsForBuilding(ctx.value.flatNumber.building).includes(
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

        if (ctx.value.txnType === TXN_TYPE.TRANSFER && !ctx.value.toUserId) {
            ctx.issues.push({
                code: "custom",
                message: "Receiver is required",
                input: ctx.value.toUserId,
                path: ["toUserId"],
                continue: true, // make this issue continuable (default: false)
            });
        }

        if (ctx.value.txnType !== TXN_TYPE.TRANSFER && ctx.value.toUserId) {
            ctx.issues.push({
                code: "custom",
                message: "Receiver should be blank",
                input: ctx.value.toUserId,
                path: ["toUserId"],
                continue: true, // make this issue continuable (default: false)
            });
        }

        if (
            ctx.value.donationType &&
            (ctx.value.donationType === DONATION_TYPE.ANNADAAN ||
                ctx.value.donationType === DONATION_TYPE.TEMPLE_ITEM) &&
            ctx.value.bookings.length === 0
        ) {
            ctx.issues.push({
                code: "custom",
                message: "Items required for booking",
                input: ctx.value.bookings,
                path: ["bookings"],
                continue: true, // make this issue continuable (default: false)
            });
        }

        if (
            ctx.value.donationType &&
            !(
                ctx.value.donationType === DONATION_TYPE.ANNADAAN ||
                ctx.value.donationType === DONATION_TYPE.TEMPLE_ITEM
            ) &&
            ctx.value.bookings.length > 0
        ) {
            ctx.issues.push({
                code: "custom",
                message: "Item booking should be blank",
                input: ctx.value.bookings,
                path: ["bookings"],
                continue: true, // make this issue continuable (default: false)
            });
        }
    },
);

export const ItemSchema = z4.object({
    id: z4.coerce.number<number>(),
    itemName: z4.string(),
    price: z4.coerce.number<number>(),
    quantity: z4.coerce.number<number>(),
    amount: z4.coerce.number<number>(),
    availableQty: z4.coerce.number<number>(),
    availableAmt: z4.coerce.number<number>(),
    type: ItemTypeSchema,
});

export const ItemQuerySchema = ItemSchema.pick({ type: true }).extend({
    year: z4.coerce.number<number>(),
});
