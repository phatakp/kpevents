import "../_runtime.mjs";
import { require_react } from "../_libs/@clerk/clerk-react+[...].mjs";
import { require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { cn } from "./utils-lKLyXhB7.mjs";
import { Trash } from "../_libs/lucide-react.mjs";
import { Button } from "./button-Bhg_Lprh.mjs";
import { QUERY_KEYS, approveMember, deleteMember } from "./keys-D0H6xnTe.mjs";
import { useMutation, useQueryClient, useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { allMembersOptions } from "./admin.queries-lOUcYYEc.mjs";
import { zt } from "../_libs/react-hot-toast.mjs";
import { Background } from "./background-Bade6QlY.mjs";
import { SuspenseErrorBoundary } from "./suspense-error-boundary-BpLC6vzM.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function Table({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "table-container",
		className: "relative w-full overflow-x-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
			"data-slot": "table",
			className: cn("w-full caption-bottom text-sm", className),
			...props
		})
	});
}
function TableHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
		"data-slot": "table-header",
		className: cn("[&_tr]:border-b", className),
		...props
	});
}
function TableBody({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
		"data-slot": "table-body",
		className: cn("[&_tr:last-child]:border-0", className),
		...props
	});
}
function TableRow({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
		"data-slot": "table-row",
		className: cn("border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted", className),
		...props
	});
}
function TableHead({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
		"data-slot": "table-head",
		className: cn("h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
		...props
	});
}
function TableCell({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
		"data-slot": "table-cell",
		className: cn("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
		...props
	});
}
function TableCaption({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
		"data-slot": "table-caption",
		className: cn("mt-4 text-sm text-muted-foreground", className),
		...props
	});
}
function useApproveMember() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: approveMember,
		onSuccess: () => {
			zt.success(`Profile updated successfully`);
			return queryClient.invalidateQueries({ queryKey: QUERY_KEYS.allUsers });
		},
		onError: (error) => {
			zt.error(error.message ?? "Could not process request");
		}
	});
}
function useDeleteMember() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteMember,
		onSuccess: () => {
			zt.success(`Profile deleted successfully`);
			return queryClient.invalidateQueries({ queryKey: QUERY_KEYS.allUsers });
		},
		onError: (error) => {
			zt.error(error.message ?? "Could not process request");
		}
	});
}
function AllMembers() {
	const { data: users } = useSuspenseQuery(allMembersOptions);
	const { mutate: approveMember, isPending: isPendingUpdate } = useApproveMember();
	const { mutate: deleteMember, isPending: isPendingDelete } = useDeleteMember();
	const flattenedUsers = Array.prototype.flat.call(users?.map((u) => u.memberships.map((m) => ({
		...u,
		...m
	}))));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6 mt-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-heading font-semibold text-lg",
			children: "Members List"
		}), users && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCaption, { children: "A list of committee members" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "w-25",
					children: "Name"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Committee" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Action" })
			] }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: flattenedUsers.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
					className: "font-medium",
					children: [
						u.firstName,
						" ",
						u?.lastName
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: u.committee }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: [!u.isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					isLoading: isPendingUpdate,
					onClick: () => approveMember({ data: {
						committee: u.committee,
						userId: u.clerkId
					} }),
					children: "Activate"
				}), u.isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "destructive",
					size: "icon-sm",
					isLoading: isPendingDelete,
					onClick: () => deleteMember({ data: {
						committee: u.committee,
						userId: u.clerkId
					} }),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash, {})
				})] })
			] }, u.clerkId)) })
		] })]
	});
}
function RouteComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Background, {
		className: "items-start",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-6 py-8 container",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "title",
				children: "Admin Page"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuspenseErrorBoundary, {
				id: `user-card`,
				fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Loading..." }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AllMembers, {})
			})]
		})
	});
}
//#endregion
export { RouteComponent as component };
