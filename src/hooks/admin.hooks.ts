import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateConfig } from "@/api/functions/admin.function";
import { approveMember, deleteMember } from "@/api/functions/member.function";
import { QUERY_KEYS } from "@/api/keys";
import type { Control, User } from "@/types";

export function useApproveMember() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: approveMember,
        onMutate: async (variables) => {
            // 1) Cancel in-flight refetches to prevent race conditions
            await queryClient.cancelQueries({
                queryKey: QUERY_KEYS.users.allUsers,
            });
            // 2) Snapshot the previous state (for rollback)
            const previousMemberList = queryClient.getQueryData(
                QUERY_KEYS.users.allUsers,
            );
            // 3) Optimistically update the cache
            queryClient.setQueryData(QUERY_KEYS.users.allUsers, (old: User[]) =>
                old.map((u) =>
                    u.clerkId === variables.data.userId
                        ? {
                              ...u,
                              memberships: u.memberships.map((m) => {
                                  if (m.committee === variables.data.committee)
                                      return { ...m, isActive: true };
                                  return m;
                              }),
                          }
                        : u,
                ),
            );
            return { previousMemberList };
        },
        onSettled: () => {
            return queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.users.allUsers,
            });
        },
        onError: (error, variables, context) => {
            toast.error(error.message ?? "Could not process request");
            queryClient.setQueryData(
                QUERY_KEYS.users.allUsers,
                context?.previousMemberList,
            );
        },
        onSuccess: () => {
            toast.success(`Membership approved successfully`);
        },
    });
}

export function useDeleteMember() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteMember,
        onMutate: async (variables) => {
            // 1) Cancel in-flight refetches to prevent race conditions
            await queryClient.cancelQueries({
                queryKey: QUERY_KEYS.users.allUsers,
            });
            // 2) Snapshot the previous state (for rollback)
            const previousMemberList = queryClient.getQueryData(
                QUERY_KEYS.users.allUsers,
            );
            // 3) Optimistically update the cache
            queryClient.setQueryData(QUERY_KEYS.users.allUsers, (old: User[]) =>
                old.map((u) =>
                    u.clerkId === variables.data.userId
                        ? {
                              ...u,
                              memberships: u.memberships.filter(
                                  (m) =>
                                      m.committee !== variables.data.committee,
                              ),
                          }
                        : u,
                ),
            );
            return { previousMemberList };
        },
        onSettled: () => {
            return queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.users.allUsers,
            });
        },
        onError: (error, variables, context) => {
            toast.error(error.message ?? "Could not process request");
            queryClient.setQueryData(
                QUERY_KEYS.users.allUsers,
                context?.previousMemberList,
            );
        },
        onSuccess: () => {
            toast.success(`Membership deleted successfully`);
        },
    });
}

export function useUpdateConfig() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateConfig,
        onMutate: async (variables) => {
            // 1) Cancel in-flight refetches to prevent race conditions
            await queryClient.cancelQueries({
                queryKey: QUERY_KEYS.config,
            });
            // 2) Snapshot the previous state (for rollback)
            const previousConfig = queryClient.getQueryData(QUERY_KEYS.config);
            // 3) Optimistically update the cacheQUERY_KEYS.config);
            // 3) Optimistically update the cache
            queryClient.setQueryData(QUERY_KEYS.config, (old: Control) => ({
                ...old,
                ...variables.data,
            }));
            return { previousConfig };
        },
        onSettled: () => {
            return queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.config,
            });
        },
        onError: (error, variables, context) => {
            toast.error(error.message ?? "Could not process request");
            queryClient.setQueryData(
                QUERY_KEYS.config,
                context?.previousConfig,
            );
        },
        onSuccess: () => {
            toast.success(`Configuration updated successfully`);
        },
    });
}
