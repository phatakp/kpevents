import { queryOptions } from "@tanstack/react-query";
import {
    getCurrUserBalancesByCommittee,
    getCurrUserFromDB,
    getMemberBalancesByCommittee,
    getMembersByCommittee,
} from "@/backend/services/user.services";
import { QUERY_KEYS } from "@/lib/constants";
import type { CommitteeQueryOptions } from "@/types";

export const currDBUserQueryOptions = () =>
    queryOptions({
        queryKey: QUERY_KEYS.currUser,
        queryFn: getCurrUserFromDB,
        staleTime: 1000 * 60 * 60 * 24,
    });

export const membersByCommitteeOptions = (data: CommitteeQueryOptions) =>
    queryOptions({
        queryKey: QUERY_KEYS.membersByCommittee(data),
        queryFn: () => getMembersByCommittee({ data }),
        staleTime: 1000 * 60 * 60 * 24,
    });

export const currUserBalancesByCommitteeOptions = (
    data: CommitteeQueryOptions,
) =>
    queryOptions({
        queryKey: QUERY_KEYS.currUserBalancesByCommittee(data),
        queryFn: () => getCurrUserBalancesByCommittee({ data }),
        staleTime: 1000 * 60 * 60 * 24,
    });

export const memberBalancesByCommitteeOptions = (data: CommitteeQueryOptions) =>
    queryOptions({
        queryKey: QUERY_KEYS.memberBalancesByCommittee(data),
        queryFn: () => getMemberBalancesByCommittee({ data }),
        staleTime: 1000 * 60 * 60 * 24,
    });
