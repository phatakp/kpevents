import { useSuspenseQuery } from "@tanstack/react-query";
import { Image } from "@unpic/react";
import { currDBUserQueryOptions } from "@/backend/queries/user.queries";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { COMMITTEE } from "@/lib/constants";
import { MembershipStat } from "./membership-stat";
import { ProfileButton } from "./profile-button";

export function UserCard() {
    const { data: user } = useSuspenseQuery(currDBUserQueryOptions());
    if (!user) return;

    return (
        <div className="flex items-center justify-center w-full">
            <div className="container py-10 w-full">
                <Card className="ring-0 border rounded-2xl relative h-full w-full mx-auto max-w-3xl">
                    <CardHeader>
                        <CardTitle>
                            <div className="title text-2xl md:text-4xl flex items-center gap-2">
                                {user?.firstName ?? "Welcome"}
                                <span className="hidden md:flex">
                                    {user?.lastName}
                                </span>
                            </div>
                        </CardTitle>
                        <CardDescription>Your Balance Summary</CardDescription>
                        <CardAction className="flex items-center gap-2">
                            <Badge>
                                {user?.building}-{user?.flat}
                            </Badge>
                            <ProfileButton profile={user} />
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <div className="py-4 flex flex-col gap-9 justify-between">
                            <div className="grid md:grid-cols-2 items-center md:divide-x divide-y md:divide-y-0 sm:w-3/4">
                                <MembershipStat
                                    committee={COMMITTEE.CULTURAL}
                                    user={user}
                                />
                                <MembershipStat
                                    committee={COMMITTEE.TEMPLE}
                                    user={user}
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
