import { require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { createFileRoute, lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
import { SearchSchema } from "./_ssr/common.schema-CKnvY_hu.mjs";
import { itemsOptions } from "./_ssr/card-loader-Jku4GCL4.mjs";
import { TabsLoader } from "./_ssr/tabs-loader-BqKgkBjI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_committee._subType._year-DfRkrjZd.js
var import_jsx_runtime = require_jsx_runtime();
var $$splitComponentImporter = () => import("./_committee._subType._year-_-OYvk_G.mjs");
var Route = createFileRoute("/$committee/$subType/$year")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	validateSearch: (search) => SearchSchema.parse(search),
	loaderDeps: ({ search }) => ({
		page: search.page,
		user: search.user,
		mode: search.mode,
		isConfirmed: search.isConfirmed,
		isBooking: search.isBooking
	}),
	params: { parse: (rawParams) => ({
		committee: rawParams.committee,
		subType: rawParams.subType,
		year: parseInt(rawParams.year, 10)
	}) },
	loader: async ({ context, params, deps }) => {
		context.queryClient.ensureQueryData({
			...itemsOptions({
				type: params.subType.toUpperCase(),
				year: params.year
			}),
			revalidateIfStale: true
		});
	},
	pendingComponent: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsLoader, {})
});
//#endregion
export { Route };
