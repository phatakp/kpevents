import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { ArrowRightIcon } from "lucide-react";
import { balancesByCommitteeOptions } from "@/backend/queries/txn.queries";
import { currDBUserQueryOptions } from "@/backend/queries/user.queries";
import { Amount } from "@/components/shared/amount";
import { buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ROUTE_TXN_TYPE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Route } from "@/routes/$committee.$year";
import type { Committee, RouteCommittee } from "@/types";
import { SuspenseErrorBoundary } from "../shared/suspense-error-boundary";
import { Skeleton } from "../ui/skeleton";
import { SelectYear } from "./select-year";
import { TxnButton } from "./txns/txn-button";

type Props = {
    className?: string;
};
export function CommitteeCard({ className }: Props) {
    const { committee } = Route.useParams();

    return (
        <div className={cn("py-10 w-full", className)}>
            <Card className="ring-0 border rounded-2xl relative h-full w-full">
                <CardHeader>
                    <CardTitle>
                        <div className="title text-2xl md:text-4xl capitalize">
                            {committee.toLowerCase()}
                        </div>
                    </CardTitle>

                    <CardDescription>
                        <SuspenseErrorBoundary
                            id="committee-card-desc"
                            fallback={<Skeleton className="w-40 h-10" />}
                        >
                            <CommitteeCardDescription />
                        </SuspenseErrorBoundary>
                    </CardDescription>

                    <SuspenseErrorBoundary
                        id="committee-card-action"
                        fallback={<Skeleton className="w-20 h-10" />}
                    >
                        <CommitteeCardAction />
                    </SuspenseErrorBoundary>
                </CardHeader>
                <CardContent>
                    <div className="py-4 flex flex-col gap-9 justify-between md:max-w-3/4">
                        <div className="grid gap-2 text-sm">
                            <SuspenseErrorBoundary
                                id="committee-card-title"
                                fallback={<Skeleton className="w-40 h-10" />}
                            >
                                <CommitteeCardTitle />
                            </SuspenseErrorBoundary>
                            <SuspenseErrorBoundary
                                id="other-year-totals"
                                fallback={
                                    <div className="flex flex-col gap-2 w-full">
                                        <Skeleton className="w-50 h-8" />
                                        <Skeleton className="w-50 h-8" />
                                    </div>
                                }
                            >
                                <OtherYearTotals />
                            </SuspenseErrorBoundary>
                            <SuspenseErrorBoundary
                                id="current-year-totals"
                                fallback={
                                    <div className="flex flex-col gap-2 w-full">
                                        <Skeleton className="w-50 h-8" />
                                        <Skeleton className="w-50 h-8" />
                                        <Skeleton className="w-50 h-8" />
                                    </div>
                                }
                            >
                                <CurrentYearTotals />
                            </SuspenseErrorBoundary>
                            <Separator />
                            <div className="flex items-center w-full justify-between text-muted-foreground">
                                <span className="capitalize font-heading text-lg">
                                    Total
                                </span>
                                <SuspenseErrorBoundary
                                    id="total-balance"
                                    fallback={
                                        <Skeleton className="w-30 h-10" />
                                    }
                                >
                                    <TotalBalance />
                                </SuspenseErrorBoundary>
                            </div>
                        </div>
                    </div>
                    {/* image */}
                    <Image
                        src="https://images.shadcnspace.com/assets/backgrounds/stats-01.webp"
                        alt="user-img"
                        width={211}
                        height={168}
                        className="absolute bottom-0 right-0 hidden sm:block"
                    />
                </CardContent>

                <SuspenseErrorBoundary
                    id="committee-card-footer"
                    fallback={<Skeleton className="w-20 h-10" />}
                >
                    <CommitteeCardFooter />
                </SuspenseErrorBoundary>
            </Card>
        </div>
    );
}

function CommitteeCardDescription() {
    const { committee, year } = Route.useParams();
    const { data: user } = useSuspenseQuery(currDBUserQueryOptions());
    const member = user?.memberships.find(
        (m) => m.committee.toLowerCase() === committee,
    );
    if (member?.isActive) return <SelectYear year={year} />;
    return `Committee Balance - ${year}`;
}

function CommitteeCardAction() {
    const { committee, year } = Route.useParams();
    const { data: user } = useSuspenseQuery(currDBUserQueryOptions());
    const member = user?.memberships.find(
        (m) => m.committee.toLowerCase() === committee,
    );
    if (!member?.isActive) return null;
    return (
        <CardAction>
            <TxnButton
                committee={committee.toUpperCase() as Committee}
                year={year}
            />
        </CardAction>
    );
}
function CommitteeCardFooter() {
    const { committee, year } = Route.useParams();
    const { data: user } = useSuspenseQuery(currDBUserQueryOptions());
    const member = user?.memberships.find(
        (m) => m.committee.toLowerCase() === committee,
    );
    if (!member?.isActive) return null;
    return (
        <CardFooter>
            <Link
                to="/transactions/$committee/$type/$year"
                params={{
                    committee: committee.toLowerCase() as RouteCommittee,
                    year: year,
                    type: ROUTE_TXN_TYPE.DONATION,
                }}
                className={cn(buttonVariants({ size: "sm" }))}
            >
                View Transactions <ArrowRightIcon className="size-3" />
            </Link>
        </CardFooter>
    );
}

function CommitteeCardTitle() {
    const { committee, year } = Route.useParams();
    const { data: user } = useSuspenseQuery(currDBUserQueryOptions());
    const member = user?.memberships.find(
        (m) => m.committee.toLowerCase() === committee,
    );
    if (!member?.isActive) return null;
    return (
        <>
            <span className="text-base">Committee Balance - {year}</span>
            <Separator />
        </>
    );
}

function OtherYearTotals() {
    const { committee, year } = Route.useParams();
    const { data: balances } = useSuspenseQuery({
        ...balancesByCommitteeOptions({
            committee: committee.toUpperCase() as Committee,
        }),
    });
    const otherYearTotals: Record<number, number> =
        balances
            ?.filter(
                (b) =>
                    b.year !== year &&
                    (year < new Date().getFullYear() ? b.year < year : true),
            )
            ?.reduce(
                (acc, item) => {
                    const key = item.year;
                    acc[key] = (acc[key] || 0) + item.balance;
                    return acc;
                },
                {} as Record<number, number>,
            ) ?? {};

    return (
        <>
            {Object.entries(otherYearTotals)?.map(([year, tot]) => (
                <div
                    key={year}
                    className="flex items-center w-full justify-between text-muted-foreground"
                >
                    <span className="capitalize font-heading font-normal">
                        {year} Balance
                    </span>
                    <Amount
                        amount={tot}
                        className={cn(
                            "text-sm font-normal",
                            tot < 0 ? "text-destructive" : "text-success",
                        )}
                        iconClass="size-3"
                    />
                </div>
            ))}
        </>
    );
}

function CurrentYearTotals() {
    const { committee, year } = Route.useParams();
    const { data: balances } = useSuspenseQuery({
        ...balancesByCommitteeOptions({
            committee: committee.toUpperCase() as Committee,
        }),
    });
    const yearItems = balances?.filter((b) => b.year === year);

    const typedBalances = Object.groupBy(
        yearItems ?? [],
        (bal) => `${bal.txnType}-${bal.donationType ?? "null"}`,
    );

    return (
        <>
            {Object.entries(typedBalances)?.map(([key, bal]) => {
                const tot = bal.reduce((acc, b) => acc + b.balance, 0);
                if (tot === 0) return null;

                const [type, dtype] = key.split("-");
                const title =
                    type === "DONATION"
                        ? `${dtype.toLowerCase()} donations`
                        : type === "EXPENSE"
                          ? "Expenses Paid"
                          : "Internal Transfers";
                return (
                    <div
                        key={key}
                        className="flex items-center w-full justify-between text-muted-foreground"
                    >
                        <span className="capitalize font-heading font-normal">
                            {title}
                        </span>
                        <Amount
                            amount={tot}
                            className={cn(
                                "text-sm font-normal",
                                tot < 0 ? "text-destructive" : "text-success",
                            )}
                            iconClass="size-3"
                        />
                    </div>
                );
            })}
        </>
    );
}

function TotalBalance() {
    const { committee, year } = Route.useParams();
    const { data: balances } = useSuspenseQuery({
        ...balancesByCommitteeOptions({
            committee: committee.toUpperCase() as Committee,
        }),
    });
    const balanceForYear =
        balances
            ?.filter((b) => b.year <= year)
            ?.reduce((acc, item) => acc + item.balance, 0) ?? 0;

    return (
        <Amount
            amount={balanceForYear}
            className={cn(
                "",
                balanceForYear < 0 ? "text-destructive" : "text-success",
            )}
            iconClass="size-3"
        />
    );
}
