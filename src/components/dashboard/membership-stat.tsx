import { Amount } from "@/components/shared/amount";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAddMember } from "@/hooks/user.hooks";
import { cn } from "@/lib/utils";
import type { Committee, User, UserBalance } from "@/types";

type Props = {
    committee: Committee;
    user: User;
    data: UserBalance[];
    year: number;
};

export function MembershipStat({ committee, user, data, year }: Props) {
    const { mutate } = useAddMember();
    const currTxns = data.filter(
        (d) => d.clerkId === user.clerkId && d.committee === committee,
    );

    const totalBalance = currTxns.reduce((acc, b) => acc + b.balance, 0);
    const member = user.memberships.find((m) => m.committee === committee);

    const currYearBalances = currTxns.filter((t) => t.year === year);
    const otherYearBalances = currTxns.filter((t) => t.year !== year);

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
        <div className="flex flex-col gap-2 py-4 md:px-4">
            {member?.isActive ? (
                <div className="flex items-center justify-between">
                    <span className="font-heading capitalize">
                        Your {committee.toLowerCase()} balance
                    </span>
                    <Amount
                        amount={totalBalance}
                        className="text-xl md:text-2xl"
                    />
                </div>
            ) : (
                <>
                    <p className="text-muted-foreground capitalize">
                        {committee}
                    </p>
                    <div className="flex items-center gap-1">
                        {!member && (
                            <Button
                                size={"sm"}
                                className="w-fit"
                                onClick={() => mutate({ data: { committee } })}
                            >
                                Request Membership
                            </Button>
                        )}
                        {member && !member.isActive && (
                            <Badge>Membership Requested</Badge>
                        )}
                    </div>
                </>
            )}

            {member?.isActive && (
                <div className="grid gap-2 text-sm">
                    {currYearBalances?.map((bal) => {
                        const title =
                            bal.txnType === "DONATION"
                                ? `${bal.donationType?.toLowerCase()} donations`
                                : bal.txnType === "EXPENSE"
                                  ? "Expenses Paid"
                                  : "Internal Transfers";
                        return (
                            <div
                                key={`${bal.txnType}-${bal.donationType}`}
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
                                key={bal.year}
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
                </div>
            )}
        </div>
    );
}
