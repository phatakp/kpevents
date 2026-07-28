import { require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { createFileRoute, lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
import { cn } from "./_ssr/utils-lKLyXhB7.mjs";
import { currDBUserQueryOptions } from "./_ssr/separator-B8iuesUR.mjs";
import { CardLoader, committeeBalancesOptions, donationStatsOptions } from "./_ssr/card-loader-B0N-W8_R.mjs";
import { Background } from "./_ssr/background-Bade6QlY.mjs";
import { CardStatsLoader } from "./_ssr/card-stats-loader-CQYh2HDu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_committee._year-B_RcniLE.js
var import_jsx_runtime = require_jsx_runtime();
var $$splitComponentImporter = () => import("./_committee._year-Cb9Vu-7_.mjs");
var Route = createFileRoute("/$committee/$year")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	params: { parse: (rawParams) => ({
		committee: rawParams.committee,
		year: parseInt(rawParams.year, 10)
	}) },
	loader: async ({ context, params }) => {
		context.queryClient.ensureQueryData({
			...currDBUserQueryOptions,
			revalidateIfStale: true
		});
		context.queryClient.ensureQueryData({
			...committeeBalancesOptions({ committee: params.committee.toUpperCase() }),
			revalidateIfStale: true
		});
		context.queryClient.ensureQueryData({
			...donationStatsOptions({
				committee: params.committee.toUpperCase(),
				year: params.year ?? context.config.activeYear
			}),
			revalidateIfStale: true
		});
	},
	pendingComponent: () => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Background, {
			className: "items-start",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "container py-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("grid md:grid-cols-3 gap-x-4 gap-y-6 w-full max-w-[calc(100vw-1rem)] mx-auto md:max-w-full"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardStatsLoader, { className: "md:col-span-2 order-1 mx-auto w-full" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardLoader, { className: "md:col-span-2 md:order-3 order-2 mx-auto w-full" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardLoader, { className: "md:order-2 md:row-span-2 mx-auto h-full" })
					]
				})
			})
		});
	}
});
//#endregion
export { Route };
