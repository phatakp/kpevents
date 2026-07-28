import { SearchSchema } from "./common.schema-rOPsTdW8.mjs";
import { require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { createFileRoute, lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { allUserBalancesOptions, committeeMemberOptions, currDBUserQueryOptions } from "./separator-B8iuesUR.mjs";
import { txnsOptions } from "./card-loader-B0N-W8_R.mjs";
import { TabsLoader } from "./tabs-loader-BB8RJ402.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/transactions._committee._type._year-BOkGC4rL.js
var import_jsx_runtime = require_jsx_runtime();
var $$splitComponentImporter = () => import("./transactions._committee._type._year-C7BLIEsC.mjs");
var Route = createFileRoute("/transactions/$committee/$type/$year")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	validateSearch: (search) => SearchSchema.parse(search),
	loaderDeps: ({ search }) => ({
		page: search.page,
		building: search.building ?? "A",
		query: search.query,
		user: search.user,
		user2: search.user2,
		donationType: search.donationType,
		mode: search.mode
	}),
	params: { parse: (rawParams) => ({
		committee: rawParams.committee,
		type: rawParams.type,
		year: parseInt(rawParams.year, 10)
	}) },
	loader: async ({ context, params, deps }) => {
		context.queryClient.ensureQueryData({
			...currDBUserQueryOptions,
			revalidateIfStale: true
		});
		context.queryClient.ensureQueryData({
			...committeeMemberOptions({ committee: params.committee.toUpperCase() }),
			revalidateIfStale: true
		});
		context.queryClient.ensureQueryData({
			...allUserBalancesOptions,
			revalidateIfStale: true
		});
		context.queryClient.ensureQueryData({
			...txnsOptions({
				committee: params.committee.toUpperCase(),
				year: params.year,
				txnType: params.type.toUpperCase(),
				building: deps.building,
				donationType: deps.donationType
			}),
			revalidateIfStale: true
		});
	},
	pendingComponent: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsLoader, { cnt: 3 })
});
//#endregion
export { Route };
