import { createServerFn } from "./ssr.mjs";
import { v4_default } from "../_libs/zod.mjs";
import { CommitteeUserQuerySchema, assertAdminMiddleware } from "./common.schema-CKnvY_hu.mjs";
import { createServerRpc } from "./createServerRpc-DPX_ndmm.mjs";
import { api, handleAPIError } from "./axios-DW8fiHrc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.services-CJdgCYSb.js
var getConfig_createServerFn_handler = createServerRpc({
	id: "83a1bf4a0ad66d19e4b6c2ee83488262f7af2b2203d017d1c50341800ce24bc4",
	name: "getConfig",
	filename: "src/backend/services/admin.services.ts"
}, (opts) => getConfig.__executeServer(opts));
var getConfig = createServerFn({ method: "GET" }).handler(getConfig_createServerFn_handler, async () => {
	return (await api.get(`/admin/config`)).data;
});
var updateConfigYear_createServerFn_handler = createServerRpc({
	id: "df3813250a2acc473f100de00ebbc259f1a3c04a70403695cd74f8549b3dcd15",
	name: "updateConfigYear",
	filename: "src/backend/services/admin.services.ts"
}, (opts) => updateConfigYear.__executeServer(opts));
var updateConfigYear = createServerFn({ method: "POST" }).middleware([assertAdminMiddleware]).validator(v4_default.object({
	year: v4_default.coerce.number(),
	isAnnadaanActive: v4_default.coerce.boolean()
})).handler(updateConfigYear_createServerFn_handler, async ({ data }) => {
	return (await api.put(`/control`, JSON.stringify({
		activeYear: data.year,
		isAnnadaanActive: data.isAnnadaanActive
	}))).data;
});
var getPendingMembers_createServerFn_handler = createServerRpc({
	id: "371ccd6f7851b71b8b47e92c61fd0c25cd2d83ae9f4b7970459e48df5ac24196",
	name: "getPendingMembers",
	filename: "src/backend/services/admin.services.ts"
}, (opts) => getPendingMembers.__executeServer(opts));
var getPendingMembers = createServerFn({ method: "GET" }).middleware([assertAdminMiddleware]).handler(getPendingMembers_createServerFn_handler, async () => {
	try {
		return (await api.get(`/admin/members`)).data;
	} catch (e) {
		handleAPIError(e);
	}
});
var approveMember_createServerFn_handler = createServerRpc({
	id: "54851d3e6852251c98f3e4b67290067f65202c3c811aa7585d0fa4713d7242cb",
	name: "approveMember",
	filename: "src/backend/services/admin.services.ts"
}, (opts) => approveMember.__executeServer(opts));
var approveMember = createServerFn({ method: "POST" }).middleware([assertAdminMiddleware]).validator(CommitteeUserQuerySchema).handler(approveMember_createServerFn_handler, async ({ data }) => {
	try {
		await api.put(`/admin/members/approve`, JSON.stringify({ ...data }));
		return "success";
	} catch (error) {
		handleAPIError(error);
	}
});
var deleteMember_createServerFn_handler = createServerRpc({
	id: "d58944bd5ba7d72281eefa337a5f5e6f8ed992748265b134106afab23f7b2e17",
	name: "deleteMember",
	filename: "src/backend/services/admin.services.ts"
}, (opts) => deleteMember.__executeServer(opts));
var deleteMember = createServerFn({ method: "POST" }).middleware([assertAdminMiddleware]).validator(CommitteeUserQuerySchema).handler(deleteMember_createServerFn_handler, async ({ data }) => {
	try {
		await api.post(`/admin/members/delete`, JSON.stringify({ ...data }));
		return "success";
	} catch (error) {
		handleAPIError(error);
	}
});
//#endregion
export { approveMember_createServerFn_handler, deleteMember_createServerFn_handler, getConfig_createServerFn_handler, getPendingMembers_createServerFn_handler, updateConfigYear_createServerFn_handler };
