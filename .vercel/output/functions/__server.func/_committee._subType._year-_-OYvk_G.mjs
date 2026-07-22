import { require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { DONATION_TYPE, ITEM_TYPE, ROUTE_SUB_TYPE, TXN_TYPE, USER_ROLE } from "./_ssr/common.schema-CKnvY_hu.mjs";
import { cn, getUserInfo } from "./_ssr/user.schema-h0fSWBX3.mjs";
import { Dot, ShoppingCart } from "./_libs/lucide-react.mjs";
import { Button } from "./_ssr/button-9XDxs_vq.mjs";
import { useSuspenseQuery } from "./_libs/tanstack__react-query.mjs";
import { zt } from "./_libs/react-hot-toast.mjs";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "./_ssr/separator-BonH_eRT.mjs";
import { CardLoader, itemsOptions, txnsByCommitteeOptions } from "./_ssr/card-loader-Jku4GCL4.mjs";
import { Background } from "./_ssr/background-Cjri-gEp.mjs";
import { Route } from "./_committee._subType._year-DfRkrjZd.mjs";
import { SuspenseErrorBoundary } from "./_ssr/suspense-error-boundary-9oqj6wJ3.mjs";
import { Amount, AnimatedList, AnimatedListItem, Tabs$1, TabsContent, TabsContents, TabsList, TabsTrigger } from "./_ssr/animated-list-Ay5pyGHB.mjs";
import { SelectYear, TxnButton, useCart } from "./_ssr/txn-button-DeGl2pFs.mjs";
import { PaginationComponent, TxnActions } from "./_ssr/pagination-Cq7G7oY8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_committee._subType._year-_-OYvk_G.js
var import_jsx_runtime = require_jsx_runtime();
function ItemBookingContent() {
	const { committee, subType, year } = Route.useParams();
	const { auth } = Route.useRouteContext();
	const { page = 0 } = Route.useSearch();
	const { data: pageResp } = useSuspenseQuery({ ...txnsByCommitteeOptions({
		committee: committee.toUpperCase(),
		txnType: TXN_TYPE.DONATION,
		year,
		building: void 0,
		donationType: subType === ROUTE_SUB_TYPE.ANNADAAN ? DONATION_TYPE.ANNADAAN : DONATION_TYPE.TEMPLE_ITEM
	}) });
	if (auth.role !== USER_ROLE.ADMIN) return null;
	if (pageResp?.totalElements === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "title text-sm md:text-xl",
		children: ["No bookings found ", `in ${year}`]
	});
	const start = page === 0 ? 0 : page * 10;
	const end = start + 10;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-12 items-center w-full bg-secondary text-secondary-foreground rounded-md py-2 text-sm font-semibold",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden md:flex ps-4",
					children: "Act"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("col-start-2 col-span-6 md:col-span-5"),
					children: "Donor Name"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden md:flex",
					children: "Flat"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden md:flex md:col-span-3",
					children: "Receiver"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "col-span-5 md:col-span-2 text-right pr-4",
					children: "Amount"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedList, { children: pageResp?.data.slice(start, end).map((txn) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedListItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-12 w-full border-b pb-2 items-center text-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TxnActions, {
					txn,
					isBooking: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("flex flex-col gap-2 col-start-2 col-span-7 md:col-span-5"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("text-xs md:text-sm truncate capitalize"),
							children: txn.donation?.donorName?.toLowerCase()
						}), txn.donation?.flat && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "md:hidden text-xs bg-muted text-muted-foreground rounded-lg px-2 py-1",
							children: [
								txn.donation?.building,
								"-",
								txn.donation?.flat
							]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "hidden md:flex",
					children: [
						txn.donation?.building,
						"-",
						txn.donation?.flat
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden md:flex md:col-span-3 capitalize",
					children: getUserInfo(txn.txnUser)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "col-span-4 md:col-span-2 text-right pr-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
						amount: txn.amount,
						iconClass: "size-3 md:size-4",
						className: cn("text-base md:text-xl text-muted-foreground")
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TxnActions, {
					txn,
					isMobile: true,
					isBooking: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-left text-xs capitalize text-muted-foreground md:hidden col-span-11 col-start-2",
					children: `Receiver: ${getUserInfo(txn.txnUser)}`
				})
			]
		}) }, txn.id)) })]
	});
}
function AddtoCartButton({ item, isAvailable }) {
	const addToCart = useCart((state) => state.addToCart);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		variant: "ghost",
		size: "icon-sm",
		onClick: () => {
			addToCart({
				itemType: item.type,
				itemName: item.itemName,
				bookingAmt: item.type === ITEM_TYPE.TEMPLE ? item.availableAmt : item.price * item.availableQty,
				itemId: item.id,
				bookingQty: item.type === ITEM_TYPE.TEMPLE ? 0 : item.availableQty,
				totalQty: item.type === ITEM_TYPE.TEMPLE ? 0 : item.availableQty,
				totalAmt: item.type === ITEM_TYPE.TEMPLE ? item.availableAmt : item.price * item.availableQty,
				price: item.type === ITEM_TYPE.TEMPLE ? 0 : item.price
			});
			zt.success("Item added to cart");
		},
		children: isAvailable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "size-3 text-muted-foreground" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dot, { className: "size-3 text-muted-foreground" })
	});
}
function ItemListContent() {
	const { subType, year } = Route.useParams();
	const { page = 0 } = Route.useSearch();
	const cartItems = useCart((state) => state.items);
	const { data: items } = useSuspenseQuery(itemsOptions({
		type: subType.toUpperCase(),
		year
	}));
	if (items?.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "title text-sm md:text-xl",
		children: "No items found"
	});
	const start = page === 0 ? 0 : page * 10;
	const end = start + 10;
	const totalElements = items?.length ?? 0;
	const totalPages = Math.ceil(totalElements / 10);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			subType === ROUTE_SUB_TYPE.ANNADAAN && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-12 items-center w-full bg-secondary text-secondary-foreground rounded-md py-2 text-sm font-semibold pr-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ps-4 hidden md:inline-flex",
						children: "Add"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "md:col-span-4 col-span-6 col-start-2",
						children: "Item"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden md:block col-span-2 text-right",
						children: "Price"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden md:block col-span-2 text-right",
						children: "Available"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "md:col-span-3 text-right col-span-5",
						children: "Amount"
					})
				]
			}),
			subType === ROUTE_SUB_TYPE.TEMPLE && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-12 items-center w-full bg-secondary text-secondary-foreground rounded-md py-2 text-sm font-semibold pr-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ps-4 hidden md:inline-flex",
						children: "Add"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "col-span-7 col-start-2",
						children: "Item"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-right col-span-4",
						children: "Amount"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedList, { children: items?.slice(start, end).map((item) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedListItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-12 w-full border-b pb-2 items-center pr-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddtoCartButton, {
							item,
							isAvailable: !cartItems.find((i) => i.itemId === item.id)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("col-start-2 ", subType === ROUTE_SUB_TYPE.ANNADAAN && "md:col-span-4 col-span-6", subType === ROUTE_SUB_TYPE.TEMPLE && "col-span-7"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm truncate capitalize",
								children: item.itemName
							})
						}),
						subType === ROUTE_SUB_TYPE.ANNADAAN && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "items-center justify-end col-span-2 hidden md:flex",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
								amount: item.price,
								iconClass: "size-3",
								className: cn("text-sm text-muted-foreground")
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hidden md:flex items-center justify-end col-span-2 text-sm text-muted-foreground",
							children: item.availableQty
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("flex items-center justify-end", subType === ROUTE_SUB_TYPE.ANNADAAN && " md:col-span-3 col-span-5", subType === ROUTE_SUB_TYPE.TEMPLE && "col-span-4"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
								amount: item.availableAmt,
								iconClass: "size-3 md:size-4",
								className: cn("text-base md:text-xl text-muted-foreground")
							})
						}),
						subType === ROUTE_SUB_TYPE.ANNADAAN && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-start-2 md:hidden col-span-11 flex items-center gap-2 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Available"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
									amount: item.price,
									iconClass: "size-3",
									className: cn("text-xs text-muted-foreground")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "X" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.availableQty })
							]
						})
					]
				}) }, item.id);
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationComponent, {
				totalPages,
				page
			})
		]
	});
}
function ItemsList() {
	const { committee, subType, year } = Route.useParams();
	const { isBooking } = Route.useSearch();
	const { auth, config } = Route.useRouteContext();
	const cartItems = useCart((state) => state.items);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "w-full max-w-[calc(100vw-2rem)] md:max-w-full p-0 bg-background border-0 pr-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			className: "py-4 px-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "title capitalize text-xl",
					children: `${subType === ROUTE_SUB_TYPE.ANNADAAN ? "Annadaan" : "Temple"} ${subType === ROUTE_SUB_TYPE.ANNADAAN ? year : ""} ${isBooking ? "item bookings" : "items"}`
				}),
				auth.role === USER_ROLE.ADMIN && subType === ROUTE_SUB_TYPE.ANNADAAN && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectYear, { year }) }),
				!isBooking && cartItems.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardAction, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TxnButton, {
					committee: committee.toUpperCase(),
					year: config.activeYear,
					donationType: subType === ROUTE_SUB_TYPE.ANNADAAN ? DONATION_TYPE.ANNADAAN : DONATION_TYPE.TEMPLE_ITEM,
					isBooking: true
				}) })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "px-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuspenseErrorBoundary, {
				id: `${subType}-list`,
				fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardLoader, { className: "h-[50vh]" }),
				children: isBooking ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemBookingContent, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemListContent, {})
			})
		})]
	});
}
function ItemsTabs({ className }) {
	const { auth } = Route.useRouteContext();
	const { isBooking } = Route.useSearch();
	if (auth.role !== USER_ROLE.ADMIN) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemsList, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-6 w-full max-w-[calc(100vw-1rem)] md:max-w-full", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs$1, {
			value: isBooking ? "bookings" : "items",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList, { children: ["items", "bookings"].map((typ) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
				value: typ,
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					className: "capitalize",
					to: ".",
					search: (old) => ({
						...old,
						isBooking: typ === "bookings"
					}),
					children: typ
				})
			}, typ)) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContents, {
				className: "py-6",
				children: ["items", "bookings"].map((typ) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: typ,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemsList, {})
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
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemsTabs, { className: cn() })
			})
		})
	});
}
//#endregion
export { RouteComponent as component };
