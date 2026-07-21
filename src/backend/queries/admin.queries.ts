import { queryOptions } from "@tanstack/react-query";
import {
    getConfig,
    getPendingMembers,
} from "@/backend/services/admin.services";
import { QUERY_KEYS } from "@/lib/constants";

export const configOptions = () =>
    queryOptions({
        queryKey: QUERY_KEYS.config,
        queryFn: getConfig,
        staleTime: Infinity,
    });

export const pendingMemberOptions = () =>
    queryOptions({
        queryKey: QUERY_KEYS.pendingMembers,
        queryFn: getPendingMembers,
        staleTime: 1000 * 60 * 60 * 24,
    });
