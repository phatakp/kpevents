import { v4_default } from "../_libs/zod.mjs";
import { CommitteeQuerySchema, CommitteeUserQuerySchema } from "./common.schema-rOPsTdW8.mjs";
import { createServerFn } from "./ssr.mjs";
import { withMetaLogger } from "./utils-lKLyXhB7.mjs";
import { assertAdminMiddleware, assertAuthMiddleware, createSsrRpc } from "./auth.middleware-DJyYI05a.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/keys-D0H6xnTe.js
var getMembership = createServerFn({ method: "GET" }).middleware([withMetaLogger("/members/committee/{commiteeName}")]).validator(CommitteeQuerySchema.extend({ optionsOnly: v4_default.coerce.boolean().optional() })).handler(createSsrRpc("09337d0c9f07b8f716c6492c1a417f64549628908f267a458c718993d0e6852f"));
var getAllMembers = createServerFn({ method: "GET" }).middleware([assertAdminMiddleware]).handler(createSsrRpc("6f3227802fbab886a413e78e87d5ed46f525f2b9af8c29c011d2624b6b24ae84"));
var requestMemberShip = createServerFn({ method: "POST" }).middleware([assertAuthMiddleware, withMetaLogger("/members/commmittee/{committeeName}")]).validator(CommitteeQuerySchema).handler(createSsrRpc("0d98d4507a636b822e0746dcc766dd14e115d34781f097087a2a9a365ae2b640"));
var approveMember = createServerFn({ method: "POST" }).middleware([assertAdminMiddleware]).validator(CommitteeUserQuerySchema).handler(createSsrRpc("45610988ed4978aa15781caed856d76fd7f39e46b1ade1812231b48bf56ef723"));
var deleteMember = createServerFn({ method: "POST" }).middleware([assertAdminMiddleware]).validator(CommitteeUserQuerySchema).handler(createSsrRpc("7e88cd9a41024f46ffb3e6ff98189f4b6c3484835219ec29837910d95803dd49"));
var QUERY_KEYS = {
	config: ["config"],
	users: {
		allUsers: ["users"],
		currUser: ["users", "curr-user"],
		currSessionUser: ["users", "session-user"],
		committeeMembers: ({ committee, optionsOnly }) => [
			"users",
			"members",
			committee,
			optionsOnly
		]
	},
	txns: {
		allTxns: ["txns"],
		committeeBalance: ({ committee }) => [
			"txns",
			"balance",
			committee
		],
		allUserBalances: [
			"txns",
			"users",
			"balances"
		],
		donationStats: ({ committee, year }) => [
			"txns",
			"donation-stats",
			committee,
			year
		],
		allTransactions: ({ committee, txnType, year, building, donationType }) => [
			"txns",
			committee,
			txnType,
			year,
			building,
			donationType
		],
		linkedTransfer: (txnId) => [
			"txns",
			"linked",
			txnId
		],
		avaliableItems: ({ type, year }) => [
			"txns",
			"items",
			type,
			year
		]
	}
};
//#endregion
export { QUERY_KEYS, approveMember, deleteMember, getAllMembers, getMembership, requestMemberShip };
