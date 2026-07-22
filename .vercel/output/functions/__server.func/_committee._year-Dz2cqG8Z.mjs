import { require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { createFileRoute, lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
import { cn } from "./_ssr/user.schema-YGQQHiqC.mjs";
import { currDBUserQueryOptions } from "./_ssr/separator-zpJUPmcc.mjs";
import { CardLoader, balancesByCommitteeOptions, donationStatsByCommitteeOptions } from "./_ssr/card-loader-BgCz4ilF.mjs";
import { Background } from "./_ssr/background-Cc-GFvyX.mjs";
import { CardStatsLoader } from "./_ssr/card-stats-loader-CPz2OdTw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_committee._year-Dz2cqG8Z.js
var import_jsx_runtime = require_jsx_runtime();
var $$splitComponentImporter = () => import("./_committee._year-B8V0wozG.mjs");
var Route = createFileRoute("/$committee/$year")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	params: { parse: (rawParams) => ({
		committee: rawParams.committee,
		year: parseInt(rawParams.year, 10)
	}) },
	loader: async ({ context, params }) => {
		context.queryClient.ensureQueryData({
			...currDBUserQueryOptions(),
			revalidateIfStale: true
		});
		context.queryClient.ensureQueryData({
			...balancesByCommitteeOptions({ committee: params.committee.toUpperCase() }),
			revalidateIfStale: true
		});
		context.queryClient.ensureQueryData({
			...donationStatsByCommitteeOptions({
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
