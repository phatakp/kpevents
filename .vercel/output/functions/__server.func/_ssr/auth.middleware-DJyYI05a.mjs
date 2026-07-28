import { USER_ROLE } from "./common.schema-rOPsTdW8.mjs";
import { TSS_SERVER_FUNCTION, createMiddleware, createServerFn, getServerFnById } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.middleware-DJyYI05a.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getLoggedInUser = createServerFn({ method: "GET" }).handler(createSsrRpc("0c007176f366d4a85715139ef7409655a10911e273fae77e97844b48652bfb4d"));
var authMiddleware = createMiddleware().server(async ({ next }) => {
	const { userId } = await getLoggedInUser();
	return next({ context: { userId } });
});
var assertAuthMiddleware = createMiddleware().server(async ({ next }) => {
	const { userId } = await getLoggedInUser();
	if (!userId) throw new Error("You are not authenticated");
	return next({ context: { userId } });
});
var assertAdminMiddleware = createMiddleware().server(async ({ next }) => {
	const { role, userId } = await getLoggedInUser();
	if (role !== USER_ROLE.ADMIN) throw new Error("Not Admin");
	return next({ context: { userId } });
});
//#endregion
export { assertAdminMiddleware, assertAuthMiddleware, authMiddleware, createSsrRpc, getLoggedInUser };
