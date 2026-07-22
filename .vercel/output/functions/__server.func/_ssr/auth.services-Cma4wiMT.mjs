import { createServerFn } from "./ssr.mjs";
import { createServerRpc } from "./createServerRpc-DPX_ndmm.mjs";
import { auth } from "./auth-Bf5LRocI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.services-Cma4wiMT.js
var getLoggedInUser_createServerFn_handler = createServerRpc({
	id: "8db0644de162aba8b964fb0e05fcf5d1ef52126b54ae9640c0bbc3a3136dee4a",
	name: "getLoggedInUser",
	filename: "src/backend/services/auth.services.ts"
}, (opts) => getLoggedInUser.__executeServer(opts));
var getLoggedInUser = createServerFn({ method: "GET" }).handler(getLoggedInUser_createServerFn_handler, async () => {
	try {
		const { userId, sessionClaims } = await auth();
		if (!userId) throw Error("Not authenticated");
		return {
			userId,
			role: sessionClaims.metadata?.role,
			firstName: sessionClaims?.firstName,
			lastName: sessionClaims?.lastName,
			imageUrl: sessionClaims?.imageUrl
		};
	} catch (_) {
		return {
			userId: void 0,
			role: void 0,
			firstName: void 0,
			lastName: void 0,
			imageUrl: void 0
		};
	}
});
//#endregion
export { getLoggedInUser_createServerFn_handler };
