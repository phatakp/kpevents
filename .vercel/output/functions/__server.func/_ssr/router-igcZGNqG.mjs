import { require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { ErrorComponent, Link, createFileRoute, createRouter, lazyRouteComponent, rootRouteId, useMatch, useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { COMMITTEE, OptionalCommitteeQuerySchema } from "./common.schema-CKnvY_hu.mjs";
import { FileQuestionMark } from "../_libs/lucide-react.mjs";
import { Button } from "./button-Wk0bb36Z.mjs";
import { pendingMemberOptions } from "./admin.queries-BOrzEKU7.mjs";
import { Route as Route$5, currDBUserQueryOptions, getContext, memberBalancesByCommitteeOptions } from "./separator-zpJUPmcc.mjs";
import { Route as Route$6 } from "../_committee._subType._year-C-wY5ND_.mjs";
import { Route as Route$7 } from "../_committee._year-Dz2cqG8Z.mjs";
import { Route as Route$8 } from "./transactions._committee._type._year-CCa6BVSR.mjs";
import { setupRouterSsrQueryIntegration } from "../_libs/@tanstack/react-router-ssr-query+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-igcZGNqG.js
var import_jsx_runtime = require_jsx_runtime();
function DefaultCatchBoundary({ error }) {
	const router = useRouter();
	const isRoot = useMatch({
		strict: false,
		select: (state) => state.id === rootRouteId
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0 flex-1 p-4 flex flex-col items-center justify-center gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorComponent, { error }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-2 items-center flex-wrap",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				onClick: () => {
					router.invalidate();
				},
				children: "Try Again"
			}), isRoot ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: `px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold`,
				children: "Home"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: `px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold`,
				onClick: (e) => {
					e.preventDefault();
					window.history.back();
				},
				children: "Go Back"
			})]
		})]
	});
}
function NotFoundPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col items-center justify-center px-4 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileQuestionMark, { className: "mx-auto h-24 w-24 text-muted-foreground" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-bold text-4xl tracking-tight",
						children: "Page not found"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: "Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or never existed."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col justify-center gap-2 sm:flex-row",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							children: "Return home"
						})
					})
				})
			]
		})
	});
}
var $$splitComponentImporter$4 = () => import("./dashboard-BJmhKVwZ.mjs");
var Route$4 = createFileRoute("/dashboard")({
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	validateSearch: (search) => OptionalCommitteeQuerySchema.parse(search),
	loaderDeps: ({ search }) => ({ committee: search?.committee ?? COMMITTEE.CULTURAL }),
	loader: async ({ context, deps }) => {
		context.queryClient.ensureQueryData({
			...currDBUserQueryOptions(),
			revalidateIfStale: true
		});
		context.queryClient.ensureQueryData({
			...memberBalancesByCommitteeOptions({ committee: deps.committee }),
			revalidateIfStale: true
		});
	}
});
var $$splitComponentImporter$3 = () => import("./admin-DaZAFVji.mjs");
var Route$3 = createFileRoute("/admin")({
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	loader: async ({ context }) => {
		context.queryClient.ensureQueryData(pendingMemberOptions());
	}
});
var $$splitComponentImporter$2 = () => import("./routes-D95CJcK6.mjs");
var Route$2 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./sign-up._-C3fUz0wb.mjs");
var Route$1 = createFileRoute("/sign-up/$")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./sign-in._-xobGa4C9.mjs");
var Route = createFileRoute("/sign-in/$")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var DashboardRoute = Route$4.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => Route$5
});
var AdminRoute = Route$3.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$5
});
var IndexRoute = Route$2.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$5
});
var SignUpSplatRoute = Route$1.update({
	id: "/sign-up/$",
	path: "/sign-up/$",
	getParentRoute: () => Route$5
});
var SignInSplatRoute = Route.update({
	id: "/sign-in/$",
	path: "/sign-in/$",
	getParentRoute: () => Route$5
});
var rootRouteChildren = {
	IndexRoute,
	AdminRoute,
	DashboardRoute,
	CommitteeYearRoute: Route$7.update({
		id: "/$committee/$year",
		path: "/$committee/$year",
		getParentRoute: () => Route$5
	}),
	SignInSplatRoute,
	SignUpSplatRoute,
	CommitteeSubTypeYearRoute: Route$6.update({
		id: "/$committee/$subType/$year",
		path: "/$committee/$subType/$year",
		getParentRoute: () => Route$5
	}),
	TransactionsCommitteeTypeYearRoute: Route$8.update({
		id: "/transactions/$committee/$type/$year",
		path: "/transactions/$committee/$type/$year",
		getParentRoute: () => Route$5
	})
};
var routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
	const context = getContext();
	const router = createRouter({
		routeTree,
		context,
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
		defaultErrorComponent: DefaultCatchBoundary,
		defaultNotFoundComponent: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotFoundPage, {})
	});
	setupRouterSsrQueryIntegration({
		router,
		queryClient: context.queryClient
	});
	return router;
}
//#endregion
export { getRouter };
