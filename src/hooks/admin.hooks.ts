import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { approveMember, deleteMember } from "@/backend/services/admin.services";
import { QUERY_KEYS } from "@/lib/constants";

export function useApproveMember() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: approveMember,
        onSuccess: () => {
            toast.success(`Profile updated successfully`);
            return queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.approveMember,
            });
        },
        onError: (error) => {
            toast.error(error.message ?? "Could not process request");
        },
    });
}

export function useDeleteMember() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteMember,
        onSuccess: () => {
            toast.success(`Profile deleted successfully`);
            return queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.approveMember,
            });
        },
        onError: (error) => {
            toast.error(error.message ?? "Could not process request");
        },
    });
}
