import { useUser } from "../_libs/@clerk/clerk-react+[...].mjs";
import { require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { COMMITTEE, QUERY_KEYS, TXN_TYPE } from "./common.schema-CKnvY_hu.mjs";
import { ProfileSchemaWithValidation, cn } from "./user.schema-h0fSWBX3.mjs";
import { Pen } from "../_libs/lucide-react.mjs";
import { Button } from "./button-9XDxs_vq.mjs";
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { Image } from "../_libs/unpic__react.mjs";
import { zt } from "../_libs/react-hot-toast.mjs";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle, Route, becomeMember, createProfile, currDBUserQueryOptions, currUserBalancesByCommitteeOptions, updateProfile } from "./separator-BonH_eRT.mjs";
import { Background } from "./background-Cjri-gEp.mjs";
import { TabsLoader } from "./tabs-loader-BqKgkBjI.mjs";
import { Badge, SuspenseErrorBoundary } from "./suspense-error-boundary-9oqj6wJ3.mjs";
import { Amount, Modal, Tabs$1, TabsContent, TabsContents, TabsList, TabsTrigger, useAppForm, useModal } from "./animated-list-Ay5pyGHB.mjs";
import { CardStatsLoader } from "./card-stats-loader-BMzb_2My.mjs";
import { MemberBalanceList } from "./members-balance-list-CvAj1sBV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-BiQksdo3.js
var import_jsx_runtime = require_jsx_runtime();
function CommitteeTabs() {
	const { config } = Route.useRouteContext();
	const { data: user } = useSuspenseQuery(currDBUserQueryOptions());
	const activeMemberShip = user?.memberships?.filter((m) => m.isActive) ?? [];
	if (activeMemberShip.length === 0) return;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex w-full max-w-3xl flex-col gap-6 mx-auto",
		children: activeMemberShip.length === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberBalanceList, {
			committee: activeMemberShip[0].committee,
			type: TXN_TYPE.DONATION,
			year: config.activeYear
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs$1, {
			defaultValue: COMMITTEE.CULTURAL,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
				value: COMMITTEE.CULTURAL,
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/dashboard",
					search: { committee: COMMITTEE.CULTURAL },
					children: "Cultural"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
				value: COMMITTEE.TEMPLE,
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/dashboard",
					search: { committee: COMMITTEE.TEMPLE },
					children: "Temple"
				})
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContents, {
				className: "py-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: COMMITTEE.CULTURAL,
					className: "flex flex-col gap-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberBalanceList, {
						committee: COMMITTEE.CULTURAL,
						type: TXN_TYPE.DONATION,
						year: config.activeYear,
						showOther: true
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: COMMITTEE.TEMPLE,
					className: "flex flex-col gap-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberBalanceList, {
						committee: COMMITTEE.TEMPLE,
						type: TXN_TYPE.DONATION,
						year: config.activeYear,
						showOther: true
					})
				})]
			})]
		})
	});
}
function useCreateProfile() {
	const queryClient = useQueryClient();
	const { closeModal, modalId } = useModal();
	return useMutation({
		mutationFn: createProfile,
		onSuccess: () => {
			closeModal(modalId);
			zt.success(`Profile updated successfully`);
			return queryClient.invalidateQueries({ queryKey: QUERY_KEYS.allUsers });
		},
		onError: (error) => {
			zt.error(error.message ?? "Could not process request");
		}
	});
}
function useUpdateProfile() {
	const queryClient = useQueryClient();
	const { closeModal, modalId } = useModal();
	return useMutation({
		mutationFn: updateProfile,
		onSuccess: () => {
			closeModal(modalId);
			zt.success(`Profile updated successfully`);
			return queryClient.invalidateQueries({ queryKey: QUERY_KEYS.currUser });
		},
		onError: (error) => {
			zt.error(error.message ?? "Could not process request");
		}
	});
}
function useAddMember() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: becomeMember,
		onSuccess: (_, input) => {
			zt.success(`${input.data.committee} Membership Requested`);
			return queryClient.invalidateQueries({ queryKey: QUERY_KEYS.currUser });
		},
		onError: (error) => {
			zt.error(error.message ?? "Could not process request");
		}
	});
}
function MembershipStat({ committee, user }) {
	const member = user.memberships.find((m) => m.committee === committee);
	const { data: userBalance } = useQuery({
		...currUserBalancesByCommitteeOptions({ committee }),
		enabled: !!member
	});
	const { mutate } = useAddMember();
	if (!userBalance) return;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-2 py-4 md:px-4",
		children: [member?.isActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-lg font-heading",
				children: committee
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
				amount: userBalance.total,
				className: "text-xl md:text-2xl"
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground capitalize",
			children: committee
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1",
			children: [!member && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				className: "w-fit",
				onClick: () => mutate({ data: { committee } }),
				children: "Request Membership"
			}), member && !member.isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Membership Requested" })]
		})] }), member?.isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-2 text-sm",
			children: userBalance?.balances?.map((bal) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center w-full justify-between text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "capitalize font-heading font-normal",
						children: bal.txnType === "DONATION" ? `${bal.donationType?.toLowerCase()} donations` : bal.txnType === "EXPENSE" ? "Expenses Paid" : "Internal Transfers"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
						amount: bal.balance,
						className: cn("text-sm font-normal", bal.balance < 0 ? "text-destructive" : "text-success"),
						iconClass: "size-3"
					})]
				}, `${bal.year}-${bal.txnType}-${bal.donationType}`);
			})
		})]
	});
}
function ProfileForm({ profile }) {
	const { isLoaded, isSignedIn, user } = useUser();
	const profileUser = {
		clerkId: profile?.clerkId ?? user?.id,
		firstName: profile?.firstName || user?.firstName,
		lastName: profile?.lastName || user?.lastName,
		email: profile?.email || user?.emailAddresses[0]?.emailAddress,
		imageUrl: profile?.imageUrl || user?.imageUrl,
		flatNumber: {
			building: profile?.building,
			flat: Number(profile?.flat)
		}
	};
	const { mutate: addUser } = useCreateProfile();
	const { mutate: updateUser } = useUpdateProfile();
	const form = useAppForm({
		defaultValues: profileUser,
		validators: { onSubmit: ProfileSchemaWithValidation },
		onSubmit: async ({ value }) => {
			profile?.flat ? updateUser({ data: value }) : addUser({ data: value });
		}
	});
	if (!isLoaded || !isSignedIn) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Loading..." });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
		className: "flex flex-col gap-7",
		onSubmit: (e) => {
			e.preventDefault();
			form.handleSubmit();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(form.AppForm, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.ErrorMap, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.AppField, {
				name: "email",
				children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(field.TextInput, {
					label: "Email",
					disabled: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.AppField, {
				name: "firstName",
				children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(field.TextInput, { label: "First Name" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.AppField, {
				name: "lastName",
				children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(field.TextInput, { label: "First Name" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.AppField, {
				name: "flatNumber",
				children: (field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(field.FlatNumberInput, { field })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.SubmitButton, {
				label: "Submit",
				className: "w-full"
			})
		] })
	});
}
function ProfileButton({ profile }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
		headerClass: cn("bg-linear-to-br from-primary via-primary/60 to-primary/30 p-4 text-primary-foreground rounded-t-lg text-xl"),
		closeBtnClass: "text-primary-foreground hover:text-accent",
		btnClass: "w-fit",
		title: `Update Profile`,
		initOpen: !profile?.flat,
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileForm, { profile }),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "size-4" })
	});
}
function UserCard() {
	const { data: user } = useSuspenseQuery(currDBUserQueryOptions());
	if (!user) return;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container py-10 w-full",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "ring-0 border rounded-2xl relative h-full w-full mx-auto max-w-3xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "title text-2xl md:text-4xl flex items-center gap-2",
						children: [user?.firstName ?? "Welcome", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden md:flex",
							children: user?.lastName
						})]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Your Balance Summary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardAction, {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: [
							user?.building,
							"-",
							user?.flat
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileButton, { profile: user })]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "py-4 flex flex-col gap-9 justify-between",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid md:grid-cols-2 items-center md:divide-x divide-y md:divide-y-0 sm:w-3/4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MembershipStat, {
							committee: COMMITTEE.CULTURAL,
							user
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MembershipStat, {
							committee: COMMITTEE.TEMPLE,
							user
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
					src: "https://images.shadcnspace.com/assets/backgrounds/stats-01.webp",
					alt: "user-img",
					width: 211,
					height: 168,
					className: "absolute bottom-0 right-0 hidden sm:block"
				})] })]
			})
		})
	});
}
function RouteComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Background, {
		className: "items-start",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "container py-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuspenseErrorBoundary, {
					id: `user-card`,
					fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardStatsLoader, {}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCard, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuspenseErrorBoundary, {
					id: `committee-tabs`,
					fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsLoader, { className: "h-[50vh]" }),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommitteeTabs, {})
				})]
			})
		})
	});
}
//#endregion
export { RouteComponent as component };
