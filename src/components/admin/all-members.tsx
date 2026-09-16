import { useSuspenseQuery } from "@tanstack/react-query";
import { Check, Trash } from "lucide-react";
import { useState } from "react";
import { allMembersOptions } from "@/api/queries/admin.queries";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
import { COMMITTEE, MEMBER_STATUS } from "@/lib/constants";
import { getMemberStatus } from "@/lib/utils";
import type { Committee } from "@/types";
import { COMMITTEE_OPTIONS } from "@/zod/common.schema";

export function AllMembers() {
    const [committee, setCommittee] = useState<Committee>(COMMITTEE.CULTURAL);
    const { data: users } = useSuspenseQuery(allMembersOptions);
    const {
        mutate: approveMember,
        isPending: isPendingUpdate,
        variables: approveInput,
    } = useApproveMember();
    const {
        mutate: deleteMember,
        isPending: isPendingDelete,
        variables: deleteInput,
    } = useDeleteMember();
    const filteredUsers = users?.filter(
        (u) => getMemberStatus(u, committee) !== MEMBER_STATUS.NON,
    );

    return (
        <div className="flex flex-col gap-6 mt-8">
            <span className="font-heading font-semibold text-lg">
                Members List
            </span>

            <div className="flex items-center gap-4">
                <span className="font-medium text-muted-foreground">
                    Show for Committee:
                </span>
                <Select
                    onValueChange={(value) => setCommittee(value as Committee)}
                    value={committee}
                >
                    <SelectTrigger className="w-fit text-foreground">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {COMMITTEE_OPTIONS.map((y) => (
                                <SelectItem key={y} value={y.toString()}>
                                    {y}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {users && (
                <Table>
                    <TableCaption>A list of committee members</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="">Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredUsers?.map((u) => {
                            const memberStatus = getMemberStatus(u, committee);
                            const isUpdating =
                                isPendingUpdate &&
                                approveInput?.data.userId === u.clerkId &&
                                approveInput?.data.committee === committee;
                            const isDeleting =
                                isPendingDelete &&
                                deleteInput?.data.userId === u.clerkId &&
                                deleteInput?.data.committee === committee;
                            return (
                                <TableRow key={u.clerkId + committee}>
                                    <TableCell className="font-medium text-muted-foreground">
                                        <div className="grid">
                                            <span>
                                                {u.firstName} {u?.lastName}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                {u.email}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium text-muted-foreground">
                                        {memberStatus}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {memberStatus ===
                                            MEMBER_STATUS.INACTIVE && (
                                            <Button
                                                variant={"success"}
                                                size={"icon-sm"}
                                                isLoading={isUpdating}
                                                onClick={() =>
                                                    approveMember({
                                                        data: {
                                                            committee,
                                                            userId: u.clerkId,
                                                        },
                                                    })
                                                }
                                            >
                                                <Check />
                                            </Button>
                                        )}
                                        {memberStatus ===
                                            MEMBER_STATUS.ACTIVE && (
                                            <Button
                                                variant={"destructive"}
                                                size={"icon-sm"}
                                                isLoading={isDeleting}
                                                onClick={() =>
                                                    deleteMember({
                                                        data: {
                                                            committee,
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
                            );
                        })}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}
