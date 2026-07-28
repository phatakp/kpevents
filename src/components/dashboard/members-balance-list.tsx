import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ChevronRight, EyeIcon } from "lucide-react";
import {
    allUserBalancesOptions,
    currDBUserQueryOptions,
} from "@/api/queries/user.queries";
import { Amount } from "@/components/shared/amount";
import { Modal } from "@/components/shared/modal";
import { AnimatedList, AnimatedListItem } from "@/components/ui/animated-list";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { COMMITTEE, ROUTE_SUB_TYPE, TXN_TYPE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { BalanceStat, Committee, RouteCommittee, TxnType } from "@/types";
import { SelectYear } from "../committee/select-year";

type Props = {
    committee: Committee;
    type: TxnType;
    year: number;
    handleSelect: (year: string) => void;
    showOther?: boolean;
};

export function MemberBalanceList({
    committee,
    type,
    year,
    showOther,
    handleSelect,
}: Props) {
    const { data: profile } = useSuspenseQuery(currDBUserQueryOptions);

    const member = profile?.memberships.find((m) => m.committee === committee);

    const { data: txns } = useSuspenseQuery(allUserBalancesOptions);
    const committeeTxns = txns?.filter((t) => t.committee === committee) ?? [];
    const totalCommitteeBalance = committeeTxns.reduce(
        (acc, b) => acc + b.balance,
        0,
    );

    const groupedUser = Object.values(
        committeeTxns.reduce(
            (acc, curr) => {
                const key = `${curr.firstName} ${curr.lastName}:${curr.building}-${curr.flat}`;
                if (!acc[key]) {
                    acc[key] = {
                        key,
                        id: curr.clerkId,
                        txnType: curr.txnType,
                        year: curr.year,
                        donationType: curr.donationType,
                        balance: 0,
                        totalAmount: 0,
                    };
                }
                acc[key].balance += curr.balance;
                acc[key].totalAmount += curr.balance;
                return acc;
            },
            {} as Record<
                string,
                BalanceStat & { totalAmount: number; id: string; key: string }
            >,
        ),
    );

    const filteredUserBalances =
        groupedUser
            .filter((u) => u.id !== profile?.clerkId && u.totalAmount !== 0)
            .sort((a, b) => b.totalAmount - a.totalAmount) ?? [];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="capitalize font-heading">
                    Total {committee.toLowerCase()} Balance
                </CardTitle>
                <CardDescription>
                    <Amount
                        amount={totalCommitteeBalance}
                        containerClass="justify-start"
                        className="title text-3xl"
                    />
                </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
                {type === TXN_TYPE.DONATION &&
                    !showOther &&
                    member?.isActive && (
                        <Link
                            to="/$committee/$subType/$year"
                            params={{
                                committee:
                                    committee.toLowerCase() as RouteCommittee,
                                year,
                                subType:
                                    committee === COMMITTEE.CULTURAL
                                        ? ROUTE_SUB_TYPE.ANNADAAN
                                        : ROUTE_SUB_TYPE.TEMPLE,
                            }}
                            className={cn(
                                buttonVariants({ size: "sm" }),
                                "w-fit",
                            )}
                        >
                            {committee === COMMITTEE.CULTURAL
                                ? "View Annadaan Donations"
                                : "View Temple Item Donations"}
                            <ChevronRight />
                        </Link>
                    )}

                {showOther && (
                    <>
                        <span className="text-sm text-muted-foreground underline underline-offset-4">
                            Other Member Balances
                        </span>
                        <AnimatedList>
                            {filteredUserBalances?.map((u) => {
                                const [name, flatNumber] = u.key.split(":");
                                const [firstName, lastName] = name.split(" ");
                                const userBalances =
                                    filteredUserBalances.filter(
                                        (b) => b.id === u.id,
                                    );
                                return (
                                    <AnimatedListItem key={u.key}>
                                        <div className="flex justify-between w-full">
                                            <div className="flex items-center gap-3">
                                                <Modal
                                                    headerClass={cn(
                                                        "bg-linear-to-br from-primary via-primary/60 to-primary/30 p-4 text-primary-foreground rounded-t-lg text-xl",
                                                    )}
                                                    closeBtnClass="text-primary-foreground hover:text-accent"
                                                    btnClass={cn(
                                                        buttonVariants({
                                                            variant: "outline",
                                                            size: "icon",
                                                        }),
                                                    )}
                                                    title={`Member Balance Details`}
                                                    content={
                                                        <MemberBalanceDetail
                                                            name={name}
                                                            flat={flatNumber}
                                                            total={
                                                                u.totalAmount
                                                            }
                                                            year={year}
                                                            handleSelect={
                                                                handleSelect
                                                            }
                                                            balances={
                                                                userBalances
                                                            }
                                                        />
                                                    }
                                                >
                                                    <EyeIcon />
                                                </Modal>
                                                <div className="flex items-center gap-1">
                                                    <span className="text-sm md:text-base">
                                                        {firstName}
                                                    </span>
                                                    <span className="hidden md:flex text-base">
                                                        {lastName}
                                                    </span>
                                                    <span className="md:hidden text-sm uppercase">
                                                        {lastName?.charAt(0)}
                                                    </span>
                                                </div>
                                                {firstName.toLowerCase() !==
                                                    "unknown" && (
                                                    <Badge
                                                        variant={"outline"}
                                                        className="group-hover:bg-primary group-hover:text-primary-foreground"
                                                    >
                                                        {flatNumber}
                                                    </Badge>
                                                )}
                                            </div>
                                            <Amount
                                                amount={u.totalAmount}
                                                iconClass="size-3 md:size-4"
                                                className={cn(
                                                    "text-base md:text-xl text-muted-foreground",
                                                    (firstName.toLowerCase() ===
                                                        "unknown" ||
                                                        u.totalAmount < 0) &&
                                                        "text-destructive",
                                                )}
                                            />
                                        </div>
                                    </AnimatedListItem>
                                );
                            })}
                        </AnimatedList>
                    </>
                )}
            </CardContent>
        </Card>
    );
}

function MemberBalanceDetail({
    name,
    flat,
    total,
    year,
    handleSelect,
    balances,
}: {
    name: string;
    flat: string;
    total: number;
    year: number;
    handleSelect: (year: string) => void;
    balances: (BalanceStat & {
        totalAmount: number;
        id: string;
        key: string;
    })[];
}) {
    const currYearBalances = balances.filter((t) => t.year === year);
    const otherYearBalances = balances.filter((t) => t.year !== year);
    const groupedYear = Object.values(
        otherYearBalances.reduce(
            (acc, curr) => {
                const key = curr.year;
                if (!acc[key]) {
                    acc[key] = { year: key, totalAmount: 0 };
                }
                acc[key].totalAmount += curr.balance;
                return acc;
            },
            {} as Record<number, { year: number; totalAmount: number }>,
        ),
    );

    const groupedYearBalances =
        groupedYear
            .filter((u) => u.totalAmount !== 0)
            .sort((a, b) => (b.year > a.year ? 1 : -1)) ?? [];

    return (
        <div className="flex flex-col gap-4">
            <div className="grid gap-2">
                <span className="title">{name}</span>
                <Badge>{flat}</Badge>
                <SelectYear year={year} handleSelect={handleSelect} />
            </div>
            <div className="grid gap-4">
                <div className="flex items-center w-full justify-between bg-muted text-muted-foreground p-2">
                    <span className="capitalize font-heading font-normal">
                        Balance Type
                    </span>
                    <span className="capitalize font-heading font-normal">
                        Amount
                    </span>
                </div>
                {currYearBalances?.map((bal) => {
                    const title =
                        bal.txnType === "DONATION"
                            ? `${bal.donationType?.toLowerCase()} donations`
                            : bal.txnType === "EXPENSE"
                              ? "Expenses Made"
                              : bal.balance < 0
                                ? "Transfers Made"
                                : "Transfers Received";
                    return (
                        <div
                            key={name}
                            className="flex items-center w-full justify-between text-muted-foreground"
                        >
                            <span className="capitalize font-heading font-normal">
                                {title}
                            </span>
                            <Amount
                                amount={bal.balance}
                                className={cn(
                                    "text-sm font-normal",
                                    bal.balance < 0
                                        ? "text-destructive"
                                        : "text-success",
                                )}
                                iconClass="size-3"
                            />
                        </div>
                    );
                })}
                {groupedYearBalances?.map((bal) => {
                    return (
                        <div
                            key={name}
                            className="flex items-center w-full justify-between text-muted-foreground"
                        >
                            <span className="capitalize font-heading font-normal">
                                {bal.year} balance
                            </span>
                            <Amount
                                amount={bal.totalAmount}
                                className={cn(
                                    "text-sm font-normal",
                                    bal.totalAmount < 0
                                        ? "text-destructive"
                                        : "text-success",
                                )}
                                iconClass="size-3"
                            />
                        </div>
                    );
                })}
                <Separator />
                <div className="flex items-center w-full justify-between">
                    <span className="capitalize font-heading text-lg">
                        Total
                    </span>
                    <Amount
                        amount={total}
                        className={cn(
                            "",
                            total < 0 ? "text-destructive" : "text-success",
                        )}
                    />
                </div>
            </div>
        </div>
    );
}
