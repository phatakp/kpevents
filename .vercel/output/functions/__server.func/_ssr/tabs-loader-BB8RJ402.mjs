import { require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { cn } from "./utils-lKLyXhB7.mjs";
import { Card, Skeleton } from "./separator-B8iuesUR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tabs-loader-BB8RJ402.js
var import_jsx_runtime = require_jsx_runtime();
function TabsLoader({ className, cnt = 2 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col gap-6 mx-auto min-w-screen", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center gap-4",
			children: Array.from({ length: cnt }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-25" }, i))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "w-full h-[30vh] md:max-w-3xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "w-[calc(100vw-2rem)] md:w-full h-full" })
		})]
	});
}
//#endregion
export { TabsLoader };
