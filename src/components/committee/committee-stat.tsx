import { useState } from "react";
import { SelectYear } from "@/components/committee/select-year";
import { Amount } from "@/components/shared/amount";
import { MEMBER_STATUS, TXN_TYPE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Route } from "@/routes/__root";
import type { Committee, CommitteeBalance, MemberStatus } from "@/types";

type Props = {
    committee: Committee;
    balance: CommitteeBalance | undefined;
    memberStatus: MemberStatus;
};

export function CommitteeStat({ balance, memberStatus }: Props) {
    const { config } = Route.useRouteContext();
    const [year, setYear] = useState(config.activeYear);
    const handleSelect = (selectedYear: string) => {
        setYear(Number(selectedYear));
    };
    if (!balance) return;

    const txnTypeBalances = balance.balanceByYearAndTxnType.filter(
        (b) => b.year === year,
    );
    const donationTypeBalances = balance.balanceByYearAndDonationType.filter(
        (b) => b.year === year,
    );
    const yearBalances = balance.balanceByYear.filter((b) => b.year !== year);

    return (
        <div className="flex flex-col gap-2 pb-4 w-full">
            {memberStatus === MEMBER_STATUS.ACTIVE && (
                <SelectYear
                    year={year}
                    handleSelect={handleSelect}
                    className="w-full md:w-fit mb-8 mt-4"
                />
            )}

            <div className="flex items-center justify-between border-y-3 py-2">
                <span className="title capitalize text-lg md:text-xl">
                    Total balance
                </span>
                <Amount
                    amount={balance.total}
                    className="title text-xl md:text-2xl"
                />
            </div>

            <div className="grid gap-2 w-full">
                <div className="grid gap-2 w-full">
                    {txnTypeBalances.map((bal) => (
                        <>
                            <div
                                key={bal.txnType}
                                className={cn(
                                    "flex items-center justify-between",
                                    bal.txnType === TXN_TYPE.DONATION &&
                                        "border-b pb-1",
                                )}
                            >
                                <span className="font-heading capitalize">
                                    Total {bal.txnType.toLowerCase()}s
                                </span>
                                <Amount
                                    amount={Math.abs(bal.total)}
                                    className={cn(
                                        "text-base md:text-lg",
                                        bal.total < 0
                                            ? "text-destructive"
                                            : "text-success",
                                    )}
                                />
                            </div>
                            <div className="grid gap-2 w-full">
                                {bal.txnType === TXN_TYPE.DONATION &&
                                    donationTypeBalances.map((don, i) => (
                                        <div
                                            key={don.donationType}
                                            className={cn(
                                                "flex items-center justify-between",
                                                i + 1 ===
                                                    donationTypeBalances.length &&
                                                    "border-b pb-2",
                                            )}
                                        >
                                            <span className="font-heading capitalize text-muted-foreground text-sm">
                                                {don.donationType.toLowerCase()}{" "}
                                                donations
                                            </span>
                                            <Amount
                                                amount={don.total}
                                                className="text-sm md:text-sm text-muted-foreground"
                                            />
                                        </div>
                                    ))}
                            </div>
                        </>
                    ))}
                </div>
                {yearBalances.map((bal) => (
                    <div
                        key={bal.year}
                        className="flex items-center justify-between"
                    >
                        <span className="font-heading capitalize">
                            {bal.year} balance
                        </span>
                        <Amount
                            amount={Math.abs(bal.total)}
                            className={cn(
                                "text-base md:text-lg",
                                bal.total < 0
                                    ? "text-destructive"
                                    : "text-success",
                            )}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
