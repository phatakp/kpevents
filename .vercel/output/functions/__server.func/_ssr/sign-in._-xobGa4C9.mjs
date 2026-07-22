import { SignIn } from "../_libs/@clerk/clerk-react+[...].mjs";
import { require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { Background } from "./background-Cc-GFvyX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sign-in._-xobGa4C9.js
var import_jsx_runtime = require_jsx_runtime();
function RouteComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Background, {
		type: "grid",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col items-center justify-center gap-6 min-h-screen",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "shadow-xl shadow-accent",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignIn, {
					forceRedirectUrl: "/dashboard",
					signUpUrl: "/sign-up"
				})
			})
		})
	});
}
//#endregion
export { RouteComponent as component };
