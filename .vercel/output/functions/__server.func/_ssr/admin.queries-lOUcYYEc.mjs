import { ControlRecordSchema } from "./common.schema-rOPsTdW8.mjs";
import { createServerFn } from "./ssr.mjs";
import { assertAdminMiddleware, createSsrRpc } from "./auth.middleware-DJyYI05a.mjs";
import { QUERY_KEYS, getAllMembers } from "./keys-D0H6xnTe.mjs";
import { queryOptions } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.queries-lOUcYYEc.js
var getConfig = createServerFn({ method: "GET" }).handler(createSsrRpc("d1d9c9a39353d90a0e45dd376907cf7d165937b970c20e2b0d908ea6325bc295"));
createServerFn({ method: "POST" }).middleware([assertAdminMiddleware]).validator(ControlRecordSchema).handler(createSsrRpc("000bb21e9a1e299695ef483866333aacc5cf24794a0925ee4ed4bf4701e97dab"));
var configOptions = queryOptions({
	queryKey: QUERY_KEYS.config,
	queryFn: getConfig
});
var allMembersOptions = queryOptions({
	queryKey: QUERY_KEYS.users.allUsers,
	queryFn: getAllMembers
});
//#endregion
export { allMembersOptions, configOptions };
