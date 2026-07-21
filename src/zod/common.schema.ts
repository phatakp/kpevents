import z4 from "zod/v4";
import {
    BUILDING,
    COMMITTEE,
    DONATION_TYPE,
    ITEM_TYPE,
    ROUTE_COMMITTEE,
    ROUTE_SUB_TYPE,
    ROUTE_TXN_TYPE,
    TXN_MODE,
    TXN_TYPE,
    USER_ROLE,
} from "@/lib/constants";

export const BUILDING_OPTIONS = [
    BUILDING.A,
    BUILDING.B,
    BUILDING.C,
    BUILDING.D,
    BUILDING.E,
    BUILDING.F,
    BUILDING.G,
] as const;

export const USER_ROLE_OPTIONS = [USER_ROLE.ADMIN, USER_ROLE.USER] as const;

export const COMMITTEE_OPTIONS = [
    COMMITTEE.CULTURAL,
    COMMITTEE.TEMPLE,
] as const;

export const ROUTE_COMMITTEE_OPTIONS = [
    ROUTE_COMMITTEE.CULTURAL,
    ROUTE_COMMITTEE.TEMPLE,
] as const;

export const ROUTE_TYPE_OPTIONS = [
    ROUTE_TXN_TYPE.DONATION,
    ROUTE_TXN_TYPE.EXPENSE,
    ROUTE_TXN_TYPE.TRANSFER,
] as const;

export const ROUTE_SUBTYPE_OPTIONS = [
    ROUTE_SUB_TYPE.ANNADAAN,
    ROUTE_SUB_TYPE.TEMPLE,
] as const;

export const TXN_TYPE_OPTIONS = [
    TXN_TYPE.DONATION,
    TXN_TYPE.EXPENSE,
    TXN_TYPE.TRANSFER,
] as const;

export const DONATION_TYPE_OPTIONS = [
    DONATION_TYPE.ANNADAAN,
    DONATION_TYPE.CULTURAL,
    DONATION_TYPE.OTHER,
    DONATION_TYPE.TEMPLE,
    DONATION_TYPE.TEMPLE_ITEM,
] as const;

export const TXN_MODE_OPTIONS = [TXN_MODE.CASH, TXN_MODE.ONLINE] as const;

export const ITEM_TYPE_OPTIONS = [
    ITEM_TYPE.ANNADAAN,
    ITEM_TYPE.TEMPLE,
] as const;

export const SafeOptionalEnum = <
    T extends z4.ZodEnum<Readonly<Record<string, string>>>,
>(
    enumSchema: T,
) => {
    return z4.preprocess(
        (val) => (val === "" ? undefined : val),
        enumSchema.optional(),
    );
};

export const UserRoleSchema = z4.enum(USER_ROLE_OPTIONS);
export const BuildingSchema = z4.enum(BUILDING_OPTIONS);
export const CommitteeSchema = z4.enum(COMMITTEE_OPTIONS, {
    error: "Committee is required",
});
export const DonationTypeSchema = z4.enum(DONATION_TYPE_OPTIONS);
export const TxnTypeSchema = z4.enum(TXN_TYPE_OPTIONS, {
    error: "Txn Type is required",
});
export const TxnModeSchema = z4.enum(TXN_MODE_OPTIONS, {
    error: "Txn Mode is required",
});
export const ItemTypeSchema = z4.enum(ITEM_TYPE_OPTIONS);

export const RouteCommitteeSchema = z4.enum(ROUTE_COMMITTEE_OPTIONS);
export const RouteTypeSchema = z4.enum(ROUTE_TYPE_OPTIONS);
export const RouteSubTypeSchema = z4.enum(ROUTE_SUBTYPE_OPTIONS);

export const ControlRecordSchema = z4.object({
    activeYear: z4.coerce.number<number>(),
    isAnnadaanActive: z4.coerce.boolean<boolean>(),
});

export const BalanceStatSchema = z4.object({
    year: z4.coerce.number<number>(),
    txnType: TxnTypeSchema,
    donationType: DonationTypeSchema.optional().nullable(),
    balance: z4.coerce.number<number>(),
});

export const CommitteeBalanceSchema = BalanceStatSchema.extend({
    committee: CommitteeSchema,
});

export const DonationStatSchema = z4.object({
    building: BuildingSchema,
    amount: z4.coerce.number<number>(),
});

export const CommitteeQuerySchema = z4.object({
    committee: CommitteeSchema,
});

export const OptionalCommitteeQuerySchema = z4.object({
    committee: CommitteeSchema.optional(),
});

export const CommitteeYearQuerySchema = CommitteeQuerySchema.extend({
    year: z4.coerce.number<number>(),
});

export const CommitteeUserQuerySchema = CommitteeQuerySchema.extend({
    userId: z4.string(),
});

export const TxnQuerySchema = CommitteeYearQuerySchema.extend({
    txnType: TxnTypeSchema,
    building: BuildingSchema.optional(),
    donationType: DonationTypeSchema.optional(),
});

export const SearchSchema = z4.object({
    page: z4.coerce.number<number>().optional(),
    building: SafeOptionalEnum(BuildingSchema), // Allow empty string for "no filter"
    query: z4.string().optional(),
    user: z4.string().optional(),
    user2: z4.string().optional(),
    isConfirmed: z4.coerce.boolean<boolean>().optional(),
    isBooking: z4.coerce.boolean<boolean>().optional(),
    donationType: SafeOptionalEnum(DonationTypeSchema),
    mode: SafeOptionalEnum(TxnModeSchema),
});
