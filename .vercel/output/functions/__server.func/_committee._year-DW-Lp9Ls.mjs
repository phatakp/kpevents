import { __toESM } from "./_runtime.mjs";
import { require_react } from "./_libs/@clerk/clerk-react+[...].mjs";
import { require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { ROUTE_TXN_TYPE } from "./_ssr/common.schema-CKnvY_hu.mjs";
import { amountShortener, cn } from "./_ssr/user.schema-h0fSWBX3.mjs";
import { ArrowRight } from "./_libs/lucide-react.mjs";
import { buttonVariants } from "./_ssr/button-9XDxs_vq.mjs";
import { useSuspenseQuery } from "./_libs/tanstack__react-query.mjs";
import { Image } from "./_libs/unpic__react.mjs";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Separator$1, Skeleton, currDBUserQueryOptions, membersByCommitteeOptions } from "./_ssr/separator-BonH_eRT.mjs";
import { balancesByCommitteeOptions, donationStatsByCommitteeOptions } from "./_ssr/card-loader-Jku4GCL4.mjs";
import { Background } from "./_ssr/background-Cjri-gEp.mjs";
import { Badge, SuspenseErrorBoundary } from "./_ssr/suspense-error-boundary-9oqj6wJ3.mjs";
import { Amount, AnimatedList, AnimatedListItem } from "./_ssr/animated-list-Ay5pyGHB.mjs";
import { SelectYear, TxnButton } from "./_ssr/txn-button-DeGl2pFs.mjs";
import { CardStatsLoader } from "./_ssr/card-stats-loader-BMzb_2My.mjs";
import { Route } from "./_committee._year-CqDjRmFu.mjs";
import { Bar, BarChart, CartesianGrid, LabelList, Rectangle, ResponsiveContainer, Tooltip, XAxis } from "./_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_committee._year-DW-Lp9Ls.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CommitteeCard({ className }) {
	const { committee } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("py-10 w-full", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "ring-0 border rounded-2xl relative h-full w-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "title text-2xl md:text-4xl capitalize",
						children: committee.toLowerCase()
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuspenseErrorBoundary, {
						id: "committee-card-desc",
						fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "w-40 h-10" }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommitteeCardDescription, {})
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuspenseErrorBoundary, {
						id: "committee-card-action",
						fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "w-20 h-10" }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommitteeCardAction, {})
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "py-4 flex flex-col gap-9 justify-between md:max-w-3/4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuspenseErrorBoundary, {
								id: "committee-card-title",
								fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "w-40 h-10" }),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommitteeCardTitle, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuspenseErrorBoundary, {
								id: "other-year-totals",
								fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-2 w-full",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "w-50 h-8" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "w-50 h-8" })]
								}),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OtherYearTotals, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuspenseErrorBoundary, {
								id: "current-year-totals",
								fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-2 w-full",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "w-50 h-8" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "w-50 h-8" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "w-50 h-8" })
									]
								}),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurrentYearTotals, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center w-full justify-between text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "capitalize font-heading text-lg",
									children: "Total"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuspenseErrorBoundary, {
									id: "total-balance",
									fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "w-30 h-10" }),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TotalBalance, {})
								})]
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
					src: "https://images.shadcnspace.com/assets/backgrounds/stats-01.webp",
					alt: "user-img",
					width: 211,
					height: 168,
					className: "absolute bottom-0 right-0 hidden sm:block"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuspenseErrorBoundary, {
					id: "committee-card-footer",
					fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "w-20 h-10" }),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommitteeCardFooter, {})
				})
			]
		})
	});
}
function CommitteeCardDescription() {
	const { committee, year } = Route.useParams();
	const { data: user } = useSuspenseQuery(currDBUserQueryOptions());
	if ((user?.memberships.find((m) => m.committee.toLowerCase() === committee))?.isActive) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectYear, { year });
	return `Committee Balance - ${year}`;
}
function CommitteeCardAction() {
	const { committee, year } = Route.useParams();
	const { data: user } = useSuspenseQuery(currDBUserQueryOptions());
	if (!(user?.memberships.find((m) => m.committee.toLowerCase() === committee))?.isActive) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardAction, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TxnButton, {
		committee: committee.toUpperCase(),
		year
	}) });
}
function CommitteeCardFooter() {
	const { committee, year } = Route.useParams();
	const { data: user } = useSuspenseQuery(currDBUserQueryOptions());
	if (!(user?.memberships.find((m) => m.committee.toLowerCase() === committee))?.isActive) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/transactions/$committee/$type/$year",
		params: {
			committee: committee.toLowerCase(),
			year,
			type: ROUTE_TXN_TYPE.DONATION
		},
		className: cn(buttonVariants({ size: "sm" })),
		children: ["View Transactions ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3" })]
	}) });
}
function CommitteeCardTitle() {
	const { committee, year } = Route.useParams();
	const { data: user } = useSuspenseQuery(currDBUserQueryOptions());
	if (!(user?.memberships.find((m) => m.committee.toLowerCase() === committee))?.isActive) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "text-base",
		children: ["Committee Balance - ", year]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {})] });
}
function OtherYearTotals() {
	const { committee, year } = Route.useParams();
	const { data: balances } = useSuspenseQuery({ ...balancesByCommitteeOptions({ committee: committee.toUpperCase() }) });
	const otherYearTotals = balances?.filter((b) => b.year !== year && (year < (/* @__PURE__ */ new Date()).getFullYear() ? b.year < year : true))?.reduce((acc, item) => {
		const key = item.year;
		acc[key] = (acc[key] || 0) + item.balance;
		return acc;
	}, {}) ?? {};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: Object.entries(otherYearTotals)?.map(([year, tot]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center w-full justify-between text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "capitalize font-heading font-normal",
			children: [year, " Balance"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
			amount: tot,
			className: cn("text-sm font-normal", tot < 0 ? "text-destructive" : "text-success"),
			iconClass: "size-3"
		})]
	}, year)) });
}
function CurrentYearTotals() {
	const { committee, year } = Route.useParams();
	const { data: balances } = useSuspenseQuery({ ...balancesByCommitteeOptions({ committee: committee.toUpperCase() }) });
	const yearItems = balances?.filter((b) => b.year === year);
	const typedBalances = Object.groupBy(yearItems ?? [], (bal) => `${bal.txnType}-${bal.donationType ?? "null"}`);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: Object.entries(typedBalances)?.map(([key, bal]) => {
		const tot = bal.reduce((acc, b) => acc + b.balance, 0);
		if (tot === 0) return null;
		const [type, dtype] = key.split("-");
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center w-full justify-between text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "capitalize font-heading font-normal",
				children: type === "DONATION" ? `${dtype.toLowerCase()} donations` : type === "EXPENSE" ? "Expenses Paid" : "Internal Transfers"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
				amount: tot,
				className: cn("text-sm font-normal", tot < 0 ? "text-destructive" : "text-success"),
				iconClass: "size-3"
			})]
		}, key);
	}) });
}
function TotalBalance() {
	const { committee, year } = Route.useParams();
	const { data: balances } = useSuspenseQuery({ ...balancesByCommitteeOptions({ committee: committee.toUpperCase() }) });
	const balanceForYear = balances?.filter((b) => b.year <= year)?.reduce((acc, item) => acc + item.balance, 0) ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
		amount: balanceForYear,
		className: cn("", balanceForYear < 0 ? "text-destructive" : "text-success"),
		iconClass: "size-3"
	});
}
function CommitteeMemberList({ className, data }) {
	const { committee } = Route.useParams();
	const users = data?.filter((u) => u.firstName.toLowerCase() !== "unknown");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("pt-10 px-4 w-full flex flex-col gap-6 bg-background", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "title text-xl md:text-3xl",
			children: "Committee Members"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedList, { children: users?.map((u) => {
			const isActive = u.memberships.find((m) => m.committee === committee.toUpperCase() && m.isActive);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedListItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border flex justify-between items-start rounded-sm md:px-4 py-2 gap-4 w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm md:text-base truncate capitalize",
					children: `${u.firstName.toLowerCase()} ${u.lastName?.toLowerCase()}`
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					variant: isActive ? "default" : "destructive",
					className: "text-xs md:text-sm",
					children: [
						u.building,
						"-",
						u.flat
					]
				})]
			}) }, u.clerkId);
		}) })]
	});
}
var THEMES = {
	light: "",
	dark: ".dark"
};
var INITIAL_DIMENSION = {
	width: 320,
	height: 200
};
var ChartContext = import_react.createContext(null);
function useChart() {
	const context = import_react.useContext(ChartContext);
	if (!context) throw new Error("useChart must be used within a <ChartContainer />");
	return context;
}
function ChartContainer({ id, className, children, config, initialDimension = INITIAL_DIMENSION, ...props }) {
	const uniqueId = import_react.useId();
	const chartId = `chart-${id ?? uniqueId.replace(/:/g, "")}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContext.Provider, {
		value: { config },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-slot": "chart",
			"data-chart": chartId,
			className: cn("flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden", className),
			...props,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartStyle, {
				id: chartId,
				config
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				initialDimension,
				children
			})]
		})
	});
}
var ChartStyle = ({ id, config }) => {
	const colorConfig = Object.entries(config).filter(([, config]) => config.theme ?? config.color);
	if (!colorConfig.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { dangerouslySetInnerHTML: { __html: Object.entries(THEMES).map(([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig.map(([key, itemConfig]) => {
		const color = itemConfig.theme?.[theme] ?? itemConfig.color;
		return color ? `  --color-${key}: ${color};` : null;
	}).join("\n")}
}
`).join("\n") } });
};
var ChartTooltip = Tooltip;
function ChartTooltipContent({ active, payload, className, indicator = "dot", hideLabel = false, hideIndicator = false, label, labelFormatter, labelClassName, formatter, color, nameKey, labelKey }) {
	const { config } = useChart();
	const tooltipLabel = import_react.useMemo(() => {
		if (hideLabel || !payload?.length) return null;
		const [item] = payload;
		const itemConfig = getPayloadConfigFromPayload(config, item, `${labelKey ?? item?.dataKey ?? item?.name ?? "value"}`);
		const value = !labelKey && typeof label === "string" ? config[label]?.label ?? label : itemConfig?.label;
		if (labelFormatter) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("font-medium", labelClassName),
			children: labelFormatter(value, payload)
		});
		if (!value) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("font-medium", labelClassName),
			children: value
		});
	}, [
		label,
		labelFormatter,
		payload,
		hideLabel,
		labelClassName,
		config,
		labelKey
	]);
	if (!active || !payload?.length) return null;
	const nestLabel = payload.length === 1 && indicator !== "dot";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl", className),
		children: [!nestLabel ? tooltipLabel : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-1.5",
			children: payload.filter((item) => item.type !== "none").map((item, index) => {
				const itemConfig = getPayloadConfigFromPayload(config, item, `${nameKey ?? item.name ?? item.dataKey ?? "value"}`);
				const indicatorColor = color ?? item.payload?.fill ?? item.color;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground", indicator === "dot" && "items-center"),
					children: formatter && item?.value !== void 0 && item.name ? formatter(item.value, item.name, item, index, item.payload) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [itemConfig?.icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(itemConfig.icon, {}) : !hideIndicator && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)", {
							"h-2.5 w-2.5": indicator === "dot",
							"w-1": indicator === "line",
							"w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
							"my-0.5": nestLabel && indicator === "dashed"
						}),
						style: {
							"--color-bg": indicatorColor,
							"--color-border": indicatorColor
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("flex flex-1 justify-between leading-none", nestLabel ? "items-end" : "items-center"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [nestLabel ? tooltipLabel : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: itemConfig?.label ?? item.name
							})]
						}), item.value != null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono font-medium text-foreground tabular-nums",
							children: typeof item.value === "number" ? item.value.toLocaleString() : String(item.value)
						})]
					})] })
				}, index);
			})
		})]
	});
}
function getPayloadConfigFromPayload(config, payload, key) {
	if (typeof payload !== "object" || payload === null) return;
	const payloadPayload = "payload" in payload && typeof payload.payload === "object" && payload.payload !== null ? payload.payload : void 0;
	let configLabelKey = key;
	if (key in payload && typeof payload[key] === "string") configLabelKey = payload[key];
	else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === "string") configLabelKey = payloadPayload[key];
	return configLabelKey in config ? config[configLabelKey] : config[key];
}
var chartConfig = {
	collection: { label: "collection" },
	A: {
		label: "A",
		color: "var(--chart-1)"
	},
	B: {
		label: "B",
		color: "var(--chart-2)"
	},
	C: {
		label: "C",
		color: "var(--chart-3)"
	},
	D: {
		label: "D",
		color: "var(--chart-4)"
	},
	E: {
		label: "E",
		color: "var(--chart-5)"
	},
	F: {
		label: "F",
		color: "var(--chart-2)"
	},
	G: {
		label: "G",
		color: "var(--chart-1)"
	}
};
var ACTIVE_INDEX = 2;
function DonationStatsByBuilding({ data, className }) {
	const { year } = Route.useParams();
	const { config } = Route.useRouteContext();
	const applicableYear = year ?? config.activeYear;
	if (data.length === 0) return;
	const total = data.reduce((acc, b) => acc + b.amount, 0);
	const chartData = data.map((d) => ({
		building: d.building,
		collection: d.amount,
		fill: `var(--color-${d.building})`
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: cn("w-full", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-between items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Building wise" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, {
					className: "text-xs",
					children: ["Donations for ", applicableYear]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardAction, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm text-muted-foreground",
					children: "Total Collection"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, { amount: total })]
			}) })]
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
			config: chartConfig,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
				accessibilityLayer: true,
				data: chartData,
				margin: {
					top: 20,
					right: 0,
					left: 0,
					bottom: 5
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, { vertical: false }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "building",
						tickLine: false,
						tickMargin: 0,
						axisLine: false,
						tickFormatter: (value) => chartConfig[value]?.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
						cursor: true,
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipContent, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "collection",
						strokeWidth: 2,
						radius: 5,
						shape: ({ index, ...props }) => index === ACTIVE_INDEX ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rectangle, {
							...props,
							fillOpacity: .8,
							stroke: props.payload.fill,
							strokeDasharray: 4,
							strokeDashoffset: 4
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rectangle, { ...props }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelList, {
							dataKey: "collection",
							position: "top",
							formatter: (val) => amountShortener(val)
						})
					})
				]
			})
		}) })]
	});
}
function RouteComponent() {
	const { committee, year } = Route.useParams();
	const { config } = Route.useRouteContext();
	const { data: user } = useSuspenseQuery(currDBUserQueryOptions());
	const member = user?.memberships.find((m) => m.committee.toLowerCase() === committee);
	const { data: stats } = useSuspenseQuery({ ...donationStatsByCommitteeOptions({
		committee: committee.toUpperCase(),
		year: year ?? config.activeYear
	}) });
	const { data: members } = useSuspenseQuery({ ...membersByCommitteeOptions({ committee: committee.toUpperCase() }) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Background, {
		className: "items-start",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "container py-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("grid gap-6 w-full max-w-[calc(100vw-1rem)] mx-auto md:max-w-full", member?.isActive && stats && stats.length > 0 && members ? "md:grid-cols-3" : member?.isActive && stats && stats.length > 0 ? "md:grid-cols-1" : member?.isActive && members ? "md:grid-cols-3" : "md:grid-cols-1"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuspenseErrorBoundary, {
						id: `committee-card`,
						fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardStatsLoader, { className: "md:col-span-2 order-1 mx-auto" }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommitteeCard, { className: cn("md:col-span-2 order-1", members ? "" : "md:max-w-3xl mx-auto") })
					}),
					stats && stats.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DonationStatsByBuilding, {
						data: stats,
						className: cn("md:col-span-2 md:order-3 order-2", members ? "" : "md:max-w-3xl mx-auto")
					}),
					members && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommitteeMemberList, {
						data: members,
						className: cn("md:order-2 order-3 mx-auto", stats && stats.length > 0 ? "md:row-span-2" : "md:row-span-3")
					})
				]
			})
		})
	});
}
//#endregion
export { RouteComponent as component };
