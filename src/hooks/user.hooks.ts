import {
    becomeMember,
    createProfile,
    updateProfile,
} from "@/backend/services/user.services";
import { useModal } from "@/components/shared/modal";
import { QUERY_KEYS } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

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
        mutationFn: becomeMember,
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
