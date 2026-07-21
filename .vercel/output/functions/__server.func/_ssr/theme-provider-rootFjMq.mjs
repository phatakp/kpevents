import { createServerFn, getCookie, setCookie$1 } from "./ssr.mjs";
import { createServerRpc } from "./createServerRpc-DPX_ndmm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/theme-provider-rootFjMq.js
var themeCookie = "ui-theme";
var themes = [
	"light",
	"dark",
	"system"
];
var getStoredTheme_createServerFn_handler = createServerRpc({
	id: "91c186ae8fcf49613a34c629c1c3ed4eec44c9d3410e8abe0589b61bea5de03e",
	name: "getStoredTheme",
	filename: "src/integrations/theme-provider.tsx"
}, (opts) => getStoredTheme.__executeServer(opts));
var getStoredTheme = createServerFn().handler(getStoredTheme_createServerFn_handler, async () => {
	return getCookie(themeCookie) || "dark";
});
var setStoredTheme_createServerFn_handler = createServerRpc({
	id: "349f33856068be52cffa2e35a6e2df120d7f8f059a09b19ad755b6b53c31650a",
	name: "setStoredTheme",
	filename: "src/integrations/theme-provider.tsx"
}, (opts) => setStoredTheme.__executeServer(opts));
var setStoredTheme = createServerFn({ method: "POST" }).validator((data) => {
	if (typeof data !== "string" || !themes.includes(data)) throw new Error("Invalid theme");
	return data;
}).handler(setStoredTheme_createServerFn_handler, ({ data }) => {
	setCookie$1(themeCookie, data);
});
//#endregion
export { getStoredTheme_createServerFn_handler, setStoredTheme_createServerFn_handler };
