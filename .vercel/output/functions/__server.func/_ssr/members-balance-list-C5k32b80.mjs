import { COMMITTEE, ROUTE_SUB_TYPE, TXN_TYPE } from "./common.schema-rOPsTdW8.mjs";
import { require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { cn } from "./utils-lKLyXhB7.mjs";
import { ChevronRight, Eye } from "../_libs/lucide-react.mjs";
import { buttonVariants } from "./button-Bhg_Lprh.mjs";
import { useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Separator$1, allUserBalancesOptions, currDBUserQueryOptions } from "./separator-B8iuesUR.mjs";
import { Badge } from "./suspense-error-boundary-BpLC6vzM.mjs";
import { Amount, AnimatedList, AnimatedListItem, Modal, SelectYear } from "./animated-list-CYIuENrB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/members-balance-list-C5k32b80.js
var import_jsx_runtime = require_jsx_runtime();
function MemberBalanceList({ committee, type, year, showOther, handleSelect }) {
	const { data: profile } = useSuspenseQuery(currDBUserQueryOptions);
	const member = profile?.memberships.find((m) => m.committee === committee);
	const { data: txns } = useSuspenseQuery(allUserBalancesOptions);
	const committeeTxns = txns?.filter((t) => t.committee === committee) ?? [];
	const totalCommitteeBalance = committeeTxns.reduce((acc, b) => acc + b.balance, 0);
	const filteredUserBalances = Object.values(committeeTxns.reduce((acc, curr) => {
		const key = `${curr.firstName} ${curr.lastName}:${curr.building}-${curr.flat}`;
		if (!acc[key]) acc[key] = {
			key,
			id: curr.clerkId,
			txnType: curr.txnType,
			year: curr.year,
			donationType: curr.donationType,
			balance: 0,
			totalAmount: 0
		};
		acc[key].balance += curr.balance;
		acc[key].totalAmount += curr.balance;
		return acc;
	}, {})).filter((u) => u.id !== profile?.clerkId && u.totalAmount !== 0).sort((a, b) => b.totalAmount - a.totalAmount) ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
		className: "capitalize font-heading",
		children: [
			"Total ",
			committee.toLowerCase(),
			" Balance"
		]
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
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedList, { children: filteredUserBalances?.map((u) => {
			const [name, flatNumber] = u.key.split(":");
			const [firstName, lastName] = name.split(" ");
			const userBalances = filteredUserBalances.filter((b) => b.id === u.id);
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
								total: u.totalAmount,
								year,
								handleSelect,
								balances: userBalances
							}),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm md:text-base",
									children: firstName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden md:flex text-base",
									children: lastName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "md:hidden text-sm uppercase",
									children: lastName?.charAt(0)
								})
							]
						}),
						firstName.toLowerCase() !== "unknown" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							className: "group-hover:bg-primary group-hover:text-primary-foreground",
							children: flatNumber
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
					amount: u.totalAmount,
					iconClass: "size-3 md:size-4",
					className: cn("text-base md:text-xl text-muted-foreground", (firstName.toLowerCase() === "unknown" || u.totalAmount < 0) && "text-destructive")
				})]
			}) }, u.key);
		}) })] })]
	})] });
}
function MemberBalanceDetail({ name, flat, total, year, handleSelect, balances }) {
	const currYearBalances = balances.filter((t) => t.year === year);
	const otherYearBalances = balances.filter((t) => t.year !== year);
	const groupedYearBalances = Object.values(otherYearBalances.reduce((acc, curr) => {
		const key = curr.year;
		if (!acc[key]) acc[key] = {
			year: key,
			totalAmount: 0
		};
		acc[key].totalAmount += curr.balance;
		return acc;
	}, {})).filter((u) => u.totalAmount !== 0).sort((a, b) => b.year > a.year ? 1 : -1) ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "title",
					children: name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: flat }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectYear, {
					year,
					handleSelect
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center w-full justify-between bg-muted text-muted-foreground p-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "capitalize font-heading font-normal",
						children: "Balance Type"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "capitalize font-heading font-normal",
						children: "Amount"
					})]
				}),
				currYearBalances?.map((bal) => {
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
				groupedYearBalances?.map((bal) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center w-full justify-between text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "capitalize font-heading font-normal",
							children: [bal.year, " balance"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
							amount: bal.totalAmount,
							className: cn("text-sm font-normal", bal.totalAmount < 0 ? "text-destructive" : "text-success"),
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
