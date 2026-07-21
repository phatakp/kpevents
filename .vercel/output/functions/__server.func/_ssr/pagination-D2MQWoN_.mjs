import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { Link, useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { USER_ROLE } from "./common.schema-CKnvY_hu.mjs";
import { cn } from "./user.schema-BooD9qhh.mjs";
import { ChevronLeft, ChevronRight, Ellipsis } from "../_libs/lucide-react.mjs";
import { buttonVariants } from "./button-CBOXaQon.mjs";
import { Route } from "./separator-CR3Hz17M.mjs";
import { motion } from "../_libs/motion.mjs";
import { TxnButton } from "./txn-button-BTzANDMc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pagination-D2MQWoN_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TxnActions({ txn, isMobile, isBooking }) {
	const { auth } = Route.useRouteContext();
	if (isMobile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "md:hidden",
		children: auth.role === USER_ROLE.ADMIN && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TxnButton, {
			txn,
			committee: txn.committee,
			year: txn.year,
			donationType: txn.donation?.type,
			isDelete: true,
			isBooking
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TxnButton, {
			txn,
			committee: txn.committee,
			year: txn.year,
			donationType: txn.donation?.type,
			isBooking
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "md:flex hidden",
			children: auth.role === USER_ROLE.ADMIN && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TxnButton, {
				txn,
				committee: txn.committee,
				year: txn.year,
				donationType: txn.donation?.type,
				isDelete: true,
				isBooking
			})
		})]
	});
}
function Pagination({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		role: "navigation",
		"aria-label": "pagination",
		"data-slot": "pagination",
		className: cn("mx-auto flex w-full justify-center", className),
		...props
	});
}
function PaginationContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		"data-slot": "pagination-content",
		className: cn("flex flex-row items-center gap-1", className),
		...props
	});
}
function PaginationItem({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
		"data-slot": "pagination-item",
		...props
	});
}
function PaginationLink({ className, isActive, size = "icon", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		resetScroll: false,
		"aria-current": isActive ? "page" : void 0,
		"data-slot": "pagination-link",
		"data-active": isActive,
		className: cn(buttonVariants({
			variant: isActive ? "outline" : "ghost",
			size
		}), className),
		...props
	});
}
function PaginationPrevious({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationLink, {
		"aria-label": "Go to previous page",
		size: "default",
		className: cn("gap-1 px-2.5 sm:pl-2.5", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {})
	});
}
function PaginationNext({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationLink, {
		"aria-label": "Go to next page",
		size: "default",
		className: cn("gap-1 px-2.5 sm:pr-2.5", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})
	});
}
function PaginationEllipsis({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		"aria-hidden": true,
		"data-slot": "pagination-ellipsis",
		className: cn("flex size-9 items-center justify-center", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "More pages"
		})]
	});
}
function PaginationComponent({ totalPages, page = 0 }) {
	const navigate = useNavigate();
	const [activePage, setActivePage] = (0, import_react.useState)(page + 1);
	if (totalPages <= 1) return;
	const handlePageChange = (page) => {
		const newPage = Math.max(1, Math.min(totalPages, page));
		setActivePage(newPage);
		navigate({
			to: ".",
			search: (old) => ({
				...old,
				page: newPage - 1
			})
		});
	};
	const renderPageButtons = () => {
		const buttons = [];
		const maxVisible = 5;
		let start = Math.max(1, activePage - Math.floor(maxVisible / 2));
		const end = Math.min(totalPages, start + maxVisible - 1);
		if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);
		if (start > 1) {
			buttons.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationLink, {
				href: "#",
				onClick: (e) => {
					e.preventDefault();
					handlePageChange(1);
				},
				className: "w-10 h-10 rounded-xl",
				children: "1"
			}) }, 1));
			if (start > 2) buttons.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationEllipsis, {}) }, "ellipsis-start"));
		}
		for (let i = start; i <= end; i++) {
			const isActive = activePage === i;
			buttons.push(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PaginationItem, {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationLink, {
					href: "#",
					isActive,
					onClick: (e) => {
						e.preventDefault();
						handlePageChange(i);
					},
					className: cn("w-10 h-10 rounded-xl border-0 transition-all font-bold text-sm", isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"),
					children: i
				}), isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					layoutId: "ribbon-active",
					className: "absolute inset-x-1.5 bottom-0.5 h-0.5 bg-primary rounded-full",
					transition: {
						type: "spring",
						bounce: .3,
						duration: .6
					}
				})]
			}, i));
		}
		if (end < totalPages) {
			if (end < totalPages - 1) buttons.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationEllipsis, {}) }, "ellipsis-end"));
			buttons.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationLink, {
				href: "#",
				onClick: (e) => {
					e.preventDefault();
					handlePageChange(totalPages);
				},
				className: "w-10 h-10 rounded-xl",
				children: totalPages
			}) }, totalPages));
		}
		return buttons;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PaginationContent, {
				className: "bg-background/80 p-2 rounded-2xl border gap-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationPrevious, {
						href: "#",
						onClick: (e) => {
							e.preventDefault();
							handlePageChange(activePage - 1);
						},
						className: "rounded-xl w-10 h-10 hover:bg-muted group p-0 flex justify-center"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-1.5 mx-2",
						children: renderPageButtons()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationNext, {
						href: "#",
						onClick: (e) => {
							e.preventDefault();
							handlePageChange(activePage + 1);
						},
						className: "rounded-xl w-10 h-10 hover:bg-muted group p-0 flex justify-center"
					}) })
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full max-w-50 h-px bg-linear-to-r from-transparent via-border to-transparent opacity-50" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-[10px] font-bold tracking-widest text-muted-foreground uppercase opacity-70",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: activePage === 1 ? "text-primary transition-colors" : "",
						children: "First"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-1 h-1 rounded-full bg-border" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: activePage === totalPages ? "text-primary transition-colors" : "",
						children: "Last"
					})
				]
			})
		]
	});
}
//#endregion
export { PaginationComponent, TxnActions };
