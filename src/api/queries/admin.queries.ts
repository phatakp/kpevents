import { queryOptions } from "@tanstack/react-query";
import { getConfig } from "@/api/functions/admin.function";
import { getAllMembers } from "@/api/functions/member.function";
import { QUERY_KEYS } from "@/api/keys";

export const configOptions = queryOptions({
    queryKey: QUERY_KEYS.config,
    queryFn: getConfig,
});

export const allMembersOptions = queryOptions({
    queryKey: QUERY_KEYS.users.allUsers,
    queryFn: getAllMembers,
});
