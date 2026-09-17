import { useSuspenseQuery } from "@tanstack/react-query";
import { apiQueries } from "@/api/queries";
import { MEMBER_STATUS } from "@/lib/constants";
import { getMemberStatus } from "@/lib/utils";
import type { Committee, User } from "@/types";
import { MemberBalanceList } from "./members-balance-list";
import { TotalBalanceCard } from "./total-balance-card";
import { UserCard } from "./user-card";

type Props = {
    committee: Committee;
};
export function CommitteeContent({ committee }: Props) {
    const { data: user } = useSuspenseQuery(apiQueries.user.currDBUser());
    const { data } = useSuspenseQuery(apiQueries.txn.allUserBalances());
    const totalBalance =
        data
            ?.filter((d) => d.committee === committee)
            .reduce((acc, b) => acc + b.total, 0) ?? 0;
    const memberStatus = getMemberStatus(user as User, committee);
    const otherMemberBalances = data?.filter(
        (d) =>
            d.committee === committee &&
            d.clerkId !== user?.clerkId &&
            d.total !== 0,
    );

    return (
        <div className="flex flex-col gap-6">
            <TotalBalanceCard
                committee={committee}
                totalBalance={totalBalance}
            />
            <UserCard committee={committee} memberStatus={memberStatus} />
            {memberStatus === MEMBER_STATUS.ACTIVE && (
                <MemberBalanceList
                    committee={committee}
                    balances={otherMemberBalances ?? []}
                />
            )}
        </div>
    );
}
