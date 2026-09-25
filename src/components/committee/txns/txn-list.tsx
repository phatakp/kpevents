import { useSuspenseQuery } from "@tanstack/react-query";
import { apiQueries } from "@/api/queries";
import { TotalBalanceCard } from "@/components/dashboard/total-balance-card";
import { PaginationComponent } from "@/components/shadcn-space/pagination/pagination";
import { DONATION_TYPE, MEMBER_STATUS, ROUTE_TXN_TYPE } from "@/lib/constants";
import {
    cn,
    getMemberStatus,
    getPaidByOptions,
    getUserOptions,
} from "@/lib/utils";
import { Route } from "@/routes/transactions.$committee.$type.$year";
import type {
    Committee,
    DonationType,
    RouteType,
    TxnType,
    User,
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
    const search = Route.useSearch();
    const { data: profile } = useSuspenseQuery(apiQueries.user.currDBUser());
    const { data } = useSuspenseQuery(apiQueries.txn.allUserBalances());
    const totalBalance =
        data
            ?.filter((d) => d.committee === committee.toUpperCase())
            .reduce((acc, b) => acc + b.total, 0) ?? 0;

    const memberStatus = getMemberStatus(
        profile as User,
        committee.toUpperCase() as Committee,
    );
    const { data: pageResp } = useSuspenseQuery(
        apiQueries.txn.filtered({
            committee: committee.toUpperCase() as Committee,
            txnType: type.toUpperCase() as TxnType,
            year: year,
            ...search,
        }),
    );

    if (memberStatus !== MEMBER_STATUS.ACTIVE) return null;

    const userOptions = getUserOptions(pageResp?.data ?? []);
    const paidByOptions = getPaidByOptions(pageResp?.data ?? []);

    return (
        <div className="flex flex-col gap-6">
            <TotalBalanceCard
                committee={committee.toUpperCase() as Committee}
                totalBalance={totalBalance}
                addTxn={memberStatus === MEMBER_STATUS.ACTIVE}
                showTxns={
                    type === ROUTE_TXN_TYPE.DONATION &&
                    memberStatus === MEMBER_STATUS.ACTIVE
                }
                txnType={type.toUpperCase() as TxnType}
                donationType={search.donationType}
            />
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 w-full">
                {type === ROUTE_TXN_TYPE.DONATION && (
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
                        {!!pageResp?.meta.totalElements && <OtherTxnFilter />}
                        {!search.donationType && <BuildingFilter />}
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-3 flex-1">
                {(!!search.searchTerm || !!pageResp?.meta.totalElements) && (
                    <TxnSearchInput />
                )}

                {(!!search.searchTerm || !!search.txnUserId) &&
                    !!pageResp?.meta.totalElements && (
                        <FilterStatBadge filtered={pageResp.data ?? []} />
                    )}
            </div>

            <HeaderDesktop
                userOptions={userOptions}
                paidByOptions={paidByOptions}
                type={type}
                donationType={search.donationType}
            />
            <HeaderMobile
                userOptions={userOptions}
                paidByOptions={paidByOptions}
                type={type}
            />

            {type === ROUTE_TXN_TYPE.DONATION && (
                <DonationList txns={pageResp?.data ?? []} />
            )}
            {type !== ROUTE_TXN_TYPE.DONATION && (
                <OtherTxnList txns={pageResp?.data ?? []} />
            )}

            {pageResp?.meta && <PaginationComponent meta={pageResp.meta} />}
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
