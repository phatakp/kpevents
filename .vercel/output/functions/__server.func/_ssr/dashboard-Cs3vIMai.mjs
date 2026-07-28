import { COMMITTEE, OptionalCommitteeQuerySchema } from "./common.schema-rOPsTdW8.mjs";
import { createFileRoute, lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { allUserBalancesOptions, currDBUserQueryOptions } from "./separator-B8iuesUR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-Cs3vIMai.js
var $$splitComponentImporter = () => import("./dashboard-ByP4qiTk.mjs");
var Route = createFileRoute("/dashboard")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	validateSearch: (search) => OptionalCommitteeQuerySchema.parse(search),
	loaderDeps: ({ search }) => ({ committee: search?.committee ?? COMMITTEE.CULTURAL }),
	loader: async ({ context }) => {
		context.queryClient.ensureQueryData({
			...currDBUserQueryOptions,
			revalidateIfStale: true
		});
		context.queryClient.ensureQueryData({
			...allUserBalancesOptions,
			revalidateIfStale: true
		});
	}
});
//#endregion
export { Route };
