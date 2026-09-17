import { useSuspenseQuery } from "@tanstack/react-query";
import { Image } from "@unpic/react";
import { apiQueries } from "@/api/queries";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import type { Committee, MemberStatus } from "@/types";
import { MembershipStat } from "./membership-stat";
import { ProfileButton } from "./profile-button";

type Props = {
    committee: Committee;
    memberStatus: MemberStatus;
};
export function UserCard({ committee, memberStatus }: Props) {
    const { data: user } = useSuspenseQuery(apiQueries.user.currDBUser());
    const { data } = useSuspenseQuery(apiQueries.txn.allUserBalances());
    if (!data || !user) return;

    const balances = data.filter((d) => d.committee === committee);
    const currUserBalance = balances.find((d) => d.clerkId === user.clerkId);

    return (
        <div className="flex items-center justify-center w-full">
            <div className="container py-10 w-full">
                <Card className="relative h-full w-full mx-auto max-w-3xl feature-card">
                    <CardHeader>
                        <CardTitle>
                            <div className="title text-2xl md:text-4xl flex items-center gap-2">
                                {user.firstName}
                                <span className="hidden md:flex">
                                    {user.lastName}
                                </span>
                            </div>
                        </CardTitle>
                        <CardDescription className="capitalize">
                            {committee.toLowerCase()} balance details
                        </CardDescription>
                        <CardAction className="flex items-center gap-2">
                            <Badge>
                                {user.building}-{user.flat}
                            </Badge>
                            <ProfileButton profile={user} />
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <div className="py-4 flex flex-col gap-9 justify-between">
                            <div className="grid md:divide-x divide-y md:divide-y-0 sm:w-3/4">
                                <MembershipStat
                                    committee={committee}
                                    balance={currUserBalance}
                                    memberStatus={memberStatus}
                                />
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
                </Card>
            </div>
        </div>
    );
}
