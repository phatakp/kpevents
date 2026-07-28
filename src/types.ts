import type z4 from "zod/v4";
import type {
    BalanceStatSchema,
    BuildingSchema,
    CommitteeBalanceSchema,
    CommitteeQuerySchema,
    CommitteeSchema,
    CommitteeYearQuerySchema,
    ControlRecordSchema,
    DonationStatSchema,
    DonationTypeSchema,
    ItemTypeSchema,
    RouteCommitteeSchema,
    RouteSubTypeSchema,
    RouteTypeSchema,
    TxnModeSchema,
    TxnQuerySchema,
    TxnTypeSchema,
    UserRoleSchema,
} from "./zod/common.schema";
import type {
    BookingSchema,
    DonationSchema,
    ItemQuerySchema,
    ItemSchema,
    LinkedTransferSchema,
    PageSchema,
    TransactionResponseSchema,
    TransactionSchema,
    TransactionSchemaWithValidation,
} from "./zod/txn.schema";
import type {
    UserBalanceSchema,
    UserMembershipSchema,
    UserSchema,
    UserShortSchema,
} from "./zod/user.schema";

export type APIErrResponse = {
    errorCode: string;
    errorDescription: string;
    timestamp: string;
    fieldErrors: Record<string, string>[] | null;
};

// Utility type to fix optional types
type Evaluate<T> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Evaluate<
    Omit<T, K> & { [P in K]?: Exclude<T[P], undefined> }
>;

export type Building = z4.infer<typeof BuildingSchema>;
export type Committee = z4.infer<typeof CommitteeSchema>;
export type TxnType = z4.infer<typeof TxnTypeSchema>;
export type DonationType = z4.infer<typeof DonationTypeSchema>;
export type ItemType = z4.infer<typeof ItemTypeSchema>;
export type TxnMode = z4.infer<typeof TxnModeSchema>;
export type UserRole = z4.infer<typeof UserRoleSchema>;
export type Control = z4.infer<typeof ControlRecordSchema>;

export type RouteType = z4.infer<typeof RouteTypeSchema>;
export type RouteCommittee = z4.infer<typeof RouteCommitteeSchema>;
export type RouteSubType = z4.infer<typeof RouteSubTypeSchema>;

export type UserMembership = z4.infer<typeof UserMembershipSchema>;
export type User = z4.infer<typeof UserSchema>;
export type UserShort = z4.infer<typeof UserShortSchema>;

export type BalanceStat = z4.infer<typeof BalanceStatSchema>;
export type CommitteeBalance = z4.infer<typeof CommitteeBalanceSchema>;
export type UserBalance = z4.infer<typeof UserBalanceSchema>;
export type DonationStat = z4.infer<typeof DonationStatSchema>;

export type Booking = z4.infer<typeof BookingSchema>;
export type Donation = z4.infer<typeof DonationSchema>;

export type LinkedTransfer = z4.infer<typeof LinkedTransferSchema>;
export type Transaction = z4.infer<typeof TransactionSchema>;
export type PageInfo = z4.infer<typeof PageSchema>;
export type TransactionResponse = z4.infer<typeof TransactionResponseSchema>;

export type CommitteeQueryOptions = z4.infer<typeof CommitteeQuerySchema>;
export type CommitteeYearQueryOptions = z4.infer<
    typeof CommitteeYearQuerySchema
>;
export type TxnQueryOptions = z4.infer<typeof TxnQuerySchema>;

export type TxnFormValues = z4.infer<typeof TransactionSchemaWithValidation>;

export type ItemResponse = z4.infer<typeof ItemSchema>;
export type ItemQueryOptions = z4.infer<typeof ItemQuerySchema>;

export type BookingRequest = z4.infer<typeof BookingSchema>;
export type SelectOption = { label: string; value: string };
