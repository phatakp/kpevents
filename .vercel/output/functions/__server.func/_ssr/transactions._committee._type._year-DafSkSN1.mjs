import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/@clerk/clerk-react+[...].mjs";
import { require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { Link, useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { BUILDING_OPTIONS, DONATION_TYPE, ROUTE_TXN_TYPE, ROUTE_TYPE_OPTIONS, TXN_MODE, TXN_MODE_OPTIONS } from "./common.schema-CKnvY_hu.mjs";
import { cva } from "../_libs/class-variance-authority+clsx.mjs";
import { format } from "../_libs/date-fns.mjs";
import { cn, getFilteredTxns, getPaidByOptions, getUserInfo, getUserOptions } from "./user.schema-YGQQHiqC.mjs";
import { Content2, Group2, Item2, Label2, Portal2, Root2, Separator2, Trigger } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { Check, Dot, Funnel, Search, X } from "../_libs/lucide-react.mjs";
import { Button, buttonVariants } from "./button-Wk0bb36Z.mjs";
import { useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle, currDBUserQueryOptions } from "./separator-zpJUPmcc.mjs";
import { CardLoader, txnsByCommitteeOptions } from "./card-loader-BgCz4ilF.mjs";
import { Background } from "./background-Cc-GFvyX.mjs";
import { Badge, SuspenseErrorBoundary } from "./suspense-error-boundary-D9Qnozea.mjs";
import { Amount, AnimatedList, AnimatedListItem, InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, Tabs$1, TabsContent, TabsContents, TabsList, TabsTrigger } from "./animated-list-Bv4wx7eL.mjs";
import { SelectYear, TxnButton } from "./txn-button-CmsZSepH.mjs";
import { PaginationComponent, TxnActions } from "./pagination-kVz1hfz-.mjs";
import { MemberBalanceList } from "./members-balance-list-DGWHCv_H.mjs";
import { Route } from "./transactions._committee._type._year-CCa6BVSR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/transactions._committee._type._year-DafSkSN1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var buttonGroupVariants = cva("flex w-fit items-stretch has-[>[data-slot=button-group]]:gap-2 [&>*]:focus-visible:relative [&>*]:focus-visible:z-10 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1", {
	variants: { orientation: {
		horizontal: "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",
		vertical: "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none"
	} },
	defaultVariants: { orientation: "horizontal" }
});
function ButtonGroup({ className, orientation, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "group",
		"data-slot": "button-group",
		"data-orientation": orientation,
		className: cn(buttonGroupVariants({ orientation }), className),
		...props
	});
}
function BuildingFilter() {
	const { building = "A" } = Route.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup, {
		className: cn("border-none h-9 md:w-fit p-0 m-0", "has-[[data-slot=input-group-control]:focus-visible]:border-none has-[[data-slot=input-group-control]:focus-visible]:ring-0 has-[[data-slot=input-group-control]:focus-visible]:ring-none"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupInput, {
				className: cn("pe-0 text-xs text-muted-foreground w-fit hidden md:flex"),
				value: `Show for Building`,
				readOnly: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupInput, {
				className: cn("pe-0 text-xs text-muted-foreground w-fit md:hidden"),
				value: `Building`,
				readOnly: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, {
				align: "inline-end",
				className: "p-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonGroup, { children: BUILDING_OPTIONS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					resetScroll: false,
					to: ".",
					search: {
						page: 0,
						building: b,
						query: void 0
					},
					className: cn("text-sm", buttonVariants({
						variant: b === building ? "default" : "outline",
						size: "icon-sm"
					})),
					children: b
				}, b)) })
			})
		]
	});
}
function DonationList({ txns }) {
	const { type, year } = Route.useParams();
	const { query, donationType, building = "A" } = Route.useSearch();
	if (txns.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "title text-sm md:text-xl",
		children: [
			"No ",
			type,
			"s found",
			" ",
			query ? `for ${query}` : building ? `for ${building} building in ${year}` : `in ${year}`
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedList, { children: txns.map((txn) => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedListItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-12 w-full border-b pb-2 items-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TxnActions, { txn }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("flex flex-col gap-2 col-span-7", donationType ? " md:col-span-5" : " md:col-span-4"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs md:text-sm truncate capitalize",
							children: txn.description?.toLowerCase() ?? txn.donation?.donorName?.toLowerCase()
						}), txn.donation?.flat && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "md:hidden text-xs md:text-sm bg-muted text-muted-foreground rounded-lg px-2 py-1",
							children: [
								txn.donation?.building,
								"-",
								txn.donation?.flat
							]
						})]
					})
				}),
				txn.donation?.flat && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "hidden md:inline-flex text-xs md:text-sm bg-muted text-muted-foreground rounded-lg px-2 py-1 w-fit",
					children: [
						txn.donation?.building,
						"-",
						txn.donation?.flat
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-left text-xs md:text-sm capitalize text-muted-foreground md:inline-flex md:col-span-3 hidden",
					children: `${getUserInfo(txn.txnUser)}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: txn.txnMode === TXN_MODE.CASH ? "destructive" : "secondary",
					className: "hidden md:inline-flex rounded-lg",
					children: txn.txnMode
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-end col-span-4 md:col-span-2 pr-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
						amount: txn.amount,
						iconClass: "size-3 md:size-4",
						className: cn("text-base md:text-xl text-muted-foreground")
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TxnActions, {
					txn,
					isMobile: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-left text-xs capitalize text-muted-foreground md:hidden col-span-11 col-start-2",
					children: `Receiver: ${getUserInfo(txn.txnUser)}`
				})
			]
		}) }, txn.id);
	}) });
}
function FilterStatBadge({ filtered }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
		className: "w-full text-base justify-start",
		children: [
			"Total for filtered:",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
				className: "text-xl",
				amount: filtered.reduce((sum, txn) => sum + txn.amount, 0) ?? 0
			})
		]
	});
}
function DropdownMenu$1({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
		"data-slot": "dropdown-menu",
		...props
	});
}
function DropdownMenuTrigger({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
		"data-slot": "dropdown-menu-trigger",
		...props
	});
}
function DropdownMenuContent({ className, sideOffset = 4, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		"data-slot": "dropdown-menu-content",
		sideOffset,
		className: cn("z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95", className),
		...props
	}) });
}
function DropdownMenuGroup({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group2, {
		"data-slot": "dropdown-menu-group",
		...props
	});
}
function DropdownMenuItem({ className, inset, variant = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
		"data-slot": "dropdown-menu-item",
		"data-inset": inset,
		"data-variant": variant,
		className: cn("relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:text-destructive!", className),
		...props
	});
}
function DropdownMenuLabel({ className, inset, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
		"data-slot": "dropdown-menu-label",
		"data-inset": inset,
		className: cn("px-2 py-1.5 text-sm font-medium data-[inset]:pl-8", className),
		...props
	});
}
function DropdownMenuSeparator({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
		"data-slot": "dropdown-menu-separator",
		className: cn("-mx-1 my-1 h-px bg-border", className),
		...props
	});
}
function ModeFilterColumn({ className }) {
	const { mode } = Route.useSearch();
	const [open, setOpen] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	const handleChange = (mode) => {
		navigate({
			to: ".",
			search: (old) => ({
				...old,
				mode
			})
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu$1, {
			open,
			onOpenChange: setOpen,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					className: "justify-start px-0 has-[>svg]:px-0",
					children: [
						"Mode",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: cn("size-3.5", mode && "text-success") })
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuGroup, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, {
						className: "text-muted-foreground text-sm",
						children: "Filter by Txn Mode"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
					TXN_MODE_OPTIONS.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
						className: cn("justify-start capitalize text-sm", mode && mode !== o && "text-muted-foreground"),
						onClick: () => {
							handleChange(o);
							setOpen(false);
						},
						children: [mode === o ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dot, {}), o.toLowerCase()]
					}, o))
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
				mode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuGroup, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					className: "",
					variant: "destructive",
					onClick: () => {
						handleChange(void 0);
						setOpen(false);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" }), "Clear Selection"]
				}) })
			] })]
		})
	});
}
function OtherTxnFilter() {
	const { donationType } = Route.useSearch();
	const navigate = useNavigate();
	function handleChange() {
		if (donationType !== DONATION_TYPE.OTHER) navigate({
			to: ".",
			search: (old) => ({
				...old,
				donationType: DONATION_TYPE.OTHER
			})
		});
		else navigate({
			to: ".",
			search: (old) => ({
				...old,
				donationType: void 0
			})
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			variant: "outline",
			size: "icon-sm",
			className: "size-5",
			onClick: handleChange,
			children: donationType === DONATION_TYPE.OTHER && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "text-success, size-4" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "capitalize text-sm text-muted-foreground",
			children: "Show only non resident donations"
		})]
	});
}
function OtherTxnList({ txns }) {
	const { type, year } = Route.useParams();
	const { query } = Route.useSearch();
	if (txns.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "title text-lg",
		children: [
			"No ",
			type,
			"s found",
			" ",
			query ? `for ${query} in ${year}` : `in ${year}`
		]
	});
	const dateWiseTxns = Object.groupBy(txns, (txn) => txn.date);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedList, { children: Object.entries(dateWiseTxns).map(([date, txns]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4 py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			className: "rounded-sm",
			variant: "secondary",
			children: format(new Date(date), "PP")
		}), txns?.map((txn) => {
			const description = txn.description?.toLowerCase().replace("received from", "");
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedListItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-12 w-full border-b pb-2 items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TxnActions, { txn }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-2 col-span-7 md:col-span-5 truncate",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-left text-sm truncate capitalize",
							children: description
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-left text-xs md:text-sm capitalize text-muted-foreground md:inline-flex col-span-3 hidden",
						children: `${getUserInfo(txn.txnUser)}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: txn.txnMode === TXN_MODE.CASH ? "destructive" : "secondary",
						className: "hidden md:inline-flex rounded-lg",
						children: txn.txnMode
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-end col-span-4 md:col-span-2 pr-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
							amount: type === "expense" ? txn.amount * -1 : txn.amount,
							iconClass: "size-3 md:size-4",
							className: cn("text-base md:text-xl text-muted-foreground")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TxnActions, {
						txn,
						isMobile: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-left text-xs capitalize text-muted-foreground w-full md:hidden col-span-11 col-start-2",
						children: `Receiver: ${getUserInfo(txn.txnUser)}`
					})
				]
			}) }, txn.id);
		})]
	})) });
}
function useDebounce(value, delay) {
	const [debouncedValue, setDebouncedValue] = (0, import_react.useState)(value);
	(0, import_react.useEffect)(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);
		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);
	return debouncedValue;
}
function TxnSearchInput() {
	const [value, setValue] = (0, import_react.useState)("");
	const searchTerm = useDebounce(value, 500);
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (searchTerm) navigate({
			to: ".",
			search: (old) => ({
				...old,
				query: searchTerm
			})
		});
	}, [searchTerm, navigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup, {
		className: "",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupInput, {
				className: "bg-background text-sm",
				placeholder: `e.g. John Doe or D403 or Contractor Payment`,
				value: value ?? "",
				onChange: (e) => setValue(e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {}) }),
			value && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, {
				align: "inline-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupButton, {
					variant: "ghost",
					onClick: () => {
						setValue("");
						navigate({
							to: ".",
							search: (old) => ({
								...old,
								query: void 0
							})
						});
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
				})
			})
		]
	});
}
function UserFilterColumn({ title, className, options, isTransfer }) {
	const navigate = useNavigate();
	const { user, user2 } = Route.useSearch();
	const { type } = Route.useParams();
	const [open, setOpen] = (0, import_react.useState)(false);
	const handleChange = (userId) => {
		navigate({
			to: ".",
			search: (old) => ({
				...old,
				user: isTransfer ? old.user : userId,
				user2: isTransfer ? userId : old.user2
			})
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu$1, {
			open,
			onOpenChange: setOpen,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuTrigger, {
				className: "justify-start px-0 has-[>svg]:px-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "md:hidden",
					children: `${type === ROUTE_TXN_TYPE.EXPENSE ? "Desc /" : type === ROUTE_TXN_TYPE.TRANSFER ? "" : "Name or Desc /"}`
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: cn("size-3.5", !isTransfer && user && "text-success", isTransfer && user2 && "text-success") })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuGroup, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuLabel, {
						className: "text-muted-foreground text-sm flex items-center justify-between w-full",
						children: [
							"Filter by",
							" ",
							type === ROUTE_TXN_TYPE.EXPENSE || isTransfer ? "Paid By" : "Receiver"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
					options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
						className: cn("justify-start capitalize text-sm", user && user !== o.value && "text-muted-foreground", user2 && user2 !== o.value && "text-muted-foreground"),
						onClick: () => {
							handleChange(o.value);
							setOpen(false);
						},
						children: [user === o.value ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dot, {}), o.label]
					}, o.value))
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
				(!isTransfer && user || isTransfer && user2) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuGroup, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					className: "",
					variant: "destructive",
					onClick: () => {
						handleChange(void 0);
						setOpen(false);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" }), "Clear Selection"]
				}) })
			] })]
		})
	});
}
function TransactionList() {
	const { committee, year, type } = Route.useParams();
	const { building = "A", page = 0, query = void 0, user, user2, donationType, mode } = Route.useSearch();
	const { data: profile } = useSuspenseQuery(currDBUserQueryOptions());
	const member = profile?.memberships.find((m) => m.committee.toLowerCase() === committee);
	const { data: pageResp } = useSuspenseQuery({ ...txnsByCommitteeOptions({
		committee: committee.toUpperCase(),
		txnType: type.toUpperCase(),
		year,
		building,
		donationType: donationType === DONATION_TYPE.OTHER ? donationType : void 0
	}) });
	if (!member?.isActive) return null;
	const start = page === 0 ? 0 : page * 10;
	const end = start + 10;
	const filteredTxns = getFilteredTxns(pageResp?.data ?? [], {
		mode,
		query,
		user,
		user2
	});
	const userOptions = getUserOptions(filteredTxns ?? []);
	const paidByOptions = getPaidByOptions(filteredTxns ?? []);
	const totalElements = filteredTxns?.length ?? 0;
	const totalPages = Math.ceil(totalElements / 10);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberBalanceList, {
				committee: committee.toUpperCase(),
				type: type.toUpperCase(),
				year
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col md:flex-row md:items-center md:justify-between gap-6 w-full",
				children: type === ROUTE_TXN_TYPE.DONATION && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full",
					children: [totalElements > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OtherTxnFilter, {}), !donationType && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuildingFilter, {})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 flex-1",
				children: [(query || totalElements > 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TxnSearchInput, {}), (query || user) && totalElements > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterStatBadge, { filtered: filteredTxns ?? [] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderDesktop, {
				userOptions,
				paidByOptions,
				type,
				donationType
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderMobile, {
				userOptions,
				paidByOptions,
				type
			}),
			type === ROUTE_TXN_TYPE.DONATION && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DonationList, { txns: filteredTxns?.slice(start, end) ?? [] }),
			type !== ROUTE_TXN_TYPE.DONATION && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OtherTxnList, { txns: filteredTxns?.slice(start, end) ?? [] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationComponent, {
				totalPages,
				page
			})
		]
	});
}
function HeaderDesktop({ userOptions, paidByOptions, type, donationType }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "hidden md:grid md:grid-cols-12 items-center w-full bg-secondary text-secondary-foreground rounded-md py-2 text-sm font-semibold",
		children: [
			type !== ROUTE_TXN_TYPE.TRANSFER ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("col-start-2", type === ROUTE_TXN_TYPE.DONATION && donationType !== DONATION_TYPE.OTHER ? "col-span-4" : "col-span-5"),
				children: type === ROUTE_TXN_TYPE.DONATION && donationType !== DONATION_TYPE.OTHER ? "Donor Name" : "Description"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserFilterColumn, {
				title: "Paid By",
				options: paidByOptions,
				isTransfer: true,
				className: "col-span-5 col-start-2"
			}),
			type === ROUTE_TXN_TYPE.DONATION && donationType !== DONATION_TYPE.OTHER && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "",
				children: "Flat"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserFilterColumn, {
				title: type === ROUTE_TXN_TYPE.EXPENSE ? "Paid By" : "Receiver",
				options: userOptions,
				className: "col-span-3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeFilterColumn, { className: "" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "col-span-2 text-right pr-4",
				children: "Amount"
			})
		]
	});
}
function HeaderMobile({ type, userOptions, paidByOptions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-12 items-center w-full bg-secondary text-secondary-foreground rounded-md py-2 pr-2 text-sm font-heading md:hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-1 col-span-7 col-start-2",
			children: [type === ROUTE_TXN_TYPE.TRANSFER && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserFilterColumn, {
				title: "Paid By",
				options: paidByOptions,
				isTransfer: true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserFilterColumn, {
				title: type === ROUTE_TXN_TYPE.EXPENSE ? "Paid By" : "Receiver",
				options: userOptions
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "col-span-4 text-right",
			children: "Amount"
		})]
	});
}
function TxnTypeTabs({ className }) {
	const { committee, type, year } = Route.useParams();
	const { donationType } = Route.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-6 w-full max-w-[calc(100vw-1rem)] md:max-w-full", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs$1, {
			value: type,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList, { children: ROUTE_TYPE_OPTIONS.map((typ) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
				value: typ,
				asChild: true,
				disabled: type === typ,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					className: "capitalize",
					to: ".",
					params: (old) => ({
						...old,
						type: typ
					}),
					search: typ === ROUTE_TXN_TYPE.DONATION ? { building: "A" } : {},
					children: [typ, "s"]
				})
			}, typ)) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContents, {
				className: "py-6",
				children: ROUTE_TYPE_OPTIONS.map((typ) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: typ,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "w-full max-w-[calc(100vw-2rem)] md:max-w-full p-0 bg-background border-0 pr-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							className: "py-4 px-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
									className: "title capitalize text-xl",
									children: [
										committee,
										" ",
										type,
										"s"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectYear, { year }) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardAction, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TxnButton, {
									committee: committee.toUpperCase(),
									year,
									donationType
								}) })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							className: "px-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuspenseErrorBoundary, {
								id: `${typ}-list`,
								fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardLoader, { className: "h-[50vh]" }),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionList, {})
							})
						})]
					})
				}, typ))
			})]
		})
	});
}
function RouteComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Background, {
		className: "items-start",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "container py-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("grid w-full max-w-[calc(100vw-1rem)] mx-auto md:max-w-full"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TxnTypeTabs, { className: cn() })
			})
		})
	});
}
//#endregion
export { RouteComponent as component };
