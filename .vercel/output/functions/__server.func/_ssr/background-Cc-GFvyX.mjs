import { require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { cn } from "./user.schema-YGQQHiqC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/background-Cc-GFvyX.js
var import_jsx_runtime = require_jsx_runtime();
function Background({ className, children, type = "dot" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative flex h-full w-full items-center justify-center bg-background min-h-screen overflow-hidden", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("absolute inset-0", "bg-size-[40px_40px]", type === "dot" ? "bg-[radial-gradient(#404040_1px,transparent_1px)]" : "bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center bg-background mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-20 w-full",
				children
			})
		]
	});
}
//#endregion
export { Background };
