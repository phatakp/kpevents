import { formOptions } from "@tanstack/react-form";
import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { formatDate as formatDateFns } from "date-fns";
import { twMerge } from "tailwind-merge";
import type z4 from "zod/v4";
import type {
    BookingRequest,
    Building,
    Committee,
    DonationType,
    Transaction,
    UserShort,
} from "@/types";
import type { SearchSchema } from "@/zod/common.schema";
import {
    BUILDING_FLOORS,
    COMMITTEE,
    DONATION_TYPE,
    PER_FLOOR_FLATS,
    TXN_MODE,
    TXN_TYPE,
} from "./constants";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(date: Date | undefined) {
    if (!date) {
        return "";
    }
    return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export function isValidDate(date: Date | undefined) {
    if (!date) {
        return false;
    }
    return !Number.isNaN(date.getTime());
}

export function amountFormatter(val: number, decimalPlaces: number = 0) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        currencyDisplay: "code",
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
    })
        .formatToParts(val)
        .map((p) =>
            p.type !== "literal" && p.type !== "currency" ? p.value : "",
        )
        .join("");
}

export function amountShortener(val: number) {
    if (val < 1000) return val;
    if (val < 100_000) return `${(val / 1000).toFixed(2)}K`;
    return `${(val / 100_000).toFixed(2)}L`;
}

export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getFlatsForBuilding(building: keyof typeof BUILDING_FLOORS) {
    const floors = BUILDING_FLOORS[building];
    const result: number[] = [];
    for (let i = 1; i <= floors; i++)
        for (let j = 1; j <= PER_FLOOR_FLATS; j++) result.push(i * 100 + j);
    return result;
}

export const capitalise = (s: string) => {
    if (s.length === 0) return s;
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
};

export const getUserInfo = (user?: UserShort) => {
    if (!user) return "";
    return `${user.firstName.toLowerCase()} ${user.lastName?.toLowerCase()} (${user.building}-${user.flat})`;
};

export const getUserOptions = (filteredTxns: Transaction[]) => {
    const users = Object.groupBy(
        filteredTxns ?? [],
        (u) => `${getUserInfo(u.txnUser)}`,
    );
    return Object.entries(users)
        .filter(([_, txns]) => txns && txns.length > 0)
        .map(([key, txns]) => ({
            value: txns?.[0].txnUser.clerkId as string,
            label: key,
        }));
};

export const getPaidByOptions = (filteredTxns: Transaction[]) => {
    const users = Object.groupBy(
        filteredTxns ?? [],
        (u) => `${u.description?.toLowerCase().replace("received from", "")}`,
    );
    return Object.entries(users)
        .filter(([_, txns]) => txns && txns.length > 0)
        .map(([key, _]) => ({
            value: key,
            label: key,
        }));
};

export const getFilteredTxns = (
    txns: Transaction[],
    filters: z4.infer<typeof SearchSchema>,
) =>
    txns
        .filter((t) => (filters.mode ? t.txnMode === filters.mode : true))
        .filter((t) =>
            filters.user ? t.txnUser.clerkId === filters.user : true,
        )
        .filter((t) =>
            filters.user2 && t.txnType === TXN_TYPE.TRANSFER
                ? t.description
                      ?.toLowerCase()
                      .includes(filters.user2.toLowerCase())
                : true,
        )
        .filter((t) => {
            if (!filters.query) return true;
            const donor = t.donation?.donorName?.toLowerCase();
            const flat = donor
                ? `${t.donation?.building}${t.donation?.flat}`.toLowerCase()
                : undefined;

            let searchTerm = filters.query.toLowerCase();
            if (searchTerm.includes("-")) {
                searchTerm = searchTerm.replace("-", "");
            }
            return (
                donor?.includes(searchTerm) ||
                flat?.includes(searchTerm) ||
                t.description?.toLowerCase().includes(searchTerm)
            );
        });

export const getDefaultFormOptions = ({
    committee,
    year,
    donationType,
    txn,
    fromUserId,
    loggedInUserId,
    items,
}: {
    committee: Committee;
    year: number;
    donationType?: DonationType | undefined;
    txn?: Transaction | undefined;
    isDelete?: boolean;
    fromUserId?: string | undefined;
    loggedInUserId: string;
    items: BookingRequest[];
}) =>
    formOptions({
        defaultValues: {
            id: txn?.id,
            amount: txn?.amount
                ? txn.amount < 0
                    ? txn.amount * -1
                    : txn.amount
                : 0,
            date: formatDateFns(
                txn?.date ? new Date(txn.date) : new Date(),
                "yyyy-MM-dd",
            ),
            committee: (txn?.committee ?? committee) as Committee,
            year: txn?.year ?? year,
            txnUserId: fromUserId ?? txn?.txnUser.clerkId ?? loggedInUserId,
            txnType: txn?.txnType ?? TXN_TYPE.DONATION,
            txnMode: txn?.txnMode ?? TXN_MODE.ONLINE,
            donationType: txn
                ? txn.donation?.type
                : (donationType ??
                  (committee === COMMITTEE.CULTURAL
                      ? DONATION_TYPE.CULTURAL
                      : DONATION_TYPE.TEMPLE)),
            description: txn?.description ?? undefined,
            donorName: txn?.donation?.donorName ?? undefined,
            flatNumber: {
                building: (txn?.donation?.building ?? undefined) as
                    | Building
                    | undefined,
                flat: txn?.donation?.flat ?? undefined,
            },
            donorQuantity: txn?.donation?.quantity ?? undefined,
            toUserId:
                txn?.txnType === TXN_TYPE.TRANSFER
                    ? txn.txnUser.clerkId
                    : undefined,
            bookings: txn?.donation?.bookings ?? items ?? [],
        },
    });

export function getStepAmount(currAmt: number) {
    return currAmt > 100_000
        ? 10_000
        : currAmt > 50_000
          ? 5000
          : currAmt > 10_000
            ? 1000
            : currAmt > 1000
              ? 500
              : 100;
}

export function getStepQty(currQty: number) {
    return currQty > 20 ? 2 : currQty > 2 ? 1 : 0.5;
}

export function isBookingType(type: DonationType | undefined) {
    return (
        type === DONATION_TYPE.ANNADAAN || type === DONATION_TYPE.TEMPLE_ITEM
    );
}
