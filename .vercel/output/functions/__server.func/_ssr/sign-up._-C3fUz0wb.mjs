import { SignUp } from "../_libs/@clerk/clerk-react+[...].mjs";
import { require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { Background } from "./background-Cc-GFvyX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sign-up._-C3fUz0wb.js
var import_jsx_runtime = require_jsx_runtime();
function RouteComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Background, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col items-center justify-center gap-6 min-h-screen",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "shadow-xl shadow-accent",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignUp, {
				forceRedirectUrl: "/dashboard",
				signInUrl: "/sign-in"
			})
		})
	}) });
}
//#endregion
export { RouteComponent as component };
