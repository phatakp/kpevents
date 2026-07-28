import { queryOptions } from "@tanstack/react-query";
import { getMembership } from "@/api/functions/member.function";
import {
    getAllUserBalances,
    getCurrUserFromDB,
} from "@/api/functions/user.function";
import { QUERY_KEYS } from "@/api/keys";
import type { CommitteeQueryOptions } from "@/types";

export const currDBUserQueryOptions = queryOptions({
    queryKey: QUERY_KEYS.users.currUser,
    queryFn: getCurrUserFromDB,
    staleTime: 1000 * 60 * 60 * 24,
});

export const committeeMemberOptions = (
    data: CommitteeQueryOptions & { optionsOnly?: boolean },
) =>
    queryOptions({
        queryKey: QUERY_KEYS.users.committeeMembers(data),
        queryFn: () => getMembership({ data }),
    });

export const allUserBalancesOptions = queryOptions({
    queryKey: QUERY_KEYS.txns.allUserBalances,
    queryFn: getAllUserBalances,
});
