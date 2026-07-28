import { createServerFn } from "./ssr.mjs";
import { createServerRpc } from "./createServerRpc-DPX_ndmm.mjs";
import { auth } from "./auth-Bf5LRocI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.function-BO0k3em1.js
var getLoggedInUser_createServerFn_handler = createServerRpc({
	id: "0c007176f366d4a85715139ef7409655a10911e273fae77e97844b48652bfb4d",
	name: "getLoggedInUser",
	filename: "src/api/functions/auth.function.ts"
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
