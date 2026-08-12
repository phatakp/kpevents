import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { requestMemberShip } from "@/api/functions/member.function";
import { createProfile, updateProfile } from "@/api/functions/user.function";
import { QUERY_KEYS } from "@/api/keys";
import { useModal } from "@/components/shared/modal";
import type { User } from "@/types";

export function useCreateProfile() {
    const queryClient = useQueryClient();
    const { closeModal, modalId } = useModal();
    return useMutation({
        mutationFn: createProfile,
        onMutate: async (variables) => {
            // 1) Cancel in-flight refetches to prevent race conditions
            await queryClient.cancelQueries({
                queryKey: QUERY_KEYS.users.allUsers,
            });
            // 2) Snapshot the previous state (for rollback)
            const previousMemberList = queryClient.getQueryData<User[]>(
                QUERY_KEYS.users.allUsers,
            );
            // 3) Optimistically update the cache
            queryClient.setQueryData(
                QUERY_KEYS.users.allUsers,
                (old?: User[]) =>
                    old
                        ? old.map((u) =>
                              u.clerkId === variables.data.clerkId
                                  ? {
                                        ...u,
                                        ...variables.data,
                                    }
                                  : u,
                          )
                        : [],
            );
            return { previousMemberList };
        },
        onSettled: () => {
            return queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.users.allUsers,
            });
        },
        onError: (error, _, context) => {
            toast.error(error.message ?? "Could not process request");
            queryClient.setQueryData(
                QUERY_KEYS.users.allUsers,
                context?.previousMemberList,
            );
        },
        onSuccess: () => {
            closeModal(modalId);
            toast.success(`Profile updated successfully`);
        },
    });
}

export function useUpdateProfile() {
    const queryClient = useQueryClient();
    const { closeModal, modalId } = useModal();
    return useMutation({
        mutationFn: updateProfile,
        onMutate: async (variables) => {
            // 1) Cancel in-flight refetches to prevent race conditions
            await queryClient.cancelQueries({
                queryKey: QUERY_KEYS.users.allUsers,
            });
            // 2) Snapshot the previous state (for rollback)
            const previousMemberList = queryClient.getQueryData<User[]>(
                QUERY_KEYS.users.allUsers,
            );
            // 3) Optimistically update the cache
            queryClient.setQueryData(
                QUERY_KEYS.users.allUsers,
                (old?: User[]) =>
                    old
                        ? old.map((u) =>
                              u.clerkId === variables.data.clerkId
                                  ? {
                                        ...u,
                                        ...variables.data,
                                    }
                                  : u,
                          )
                        : [],
            );
            return { previousMemberList };
        },
        onSettled: () => {
            return queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.users.allUsers,
            });
        },
        onError: (error, _, context) => {
            toast.error(error.message ?? "Could not process request");
            queryClient.setQueryData(
                QUERY_KEYS.users.allUsers,
                context?.previousMemberList,
            );
        },
        onSuccess: () => {
            closeModal(modalId);
            toast.success(`Profile updated successfully`);
        },
    });
}

export function useAddMember() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: requestMemberShip,
        onSuccess: (_, input) => {
            toast.success(`${input.data.committee} Membership Requested`);
            return queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.users.allUsers,
            });
        },
        onError: (error) => {
            toast.error(error.message ?? "Could not process request");
        },
    });
}
