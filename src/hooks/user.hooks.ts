import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { requestMemberShip } from "@/api/functions/member.function";
import { createProfile, updateProfile } from "@/api/functions/user.function";
import { QUERY_KEYS } from "@/api/keys";
import { useModal } from "@/components/shared/modal";

export function useCreateProfile() {
    const queryClient = useQueryClient();
    const { closeModal, modalId } = useModal();
    return useMutation({
        mutationFn: createProfile,
        onSuccess: () => {
            closeModal(modalId);
            toast.success(`Profile updated successfully`);
            return queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.allUsers,
            });
        },
        onError: (error) => {
            toast.error(error.message ?? "Could not process request");
        },
    });
}

export function useUpdateProfile() {
    const queryClient = useQueryClient();
    const { closeModal, modalId } = useModal();
    return useMutation({
        mutationFn: updateProfile,
        onSuccess: () => {
            closeModal(modalId);
            toast.success(`Profile updated successfully`);
            return queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.currUser,
            });
        },
        onError: (error) => {
            toast.error(error.message ?? "Could not process request");
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
                queryKey: QUERY_KEYS.currUser,
            });
        },
        onError: (error) => {
            toast.error(error.message ?? "Could not process request");
        },
    });
}
