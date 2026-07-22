import { __toESM } from "../_runtime.mjs";
import { require_react } from "../_libs/@clerk/clerk-react+[...].mjs";
import { require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { createFormHook, createFormHookContexts } from "../_libs/@tanstack/react-form+[...].mjs";
import { BUILDING_OPTIONS } from "./common.schema-CKnvY_hu.mjs";
import { cva } from "../_libs/class-variance-authority+clsx.mjs";
import { format, parse } from "../_libs/date-fns.mjs";
import { amountFormatter, cn, getFlatsForBuilding, isValidDate } from "./user.schema-YGQQHiqC.mjs";
import { Dialog, DialogClose as DialogClose$1, DialogContent as DialogContent$2, DialogDescription as DialogDescription$2, DialogOverlay as DialogOverlay$2, DialogPortal as DialogPortal$1, DialogTitle as DialogTitle$2, DialogTrigger as DialogTrigger$2 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { Root } from "../_libs/radix-ui__react-label.mjs";
import { Content2, Portal, Root2, Trigger } from "../_libs/radix-ui__react-popover.mjs";
import { Corner, Root as Root$1, ScrollAreaScrollbar, ScrollAreaThumb, Viewport } from "../_libs/radix-ui__react-scroll-area.mjs";
import { Select, SelectContent as SelectContent$1, SelectGroup as SelectGroup$1, SelectIcon, SelectItem as SelectItem$1, SelectItemIndicator, SelectItemText, SelectPortal, SelectScrollDownButton as SelectScrollDownButton$1, SelectScrollUpButton as SelectScrollUpButton$1, SelectTrigger as SelectTrigger$1, SelectValue as SelectValue$1, SelectViewport } from "../_libs/@radix-ui/react-select+[...].mjs";
import { Content, List, Root2 as Root2$1, Trigger as Trigger$1 } from "../_libs/radix-ui__react-tabs.mjs";
import { Calendar as Calendar$1, Check, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, ChevronsUpDown, IndianRupee, Minus, Plus, Search, X } from "../_libs/lucide-react.mjs";
import { Button, Spinner, buttonVariants } from "./button-Wk0bb36Z.mjs";
import { Skeleton } from "./separator-zpJUPmcc.mjs";
import { Badge } from "./suspense-error-boundary-D9Qnozea.mjs";
import { AnimatePresence, isMotionComponent } from "../_libs/framer-motion.mjs";
import { motion } from "../_libs/motion.mjs";
import { DayPicker, getDefaultClassNames } from "../_libs/react-day-picker.mjs";
import { _e } from "../_libs/cmdk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/animated-list-Bv4wx7eL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DEFAULT_BOUNDS_OFFSET = {
	top: 0,
	left: 0,
	width: 0,
	height: 0
};
var HighlightContext = import_react.createContext(void 0);
function useHighlight() {
	const context = import_react.useContext(HighlightContext);
	if (!context) throw new Error("useHighlight must be used within a HighlightProvider");
	return context;
}
function Highlight({ ref, ...props }) {
	const { as: Component = "div", children, value, defaultValue, onValueChange, className, style, transition = {
		type: "spring",
		stiffness: 350,
		damping: 35
	}, hover = false, click = true, enabled = true, controlledItems, disabled = false, exitDelay = 200, mode = "children" } = props;
	const localRef = import_react.useRef(null);
	import_react.useImperativeHandle(ref, () => localRef.current);
	const boundsOffset = props?.boundsOffset ?? DEFAULT_BOUNDS_OFFSET;
	const boundsOffsetTop = boundsOffset.top ?? 0;
	const boundsOffsetLeft = boundsOffset.left ?? 0;
	const boundsOffsetWidth = boundsOffset.width ?? 0;
	const boundsOffsetHeight = boundsOffset.height ?? 0;
	const boundsOffsetRef = import_react.useRef({
		top: boundsOffsetTop,
		left: boundsOffsetLeft,
		width: boundsOffsetWidth,
		height: boundsOffsetHeight
	});
	import_react.useEffect(() => {
		boundsOffsetRef.current = {
			top: boundsOffsetTop,
			left: boundsOffsetLeft,
			width: boundsOffsetWidth,
			height: boundsOffsetHeight
		};
	}, [
		boundsOffsetTop,
		boundsOffsetLeft,
		boundsOffsetWidth,
		boundsOffsetHeight
	]);
	const [activeValue, setActiveValue] = import_react.useState(value ?? defaultValue ?? null);
	const [boundsState, setBoundsState] = import_react.useState(null);
	const [activeClassNameState, setActiveClassNameState] = import_react.useState("");
	const safeSetActiveValue = (id) => {
		setActiveValue((prev) => {
			if (prev !== id) {
				onValueChange?.(id);
				return id;
			}
			return prev;
		});
	};
	const safeSetBoundsRef = import_react.useRef(void 0);
	import_react.useEffect(() => {
		safeSetBoundsRef.current = (bounds) => {
			if (!localRef.current) return;
			const containerRect = localRef.current.getBoundingClientRect();
			const offset = boundsOffsetRef.current;
			const newBounds = {
				top: bounds.top - containerRect.top + offset.top,
				left: bounds.left - containerRect.left + offset.left,
				width: bounds.width + offset.width,
				height: bounds.height + offset.height
			};
			setBoundsState((prev) => {
				if (prev && prev.top === newBounds.top && prev.left === newBounds.left && prev.width === newBounds.width && prev.height === newBounds.height) return prev;
				return newBounds;
			});
		};
	});
	const safeSetBounds = (bounds) => {
		safeSetBoundsRef.current?.(bounds);
	};
	const clearBounds = import_react.useCallback(() => {
		setBoundsState((prev) => prev === null ? prev : null);
	}, []);
	import_react.useEffect(() => {
		if (value !== void 0) setActiveValue(value);
		else if (defaultValue !== void 0) setActiveValue(defaultValue);
	}, [value, defaultValue]);
	const id = import_react.useId();
	import_react.useEffect(() => {
		if (mode !== "parent") return;
		const container = localRef.current;
		if (!container) return;
		const onScroll = () => {
			if (!activeValue) return;
			const activeEl = container.querySelector(`[data-value="${activeValue}"][data-highlight="true"]`);
			if (activeEl) safeSetBoundsRef.current?.(activeEl.getBoundingClientRect());
		};
		container.addEventListener("scroll", onScroll, { passive: true });
		return () => container.removeEventListener("scroll", onScroll);
	}, [mode, activeValue]);
	const render = (children) => {
		if (mode === "parent") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Component, {
			ref: localRef,
			"data-slot": "motion-highlight-container",
			style: {
				position: "relative",
				zIndex: 1
			},
			className: props?.containerClassName,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
				initial: false,
				mode: "wait",
				children: boundsState && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					"data-slot": "motion-highlight",
					animate: {
						top: boundsState.top,
						left: boundsState.left,
						width: boundsState.width,
						height: boundsState.height,
						opacity: 1
					},
					initial: {
						top: boundsState.top,
						left: boundsState.left,
						width: boundsState.width,
						height: boundsState.height,
						opacity: 0
					},
					exit: {
						opacity: 0,
						transition: {
							...transition,
							delay: (transition?.delay ?? 0) + (exitDelay ?? 0) / 1e3
						}
					},
					transition,
					style: {
						position: "absolute",
						zIndex: 0,
						...style
					},
					className: cn(className, activeClassNameState)
				})
			}), children]
		});
		return children;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HighlightContext.Provider, {
		value: {
			mode,
			activeValue,
			setActiveValue: safeSetActiveValue,
			id,
			hover,
			click,
			className,
			style,
			transition,
			disabled,
			enabled,
			exitDelay,
			setBounds: safeSetBounds,
			clearBounds,
			activeClassName: activeClassNameState,
			setActiveClassName: setActiveClassNameState,
			forceUpdateBounds: props?.forceUpdateBounds
		},
		children: enabled ? controlledItems ? render(children) : render(import_react.Children.map(children, (child, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HighlightItem, {
			className: props?.itemsClassName,
			children: child
		}, index))) : children
	});
}
function getNonOverridingDataAttributes(element, dataAttributes) {
	return Object.keys(dataAttributes).reduce((acc, key) => {
		if (element.props[key] === void 0) acc[key] = dataAttributes[key];
		return acc;
	}, {});
}
function HighlightItem({ ref, as, children, id, value, className, style, transition, disabled = false, activeClassName, exitDelay, asChild = false, forceUpdateBounds, ...props }) {
	const itemId = import_react.useId();
	const { activeValue, setActiveValue, mode, setBounds, clearBounds, hover, click, enabled, className: contextClassName, style: contextStyle, transition: contextTransition, id: contextId, disabled: contextDisabled, exitDelay: contextExitDelay, forceUpdateBounds: contextForceUpdateBounds, setActiveClassName } = useHighlight();
	const Component = as ?? "div";
	const element = children;
	const childValue = id ?? value ?? element.props?.["data-value"] ?? element.props?.id ?? itemId;
	const isActive = activeValue === childValue;
	const isDisabled = disabled === void 0 ? contextDisabled : disabled;
	const itemTransition = transition ?? contextTransition;
	const localRef = import_react.useRef(null);
	import_react.useImperativeHandle(ref, () => localRef.current);
	const refCallback = import_react.useCallback((node) => {
		localRef.current = node;
	}, []);
	import_react.useEffect(() => {
		if (mode !== "parent") return;
		let rafId;
		let previousBounds = null;
		const shouldUpdateBounds = forceUpdateBounds === true || contextForceUpdateBounds && forceUpdateBounds !== false;
		const updateBounds = () => {
			if (!localRef.current) return;
			const bounds = localRef.current.getBoundingClientRect();
			if (shouldUpdateBounds) {
				if (previousBounds && previousBounds.top === bounds.top && previousBounds.left === bounds.left && previousBounds.width === bounds.width && previousBounds.height === bounds.height) {
					rafId = requestAnimationFrame(updateBounds);
					return;
				}
				previousBounds = bounds;
				rafId = requestAnimationFrame(updateBounds);
			}
			setBounds(bounds);
		};
		if (isActive) {
			updateBounds();
			setActiveClassName(activeClassName ?? "");
		} else if (!activeValue) clearBounds();
		if (shouldUpdateBounds) return () => cancelAnimationFrame(rafId);
	}, [
		mode,
		isActive,
		activeValue,
		setBounds,
		clearBounds,
		activeClassName,
		setActiveClassName,
		forceUpdateBounds,
		contextForceUpdateBounds
	]);
	if (!import_react.isValidElement(children)) return children;
	const dataAttributes = {
		"data-active": isActive ? "true" : "false",
		"aria-selected": isActive,
		"data-disabled": isDisabled,
		"data-value": childValue,
		"data-highlight": true
	};
	const commonHandlers = hover ? {
		onMouseEnter: (e) => {
			setActiveValue(childValue);
			element.props.onMouseEnter?.(e);
		},
		onMouseLeave: (e) => {
			setActiveValue(null);
			element.props.onMouseLeave?.(e);
		}
	} : click ? { onClick: (e) => {
		setActiveValue(childValue);
		element.props.onClick?.(e);
	} } : {};
	if (asChild) {
		if (mode === "children") return import_react.cloneElement(element, {
			key: childValue,
			ref: refCallback,
			className: cn("relative", element.props.className),
			...getNonOverridingDataAttributes(element, {
				...dataAttributes,
				"data-slot": "motion-highlight-item-container"
			}),
			...commonHandlers,
			...props
		}, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
			initial: false,
			mode: "wait",
			children: isActive && !isDisabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				layoutId: `transition-background-${contextId}`,
				"data-slot": "motion-highlight",
				style: {
					position: "absolute",
					zIndex: 0,
					...contextStyle,
					...style
				},
				className: cn(contextClassName, activeClassName),
				transition: itemTransition,
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: {
					opacity: 0,
					transition: {
						...itemTransition,
						delay: (itemTransition?.delay ?? 0) + (exitDelay ?? contextExitDelay ?? 0) / 1e3
					}
				},
				...dataAttributes
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
			"data-slot": "motion-highlight-item",
			style: {
				position: "relative",
				zIndex: 1
			},
			className,
			...dataAttributes,
			children
		})] }));
		return import_react.cloneElement(element, {
			ref: refCallback,
			...getNonOverridingDataAttributes(element, {
				...dataAttributes,
				"data-slot": "motion-highlight-item"
			}),
			...commonHandlers
		});
	}
	return enabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Component, {
		ref: localRef,
		"data-slot": "motion-highlight-item-container",
		className: cn(mode === "children" && "relative", className),
		...dataAttributes,
		...props,
		...commonHandlers,
		children: [mode === "children" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
			initial: false,
			mode: "wait",
			children: isActive && !isDisabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				layoutId: `transition-background-${contextId}`,
				"data-slot": "motion-highlight",
				style: {
					position: "absolute",
					zIndex: 0,
					...contextStyle,
					...style
				},
				className: cn(contextClassName, activeClassName),
				transition: itemTransition,
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: {
					opacity: 0,
					transition: {
						...itemTransition,
						delay: (itemTransition?.delay ?? 0) + (exitDelay ?? contextExitDelay ?? 0) / 1e3
					}
				},
				...dataAttributes
			})
		}), import_react.cloneElement(element, {
			style: {
				position: "relative",
				zIndex: 1
			},
			className: element.props.className,
			...getNonOverridingDataAttributes(element, {
				...dataAttributes,
				"data-slot": "motion-highlight-item"
			})
		})]
	}, childValue) : children;
}
function getStrictContext(name) {
	const Context = import_react.createContext(void 0);
	const Provider = ({ value, children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Context.Provider, {
		value,
		children
	});
	const useSafeContext = () => {
		const ctx = import_react.useContext(Context);
		if (ctx === void 0) throw new Error(`useContext must be used within ${name ?? "a Provider"}`);
		return ctx;
	};
	return [Provider, useSafeContext];
}
function useControlledState(props) {
	const { value, defaultValue, onChange } = props;
	const [state, setInternalState] = import_react.useState(value !== void 0 ? value : defaultValue);
	import_react.useEffect(() => {
		if (value !== void 0) setInternalState(value);
	}, [value]);
	return [state, import_react.useCallback((next, ...args) => {
		setInternalState(next);
		onChange?.(next, ...args);
	}, [onChange])];
}
function useAutoHeight(deps = [], options = {
	includeParentBox: true,
	includeSelfBox: false
}) {
	const ref = import_react.useRef(null);
	const roRef = import_react.useRef(null);
	const [height, setHeight] = import_react.useState(0);
	const measure = import_react.useCallback(() => {
		const el = ref.current;
		if (!el) return 0;
		const base = el.getBoundingClientRect().height || 0;
		let extra = 0;
		if (options.includeParentBox && el.parentElement) {
			const cs = getComputedStyle(el.parentElement);
			const paddingY = (parseFloat(cs.paddingTop || "0") || 0) + (parseFloat(cs.paddingBottom || "0") || 0);
			const borderY = (parseFloat(cs.borderTopWidth || "0") || 0) + (parseFloat(cs.borderBottomWidth || "0") || 0);
			if (cs.boxSizing === "border-box") extra += paddingY + borderY;
		}
		if (options.includeSelfBox) {
			const cs = getComputedStyle(el);
			const paddingY = (parseFloat(cs.paddingTop || "0") || 0) + (parseFloat(cs.paddingBottom || "0") || 0);
			const borderY = (parseFloat(cs.borderTopWidth || "0") || 0) + (parseFloat(cs.borderBottomWidth || "0") || 0);
			if (cs.boxSizing === "border-box") extra += paddingY + borderY;
		}
		const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
		return Math.ceil((base + extra) * dpr) / dpr;
	}, [options.includeParentBox, options.includeSelfBox]);
	import_react.useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;
		setHeight(measure());
		if (roRef.current) {
			roRef.current.disconnect();
			roRef.current = null;
		}
		const ro = new ResizeObserver(() => {
			const next = measure();
			requestAnimationFrame(() => setHeight(next));
		});
		ro.observe(el);
		if (options.includeParentBox && el.parentElement) ro.observe(el.parentElement);
		roRef.current = ro;
		return () => {
			ro.disconnect();
			roRef.current = null;
		};
	}, deps);
	import_react.useLayoutEffect(() => {
		if (height === 0) {
			const next = measure();
			if (next !== 0) setHeight(next);
		}
	}, [height, measure]);
	return {
		ref,
		height
	};
}
function mergeRefs(...refs) {
	return (node) => {
		refs.forEach((ref) => {
			if (!ref) return;
			if (typeof ref === "function") ref(node);
			else ref.current = node;
		});
	};
}
function mergeProps(childProps, slotProps) {
	const merged = {
		...childProps,
		...slotProps
	};
	if (childProps.className || slotProps.className) merged.className = cn(childProps.className, slotProps.className);
	if (childProps.style || slotProps.style) merged.style = {
		...childProps.style,
		...slotProps.style
	};
	return merged;
}
function Slot$1({ children, ref, ...props }) {
	const isAlreadyMotion = typeof children.type === "object" && children.type !== null && isMotionComponent(children.type);
	const Base = import_react.useMemo(() => isAlreadyMotion ? children.type : motion.create(children.type), [isAlreadyMotion, children.type]);
	if (!import_react.isValidElement(children)) return null;
	const { ref: childRef, ...childProps } = children.props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Base, {
		...mergeProps(childProps, props),
		ref: mergeRefs(childRef, ref)
	});
}
function AutoHeight({ children, deps = [], transition = {
	type: "spring",
	stiffness: 300,
	damping: 30,
	bounce: 0,
	restDelta: .01
}, style, animate, asChild = false, ...props }) {
	const { ref, height } = useAutoHeight(deps);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot$1 : motion.div, {
		style: {
			overflow: "hidden",
			...style
		},
		animate: {
			height,
			...animate
		},
		transition,
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref,
			children
		})
	});
}
var [TabsProvider, useTabs] = getStrictContext("TabsContext");
function Tabs$2(props) {
	const [value, setValue] = useControlledState({
		value: props.value,
		defaultValue: props.defaultValue,
		onChange: props.onValueChange
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsProvider, {
		value: {
			value,
			setValue
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2$1, {
			"data-slot": "tabs",
			...props,
			onValueChange: setValue
		})
	});
}
function TabsHighlight({ transition = {
	type: "spring",
	stiffness: 200,
	damping: 25
}, ...props }) {
	const { value } = useTabs();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, {
		"data-slot": "tabs-highlight",
		controlledItems: true,
		value,
		transition,
		click: false,
		...props
	});
}
function TabsList$1(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
		"data-slot": "tabs-list",
		...props
	});
}
function TabsHighlightItem(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HighlightItem, {
		"data-slot": "tabs-highlight-item",
		...props
	});
}
function TabsTrigger$1(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger$1, {
		"data-slot": "tabs-trigger",
		...props
	});
}
function TabsContent$1({ value, forceMount, transition = {
	duration: .5,
	ease: "easeInOut"
}, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
		mode: "wait",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
			asChild: true,
			forceMount,
			value,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				"data-slot": "tabs-content",
				layout: true,
				layoutDependency: value,
				initial: {
					opacity: 0,
					filter: "blur(4px)"
				},
				animate: {
					opacity: 1,
					filter: "blur(0px)"
				},
				exit: {
					opacity: 0,
					filter: "blur(4px)"
				},
				transition,
				...props
			})
		})
	});
}
var defaultTransition = {
	type: "spring",
	stiffness: 200,
	damping: 30
};
function isAutoMode(props) {
	return !("mode" in props) || props.mode === "auto-height";
}
function TabsContents$1(props) {
	const { value } = useTabs();
	if (isAutoMode(props)) {
		const { transition = defaultTransition, ...autoProps } = props;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AutoHeight, {
			"data-slot": "tabs-contents",
			deps: [value],
			transition,
			...autoProps
		});
	}
	const { transition = defaultTransition, style, ...layoutProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		"data-slot": "tabs-contents",
		layout: "size",
		layoutDependency: value,
		style: {
			overflow: "hidden",
			...style
		},
		transition: { layout: transition },
		...layoutProps
	});
}
function Tabs$1({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs$2, {
		className: cn("flex flex-col gap-2", className),
		...props
	});
}
function TabsList({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsHighlight, {
		className: "absolute z-0 inset-0 border border-transparent rounded-md bg-background dark:border-input dark:bg-input/30 shadow-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList$1, {
			className: cn("bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]", className),
			...props
		})
	});
}
function TabsTrigger({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsHighlightItem, {
		value: props.value,
		className: "flex-1",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger$1, {
			className: cn("data-[state=active]:bg-foreground data-[state=active]:text-primary-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md w-full px-2 py-1 text-sm font-medium whitespace-nowrap transition-colors duration-500 ease-in-out focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
			...props
		})
	});
}
function TabsContents(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContents$1, { ...props });
}
function TabsContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent$1, {
		className: cn("flex-1 outline-none", className),
		...props
	});
}
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		"data-slot": "input",
		className: cn("h-10 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30", "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50", "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40", className),
		...props
	});
}
function InputGroup({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "input-group",
		role: "group",
		className: cn("group/input-group relative flex w-full items-center rounded-md border border-input shadow-xs transition-[color,box-shadow] outline-none dark:bg-input/30", "h-9 min-w-0 has-[>textarea]:h-auto", "has-[>[data-align=inline-start]]:[&>input]:pl-2", "has-[>[data-align=inline-end]]:[&>input]:pr-2", "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3", "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3", "has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-[3px] has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50", "has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-destructive/20 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40", className),
		...props
	});
}
var inputGroupAddonVariants = cva("flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4", {
	variants: { align: {
		"inline-start": "order-first pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]",
		"inline-end": "order-last pr-3 has-[>button]:mr-[-0.45rem] has-[>kbd]:mr-[-0.35rem]",
		"block-start": "order-first w-full justify-start px-3 pt-3 group-has-[>input]/input-group:pt-2.5 [.border-b]:pb-3",
		"block-end": "order-last w-full justify-start px-3 pb-3 group-has-[>input]/input-group:pb-2.5 [.border-t]:pt-3"
	} },
	defaultVariants: { align: "inline-start" }
});
function InputGroupAddon({ className, align = "inline-start", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "group",
		"data-slot": "input-group-addon",
		"data-align": align,
		className: cn(inputGroupAddonVariants({ align }), className),
		onClick: (e) => {
			if (e.target.closest("button")) return;
			e.currentTarget.parentElement?.querySelector("input")?.focus();
		},
		...props
	});
}
var inputGroupButtonVariants = cva("flex items-center gap-2 text-sm shadow-none", {
	variants: { size: {
		xs: "h-6 gap-1 rounded-[calc(var(--radius)-5px)] px-2 has-[>svg]:px-2 [&>svg:not([class*='size-'])]:size-3.5",
		sm: "h-8 gap-1.5 rounded-md px-2.5 has-[>svg]:px-2.5",
		"icon-xs": "size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0",
		"icon-sm": "size-8 p-0 has-[>svg]:p-0"
	} },
	defaultVariants: { size: "xs" }
});
function InputGroupButton({ className, type = "button", variant = "ghost", size = "xs", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		type,
		"data-size": size,
		variant,
		className: cn(inputGroupButtonVariants({ size }), className),
		...props
	});
}
function InputGroupInput({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
		"data-slot": "input-group-control",
		className: cn("flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent", className),
		...props
	});
}
function Select$1({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
		"data-slot": "select",
		...props
	});
}
function SelectGroup({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroup$1, {
		"data-slot": "select-group",
		...props
	});
}
function SelectValue({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue$1, {
		"data-slot": "select-value",
		...props
	});
}
function SelectTrigger({ className, size = "default", children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
		"data-slot": "select-trigger",
		"data-size": size,
		className: cn("flex w-fit items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[placeholder]:text-muted-foreground data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 opacity-50" })
		})]
	});
}
function SelectContent({ className, children, position = "item-aligned", align = "center", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent$1, {
		"data-slot": "select-content",
		className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
		position,
		align,
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
				className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"),
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {})
		]
	}) });
}
function SelectItem({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
		"data-slot": "select-item",
		className: cn("relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"data-slot": "select-item-indicator",
			className: "absolute right-2 flex size-3.5 items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
	});
}
function SelectScrollUpButton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton$1, {
		"data-slot": "select-scroll-up-button",
		className: cn("flex cursor-default items-center justify-center py-1", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "size-4" })
	});
}
function SelectScrollDownButton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton$1, {
		"data-slot": "select-scroll-down-button",
		className: cn("flex cursor-default items-center justify-center py-1", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4" })
	});
}
var [DialogProvider, useDialog] = getStrictContext("DialogContext");
function Dialog$2(props) {
	const [isOpen, setIsOpen] = useControlledState({
		value: props?.open,
		defaultValue: props?.defaultOpen,
		onChange: props?.onOpenChange
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogProvider, {
		value: {
			isOpen,
			setIsOpen
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			"data-slot": "dialog",
			...props,
			onOpenChange: setIsOpen
		})
	});
}
function DialogTrigger$1(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger$2, {
		"data-slot": "dialog-trigger",
		...props
	});
}
function DialogPortal(props) {
	const { isOpen } = useDialog();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPortal$1, {
		"data-slot": "dialog-portal",
		forceMount: true,
		...props
	}) });
}
function DialogOverlay$1({ transition = {
	duration: .2,
	ease: "easeInOut"
}, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$2, {
		"data-slot": "dialog-overlay",
		asChild: true,
		forceMount: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: {
				opacity: 0,
				filter: "blur(4px)"
			},
			animate: {
				opacity: 1,
				filter: "blur(0px)"
			},
			exit: {
				opacity: 0,
				filter: "blur(4px)"
			},
			transition,
			...props
		}, "dialog-overlay")
	});
}
function DialogContent$1({ from = "top", onOpenAutoFocus, onCloseAutoFocus, onEscapeKeyDown, onPointerDownOutside, onInteractOutside, transition = {
	type: "spring",
	stiffness: 150,
	damping: 25
}, ...props }) {
	const initialRotation = from === "bottom" || from === "left" ? "20deg" : "-20deg";
	const rotateAxis = from === "top" || from === "bottom" ? "rotateX" : "rotateY";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent$2, {
		asChild: true,
		forceMount: true,
		onOpenAutoFocus,
		onCloseAutoFocus,
		onEscapeKeyDown,
		onPointerDownOutside,
		onInteractOutside,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			"data-slot": "dialog-content",
			initial: {
				opacity: 0,
				filter: "blur(4px)",
				transform: `perspective(500px) ${rotateAxis}(${initialRotation}) scale(0.8)`
			},
			animate: {
				opacity: 1,
				filter: "blur(0px)",
				transform: `perspective(500px) ${rotateAxis}(0deg) scale(1)`
			},
			exit: {
				opacity: 0,
				filter: "blur(4px)",
				transform: `perspective(500px) ${rotateAxis}(${initialRotation}) scale(0.8)`
			},
			transition,
			...props
		}, "dialog-content")
	});
}
function DialogClose(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose$1, {
		"data-slot": "dialog-close",
		...props
	});
}
function DialogHeader$1(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "dialog-header",
		...props
	});
}
function DialogTitle$1(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$2, {
		"data-slot": "dialog-title",
		...props
	});
}
function DialogDescription$1(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$2, {
		"data-slot": "dialog-description",
		...props
	});
}
function Dialog$1(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$2, { ...props });
}
function DialogTrigger(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger$1, { ...props });
}
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		className: cn("fixed inset-0 z-50 bg-black/50", className),
		...props
	});
}
function DialogContent({ className, children, showCloseButton = true, closeBtnClass, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("bg-background fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg sm:max-w-lg", className),
		...props,
		children: [children, showCloseButton && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: cn("ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", closeBtnClass),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader$1, {
		className: cn("flex flex-col gap-2 text-center sm:text-left", className),
		...props
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("text-lg leading-none font-semibold", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		className: cn("text-muted-foreground text-sm", className),
		...props
	});
}
function ScrollArea$1({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root$1, {
		"data-slot": "scroll-area",
		className: cn("relative", className),
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Viewport, {
				"data-slot": "scroll-area-viewport",
				className: "size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollBar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Corner, {})
		]
	});
}
function ScrollBar({ className, orientation = "vertical", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbar, {
		"data-slot": "scroll-area-scrollbar",
		orientation,
		className: cn("flex touch-none p-px transition-colors select-none", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaThumb, {
			"data-slot": "scroll-area-thumb",
			className: "relative flex-1 rounded-full bg-border"
		})
	});
}
var ModalContext = (0, import_react.createContext)({});
function Modal({ children, title, description, content, initOpen, titleClass, headerClass, btnClass, closeBtnClass, onClose }) {
	const modalId = (0, import_react.useId)();
	const [open, setOpen] = (0, import_react.useState)(!!initOpen);
	const closeModal = (id) => {
		if (id === modalId) setOpen(false);
		if (onClose) onClose();
	};
	const isOpen = (id) => {
		if (id === modalId) return open;
		return false;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalContext.Provider, {
		value: {
			modalId,
			closeModal,
			open,
			isOpen
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog$1, {
			onOpenChange: setOpen,
			open,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
				className: btnClass,
				children
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "w-full bg-card text-card-foreground p-0 max-w-[calc(100vw-1rem)] mr-auto",
				closeBtnClass,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					className: cn(headerClass),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: cn("text-left text-2xl font-bold font-heading", titleClass),
						children: title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "text-muted",
						children: description
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea$1, {
					className: "h-full max-h-[70vh] my-auto me-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-4",
						children: content
					})
				})]
			})]
		})
	});
}
var useModal = () => (0, import_react.useContext)(ModalContext);
function Calendar({ className, classNames, showOutsideDays = true, captionLayout = "label", buttonVariant = "ghost", formatters, components, ...props }) {
	const defaultClassNames = getDefaultClassNames();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayPicker, {
		showOutsideDays,
		className: cn("group/calendar bg-background p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent", String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`, String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`, className),
		captionLayout,
		formatters: {
			formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
			...formatters
		},
		classNames: {
			root: cn("w-fit", defaultClassNames.root),
			months: cn("relative flex flex-col gap-4 md:flex-row", defaultClassNames.months),
			month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
			nav: cn("absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1", defaultClassNames.nav),
			button_previous: cn(buttonVariants({ variant: buttonVariant }), "size-(--cell-size) p-0 select-none aria-disabled:opacity-50", defaultClassNames.button_previous),
			button_next: cn(buttonVariants({ variant: buttonVariant }), "size-(--cell-size) p-0 select-none aria-disabled:opacity-50", defaultClassNames.button_next),
			month_caption: cn("flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)", defaultClassNames.month_caption),
			dropdowns: cn("flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium", defaultClassNames.dropdowns),
			dropdown_root: cn("relative rounded-md border border-input shadow-xs has-focus:border-ring has-focus:ring-[3px] has-focus:ring-ring/50", defaultClassNames.dropdown_root),
			dropdown: cn("absolute inset-0 bg-popover opacity-0", defaultClassNames.dropdown),
			caption_label: cn("font-medium select-none", captionLayout === "label" ? "text-sm" : "flex h-8 items-center gap-1 rounded-md pr-1 pl-2 text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground", defaultClassNames.caption_label),
			month_grid: cn("w-full border-collapse", defaultClassNames.month_grid),
			weekdays: cn("flex", defaultClassNames.weekdays),
			weekday: cn("flex-1 rounded-md text-[0.8rem] font-normal text-muted-foreground select-none", defaultClassNames.weekday),
			week: cn("mt-2 flex w-full", defaultClassNames.week),
			week_number_header: cn("w-(--cell-size) select-none", defaultClassNames.week_number_header),
			week_number: cn("text-[0.8rem] text-muted-foreground select-none", defaultClassNames.week_number),
			day: cn("group/day relative aspect-square h-full w-full p-0 text-center select-none [&:last-child[data-selected=true]_button]:rounded-r-md", props.showWeekNumber ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-md" : "[&:first-child[data-selected=true]_button]:rounded-l-md", defaultClassNames.day),
			range_start: cn("rounded-l-md bg-accent", defaultClassNames.range_start),
			range_middle: cn("rounded-none", defaultClassNames.range_middle),
			range_end: cn("rounded-r-md bg-accent", defaultClassNames.range_end),
			today: cn("rounded-md bg-accent text-accent-foreground data-[selected=true]:rounded-none", defaultClassNames.today),
			outside: cn("text-muted-foreground aria-selected:text-muted-foreground", defaultClassNames.outside),
			disabled: cn("text-muted-foreground opacity-50", defaultClassNames.disabled),
			hidden: cn("invisible", defaultClassNames.hidden),
			...classNames
		},
		components: {
			Root: ({ className, rootRef, ...props }) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-slot": "calendar",
					ref: rootRef,
					className: cn(className),
					...props
				});
			},
			Chevron: ({ className, orientation, ...props }) => {
				if (orientation === "left") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
					className: cn("size-4", className),
					...props
				});
				if (orientation === "right") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
					className: cn("size-4", className),
					...props
				});
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
					className: cn("size-4", className),
					...props
				});
			},
			DayButton: CalendarDayButton,
			WeekNumber: ({ children, ...props }) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					...props,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-(--cell-size) items-center justify-center text-center",
						children
					})
				});
			},
			...components
		},
		...props
	});
}
function CalendarDayButton({ className, day, modifiers, ...props }) {
	const defaultClassNames = getDefaultClassNames();
	const ref = import_react.useRef(null);
	import_react.useEffect(() => {
		if (modifiers.focused) ref.current?.focus();
	}, [modifiers.focused]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		ref,
		variant: "ghost",
		size: "icon",
		"data-day": day.date.toLocaleDateString(),
		"data-selected-single": modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle,
		"data-range-start": modifiers.range_start,
		"data-range-end": modifiers.range_end,
		"data-range-middle": modifiers.range_middle,
		className: cn("flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50 data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground dark:hover:text-accent-foreground [&>span]:text-xs [&>span]:opacity-70", defaultClassNames.day, className),
		...props
	});
}
function Popover$1({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
		"data-slot": "popover",
		...props
	});
}
function PopoverTrigger({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
		"data-slot": "popover-trigger",
		...props
	});
}
function PopoverContent({ className, align = "center", sideOffset = 4, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		"data-slot": "popover-content",
		align,
		sideOffset,
		className: cn("z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95", className),
		...props
	}) });
}
function Label$1({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		"data-slot": "label",
		className: cn("flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className),
		...props
	});
}
var fieldVariants = cva("group/field flex w-full gap-3 data-[invalid=true]:text-destructive", {
	variants: { orientation: {
		vertical: ["flex-col [&>*]:w-full [&>.sr-only]:w-auto"],
		horizontal: [
			"flex-row items-center",
			"[&>[data-slot=field-label]]:flex-auto",
			"has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
		],
		responsive: [
			"flex-col @md/field-group:flex-row @md/field-group:items-center [&>*]:w-full @md/field-group:[&>*]:w-auto [&>.sr-only]:w-auto",
			"@md/field-group:[&>[data-slot=field-label]]:flex-auto",
			"@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
		]
	} },
	defaultVariants: { orientation: "vertical" }
});
function Field({ className, orientation = "vertical", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "group",
		"data-slot": "field",
		"data-orientation": orientation,
		className: cn(fieldVariants({ orientation }), className),
		...props
	});
}
function FieldContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "field-content",
		className: cn("group/field-content flex flex-1 flex-col gap-1.5 leading-snug", className),
		...props
	});
}
function FieldLabel({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
		"data-slot": "field-label",
		className: cn("group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50", "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4", "has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5 dark:has-data-[state=checked]:bg-primary/10", className),
		...props
	});
}
function FieldError({ className, children, errors, ...props }) {
	const content = (0, import_react.useMemo)(() => {
		if (children) return children;
		if (!errors?.length) return null;
		const uniqueErrors = [...new Map(errors.map((error) => [error?.message, error])).values()];
		if (uniqueErrors?.length == 1) return uniqueErrors[0]?.message;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "ml-4 flex list-disc flex-col gap-1",
			children: uniqueErrors.map((error, index) => error?.message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: error.message }, index))
		});
	}, [children, errors]);
	if (!content) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "alert",
		"data-slot": "field-error",
		className: cn("text-sm font-normal text-destructive", className),
		...props,
		children: content
	});
}
var FormInputBase = ({ children, label, labelClass, required = true, ...props }) => {
	const field = useFieldContext();
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
		"data-invalid": isInvalid,
		className: "transition-all duration-500 ease-in-out",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldLabel, {
				htmlFor: field.name,
				className: cn("text-sm transition-all duration-500 ease-in-out", props.disabled ? "text-muted-foreground" : "text-foreground", labelClass),
				children: [
					label,
					" ",
					!required && "(Optional)"
				]
			}),
			children,
			isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
		] })
	});
};
/** biome-ignore-all lint/a11y/useSemanticElements: <ignore> */
var DateInput = (props) => {
	const field = useFieldContext();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [date, setDate] = (0, import_react.useState)(parse(field.state.value, "yyyy-MM-dd", /* @__PURE__ */ new Date()));
	const [month, setMonth] = (0, import_react.useState)(date);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormInputBase, {
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover$1, {
			onOpenChange: setOpen,
			open,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"aria-expanded": open,
					className: cn("w-full justify-between sm:min-w-75 capitalize"),
					variant: "outline",
					disabled: props.disabled,
					children: [format(new Date(field.state.value), "PP"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar$1, { className: "ml-2 size-4 shrink-0 opacity-50" })]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
				className: "w-auto overflow-hidden p-0 z-999",
				align: "end",
				alignOffset: -8,
				sideOffset: 10,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
					mode: "single",
					selected: date,
					captionLayout: "dropdown",
					month,
					onMonthChange: setMonth,
					onSelect: (date) => {
						if (isValidDate(date)) {
							setDate(date);
							setMonth(date);
							field.handleChange(format(date, "yyyy-MM-dd"));
						}
						setOpen(false);
					}
				})
			})]
		})
	});
};
function FlatNumberInput({ field, className, isLoading = false, required = true, disabled = false }) {
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
	const handleChange = (val, name) => {
		const newValue = {
			...field.state.value,
			[name]: val
		};
		if (newValue) field.handleChange(newValue);
	};
	const FieldErrors = ({ meta }) => {
		if (!meta.isTouched) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-1",
			children: meta.errors.map(({ message }, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: "destructive",
				className: "w-full",
				children: message
			}, index))
		});
	};
	const fieldLabel = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
		htmlFor: "building",
		className: cn("text-sm", disabled ? "text-muted-foreground" : "text-foreground"),
		children: "Flat Number"
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "w-full h-10" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
		"data-invalid": isInvalid,
		className: cn(className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldContent, { children: [
			fieldLabel,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup, {
				className: "w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, {
					align: "inline-start",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
						onValueChange: (e) => handleChange(e, "building"),
						value: field.state.value?.building ?? void 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							"aria-invalid": isInvalid,
							id: `building`,
							name: `building`,
							onBlur: field.handleBlur,
							className: "w-full text-sm border-0 border-r rounded-none bg-transparent dark:bg-transparent",
							disabled,
							"aria-required": required,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Building" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: BUILDING_OPTIONS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: b,
							children: b
						}, b)) })]
					})
				}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, {
					align: "inline-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
					onValueChange: (e) => handleChange(+e, "flat"),
					value: field.state.value?.flat?.toString() ?? void 0,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						"aria-invalid": isInvalid,
						id: `flat`,
						name: `flat`,
						onBlur: field.handleBlur,
						className: "w-full text-sm border-0 border-r rounded-none bg-transparent dark:bg-transparent",
						disabled,
						"aria-required": required,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Flat" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: getFlatsForBuilding(field.state.value.building ?? "A")?.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: b.toString(),
						children: b
					}, b)) })]
				})]
			}),
			isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldErrors, { meta: field.state.meta })
		] })
	});
}
/** biome-ignore-all lint/correctness/noChildrenProp: <ignore> */ /** biome-ignore-all lint/suspicious/noExplicitAny: <ignore> */
function FormErrorMap() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(useFormContext().Subscribe, {
		selector: (state) => [state.errorMap],
		children: ([errorMap]) => {
			if (!errorMap.onSubmit) return;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-2",
				children: Object.entries(errorMap.onSubmit).map(([fld, err]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					variant: "destructive",
					children: [
						fld,
						" : ",
						err?.[0].message
					]
				}, fld))
			});
		}
	});
}
function NumberInput({ field, className, onIncrement, onDecrement, fraction = 1, value, isPlusDisabled = false, isMinusDisabled = false }) {
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
	const FieldErrors = ({ meta }) => {
		if (!meta.isTouched) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-1",
			children: meta.errors.map(({ message }, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: "destructive",
				className: "w-full",
				children: message
			}, index))
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
		"data-invalid": isInvalid,
		className: cn(className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup, {
			className: "w-full border-0 outline-0 shadow-none",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, {
					align: "inline-start",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupButton, {
						variant: "ghost",
						size: "icon-xs",
						onClick: onDecrement,
						disabled: isMinusDisabled,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-3.5" })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupInput, {
					className: "w-full text-center text-xs border-none text-secondary-foreground",
					value: value.toFixed(fraction),
					readOnly: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, {
					align: "inline-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupButton, {
						variant: "ghost",
						size: "icon-xs",
						onClick: onIncrement,
						disabled: isPlusDisabled,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
					})
				})
			]
		}), isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldErrors, { meta: field.state.meta })] })
	});
}
function Command$1({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e, {
		"data-slot": "command",
		className: cn("flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground", className),
		...props
	});
}
function CommandInput({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-slot": "command-input-wrapper",
		className: "flex h-9 items-center gap-2 border-b px-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 shrink-0 opacity-50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Input, {
			"data-slot": "command-input",
			className: cn("flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", className),
			...props
		})]
	});
}
function CommandList({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.List, {
		"data-slot": "command-list",
		className: cn("max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto", className),
		...props
	});
}
function CommandEmpty({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Empty, {
		"data-slot": "command-empty",
		className: "py-6 text-center text-sm",
		...props
	});
}
function CommandGroup({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
		"data-slot": "command-group",
		className: cn("overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground", className),
		...props
	});
}
function CommandSeparator({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Separator, {
		"data-slot": "command-separator",
		className: cn("-mx-1 h-px bg-border", className),
		...props
	});
}
function CommandItem({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Item, {
		"data-slot": "command-item",
		className: cn("relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground", className),
		...props
	});
}
/** biome-ignore-all lint/a11y/useSemanticElements: <ignore> */
var SelectInput = ({ options, isCreatable = false, onCreate, ...props }) => {
	const field = useFieldContext();
	const currValue = options.find((o) => o.value === field.state.value);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [selected, setSelected] = (0, import_react.useState)(currValue ?? {
		label: "",
		value: ""
	});
	const [search, setSearch] = (0, import_react.useState)("");
	const handleCreate = () => {
		if (search && !options.find((i) => i.value === search)) {
			setSelected({
				value: search.toLowerCase(),
				label: search
			});
			setOpen(false);
			setSearch("");
			onCreate?.(search);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormInputBase, {
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover$1, {
			onOpenChange: setOpen,
			open,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					"aria-expanded": open,
					className: cn("w-full justify-between sm:min-w-75 capitalize", !selected?.value ? "text-muted-foreground" : "text-foreground"),
					variant: "outline",
					disabled: props.disabled,
					children: [selected?.value ? selected.label : `Select value...`, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, { className: "ml-2 size-4 shrink-0 opacity-50" })]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
				className: "w-full p-0 sm:min-w-75",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Command$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandInput, {
					onValueChange: setSearch,
					placeholder: `Search ${isCreatable ? "or create" : ""}...`,
					value: search
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandList, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandEmpty, { children: isCreatable ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "w-full justify-start",
						onClick: handleCreate,
						variant: "ghost",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 size-4" }),
							"Create \"",
							search,
							"\""
						]
					}) : "No results found." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandGroup, { children: [currValue && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
						className: "text-destructive hover:text-destructive/80",
						onSelect: () => {
							setSelected({
								label: "",
								value: ""
							});
							field.setValue(void 0);
							setOpen(false);
						},
						value: void 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: cn("mr-2 size-4 text-destructive hover:text-destructive/80") }), "Clear selection"]
					}), options.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
						className: "capitalize",
						onSelect: (currentValue) => {
							const opt = options.find((i) => i.value === currentValue);
							if (opt) setSelected(opt);
							field.setValue(currentValue);
							setOpen(false);
						},
						value: item.value,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: cn("mr-2 size-4", selected?.value === item.value ? "opacity-100" : "opacity-0") }), item.label]
					}, item.value))] }),
					search && !options.find((i) => i.value === search) && options.length > 0 && isCreatable && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandSeparator, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandGroup, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommandItem, {
						onSelect: handleCreate,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 size-4" }),
							"Create \"",
							search,
							"\""
						]
					}) })] })
				] })] })
			})]
		})
	});
};
function SubmitButton({ label, className, variant = "default" }) {
	const form = useFormContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Subscribe, {
		selector: (state) => ({
			isSubmitting: state.isSubmitting,
			canSubmit: state.canSubmit
		}),
		children: ({ isSubmitting, canSubmit }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "submit",
			variant,
			isLoading: isSubmitting,
			disabled: !canSubmit || isSubmitting,
			className: cn(className),
			children: form.state.isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}), " Submitting..."] }) : label
		})
	});
}
/** biome-ignore-all lint/a11y/useSemanticElements: <ignore> */
var TextInput = ({ showClearButton = false, ...props }) => {
	const field = useFieldContext();
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
	const { value: _ignoredValue, onChange: _ignoredOnChange, ...cleanProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormInputBase, {
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupInput, {
			...cleanProps,
			placeholder: props.placeholder || `Enter ${props.label.toLowerCase()}`,
			name: field.name,
			value: field.state.value ?? "",
			onBlur: field.handleBlur,
			onChange: (e) => field.handleChange(e.target.value === "" ? void 0 : e.target.value),
			onFocus: (e) => e.target.select(),
			"aria-invalid": isInvalid,
			className: "w-full"
		}), showClearButton && field.state.value && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, {
			align: "inline-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupButton, {
				"aria-label": "Clear",
				title: "Clear",
				size: "icon-xs",
				onClick: () => {
					field.setValue("");
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
			})
		})] })
	});
};
var { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();
var { useAppForm, withFieldGroup, withForm, useTypedAppFormContext } = createFormHook({
	fieldComponents: {
		TextInput,
		SelectInput,
		FlatNumberInput,
		DateInput,
		NumberInput
	},
	formComponents: {
		SubmitButton,
		ErrorMap: FormErrorMap
	},
	fieldContext,
	formContext
});
function Amount({ amount, className, containerClass, iconClass, decimalClass, decimals = 0 }) {
	const formattedAmount = amountFormatter(amount, decimals).toString();
	let integerPart;
	let decimalPart;
	if (formattedAmount.includes(".")) {
		const [i, d] = formattedAmount.split(".");
		integerPart = i;
		decimalPart = d;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-center justify-end", containerClass),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndianRupee, { className: cn("size-3.5 text-muted-foreground", iconClass) }), integerPart && decimalPart ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-end",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("font-semibold text-2xl tabular-nums font-number", className),
				children: integerPart
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: cn("font-semibold text-lg tabular-nums text-muted-foreground font-number", decimalClass),
				children: [".", decimalPart]
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("font-semibold font-number text-2xl tabular-nums", className),
			children: amountFormatter(amount, decimals)
		})]
	});
}
function AnimatedListItem({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			scale: 0,
			opacity: 0
		},
		animate: {
			scale: 1,
			opacity: 1,
			originY: 0
		},
		exit: {
			scale: 0,
			opacity: 0
		},
		transition: {
			type: "spring",
			stiffness: 350,
			damping: 40
		},
		layout: true,
		className: "mx-auto w-full",
		children
	});
}
var AnimatedList = import_react.memo(({ children, className, delay = 500, ...props }) => {
	const [index, setIndex] = (0, import_react.useState)(0);
	const childrenArray = (0, import_react.useMemo)(() => import_react.Children.toArray(children), [children]);
	(0, import_react.useEffect)(() => {
		let timeout = null;
		if (index < childrenArray.length - 1) timeout = setTimeout(() => {
			setIndex((prevIndex) => (prevIndex + 1) % childrenArray.length);
		}, delay);
		return () => {
			if (timeout !== null) clearTimeout(timeout);
		};
	}, [
		index,
		delay,
		childrenArray.length
	]);
	const itemsToShow = (0, import_react.useMemo)(() => {
		return childrenArray.slice(0, index + 1);
	}, [index, childrenArray]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(`flex flex-col items-center gap-4`, className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: itemsToShow.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedListItem, { children: item }, item.key)) })
	});
});
AnimatedList.displayName = "AnimatedList";
//#endregion
export { Amount, AnimatedList, AnimatedListItem, InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, Modal, Select$1, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, Tabs$1, TabsContent, TabsContents, TabsList, TabsTrigger, useAppForm, useModal, useTypedAppFormContext };
