import "../_runtime.mjs";
import { require_react } from "../_libs/@clerk/clerk-react+[...].mjs";
import { require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { createServerFn } from "./ssr.mjs";
import { cn, withMetaLogger } from "./utils-lKLyXhB7.mjs";
import { Root } from "../_libs/radix-ui__react-separator.mjs";
import { assertAuthMiddleware, authMiddleware, createSsrRpc } from "./auth.middleware-DJyYI05a.mjs";
import { ProfileSchemaWithValidation } from "./user.schema-CA2vovpU.mjs";
import { QUERY_KEYS, getMembership } from "./keys-D0H6xnTe.mjs";
import { queryOptions } from "../_libs/tanstack__react-query.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var getCurrUserFromDB = createServerFn({ method: "GET" }).middleware([authMiddleware, withMetaLogger("/users/me")]).handler(createSsrRpc("c5a56a800316fdef849bbb8d1512829e1dacbb95cf3b38e2eff47b5aab130b34"));
var getAllUserBalances = createServerFn({ method: "GET" }).middleware([assertAuthMiddleware, withMetaLogger("/users/balances")]).handler(createSsrRpc("c9e76c422584c202f32fc3bf0a00d246649ad77c9cfbfd61d9bef5766ee0d6b5"));
var createProfile = createServerFn({ method: "POST" }).middleware([assertAuthMiddleware, withMetaLogger("/users")]).validator(ProfileSchemaWithValidation).handler(createSsrRpc("3df6874cd4155c8bc64217e19043578d8f5e748b933f2668542e0e15c694aab2"));
var updateProfile = createServerFn({ method: "POST" }).middleware([assertAuthMiddleware, withMetaLogger("/users")]).validator(ProfileSchemaWithValidation).handler(createSsrRpc("b4f737ea74cf89960143bde9dff132a648c5dd03686ee37b8cf92fcf01b50fdc"));
var currDBUserQueryOptions = queryOptions({
	queryKey: QUERY_KEYS.users.currUser,
	queryFn: getCurrUserFromDB,
	staleTime: 1e3 * 60 * 60 * 24
});
var committeeMemberOptions = (data) => queryOptions({
	queryKey: QUERY_KEYS.users.committeeMembers(data),
	queryFn: () => getMembership({ data })
});
var allUserBalancesOptions = queryOptions({
	queryKey: QUERY_KEYS.txns.allUserBalances,
	queryFn: getAllUserBalances
});
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "skeleton",
		className: cn("animate-pulse rounded-md bg-accent", className),
		...props
	});
}
function Card({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "card",
		className: cn("flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm", className),
		...props
	});
}
function CardHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "card-header",
		className: cn("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", className),
		...props
	});
}
function CardTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "card-title",
		className: cn("leading-none font-semibold", className),
		...props
	});
}
function CardDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "card-description",
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
function CardAction({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "card-action",
		className: cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className),
		...props
	});
}
function CardContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "card-content",
		className: cn("px-6", className),
		...props
	});
}
function CardFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "card-footer",
		className: cn("flex items-center px-6 [.border-t]:pt-6", className),
		...props
	});
}
function Separator$1({ className, orientation = "horizontal", decorative = true, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		"data-slot": "separator",
		decorative,
		orientation,
		className: cn("shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px", className),
		...props
	});
}
//#endregion
export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Separator$1, Skeleton, allUserBalancesOptions, committeeMemberOptions, createProfile, currDBUserQueryOptions, updateProfile };
