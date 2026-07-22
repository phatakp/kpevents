import { SignedIn } from "../_libs/@clerk/clerk-react+[...].mjs";
import { require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { ArrowUpRight } from "../_libs/lucide-react.mjs";
import { Button } from "./button-9XDxs_vq.mjs";
import { Image } from "../_libs/unpic__react.mjs";
import { Background } from "./background-Cjri-gEp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B4TWNEfY.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Background, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "container py-20 lg:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-10 lg:my-0 lg:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-7 lg:w-2/3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-foreground text-5xl font-semibold md:text-5xl lg:text-8xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "title text-5xl md:text-5xl lg:text-8xl tracking-wider",
							children: "Kumar Piccadilly"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "title text-5xl md:text-5xl lg:text-8xl font-semibold text-accent",
							children: [" ", "Funds Management"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground text-base md:text-lg lg:text-xl",
						children: "Get insights on the funds available in KP Cultural and Temple committee."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap items-start gap-5 lg:gap-7",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/sign-in/$",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "whitespace-nowrap pl-4 pr-6 text-sm lg:pl-6 lg:pr-8 lg:text-base",
									children: "Get Started"
								})]
							})
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "left-1/2! h-[92%]! w-[69%]! absolute top-2.5 -translate-x-[52%] overflow-hidden rounded-[35px]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-7-tall.svg",
						alt: "Placeholder",
						className: "size-full object-cover object-[50%_0%]"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
					className: "relative z-10",
					src: "./wallet.svg",
					width: 450,
					height: 889,
					alt: "iphone"
				})]
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedIn, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "sticky flex w-full justify-end bottom-4 right-4" }) })] });
}
//#endregion
export { Home as component };
