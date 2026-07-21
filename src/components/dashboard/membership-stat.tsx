import { useQuery } from "@tanstack/react-query";
import { currUserBalancesByCommitteeOptions } from "@/backend/queries/user.queries";
import { Amount } from "@/components/shared/amount";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAddMember } from "@/hooks/user.hooks";
import { cn } from "@/lib/utils";
import type { Committee, User } from "@/types";

type Props = {
    committee: Committee;
    user: User;
};

export function MembershipStat({ committee, user }: Props) {
    const member = user.memberships.find((m) => m.committee === committee);

    const { data: userBalance } = useQuery({
        ...currUserBalancesByCommitteeOptions({ committee }),
        enabled: !!member,
    });

    const { mutate } = useAddMember();

    if (!userBalance) return;

    return (
        <div className="flex flex-col gap-2 py-4 md:px-4">
            {member?.isActive ? (
                <div className="flex items-center justify-between">
                    <span className="text-lg font-heading">{committee}</span>
                    <Amount
                        amount={userBalance.total}
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
                    {userBalance?.balances?.map((bal) => {
                        const title =
                            bal.txnType === "DONATION"
                                ? `${bal.donationType?.toLowerCase()} donations`
                                : bal.txnType === "EXPENSE"
                                  ? "Expenses Paid"
                                  : "Internal Transfers";
                        return (
                            <div
                                key={`${bal.year}-${bal.txnType}-${bal.donationType}`}
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
                </div>
            )}
        </div>
    );
}
