import { createServerFn } from "./ssr.mjs";
import { v4_default } from "../_libs/zod.mjs";
import { CommitteeUserQuerySchema, QUERY_KEYS, assertAdminMiddleware, createSsrRpc } from "./common.schema-CKnvY_hu.mjs";
import { queryOptions } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.queries-BOrzEKU7.js
var getConfig = createServerFn({ method: "GET" }).handler(createSsrRpc("83a1bf4a0ad66d19e4b6c2ee83488262f7af2b2203d017d1c50341800ce24bc4"));
createServerFn({ method: "POST" }).middleware([assertAdminMiddleware]).validator(v4_default.object({
	year: v4_default.coerce.number(),
	isAnnadaanActive: v4_default.coerce.boolean()
})).handler(createSsrRpc("df3813250a2acc473f100de00ebbc259f1a3c04a70403695cd74f8549b3dcd15"));
var getPendingMembers = createServerFn({ method: "GET" }).middleware([assertAdminMiddleware]).handler(createSsrRpc("371ccd6f7851b71b8b47e92c61fd0c25cd2d83ae9f4b7970459e48df5ac24196"));
var approveMember = createServerFn({ method: "POST" }).middleware([assertAdminMiddleware]).validator(CommitteeUserQuerySchema).handler(createSsrRpc("54851d3e6852251c98f3e4b67290067f65202c3c811aa7585d0fa4713d7242cb"));
var deleteMember = createServerFn({ method: "POST" }).middleware([assertAdminMiddleware]).validator(CommitteeUserQuerySchema).handler(createSsrRpc("d58944bd5ba7d72281eefa337a5f5e6f8ed992748265b134106afab23f7b2e17"));
var configOptions = () => queryOptions({
	queryKey: QUERY_KEYS.config,
	queryFn: getConfig,
	staleTime: Infinity
});
var pendingMemberOptions = () => queryOptions({
	queryKey: QUERY_KEYS.pendingMembers,
	queryFn: getPendingMembers,
	staleTime: 1e3 * 60 * 60 * 24
});
//#endregion
export { approveMember, configOptions, deleteMember, pendingMemberOptions };
