import { ControlRecordSchema } from "./common.schema-rOPsTdW8.mjs";
import { createServerFn } from "./ssr.mjs";
import { assertAdminMiddleware } from "./auth.middleware-DJyYI05a.mjs";
import { createServerRpc } from "./createServerRpc-DPX_ndmm.mjs";
import { AdminRepository } from "./admin.repository-C7F-opAP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.function-CIFrqO3k.js
var AdminService = class {
	repo = new AdminRepository();
	async getConfig() {
		return this.repo.getConfig();
	}
	async updateConfig(request) {
		return this.repo.updateConfig(request);
	}
};
var adminService = new AdminService();
var getConfig_createServerFn_handler = createServerRpc({
	id: "d1d9c9a39353d90a0e45dd376907cf7d165937b970c20e2b0d908ea6325bc295",
	name: "getConfig",
	filename: "src/api/functions/admin.function.ts"
}, (opts) => getConfig.__executeServer(opts));
var getConfig = createServerFn({ method: "GET" }).handler(getConfig_createServerFn_handler, async () => {
	return adminService.getConfig();
});
var updateConfig_createServerFn_handler = createServerRpc({
	id: "000bb21e9a1e299695ef483866333aacc5cf24794a0925ee4ed4bf4701e97dab",
	name: "updateConfig",
	filename: "src/api/functions/admin.function.ts"
}, (opts) => updateConfig.__executeServer(opts));
var updateConfig = createServerFn({ method: "POST" }).middleware([assertAdminMiddleware]).validator(ControlRecordSchema).handler(updateConfig_createServerFn_handler, async ({ data }) => {
	return adminService.updateConfig(data);
});
//#endregion
export { getConfig_createServerFn_handler, updateConfig_createServerFn_handler };
