import { require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { COMMITTEE, ROUTE_SUB_TYPE, TXN_TYPE } from "./common.schema-CKnvY_hu.mjs";
import { cn } from "./user.schema-YGQQHiqC.mjs";
import { ChevronRight, Eye } from "../_libs/lucide-react.mjs";
import { buttonVariants } from "./button-Wk0bb36Z.mjs";
import { useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Route, Separator$1, currDBUserQueryOptions, memberBalancesByCommitteeOptions } from "./separator-zpJUPmcc.mjs";
import { Badge } from "./suspense-error-boundary-D9Qnozea.mjs";
import { Amount, AnimatedList, AnimatedListItem, Modal } from "./animated-list-Bv4wx7eL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/members-balance-list-DGWHCv_H.js
var import_jsx_runtime = require_jsx_runtime();
function MemberBalanceList({ committee, type, year, showOther }) {
	const { auth } = Route.useRouteContext();
	const { data: profile } = useSuspenseQuery(currDBUserQueryOptions());
	const member = profile?.memberships.find((m) => m.committee === committee);
	const { data: users } = useSuspenseQuery(memberBalancesByCommitteeOptions({ committee }));
	const totalCommitteeBalance = users?.reduce((acc, b) => acc + b.total, 0) ?? 0;
	const filteredUsers = users?.filter((u) => u.clerkId !== auth.userId && u.total !== 0).sort((a, b) => b.total - a.total) ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
		className: "capitalize font-heading",
		children: [committee.toLowerCase(), " Committee Balance"]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
		amount: totalCommitteeBalance,
		containerClass: "justify-start",
		className: "title text-3xl"
	}) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
		className: "flex flex-col gap-4",
		children: [type === TXN_TYPE.DONATION && !showOther && member?.isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/$committee/$subType/$year",
			params: {
				committee: committee.toLowerCase(),
				year,
				subType: committee === COMMITTEE.CULTURAL ? ROUTE_SUB_TYPE.ANNADAAN : ROUTE_SUB_TYPE.TEMPLE
			},
			className: cn(buttonVariants({ size: "sm" }), "w-fit"),
			children: [committee === COMMITTEE.CULTURAL ? "View Annadaan Donations" : "View Temple Item Donations", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})]
		}), showOther && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm text-muted-foreground underline underline-offset-4",
			children: "Other Member Balances"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedList, { children: filteredUsers?.map((u) => {
			const name = `${u.firstName} ${u.lastName}`;
			const flatNumber = `${u.building}-${u.flat}`;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedListItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
							headerClass: cn("bg-linear-to-br from-primary via-primary/60 to-primary/30 p-4 text-primary-foreground rounded-t-lg text-xl"),
							closeBtnClass: "text-primary-foreground hover:text-accent",
							btnClass: cn(buttonVariants({
								variant: "outline",
								size: "icon"
							})),
							title: `Member Balance Details`,
							content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberBalanceDetail, {
								name,
								flat: flatNumber,
								total: u.total,
								balances: u.balances
							}),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm md:text-base",
									children: u.firstName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden md:flex text-base",
									children: u.lastName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "md:hidden text-sm uppercase",
									children: u.lastName?.charAt(0)
								})
							]
						}),
						u.firstName.toLowerCase() !== "unknown" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							className: "group-hover:bg-primary group-hover:text-primary-foreground",
							children: flatNumber
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
					amount: u.total,
					iconClass: "size-3 md:size-4",
					className: cn("text-base md:text-xl text-muted-foreground", (u.firstName.toLowerCase() === "unknown" || u.total < 0) && "text-destructive")
				})]
			}) }, u.clerkId);
		}) })] })]
	})] });
}
function MemberBalanceDetail({ name, flat, total, balances }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "title",
				children: name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: flat })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4",
			children: [
				balances?.map((bal) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center w-full justify-between text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "capitalize font-heading font-normal",
							children: bal.txnType === "DONATION" ? `${bal.donationType?.toLowerCase()} donations` : bal.txnType === "EXPENSE" ? "Expenses Made" : bal.balance < 0 ? "Transfers Made" : "Transfers Received"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
							amount: bal.balance,
							className: cn("text-sm font-normal", bal.balance < 0 ? "text-destructive" : "text-success"),
							iconClass: "size-3"
						})]
					}, name);
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center w-full justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "capitalize font-heading text-lg",
						children: "Total"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
						amount: total,
						className: cn("", total < 0 ? "text-destructive" : "text-success")
					})]
				})
			]
		})]
	});
}
//#endregion
export { MemberBalanceList };
