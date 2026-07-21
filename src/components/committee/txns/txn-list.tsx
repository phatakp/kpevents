import { useSuspenseQuery } from "@tanstack/react-query";
import { txnsByCommitteeOptions } from "@/backend/queries/txn.queries";
import { currDBUserQueryOptions } from "@/backend/queries/user.queries";
import { MemberBalanceList } from "@/components/dashboard/members-balance-list";
import { PaginationComponent } from "@/components/shadcn-space/pagination/pagination";
import { DONATION_TYPE, ROUTE_TXN_TYPE } from "@/lib/constants";
import {
    cn,
    getFilteredTxns,
    getPaidByOptions,
    getUserOptions,
} from "@/lib/utils";
import { Route } from "@/routes/transactions.$committee.$type.$year";
import type {
    Building,
    Committee,
    DonationType,
    RouteType,
    TxnType,
} from "@/types";
import { BuildingFilter } from "./building-filter";
import { DonationList } from "./donation-list";
import { FilterStatBadge } from "./filter-stat-badge";
import { ModeFilterColumn } from "./mode-filter";
import { OtherTxnFilter } from "./other-txn-filter";
import { OtherTxnList } from "./other-txn-list";
import { TxnSearchInput } from "./txn-search-input";
import { UserFilterColumn } from "./user-filter";

export function TransactionList() {
    const { committee, year, type } = Route.useParams();
    const {
        building = "A",
        page = 0,
        query = undefined,
        user,
        user2,
        donationType,
        mode,
    } = Route.useSearch();
    const { data: profile } = useSuspenseQuery(currDBUserQueryOptions());

    const member = profile?.memberships.find(
        (m) => m.committee.toLowerCase() === committee,
    );
    const { data: pageResp } = useSuspenseQuery({
        ...txnsByCommitteeOptions({
            committee: committee.toUpperCase() as Committee,
            txnType: type.toUpperCase() as TxnType,
            year: year,
            building: building as Building,
            donationType:
                donationType === DONATION_TYPE.OTHER ? donationType : undefined,
        }),
    });

    if (!member?.isActive) return null;

    const start = page === 0 ? 0 : page * 10;
    const end = start + 10;

    const filteredTxns = getFilteredTxns(pageResp?.data ?? [], {
        mode,
        query,
        user,
        user2,
    });

    const userOptions = getUserOptions(filteredTxns ?? []);
    const paidByOptions = getPaidByOptions(filteredTxns ?? []);
    const totalElements = filteredTxns?.length ?? 0;
    const totalPages = Math.ceil(totalElements / 10);

    return (
        <div className="flex flex-col gap-6">
            <MemberBalanceList
                committee={committee.toUpperCase() as Committee}
                type={type.toUpperCase() as TxnType}
                year={year}
            />
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 w-full">
                {type === ROUTE_TXN_TYPE.DONATION && (
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
                        {totalElements > 0 && <OtherTxnFilter />}
                        {!donationType && <BuildingFilter />}
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-3 flex-1">
                {(query || totalElements > 0) && <TxnSearchInput />}
                {(query || user) && totalElements > 0 && (
                    <FilterStatBadge filtered={filteredTxns ?? []} />
                )}
            </div>

            <HeaderDesktop
                userOptions={userOptions}
                paidByOptions={paidByOptions}
                type={type}
                donationType={donationType}
            />
            <HeaderMobile
                userOptions={userOptions}
                paidByOptions={paidByOptions}
                type={type}
            />

            {type === ROUTE_TXN_TYPE.DONATION && (
                <DonationList txns={filteredTxns?.slice(start, end) ?? []} />
            )}
            {type !== ROUTE_TXN_TYPE.DONATION && (
                <OtherTxnList txns={filteredTxns?.slice(start, end) ?? []} />
            )}

            <PaginationComponent totalPages={totalPages} page={page} />
        </div>
    );
}

type HeaderProps = {
    userOptions: { label: string; value: string }[];
    paidByOptions: { label: string; value: string }[];
    type: RouteType;
    donationType?: DonationType;
};

function HeaderDesktop({
    userOptions,
    paidByOptions,
    type,
    donationType,
}: HeaderProps) {
    return (
        <div className="hidden md:grid md:grid-cols-12 items-center w-full bg-secondary text-secondary-foreground rounded-md py-2 text-sm font-semibold">
            {type !== ROUTE_TXN_TYPE.TRANSFER ? (
                <span
                    className={cn(
                        "col-start-2",
                        type === ROUTE_TXN_TYPE.DONATION &&
                            donationType !== DONATION_TYPE.OTHER
                            ? "col-span-4"
                            : "col-span-5",
                    )}
                >
                    {type === ROUTE_TXN_TYPE.DONATION &&
                    donationType !== DONATION_TYPE.OTHER
                        ? "Donor Name"
                        : "Description"}
                </span>
            ) : (
                <UserFilterColumn
                    title="Paid By"
                    options={paidByOptions}
                    isTransfer
                    className="col-span-5 col-start-2"
                />
            )}
            {type === ROUTE_TXN_TYPE.DONATION &&
                donationType !== DONATION_TYPE.OTHER && (
                    <span className="">Flat</span>
                )}
            <UserFilterColumn
                title={type === ROUTE_TXN_TYPE.EXPENSE ? "Paid By" : "Receiver"}
                options={userOptions}
                className="col-span-3"
            />
            <ModeFilterColumn className="" />
            <span className="col-span-2 text-right pr-4">Amount</span>
        </div>
    );
}

function HeaderMobile({ type, userOptions, paidByOptions }: HeaderProps) {
    return (
        <div className="grid grid-cols-12 items-center w-full bg-secondary text-secondary-foreground rounded-md py-2 pr-2 text-sm font-heading md:hidden">
            <div className="flex flex-col gap-1 col-span-7 col-start-2">
                {type === ROUTE_TXN_TYPE.TRANSFER && (
                    <UserFilterColumn
                        title={"Paid By"}
                        options={paidByOptions}
                        isTransfer
                    />
                )}
                <UserFilterColumn
                    title={
                        type === ROUTE_TXN_TYPE.EXPENSE ? "Paid By" : "Receiver"
                    }
                    options={userOptions}
                />
            </div>
            <span className="col-span-4 text-right">Amount</span>
        </div>
    );
}
