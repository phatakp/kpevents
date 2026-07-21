import { AnimatedList, AnimatedListItem } from "@/components/ui/animated-list";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Route } from "@/routes/$committee.$year";
import type { User } from "@/types";

type Props = {
    data: User[];
    className?: string;
};

export function CommitteeMemberList({ className, data }: Props) {
    const { committee } = Route.useParams();
    const users = data?.filter((u) => u.firstName.toLowerCase() !== "unknown");

    return (
        <div
            className={cn(
                "pt-10 px-4 w-full flex flex-col gap-6 bg-background",
                className,
            )}
        >
            <span className="title text-xl md:text-3xl">Committee Members</span>
            <AnimatedList>
                {users?.map((u) => {
                    const isActive = u.memberships.find(
                        (m) =>
                            m.committee === committee.toUpperCase() &&
                            m.isActive,
                    );

                    return (
                        <AnimatedListItem key={u.clerkId}>
                            <div className="border-b border-border flex justify-between items-start rounded-sm md:px-4 py-2 gap-4 w-full">
                                <span className="text-sm md:text-base truncate capitalize">
                                    {`${u.firstName.toLowerCase()} ${u.lastName?.toLowerCase()}`}
                                </span>
                                <Badge
                                    variant={
                                        isActive ? "default" : "destructive"
                                    }
                                    className="text-xs md:text-sm"
                                >
                                    {u.building}-{u.flat}
                                </Badge>
                            </div>
                        </AnimatedListItem>
                    );
                })}
            </AnimatedList>
        </div>
    );
}
