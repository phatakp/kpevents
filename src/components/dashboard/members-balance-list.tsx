import { EyeIcon } from "lucide-react";

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
import { MEMBER_STATUS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Committee, UserBalance } from "@/types";
import { MembershipStat } from "./membership-stat";

type Props = {
    committee: Committee;
    balances: UserBalance[];
};

export function MemberBalanceList({ committee, balances }: Props) {
    if (balances.length === 0) return;

    return (
        <Card className="feature-card">
            <CardHeader>
                <CardTitle className="capitalize font-heading">
                    Other Member Balances
                </CardTitle>
                <CardDescription>
                    {balances.length} members with balances
                </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
                <AnimatedList>
                    {balances?.map((u) => {
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
                                                <MembershipStat
                                                    committee={committee}
                                                    balance={u}
                                                    memberStatus={
                                                        MEMBER_STATUS.ACTIVE
                                                    }
                                                    otherUser={{
                                                        firstName: u.firstName,
                                                        lastName: u.lastName,
                                                        building: u.building,
                                                        flat: u.flat,
                                                    }}
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
                                                {u.building}-{u.flat}
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
            </CardContent>
        </Card>
    );
}
