import { useSuspenseQuery } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { pendingMemberOptions } from "@/backend/queries/admin.queries";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useApproveMember, useDeleteMember } from "@/hooks/admin.hooks";
import type { UserMembership, UserShort } from "@/types";

export function PendingMembers() {
    const { data: users } = useSuspenseQuery(pendingMemberOptions());

    const { mutate: approveMember, isPending: isPendingUpdate } =
        useApproveMember();
    const { mutate: deleteMember, isPending: isPendingDelete } =
        useDeleteMember();

    const flattenedUsers = Array.prototype.flat.call(
        users?.map((u) => u.memberships.map((m) => ({ ...u, ...m }))),
    ) as (UserShort & UserMembership)[];

    return (
        <div className="flex flex-col gap-6 mt-8">
            <span className="font-heading font-semibold text-lg">
                Members List
            </span>
            {users && (
                <Table>
                    <TableCaption>A list of committee members</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-25">Name</TableHead>
                            <TableHead>Committee</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {flattenedUsers.map((u) => (
                            <TableRow key={u.clerkId}>
                                <TableCell className="font-medium">
                                    {u.firstName} {u?.lastName}
                                </TableCell>
                                <TableCell>{u.committee}</TableCell>
                                <TableCell>
                                    {!u.isActive && (
                                        <Button
                                            isLoading={isPendingUpdate}
                                            onClick={() =>
                                                approveMember({
                                                    data: {
                                                        committee: u.committee,
                                                        userId: u.clerkId,
                                                    },
                                                })
                                            }
                                        >
                                            Activate
                                        </Button>
                                    )}
                                    {u.isActive && (
                                        <Button
                                            variant={"destructive"}
                                            size={"icon-sm"}
                                            isLoading={isPendingDelete}
                                            onClick={() =>
                                                deleteMember({
                                                    data: {
                                                        committee: u.committee,
                                                        userId: u.clerkId,
                                                    },
                                                })
                                            }
                                        >
                                            <Trash />
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}
