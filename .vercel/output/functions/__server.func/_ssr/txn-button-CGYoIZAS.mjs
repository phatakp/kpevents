import { __toESM } from "../_runtime.mjs";
import { COMMITTEE, DONATION_TYPE, TXN_MODE_OPTIONS, TXN_TYPE, TXN_TYPE_OPTIONS } from "./common.schema-rOPsTdW8.mjs";
import { require_react } from "../_libs/@clerk/clerk-react+[...].mjs";
import { require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { cn, getDefaultFormOptions, getStepAmount, getStepQty } from "./utils-lKLyXhB7.mjs";
import { Check, Pen, ShoppingCart, Trash } from "../_libs/lucide-react.mjs";
import { Button, buttonVariants } from "./button-Bhg_Lprh.mjs";
import { TransactionSchemaWithValidation } from "./txn.schema-DT3-__5q.mjs";
import { QUERY_KEYS } from "./keys-D0H6xnTe.mjs";
import { useMutation, useQueryClient, useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { Card, CardDescription, CardHeader, CardTitle, committeeMemberOptions } from "./separator-B8iuesUR.mjs";
import { zt } from "../_libs/react-hot-toast.mjs";
import { Route, createTransaction, deleteTransaction, linkedTransferOptions, updateTransaction } from "./card-loader-B0N-W8_R.mjs";
import { Amount, Modal, Tabs$1, TabsContent, TabsContents, TabsList, TabsTrigger, useAppForm, useModal, useTypedAppFormContext } from "./animated-list-CYIuENrB.mjs";
import { create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/txn-button-CGYoIZAS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var useCart = create((set) => ({
	items: [],
	initCart: (items) => set((state) => ({
		...state,
		items
	})),
	addToCart: (item) => set((state) => ({
		...state,
		items: [...state.items, item]
	})),
	deleteFromCart: (itemId) => set((state) => {
		const item = state.items.find((i) => i.itemId === itemId);
		if (!item) return state;
		return {
			...state,
			items: state.items.filter((i) => i.itemId !== item.itemId)
		};
	}),
	incrementQty: (itemId) => set((state) => {
		const item = state.items.find((i) => i.itemId === itemId);
		if (!item) return state;
		const incrementQty = getStepQty(item.bookingQty);
		item.bookingQty = Math.min(item.totalQty, item.bookingQty + incrementQty);
		item.bookingAmt = item.price * item.bookingQty;
		const items = state.items.map((i) => i.itemId === itemId ? item : i);
		return {
			...state,
			items
		};
	}),
	decrementQty: (itemId) => set((state) => {
		const item = state.items.find((i) => i.itemId === itemId);
		if (!item) return state;
		const decrementQty = getStepQty(item.bookingQty);
		item.bookingQty = Math.max(0, item.bookingQty - decrementQty);
		item.bookingAmt = item.price * item.bookingQty;
		const items = state.items.filter((i) => i.bookingQty > 0).map((i) => i.itemId === itemId ? item : i);
		return {
			...state,
			items
		};
	}),
	incrementAmt: (itemId) => set((state) => {
		const item = state.items.find((i) => i.itemId === itemId);
		if (!item) return state;
		const incrementAmt = getStepAmount(item.bookingAmt);
		item.bookingAmt = Math.min(item.totalAmt, item.bookingAmt + incrementAmt);
		const items = state.items.map((i) => i.itemId === itemId ? item : i);
		return {
			...state,
			items
		};
	}),
	decrementAmt: (itemId) => set((state) => {
		const item = state.items.find((i) => i.itemId === itemId);
		if (!item) return state;
		const decrementAmt = getStepAmount(item.bookingAmt);
		item.bookingAmt = Math.max(0, item.bookingAmt - decrementAmt);
		const items = state.items.filter((i) => i.bookingAmt > 0).map((i) => i.itemId === itemId ? item : i);
		return {
			...state,
			items
		};
	}),
	clearCart: () => set(() => ({ items: [] }))
}));
var useCartTotal = () => {
	return useCart((state) => state.items).reduce((acc, b) => acc + b.bookingAmt, 0);
};
function useCreateTransaction() {
	const queryClient = useQueryClient();
	const clearCart = useCart((state) => state.clearCart);
	const { closeModal, modalId } = useModal();
	return useMutation({
		mutationFn: createTransaction,
		onSuccess: (data) => {
			if (data?.donation?.type === DONATION_TYPE.ANNADAAN || data?.donation?.type === DONATION_TYPE.TEMPLE_ITEM) clearCart();
			closeModal(modalId);
			zt.success(`Transaction created successfully`);
			return queryClient.invalidateQueries({ queryKey: QUERY_KEYS.allTxns });
		},
		onError: (error) => {
			zt.error(error.message ?? "Could not process request");
		}
	});
}
function useUpdateTransaction() {
	const queryClient = useQueryClient();
	const { closeModal, modalId } = useModal();
	const clearCart = useCart((state) => state.clearCart);
	return useMutation({
		mutationFn: updateTransaction,
		onSuccess: (data) => {
			if (data?.donation?.type === DONATION_TYPE.ANNADAAN || data?.donation?.type === DONATION_TYPE.TEMPLE_ITEM) clearCart();
			closeModal(modalId);
			zt.success(`Transaction updated successfully`);
			return queryClient.invalidateQueries({ queryKey: QUERY_KEYS.allTxns });
		},
		onError: (error) => {
			zt.error(error.message ?? "Could not process request");
		}
	});
}
function useDeleteTransaction() {
	const queryClient = useQueryClient();
	const { closeModal, modalId } = useModal();
	return useMutation({
		mutationFn: deleteTransaction,
		onSuccess: () => {
			closeModal(modalId);
			zt.success(`Transaction deleted successfully`);
			return queryClient.invalidateQueries({ queryKey: QUERY_KEYS.allTxns });
		},
		onError: (error) => {
			zt.error(error.message ?? "Could not process request");
		}
	});
}
function AnnadaanForm({ txn, isDelete }) {
	const { defaultValues, memberOptions } = useTxnFormContext();
	const form = useTypedAppFormContext({ defaultValues });
	const totalAmount = useCartTotal();
	const deleteFromCart = useCart((state) => state.deleteFromCart);
	const decrementQty = useCart((state) => state.decrementQty);
	const incrementQty = useCart((state) => state.incrementQty);
	const initCart = useCart((state) => state.initCart);
	const clearCart = useCart((state) => state.clearCart);
	const items = useCart((state) => state.items);
	const { isOpen, modalId } = useModal();
	const onDecrement = (i, item) => {
		decrementQty(item.itemId);
		form.setFieldValue(`bookings[${i}].bookingQty`, item.bookingQty);
		form.setFieldValue(`bookings[${i}].bookingAmt`, item.bookingQty * item.price);
	};
	const onIncrement = (i, item) => {
		incrementQty(item.itemId);
		form.setFieldValue(`bookings[${i}].bookingQty`, item.bookingQty);
		form.setFieldValue(`bookings[${i}].bookingAmt`, item.bookingQty * item.price);
	};
	(0, import_react.useEffect)(() => {
		if (isOpen(modalId) && txn?.donation?.bookings) initCart(txn.donation.bookings);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col md:flex-row gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.AppField, {
				name: "donorName",
				children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(field.TextInput, {
					label: "Donor Name",
					disabled: isDelete
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.AppField, {
				name: "flatNumber",
				children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(field.FlatNumberInput, {
					field,
					className: "w-full sm:w-fit",
					disabled: isDelete
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.AppField, {
			name: "txnUserId",
			children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(field.SelectInput, {
				label: "Amount Paid to",
				options: memberOptions,
				disabled: isDelete
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-12 items-center gap-4 border-b-2 py-2 text-muted-foreground text-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "col-span-8 md:col-span-6 col-start-3 md:col-start-2",
					children: "Item Name"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "md:flex md:col-span-3 hidden",
					children: "Quantity"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-end md:justify-start col-span-2",
					children: "Amount"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.AppField, {
			name: "bookings",
			mode: "array",
			children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: field.state.value.map((_, i) => {
				const cartItem = items.find((itm) => itm.itemId === form.getFieldValue(`bookings[${i}].itemId`));
				if (!cartItem) return null;
				const onMinusClick = () => onDecrement(i, cartItem);
				const onPlusClick = () => onIncrement(i, cartItem);
				const stepQty = getStepQty(cartItem.bookingQty);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-12 items-center gap-4 py-2 border-b -mt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "col-span-2 md:col-span-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.AppField, {
								name: `bookings[${i}].itemId`,
								children: (subField) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "destructive",
									size: "icon-sm",
									disabled: !!txn?.id,
									onClick: () => {
										deleteFromCart(subField.state.value);
										field.removeValue(i);
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash, { className: "size-3.5" })
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-span-8 md:col-span-6 flex flex-col",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.AppField, {
								name: `bookings[${i}].itemName`,
								children: (subField) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("text-xs md:text-sm truncate capitalize", txn?.id && " text-muted-foreground"),
									children: subField.state.value
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-1 pr-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.AppField, {
										name: `bookings[${i}].price`,
										children: (subField) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
											amount: subField.state.value,
											iconClass: "size-3",
											containerClass: "justify-start",
											className: cn("text-sm text-muted-foreground")
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "md:hidden text-muted-foreground text-sm",
										children: "X"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex md:hidden col-span-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.AppField, {
											name: `bookings[${i}].bookingQty`,
											children: (subField) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(subField.NumberInput, {
												field: subField,
												value: subField.state.value,
												onDecrement: onMinusClick,
												onIncrement: onPlusClick,
												isMinusDisabled: subField.state.value <= stepQty || !!txn?.id,
												isPlusDisabled: subField.state.value >= cartItem.totalQty || !!txn?.id
											})
										})
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "md:flex items-center gap-1 md:col-span-3 hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.AppField, {
								name: `bookings[${i}].bookingQty`,
								children: (subField) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(subField.NumberInput, {
									field: subField,
									value: subField.state.value,
									onDecrement: onMinusClick,
									onIncrement: onPlusClick,
									isMinusDisabled: subField.state.value <= stepQty || !!txn?.id,
									isPlusDisabled: subField.state.value >= cartItem.totalQty || !!txn?.id
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center justify-end col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Subscribe, {
								selector: (state) => ({
									bookingQty: state.values.bookings[i].bookingQty,
									price: state.values.bookings[i].price
								}),
								children: ({ bookingQty, price }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.AppField, {
									name: `bookings[${i}].bookingAmt`,
									children: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
										amount: bookingQty * price,
										iconClass: "size-3 md:size-4",
										className: cn("text-base text-muted-foreground")
									})
								})
							})
						})
					]
				}, i);
			}) })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-12 items-center gap-4 bg-secondary text-secondary-foreground px-4 py-2 -mt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "col-span-2",
				children: " Total"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-end col-span-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
					amount: totalAmount,
					className: cn("text-xl md:text-2xl text-muted-foreground")
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "outline",
			onClick: clearCart,
			type: "button",
			children: "Clear Cart"
		})
	] });
}
function DonationForm({ committee, donationType, txn, isDelete = false }) {
	const { defaultValues, memberOptions } = useTxnFormContext();
	const form = useTypedAppFormContext({ defaultValues });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			!txn?.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					size: "icon-sm",
					className: "size-5",
					disabled: isDelete,
					onClick: () => {
						if (donationType === DONATION_TYPE.OTHER) form.setFieldValue("donationType", committee === COMMITTEE.CULTURAL ? DONATION_TYPE.CULTURAL : DONATION_TYPE.TEMPLE);
						else form.setFieldValue("donationType", DONATION_TYPE.OTHER);
					},
					children: donationType === DONATION_TYPE.OTHER && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "text-success, size-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "capitalize",
					children: "Other Donation Type"
				})]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "For external or non resident donations" })] }) }),
			donationType === DONATION_TYPE.OTHER && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.AppField, {
				name: "description",
				children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(field.TextInput, {
					label: "Description",
					disabled: isDelete
				})
			}),
			donationType !== DONATION_TYPE.OTHER && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col md:flex-row gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.AppField, {
					name: "donorName",
					children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(field.TextInput, {
						label: "Donor Name",
						disabled: isDelete
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.AppField, {
					name: "flatNumber",
					children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(field.FlatNumberInput, {
						field,
						className: "w-full sm:w-fit",
						disabled: isDelete
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.AppField, {
					name: "date",
					children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(field.DateInput, {
						label: "Date",
						disabled: isDelete
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.AppField, {
					name: "amount",
					children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(field.TextInput, {
						label: "Amount",
						type: "number",
						disabled: isDelete
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.AppField, {
				name: "txnUserId",
				children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(field.SelectInput, {
					label: "Receiver",
					options: memberOptions,
					disabled: isDelete
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.AppField, {
					name: "txnMode",
					children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(field.SelectInput, {
						label: "Txn Mode",
						options: TXN_MODE_OPTIONS.map((m) => ({
							label: m.toLowerCase(),
							value: m
						})),
						disabled: isDelete
					})
				}), donationType === DONATION_TYPE.CULTURAL && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.AppField, {
					name: "donorQuantity",
					children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(field.TextInput, {
						label: "Mahaprasad Count",
						type: "number",
						disabled: isDelete
					})
				})]
			})
		]
	});
}
function ExpenseForm({ isDelete }) {
	const { defaultValues, memberOptions } = useTxnFormContext();
	const form = useTypedAppFormContext({ defaultValues });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.AppField, {
				name: "description",
				children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(field.TextInput, {
					label: "Description",
					disabled: isDelete
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.AppField, {
					name: "date",
					children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(field.DateInput, {
						label: "Date",
						disabled: isDelete
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.AppField, {
					name: "amount",
					children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(field.TextInput, {
						label: "Amount",
						type: "number",
						disabled: isDelete
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.AppField, {
				name: "txnUserId",
				children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(field.SelectInput, {
					label: "Paid By",
					options: memberOptions,
					disabled: isDelete
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.AppField, {
					name: "txnMode",
					children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(field.SelectInput, {
						label: "Txn Mode",
						options: TXN_MODE_OPTIONS.map((m) => ({
							label: m.toLowerCase(),
							value: m
						})),
						disabled: isDelete
					})
				})
			})
		]
	});
}
function TempleItemForm({ txn, isDelete }) {
	const { defaultValues, memberOptions } = useTxnFormContext();
	const form = useTypedAppFormContext({ defaultValues });
	const items = useCart((state) => state.items);
	const { modalId, isOpen } = useModal();
	const deleteFromCart = useCart((state) => state.deleteFromCart);
	const incrementAmt = useCart((state) => state.incrementAmt);
	const decrementAmt = useCart((state) => state.decrementAmt);
	const initCart = useCart((state) => state.initCart);
	const clearCart = useCart((state) => state.clearCart);
	const totalAmount = useCartTotal();
	const onDecrement = (i, item) => {
		decrementAmt(item.itemId);
		form.setFieldValue(`bookings[${i}].bookingAmt`, item.bookingAmt);
	};
	const onIncrement = (i, item) => {
		incrementAmt(item.itemId);
		form.setFieldValue(`bookings[${i}].bookingAmt`, item.bookingAmt);
	};
	(0, import_react.useEffect)(() => {
		if (isOpen(modalId) && txn?.donation?.bookings) initCart(txn.donation.bookings);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col md:flex-row gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.AppField, {
				name: "donorName",
				children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(field.TextInput, {
					label: "Donor Name",
					disabled: isDelete
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.AppField, {
				name: "flatNumber",
				children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(field.FlatNumberInput, {
					field,
					className: "w-full sm:w-fit",
					disabled: isDelete
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.AppField, {
			name: "txnUserId",
			children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(field.SelectInput, {
				label: "Amount Paid to",
				options: memberOptions,
				disabled: isDelete
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-12 items-center gap-4 border-b-2 py-2 text-muted-foreground text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "col-span-6 col-start-2",
				children: "Item Name"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-end col-span-5",
				children: "Amount"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.AppField, {
			name: "bookings",
			mode: "array",
			children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: field.state.value.map((_, i) => {
				const cartItem = items.find((itm) => itm.itemId === form.getFieldValue(`bookings[${i}].itemId`));
				if (!cartItem) return null;
				const onMinusClick = () => onDecrement(i, cartItem);
				const onPlusClick = () => onIncrement(i, cartItem);
				const stepAmt = getStepAmount(cartItem.bookingAmt);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-12 items-center gap-4 py-2 border-b -mt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.AppField, {
								name: `bookings[${i}].itemId`,
								children: (subField) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "destructive",
									size: "icon-sm",
									disabled: !!txn?.id,
									onClick: () => {
										deleteFromCart(subField.state.value);
										field.removeValue(i);
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash, { className: "size-3.5" })
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "col-span-6 flex flex-col",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.AppField, {
								name: `bookings[${i}].itemName`,
								children: (subField) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("text-xs md:text-sm truncate capitalize", txn?.id && " text-muted-foreground"),
									children: subField.state.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-1 col-span-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.AppField, {
								name: `bookings[${i}].bookingAmt`,
								children: (subField) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(subField.NumberInput, {
									field: subField,
									fraction: 0,
									value: subField.state.value,
									onDecrement: onMinusClick,
									onIncrement: onPlusClick,
									isMinusDisabled: subField.state.value <= stepAmt || !!txn?.id,
									isPlusDisabled: subField.state.value >= cartItem.totalAmt || !!txn?.id
								})
							})
						})
					]
				}, i);
			}) })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-12 items-center gap-4 bg-secondary text-secondary-foreground px-4 py-2 -mt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "col-span-2",
				children: " Total"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-end col-span-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
					amount: totalAmount,
					className: cn("text-xl md:text-2xl text-muted-foreground")
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "outline",
			onClick: clearCart,
			type: "button",
			children: "Clear Cart"
		})
	] });
}
function TransferForm({ isDelete }) {
	const { defaultValues, memberOptions } = useTxnFormContext();
	const form = useTypedAppFormContext({ defaultValues });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.AppField, {
					name: "date",
					children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(field.DateInput, {
						label: "Date",
						disabled: isDelete
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.AppField, {
					name: "amount",
					children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(field.TextInput, {
						label: "Amount",
						type: "number",
						disabled: isDelete
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.AppField, {
				name: "txnUserId",
				children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(field.SelectInput, {
					label: "Paid By",
					options: memberOptions,
					disabled: isDelete
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Subscribe, {
				selector: (state) => ({ txnUserId: state.values.txnUserId }),
				children: ({ txnUserId }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.AppField, {
					name: "toUserId",
					children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(field.SelectInput, {
						label: "Receiver",
						options: memberOptions.filter((m) => m.value !== txnUserId),
						disabled: isDelete
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.AppField, {
					name: "txnMode",
					children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(field.SelectInput, {
						label: "Txn Mode",
						options: TXN_MODE_OPTIONS.map((m) => ({
							label: m.toLowerCase(),
							value: m
						})),
						disabled: isDelete
					})
				})
			})
		]
	});
}
var TxnFormContext = (0, import_react.createContext)({});
var useTxnFormContext = () => (0, import_react.useContext)(TxnFormContext);
function TransactionForm({ committee, donationType, txn, isDelete }) {
	const { config, auth } = Route.useRouteContext();
	const { data: linked } = useSuspenseQuery({ ...linkedTransferOptions(txn) });
	const items = useCart((state) => state.items);
	const defaultFormOptions = getDefaultFormOptions({
		committee,
		year: txn?.year ?? config.activeYear,
		donationType,
		txn,
		fromUserId: linked?.fromUserId,
		loggedInUserId: auth.userId,
		items
	});
	const { data: memberOptions } = useSuspenseQuery({ ...committeeMemberOptions({
		committee,
		optionsOnly: true
	}) });
	const { mutate: createTransaction } = useCreateTransaction();
	const { mutate: updateTransaction } = useUpdateTransaction();
	const { mutate: deleteTransaction, isPending } = useDeleteTransaction();
	const form = useAppForm({
		...defaultFormOptions,
		validators: { onSubmit: TransactionSchemaWithValidation },
		onSubmit: async ({ value }) => {
			txn?.id ? updateTransaction({ data: value }) : createTransaction({ data: value });
		}
	});
	if (isDelete && !txn) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center w-full h-full",
		children: "Transaction Details Required"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TxnFormContext.Provider, {
		value: {
			...defaultFormOptions,
			memberOptions
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
			className: "flex flex-col gap-7",
			onSubmit: (e) => {
				e.preventDefault();
				form.handleSubmit();
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(form.AppForm, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.ErrorMap, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Subscribe, {
					selector: (state) => ({
						txnType: state.values.txnType,
						dType: state.values.donationType
					}),
					children: ({ txnType, dType }) => {
						if (dType === DONATION_TYPE.ANNADAAN) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnnadaanForm, {
							txn,
							isDelete
						});
						if (dType === DONATION_TYPE.TEMPLE_ITEM) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TempleItemForm, {
							txn,
							isDelete
						});
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs$1, {
							value: txnType,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList, { children: TXN_TYPE_OPTIONS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								type: "button",
								value: t,
								disabled: !!txn?.id,
								className: "capitalize",
								onClick: () => {
									form.reset();
									form.setErrorMap({});
									form.setFieldValue("txnType", t);
									if (t === TXN_TYPE.DONATION) form.setFieldValue("donationType", committee === COMMITTEE.CULTURAL ? DONATION_TYPE.CULTURAL : DONATION_TYPE.TEMPLE);
									else form.setFieldValue("donationType", void 0);
								},
								children: t.toLowerCase()
							}, t)) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContents, {
								className: "py-6",
								children: TXN_TYPE_OPTIONS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
									value: t,
									children: [
										txnType === TXN_TYPE.DONATION && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DonationForm, {
											committee,
											donationType: dType ?? (committee === COMMITTEE.CULTURAL ? DONATION_TYPE.CULTURAL : DONATION_TYPE.TEMPLE),
											txn,
											isDelete
										}),
										txnType === TXN_TYPE.EXPENSE && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpenseForm, { isDelete }),
										txnType === TXN_TYPE.TRANSFER && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransferForm, { isDelete })
									]
								}, t))
							})]
						});
					}
				}),
				isDelete && txn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "destructive",
					type: "button",
					className: "w-full",
					isLoading: isPending,
					onClick: () => deleteTransaction({ data: { id: txn.id } }),
					children: "Confirm Delete"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.SubmitButton, {
					label: "Submit",
					className: "w-full"
				})
			] })
		})
	});
}
function TxnButton({ committee, year, donationType, txn, isDelete, isBooking }) {
	const items = useCart((state) => state.items);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
		headerClass: cn("bg-linear-to-br from-primary via-primary/60 to-primary/30 p-4 text-primary-foreground rounded-t-lg text-xl"),
		closeBtnClass: "text-primary-foreground hover:text-accent",
		btnClass: cn(buttonVariants({
			size: "sm",
			variant: !txn ? "default" : "ghost"
		}), txn && "justify-start"),
		title: !txn ? `Add ${isBooking ? "Booking" : "Transaction"} Details` : isDelete ? `Delete Transaction` : `Edit Transaction Details`,
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionForm, {
			txn,
			committee: txn?.committee ?? committee.toUpperCase(),
			year: txn?.year ?? year,
			donationType: txn?.donation?.type ?? donationType,
			isDelete
		}),
		children: [
			!txn && !isBooking && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Add Transaction" }),
			!txn && isBooking && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "size-3" }), items.length] }),
			!!txn?.id && isDelete && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash, { className: "size-3" }),
			!!txn?.id && !isDelete && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "size-3" })
		]
	});
}
//#endregion
export { TxnButton, useCart };
