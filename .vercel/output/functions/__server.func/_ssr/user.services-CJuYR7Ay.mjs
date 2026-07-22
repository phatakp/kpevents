import { createServerFn } from "./ssr.mjs";
import { CommitteeQuerySchema, assertAuthMiddleware, authMiddleware } from "./common.schema-CKnvY_hu.mjs";
import { ProfileSchemaWithValidation } from "./user.schema-YGQQHiqC.mjs";
import { createServerRpc } from "./createServerRpc-DPX_ndmm.mjs";
import { api, handleAPIError } from "./axios-DW8fiHrc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/user.services-CJuYR7Ay.js
var getCurrUserFromDB_createServerFn_handler = createServerRpc({
	id: "ea2096ddef8973c13ae78eddd783dedaaa1ea8414e916fdcb7d5082c9e2a6960",
	name: "getCurrUserFromDB",
	filename: "src/backend/services/user.services.ts"
}, (opts) => getCurrUserFromDB.__executeServer(opts));
var getCurrUserFromDB = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getCurrUserFromDB_createServerFn_handler, async ({ context }) => {
	if (!context.userId) return null;
	try {
		return (await api.get(`/users/me`)).data;
	} catch (_e) {
		return null;
	}
});
var createProfile_createServerFn_handler = createServerRpc({
	id: "a59e7d40c370ff50f23f6e28ca9aec6e2e73e9332a69829a3185e39a3894d49d",
	name: "createProfile",
	filename: "src/backend/services/user.services.ts"
}, (opts) => createProfile.__executeServer(opts));
var createProfile = createServerFn({ method: "POST" }).middleware([assertAuthMiddleware]).validator(ProfileSchemaWithValidation).handler(createProfile_createServerFn_handler, async ({ data }) => {
	try {
		return (await api.post(`/users`, JSON.stringify({ ...data }))).data;
	} catch (error) {
		handleAPIError(error);
	}
});
var updateProfile_createServerFn_handler = createServerRpc({
	id: "b4617b0c8cb9847ca1f963b245b23e76f90f829aa3b609d285ca01b7ade90cdd",
	name: "updateProfile",
	filename: "src/backend/services/user.services.ts"
}, (opts) => updateProfile.__executeServer(opts));
var updateProfile = createServerFn({ method: "POST" }).middleware([assertAuthMiddleware]).validator(ProfileSchemaWithValidation).handler(updateProfile_createServerFn_handler, async ({ data }) => {
	try {
		return (await api.put(`/users`, JSON.stringify({ ...data }))).data;
	} catch (error) {
		handleAPIError(error);
	}
});
var becomeMember_createServerFn_handler = createServerRpc({
	id: "7e58e0865a71f0cfbdb369518d5cf2ccd125c8ccc3a32058fb5543aad08e0b4c",
	name: "becomeMember",
	filename: "src/backend/services/user.services.ts"
}, (opts) => becomeMember.__executeServer(opts));
var becomeMember = createServerFn({ method: "POST" }).middleware([assertAuthMiddleware]).validator(CommitteeQuerySchema).handler(becomeMember_createServerFn_handler, async ({ data }) => {
	try {
		await api.post(`/members/committee/${data.committee}`);
		return "success";
	} catch (error) {
		handleAPIError(error);
	}
});
var getMembersByCommittee_createServerFn_handler = createServerRpc({
	id: "0531c07c91735e4f968b1439e6aed7ef155791e83bb1b6d173c6655ece5cd059",
	name: "getMembersByCommittee",
	filename: "src/backend/services/user.services.ts"
}, (opts) => getMembersByCommittee.__executeServer(opts));
var getMembersByCommittee = createServerFn({ method: "GET" }).validator(CommitteeQuerySchema).handler(getMembersByCommittee_createServerFn_handler, async ({ data }) => {
	try {
		return (await api.get(`/members/committee/${data.committee}`)).data;
	} catch (e) {
		handleAPIError(e);
	}
});
var getCurrUserBalancesByCommittee_createServerFn_handler = createServerRpc({
	id: "6e44fd450e5dd443132ed4115d107c7da6edd6786d9b723e24aba62e48a5869a",
	name: "getCurrUserBalancesByCommittee",
	filename: "src/backend/services/user.services.ts"
}, (opts) => getCurrUserBalancesByCommittee.__executeServer(opts));
var getCurrUserBalancesByCommittee = createServerFn({ method: "GET" }).middleware([assertAuthMiddleware]).validator(CommitteeQuerySchema).handler(getCurrUserBalancesByCommittee_createServerFn_handler, async ({ data }) => {
	try {
		return (await api.get(`/users/me/balances/committee/${data.committee}`)).data;
	} catch (error) {
		handleAPIError(error);
	}
});
var getMemberBalancesByCommittee_createServerFn_handler = createServerRpc({
	id: "91f2d8dd2f7693eb7a4ecae53bd42656f6a859877cde4355972d007960781aed",
	name: "getMemberBalancesByCommittee",
	filename: "src/backend/services/user.services.ts"
}, (opts) => getMemberBalancesByCommittee.__executeServer(opts));
var getMemberBalancesByCommittee = createServerFn({ method: "GET" }).middleware([assertAuthMiddleware]).validator(CommitteeQuerySchema).handler(getMemberBalancesByCommittee_createServerFn_handler, async ({ data }) => {
	try {
		return (await api.get(`/users/balances/committee/${data.committee}`)).data;
	} catch (error) {
		handleAPIError(error);
	}
});
//#endregion
export { becomeMember_createServerFn_handler, createProfile_createServerFn_handler, getCurrUserBalancesByCommittee_createServerFn_handler, getCurrUserFromDB_createServerFn_handler, getMemberBalancesByCommittee_createServerFn_handler, getMembersByCommittee_createServerFn_handler, updateProfile_createServerFn_handler };
