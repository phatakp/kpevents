import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ChevronRight, EyeIcon } from "lucide-react";
import {
    currDBUserQueryOptions,
    memberBalancesByCommitteeOptions,
} from "@/backend/queries/user.queries";
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
import { Route } from "@/routes/__root";
import type { BalanceStat, Committee, RouteCommittee, TxnType } from "@/types";

type Props = {
    committee: Committee;
    type: TxnType;
    year: number;
    showOther?: boolean;
};

export function MemberBalanceList({ committee, type, year, showOther }: Props) {
    const { auth } = Route.useRouteContext();
    const { data: profile } = useSuspenseQuery(currDBUserQueryOptions());

    const member = profile?.memberships.find((m) => m.committee === committee);

    const { data: users } = useSuspenseQuery(
        memberBalancesByCommitteeOptions({ committee }),
    );
    const totalCommitteeBalance =
        users?.reduce((acc, b) => acc + b.total, 0) ?? 0;

    const filteredUsers =
        users
            ?.filter((u) => u.clerkId !== auth.userId && u.total !== 0)
            .sort((a, b) => b.total - a.total) ?? [];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="capitalize font-heading">
                    {committee.toLowerCase()} Committee Balance
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
                            {filteredUsers?.map((u) => {
                                const name = `${u.firstName} ${u.lastName}`;
                                const flatNumber = `${u.building}-${u.flat}`;

                                return (
                                    <AnimatedListItem key={u.clerkId}>
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
                                                            total={u.total}
                                                            balances={
                                                                u.balances
                                                            }
                                                        />
                                                    }
                                                >
                                                    <EyeIcon />
                                                </Modal>
                                                <div className="flex items-center gap-1">
                                                    <span className="text-sm md:text-base">
                                                        {u.firstName}
                                                    </span>
                                                    <span className="hidden md:flex text-base">
                                                        {u.lastName}
                                                    </span>
                                                    <span className="md:hidden text-sm uppercase">
                                                        {u.lastName?.charAt(0)}
                                                    </span>
                                                </div>
                                                {u.firstName.toLowerCase() !==
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
                                                amount={u.total}
                                                iconClass="size-3 md:size-4"
                                                className={cn(
                                                    "text-base md:text-xl text-muted-foreground",
                                                    (u.firstName.toLowerCase() ===
                                                        "unknown" ||
                                                        u.total < 0) &&
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
    balances,
}: {
    name: string;
    flat: string;
    total: number;
    balances: BalanceStat[];
}) {
    return (
        <div className="flex flex-col gap-4">
            <div className="grid gap-1">
                <span className="title">{name}</span>
                <Badge>{flat}</Badge>
            </div>
            <div className="grid gap-4">
                {balances?.map((bal) => {
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
