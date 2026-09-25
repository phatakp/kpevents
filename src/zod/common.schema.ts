import z4 from "zod/v4";
import {
    BUILDING,
    COMMITTEE,
    DONATION_TYPE,
    ITEM_TYPE,
    MEMBER_STATUS,
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

export const MEMBER_STATUS_OPTIONS = [
    MEMBER_STATUS.ACTIVE,
    MEMBER_STATUS.INACTIVE,
    MEMBER_STATUS.NON,
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
export const MemberStatusSchema = z4.enum(MEMBER_STATUS_OPTIONS);
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
    activeYear: z4.coerce.number<number>().min(2025).max(2100),
    isAnnadaanActive: z4.coerce.boolean<boolean>(),
});

export const BalanceStatSchema = z4.object({
    year: z4.coerce.number<number>(),
    txnType: TxnTypeSchema,
    donationType: DonationTypeSchema.optional().nullable(),
    balance: z4.coerce.number<number>(),
});

export const CommitteeTotalSchema = z4.object({
    committee: CommitteeSchema,
    total: z4.coerce.number<number>(),
});

export const YearTotalSchema = z4.object({
    year: z4.coerce.number<number>(),
    total: z4.coerce.number<number>(),
});

export const YearTxnTypeTotalSchema = YearTotalSchema.extend({
    txnType: TxnTypeSchema,
});

export const YearDonationTypeTotalSchema = YearTotalSchema.extend({
    donationType: DonationTypeSchema,
});

export const CommitteeBalanceSchema = CommitteeTotalSchema.extend({
    balanceByYear: z4.array(YearTotalSchema),
    balanceByYearAndTxnType: z4.array(YearTxnTypeTotalSchema),
    balanceByYearAndDonationType: z4.array(YearDonationTypeTotalSchema),
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

export const SearchSchema = z4.object({
    building: BuildingSchema.optional(), // Allow empty string for "no filter"
    donationType: DonationTypeSchema.optional(),
    txnMode: TxnModeSchema.optional(),
    txnUserId: z4.string().optional(),
    userName: z4.string().optional(),
    searchTerm: z4.string().optional(),
    page: z4.coerce.number<number>().optional(),
    size: z4.coerce.number<number>().optional(),
    isConfirmed: z4.coerce.boolean<boolean>().optional(),
    isBooking: z4.coerce.boolean<boolean>().optional(),
});

export const TxnQuerySchema = z4
    .object({
        ...CommitteeYearQuerySchema.shape,
        ...SearchSchema.shape,
    })
    .extend({
        txnType: TxnTypeSchema,
    });

export const PageMetaSchema = z4.object({
    currentPage: z4.coerce.number<number>(),
    pageSize: z4.coerce.number<number>(),
    totalElements: z4.coerce.number<number>(),
    totalPages: z4.coerce.number<number>(),
    isFirst: z4.coerce.boolean<boolean>(),
    isLast: z4.coerce.boolean<boolean>(),
});
