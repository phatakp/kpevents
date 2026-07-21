import { require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { cn } from "./user.schema-BooD9qhh.mjs";
import { Image } from "../_libs/unpic__react.mjs";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Separator$1, Skeleton } from "./separator-CR3Hz17M.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/card-stats-loader-Benmu24x.js
var import_jsx_runtime = require_jsx_runtime();
function CardStatsLoader({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("py-10 w-full md:max-w-3xl mx-auto", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "ring-0 border rounded-2xl relative h-full w-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-10 w-30" }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-12 w-60" }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardAction, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-20" }) })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "py-4 flex flex-col gap-9 justify-between md:max-w-3/4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-40" }),
							Array.from([
								1,
								2,
								3
							])?.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center w-full justify-between text-muted-foreground gap-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-10 w-30" })]
							}, i)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center w-full justify-between text-muted-foreground gap-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-10 w-30" })]
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
					src: "https://images.shadcnspace.com/assets/backgrounds/stats-01.webp",
					alt: "user-img",
					width: 211,
					height: 168,
					className: "absolute bottom-0 right-0 hidden sm:block"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-20" }) })
			]
		})
	});
}
//#endregion
export { CardStatsLoader };
