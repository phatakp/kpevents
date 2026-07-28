import { createServerFn } from "./ssr.mjs";
import { withMetaLogger } from "./utils-lKLyXhB7.mjs";
import { assertAuthMiddleware, authMiddleware } from "./auth.middleware-DJyYI05a.mjs";
import { ProfileSchemaWithValidation } from "./user.schema-CA2vovpU.mjs";
import { createServerRpc } from "./createServerRpc-DPX_ndmm.mjs";
import { userService } from "./user.service-1w3jqwfk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/user.function-BqdFNS8s.js
var getCurrUserFromDB_createServerFn_handler = createServerRpc({
	id: "c5a56a800316fdef849bbb8d1512829e1dacbb95cf3b38e2eff47b5aab130b34",
	name: "getCurrUserFromDB",
	filename: "src/api/functions/user.function.ts"
}, (opts) => getCurrUserFromDB.__executeServer(opts));
var getCurrUserFromDB = createServerFn({ method: "GET" }).middleware([authMiddleware, withMetaLogger("/users/me")]).handler(getCurrUserFromDB_createServerFn_handler, async ({ context }) => {
	if (!context.userId) return null;
	return userService.getCurrUser();
});
var getAllUserBalances_createServerFn_handler = createServerRpc({
	id: "c9e76c422584c202f32fc3bf0a00d246649ad77c9cfbfd61d9bef5766ee0d6b5",
	name: "getAllUserBalances",
	filename: "src/api/functions/user.function.ts"
}, (opts) => getAllUserBalances.__executeServer(opts));
var getAllUserBalances = createServerFn({ method: "GET" }).middleware([assertAuthMiddleware, withMetaLogger("/users/balances")]).handler(getAllUserBalances_createServerFn_handler, async () => {
	return userService.getAllUserBalance();
});
var createProfile_createServerFn_handler = createServerRpc({
	id: "3df6874cd4155c8bc64217e19043578d8f5e748b933f2668542e0e15c694aab2",
	name: "createProfile",
	filename: "src/api/functions/user.function.ts"
}, (opts) => createProfile.__executeServer(opts));
var createProfile = createServerFn({ method: "POST" }).middleware([assertAuthMiddleware, withMetaLogger("/users")]).validator(ProfileSchemaWithValidation).handler(createProfile_createServerFn_handler, async ({ data }) => {
	return userService.createProfile(data);
});
var updateProfile_createServerFn_handler = createServerRpc({
	id: "b4f737ea74cf89960143bde9dff132a648c5dd03686ee37b8cf92fcf01b50fdc",
	name: "updateProfile",
	filename: "src/api/functions/user.function.ts"
}, (opts) => updateProfile.__executeServer(opts));
var updateProfile = createServerFn({ method: "POST" }).middleware([assertAuthMiddleware, withMetaLogger("/users")]).validator(ProfileSchemaWithValidation).handler(updateProfile_createServerFn_handler, async ({ data }) => {
	return userService.updateProfile(data);
});
//#endregion
export { createProfile_createServerFn_handler, getAllUserBalances_createServerFn_handler, getCurrUserFromDB_createServerFn_handler, updateProfile_createServerFn_handler };
