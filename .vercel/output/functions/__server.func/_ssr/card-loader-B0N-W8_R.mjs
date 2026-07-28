import { __toESM } from "../_runtime.mjs";
import { CommitteeQuerySchema, CommitteeYearQuerySchema, TXN_TYPE, TxnQuerySchema, USER_ROLE, localization } from "./common.schema-rOPsTdW8.mjs";
import { ClerkProvider, SignedIn, SignedOut, UserButton, require_react } from "../_libs/@clerk/clerk-react+[...].mjs";
import { require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { HeadContent, Link, ScriptOnce, Scripts, createRootRouteWithContext, useLocation } from "../_libs/@tanstack/react-router+[...].mjs";
import { createServerFn } from "./ssr.mjs";
import { cn, withMetaLogger } from "./utils-lKLyXhB7.mjs";
import { ArrowRight, UserKey } from "../_libs/lucide-react.mjs";
import { Button } from "./button-Bhg_Lprh.mjs";
import { assertAuthMiddleware, createSsrRpc, getLoggedInUser } from "./auth.middleware-DJyYI05a.mjs";
import { ItemQuerySchema, TransactionIDSchema, TransactionSchemaWithValidation } from "./txn.schema-DT3-__5q.mjs";
import { QUERY_KEYS } from "./keys-D0H6xnTe.mjs";
import { QueryClient } from "../_libs/tanstack__query-core.mjs";
import { QueryClientProvider, queryOptions } from "../_libs/tanstack__react-query.mjs";
import { configOptions } from "./admin.queries-lOUcYYEc.mjs";
import { Skeleton } from "./separator-B8iuesUR.mjs";
import { Image } from "../_libs/unpic__react.mjs";
import { require_dist } from "../_libs/clerk__themes.mjs";
import { Fe } from "../_libs/react-hot-toast.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/card-loader-B0N-W8_R.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_dist = require_dist();
var context;
function getContext() {
	if (context) return context;
	context = { queryClient: new QueryClient({ defaultOptions: { queries: {
		staleTime: Infinity,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false
	} } }) };
	return context;
}
function TanStackQueryProvider({ children }) {
	const { queryClient } = getContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children
	});
}
function NavLink({ href, title, icon, partial }) {
	const location = useLocation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: href,
		className: "flex flex-col items-center gap-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hidden md:flex title font-semibold text-base font-sans",
				children: title
			}),
			icon,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("bg-foreground h-1 w-12 transition-all duration-1000 ease-in-out", location.pathname === href || partial && location.pathname.includes(partial) ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full") })
		]
	});
}
function Logo(_) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
			src: "/calendar.png",
			width: 35,
			height: 35,
			alt: "logo-1"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
			src: "/logo.png",
			width: 100,
			height: 50,
			alt: "logo-2",
			className: "-ml-1"
		})]
	});
}
function Navbar() {
	const { auth, config } = Route.useRouteContext();
	const location = useLocation();
	const isAdmin = auth?.role === USER_ROLE.ADMIN;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: cn("sticky inset-x-0 top-0 z-99 px-4 items-center flex transition-colors duration-400 ease-in-out h-16", "bg-linear-to-r from-background via-card/90 to-background/90"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "flex items-center justify-between container w-full h-full py-4 md:py-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "w-20 h-full relative hidden md:flex",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-center gap-6 md:gap-8 pt-1 md:pt-0 text-primary-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
							href: "/",
							title: "Home",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
								src: "/home.png",
								width: 32,
								height: 32,
								alt: "logo-1",
								className: "md:hidden"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedIn, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
							href: "/dashboard",
							title: "Dashboard",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
								src: "/layout.png",
								width: 28,
								height: 28,
								alt: "logo-1",
								className: "md:hidden"
							})
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
							href: `/cultural/${config.activeYear}`,
							title: "Cultural",
							partial: "/cultural/",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
								src: "/hindu.png",
								width: 36,
								height: 36,
								alt: "logo-3",
								className: "md:hidden"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
							href: `/temple/${config.activeYear}`,
							title: "Temple",
							partial: "/temple/",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
								src: "/temple.png",
								width: 40,
								height: 32,
								alt: "logo-2",
								className: "md:hidden pb-1"
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedIn, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(UserButton.MenuItems, { children: [isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton.Link, {
					label: "Admin",
					labelIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserKey, {}),
					href: "/admin"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton.Action, { label: "signOut" })] }) }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedOut, { children: !location.pathname.endsWith("annadaan") && !location.pathname.endsWith("itemized") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/sign-in/$",
							className: "flex items-center",
							children: ["Login ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
						})
					})
				}) })
			]
		})
	});
}
var PUBLISHABLE_KEY = "pk_test_ZGFyaW5nLXN0aW5rYnVnLTAuY2xlcmsuYWNjb3VudHMuZGV2JA";
function AppClerkProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClerkProvider, {
		localization,
		publishableKey: PUBLISHABLE_KEY,
		afterSignOutUrl: "/",
		appearance: {
			baseTheme: import_dist.dark,
			elements: {
				headerTitle: {
					fontFamily: "var(--font-heading)",
					fontSize: "1.5em",
					fontWeight: "bold",
					color: "var(--color-primary)",
					textAlign: "center"
				},
				headerSubtitle: {
					fontFamily: "var(--font-sans)",
					color: "var(--color-muted-foreground)",
					textAlign: "center"
				},
				button: {
					backgroundColor: "var(--color-secondary)",
					borderRadius: 0
				},
				input: { border: "var(--color-foreground)" },
				formButtonPrimary: {
					backgroundColor: "var(--color-primary)",
					color: "var(--color-primary-foreground)",
					borderRadius: 0
				},
				actionCard: {
					padding: 0,
					margin: 0
				},
				card: {
					fontFamily: "var(--font-sans)",
					paddingLeft: 16,
					paddingRight: 16
				}
			},
			variables: {
				colorBackground: "var(--color-background)",
				colorPrimary: "var(--color-primary)",
				colorInput: "var(--color-input)",
				colorText: "var(--color-text)",
				colorTextSecondary: "var(--color-text-secondary)",
				colorModalBackdrop: "var(--color-background)",
				colorBorder: "var(--color-border)",
				colorMuted: "var(--color-secondary)",
				colorDanger: "var(--color-destructive)",
				colorForeground: "var(--color-foreground)",
				colorSuccess: "var(--color-success)",
				colorPrimaryForeground: "var(--color-primary-foreground)",
				colorMutedForeground: "var(--color-muted-foreground)",
				fontFamily: "var(--font-sans)",
				fontFamilyButtons: "var(--font-sans)"
			}
		},
		children
	});
}
function ReactHotToast() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fe, {
		position: "top-center",
		reverseOrder: false,
		toastOptions: {
			style: {
				border: "1px solid var(--color-popover-foreground)",
				padding: "16px",
				backgroundColor: "var(--color-card)",
				color: "var(--color-card-foreground)"
			},
			success: { style: {
				border: "1px solid var(--color-success)",
				backgroundColor: "var(--color-success)",
				color: "var(--color-success-foreground)"
			} },
			error: { style: {
				border: "1px solid var(--color-destructive)",
				backgroundColor: "var(--color-destructive)",
				color: "var(--color-destructive-foreground)"
			} }
		}
	});
}
var themes = [
	"light",
	"dark",
	"system"
];
var getStoredTheme = createServerFn().handler(createSsrRpc("91c186ae8fcf49613a34c629c1c3ed4eec44c9d3410e8abe0589b61bea5de03e"));
var setStoredTheme = createServerFn({ method: "POST" }).validator((data) => {
	if (typeof data !== "string" || !themes.includes(data)) throw new Error("Invalid theme");
	return data;
}).handler(createSsrRpc("349f33856068be52cffa2e35a6e2df120d7f8f059a09b19ad755b6b53c31650a"));
function getSystemTheme() {
	if (typeof window === "undefined") return "dark";
	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function handleThemeChange(theme) {
	const root = document.documentElement;
	root.classList.remove("light", "dark");
	const newTheme = theme === "system" ? getSystemTheme() : theme;
	root.classList.add(newTheme);
}
function setupPreferredListener() {
	const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
	const handler = () => handleThemeChange("system");
	mediaQuery.addEventListener("change", handler);
	return () => mediaQuery.removeEventListener("change", handler);
}
var ThemeContext = (0, import_react.createContext)(void 0);
function ThemeProvider({ children, initialTheme }) {
	const [userTheme, setUserTheme] = (0, import_react.useState)(initialTheme);
	(0, import_react.useEffect)(() => {
		handleThemeChange(userTheme);
		if (userTheme === "system") return setupPreferredListener();
	}, [userTheme]);
	const appTheme = userTheme === "system" ? getSystemTheme() : userTheme;
	const setTheme = (newUserTheme) => {
		setUserTheme(newUserTheme);
		setStoredTheme({ data: newUserTheme });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext, {
		value: {
			userTheme,
			appTheme,
			setTheme
		},
		children
	});
}
var styles_default = "/assets/styles-DBKSkw2S.css";
var Route = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "KP Events" }
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}]
	}),
	beforeLoad: async ({ context }) => {
		const config = await context.queryClient.ensureQueryData(configOptions);
		if (!config) throw new Error("Config not available");
		return {
			auth: await getLoggedInUser(),
			config
		};
	},
	loader: async () => ({ _storedTheme: await getStoredTheme() }),
	shellComponent: RootDocument
});
function RootDocument({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScriptOnce, { children: `
          (function() {
            const storedTheme = 'dark';
            if (storedTheme === 'system') {
              const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              document.documentElement.className = systemTheme;
            } else {
              document.documentElement.className = storedTheme;
            }
          })();
        ` })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProvider, {
			initialTheme: "dark",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TanStackQueryProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppClerkProvider, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "relative min-h-[calc(100vh-2rem)] px-4",
					children
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReactHotToast, {})
			] }) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
var getItems = createServerFn({ method: "GET" }).middleware([withMetaLogger("/items/{itemType}/{year}")]).validator(ItemQuerySchema).handler(createSsrRpc("842724d275a0ab5c86cb23c46ae8344dcfd903c48367d6e78793f474a1b40488"));
var getTransactions = createServerFn({ method: "GET" }).middleware([assertAuthMiddleware, withMetaLogger("/transactions/committee/{committeeName}/{txnType}/{year}")]).validator(TxnQuerySchema).handler(createSsrRpc("9f06137571158a25216ffd026e974e717af33e8fbad3650b3eefd91ccc5a13c6"));
var getDonationStats = createServerFn({ method: "GET" }).middleware([withMetaLogger("/transactions/donation/stats/{committeeName}/{year}")]).validator(CommitteeYearQuerySchema).handler(createSsrRpc("a4eaee4a66527eb297dce572bdf5af9b5a0e7cef0ba4a37d24ec483457a08f97"));
var getCommitteeBalance = createServerFn({ method: "GET" }).middleware([withMetaLogger("/transactions/balances/committee/{committeeName}")]).validator(CommitteeQuerySchema).handler(createSsrRpc("0d66bd1a75e3545838827ead260d2b1e629e330d97b93af153abeecd0b07ee3d"));
var getLinkedTransfer = createServerFn({ method: "GET" }).middleware([withMetaLogger("/transactions/linked/<txnId>")]).validator(TransactionIDSchema.optional()).handler(createSsrRpc("e1b713e57cf1d8fd86ff55a1b21daf0ad583a4d292d8609a936cb9429900d34c"));
var createTransaction = createServerFn({ method: "POST" }).middleware([withMetaLogger("/transactions")]).validator(TransactionSchemaWithValidation).handler(createSsrRpc("b7dbf08dceb952edea20e331cca93eef293585d13bc32246cf91708661791ee0"));
var updateTransaction = createServerFn({ method: "POST" }).middleware([withMetaLogger("/transactions")]).validator(TransactionSchemaWithValidation).handler(createSsrRpc("21874d7b906f9c887b77c1970254c6084c04d992d9d8a3333ea009cc1679349f"));
var deleteTransaction = createServerFn({ method: "POST" }).middleware([withMetaLogger("/transactions/{txnId}")]).validator(TransactionIDSchema).handler(createSsrRpc("47aa4707c9eb590b8300b503d382ae505796d6bdd227bcc6b2406622294f81fd"));
var committeeBalancesOptions = (data) => queryOptions({
	queryKey: QUERY_KEYS.txns.committeeBalance(data),
	queryFn: () => getCommitteeBalance({ data })
});
var linkedTransferOptions = (txn) => queryOptions({
	queryKey: QUERY_KEYS.txns.linkedTransfer(txn?.id ?? ""),
	queryFn: () => getLinkedTransfer({ data: txn && txn.txnType === TXN_TYPE.TRANSFER ? { id: txn.id } : void 0 })
});
var donationStatsOptions = (data) => queryOptions({
	queryKey: QUERY_KEYS.txns.donationStats(data),
	queryFn: () => getDonationStats({ data })
});
var txnsOptions = (data) => queryOptions({
	queryKey: QUERY_KEYS.txns.allTransactions(data),
	queryFn: () => getTransactions({ data })
});
var itemsOptions = (data) => queryOptions({
	queryKey: QUERY_KEYS.txns.avaliableItems(data),
	queryFn: () => getItems({ data })
});
function CardLoader({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: cn("w-full md:max-w-3xl h-[30vh] mx-auto rounded-md", className) });
}
//#endregion
export { CardLoader, Route, committeeBalancesOptions, createTransaction, deleteTransaction, donationStatsOptions, getContext, itemsOptions, linkedTransferOptions, txnsOptions, updateTransaction };
