import { __toESM } from "../_runtime.mjs";
import { ClerkProvider, SignedIn, SignedOut, UserButton, require_react } from "../_libs/@clerk/clerk-react+[...].mjs";
import { require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { HeadContent, Link, ScriptOnce, Scripts, createRootRouteWithContext, useLocation } from "../_libs/@tanstack/react-router+[...].mjs";
import { createServerFn } from "./ssr.mjs";
import { CommitteeQuerySchema, QUERY_KEYS, USER_ROLE, assertAuthMiddleware, authMiddleware, createSsrRpc, getLoggedInUser, localization } from "./common.schema-CKnvY_hu.mjs";
import { ProfileSchemaWithValidation, cn } from "./user.schema-YGQQHiqC.mjs";
import { Root } from "../_libs/radix-ui__react-separator.mjs";
import { ArrowRight, UserKey } from "../_libs/lucide-react.mjs";
import { Button } from "./button-Wk0bb36Z.mjs";
import { QueryClient } from "../_libs/tanstack__query-core.mjs";
import { QueryClientProvider, queryOptions } from "../_libs/tanstack__react-query.mjs";
import { configOptions } from "./admin.queries-BOrzEKU7.mjs";
import { Image } from "../_libs/unpic__react.mjs";
import { require_dist } from "../_libs/clerk__themes.mjs";
import { Fe } from "../_libs/react-hot-toast.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/separator-zpJUPmcc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_dist = require_dist();
var context;
function getContext() {
	if (context) return context;
	context = { queryClient: new QueryClient({ defaultOptions: { queries: { staleTime: 1e3 * 60 * 5 } } }) };
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
		const config = await context.queryClient.ensureQueryData(configOptions());
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
var getCurrUserFromDB = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("ea2096ddef8973c13ae78eddd783dedaaa1ea8414e916fdcb7d5082c9e2a6960"));
var createProfile = createServerFn({ method: "POST" }).middleware([assertAuthMiddleware]).validator(ProfileSchemaWithValidation).handler(createSsrRpc("a59e7d40c370ff50f23f6e28ca9aec6e2e73e9332a69829a3185e39a3894d49d"));
var updateProfile = createServerFn({ method: "POST" }).middleware([assertAuthMiddleware]).validator(ProfileSchemaWithValidation).handler(createSsrRpc("b4617b0c8cb9847ca1f963b245b23e76f90f829aa3b609d285ca01b7ade90cdd"));
var becomeMember = createServerFn({ method: "POST" }).middleware([assertAuthMiddleware]).validator(CommitteeQuerySchema).handler(createSsrRpc("7e58e0865a71f0cfbdb369518d5cf2ccd125c8ccc3a32058fb5543aad08e0b4c"));
var getMembersByCommittee = createServerFn({ method: "GET" }).validator(CommitteeQuerySchema).handler(createSsrRpc("0531c07c91735e4f968b1439e6aed7ef155791e83bb1b6d173c6655ece5cd059"));
var getCurrUserBalancesByCommittee = createServerFn({ method: "GET" }).middleware([assertAuthMiddleware]).validator(CommitteeQuerySchema).handler(createSsrRpc("6e44fd450e5dd443132ed4115d107c7da6edd6786d9b723e24aba62e48a5869a"));
var getMemberBalancesByCommittee = createServerFn({ method: "GET" }).middleware([assertAuthMiddleware]).validator(CommitteeQuerySchema).handler(createSsrRpc("91f2d8dd2f7693eb7a4ecae53bd42656f6a859877cde4355972d007960781aed"));
var currDBUserQueryOptions = () => queryOptions({
	queryKey: QUERY_KEYS.currUser,
	queryFn: getCurrUserFromDB,
	staleTime: 1e3 * 60 * 60 * 24
});
var membersByCommitteeOptions = (data) => queryOptions({
	queryKey: QUERY_KEYS.membersByCommittee(data),
	queryFn: () => getMembersByCommittee({ data }),
	staleTime: 1e3 * 60 * 60 * 24
});
var currUserBalancesByCommitteeOptions = (data) => queryOptions({
	queryKey: QUERY_KEYS.currUserBalancesByCommittee(data),
	queryFn: () => getCurrUserBalancesByCommittee({ data }),
	staleTime: 1e3 * 60 * 60 * 24
});
var memberBalancesByCommitteeOptions = (data) => queryOptions({
	queryKey: QUERY_KEYS.memberBalancesByCommittee(data),
	queryFn: () => getMemberBalancesByCommittee({ data }),
	staleTime: 1e3 * 60 * 60 * 24
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
export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Route, Separator$1, Skeleton, becomeMember, createProfile, currDBUserQueryOptions, currUserBalancesByCommitteeOptions, getContext, memberBalancesByCommitteeOptions, membersByCommitteeOptions, updateProfile };
