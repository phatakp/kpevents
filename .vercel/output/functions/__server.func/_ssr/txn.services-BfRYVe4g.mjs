import { createServerFn } from "./ssr.mjs";
import { v4_default } from "../_libs/zod.mjs";
import { CommitteeQuerySchema, CommitteeYearQuerySchema, DONATION_TYPE, TxnQuerySchema, assertAdminMiddleware, assertAuthMiddleware } from "./common.schema-CKnvY_hu.mjs";
import { withMetaLogger } from "./user.schema-BooD9qhh.mjs";
import { ItemQuerySchema, TransactionIDSchema, TransactionSchemaWithValidation } from "./txn.schema-6TubNZKo.mjs";
import { createServerRpc } from "./createServerRpc-DPX_ndmm.mjs";
import { auth } from "./auth-Bf5LRocI.mjs";
import { api, handleAPIError } from "./axios-DW8fiHrc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/txn.services-BfRYVe4g.js
var getBalancesByCommittee_createServerFn_handler = createServerRpc({
	id: "b5d78011557001fc373edf1217c8ff2bdc3b5bf14cb73316ea1bcccad47af133",
	name: "getBalancesByCommittee",
	filename: "src/backend/services/txn.services.ts"
}, (opts) => getBalancesByCommittee.__executeServer(opts));
var getBalancesByCommittee = createServerFn({ method: "GET" }).middleware([withMetaLogger("/transactions/balances/committee/<name>")]).validator(CommitteeQuerySchema).handler(getBalancesByCommittee_createServerFn_handler, async ({ data }) => {
	try {
		return (await api.get(`/transactions/balances/committee/${data.committee}`)).data;
	} catch (error) {
		handleAPIError(error);
	}
});
var getDonationStatsByCommittee_createServerFn_handler = createServerRpc({
	id: "116b806431027f13fec5fe75219ebccb747059530464aedd6333c043d73444b2",
	name: "getDonationStatsByCommittee",
	filename: "src/backend/services/txn.services.ts"
}, (opts) => getDonationStatsByCommittee.__executeServer(opts));
var getDonationStatsByCommittee = createServerFn({ method: "GET" }).middleware([withMetaLogger("/transactions/donation/stats/<committee>/<year>")]).validator(CommitteeYearQuerySchema).handler(getDonationStatsByCommittee_createServerFn_handler, async ({ data }) => {
	return (await api.get(`/transactions/donation/stats/${data.committee}/${data.year}`)).data;
});
var getTransactionsByCommittee_createServerFn_handler = createServerRpc({
	id: "1d692b8426027a2a3eeaac0956f70ef319e2da2c38d248abf71c13783bb5225e",
	name: "getTransactionsByCommittee",
	filename: "src/backend/services/txn.services.ts"
}, (opts) => getTransactionsByCommittee.__executeServer(opts));
var getTransactionsByCommittee = createServerFn({ method: "GET" }).middleware([assertAuthMiddleware, withMetaLogger("/transactions/committee/<committee>/<txnType>/<year>")]).validator(TxnQuerySchema).handler(getTransactionsByCommittee_createServerFn_handler, async ({ data }) => {
	try {
		const search = data.donationType ? `?donationType=${data.donationType}` : data.building ? `?building=${data.building}` : "";
		return (await api.get(`/transactions/committee/${data.committee}/${data.txnType}/${data.year}${search}`)).data;
	} catch (error) {
		handleAPIError(error);
	}
});
var createTransaction_createServerFn_handler = createServerRpc({
	id: "b4db8936e296eed475103358f49dcfbf1ba5bf26949c14d951b8bb2534986eed",
	name: "createTransaction",
	filename: "src/backend/services/txn.services.ts"
}, (opts) => createTransaction.__executeServer(opts));
var createTransaction = createServerFn({ method: "POST" }).middleware([withMetaLogger("/transactions")]).validator(TransactionSchemaWithValidation).handler(createTransaction_createServerFn_handler, async ({ data }) => {
	const { flatNumber, amount, ...input } = data;
	try {
		const { userId } = await auth();
		if (!userId && input.donationType !== DONATION_TYPE.ANNADAAN && input.donationType !== DONATION_TYPE.TEMPLE_ITEM) throw new Error("You are not authenticated");
		let total = amount;
		if (input.donationType === DONATION_TYPE.ANNADAAN || input.donationType === DONATION_TYPE.TEMPLE_ITEM) total = input.bookings.reduce((acc, b) => acc + b.bookingAmt, 0);
		return (await api.post(`/transactions`, JSON.stringify({
			...input,
			amount: total,
			donorBuilding: flatNumber.building,
			donorFlat: flatNumber.flat
		}))).data;
	} catch (error) {
		handleAPIError(error);
	}
});
var updateTransaction_createServerFn_handler = createServerRpc({
	id: "f6f2132eca1745d4b282d9e8e4427899ae99e3b5cc25867d06bf8999c279146f",
	name: "updateTransaction",
	filename: "src/backend/services/txn.services.ts"
}, (opts) => updateTransaction.__executeServer(opts));
var updateTransaction = createServerFn({ method: "POST" }).middleware([assertAuthMiddleware, withMetaLogger("/transactions")]).validator(TransactionSchemaWithValidation).handler(updateTransaction_createServerFn_handler, async ({ data }) => {
	const { flatNumber, ...input } = data;
	try {
		return (await api.put(`/transactions/${data.id}`, JSON.stringify({
			...input,
			donorBuilding: flatNumber.building,
			donorFlat: flatNumber.flat
		}))).data;
	} catch (error) {
		handleAPIError(error);
	}
});
var deleteTransaction_createServerFn_handler = createServerRpc({
	id: "6c4267b34632725fe0a2aaf4fab5bde4e05894f995b56a51e7cd10ad6fdf20b9",
	name: "deleteTransaction",
	filename: "src/backend/services/txn.services.ts"
}, (opts) => deleteTransaction.__executeServer(opts));
var deleteTransaction = createServerFn({ method: "POST" }).middleware([assertAdminMiddleware, withMetaLogger("/transactions")]).validator(TransactionIDSchema).handler(deleteTransaction_createServerFn_handler, async ({ data }) => {
	try {
		await api.delete(`/admin/transactions/${data.id}`);
		return "success";
	} catch (error) {
		handleAPIError(error);
	}
});
var getLinkedTransfer_createServerFn_handler = createServerRpc({
	id: "e92d830a41c886f96eb8d3a79ceb71f122379b8bd66695aa3661534c27c59f21",
	name: "getLinkedTransfer",
	filename: "src/backend/services/txn.services.ts"
}, (opts) => getLinkedTransfer.__executeServer(opts));
var getLinkedTransfer = createServerFn({ method: "GET" }).middleware([withMetaLogger("/transactions/linked/<txnId>")]).validator(v4_default.object({ txnId: v4_default.string().optional() })).handler(getLinkedTransfer_createServerFn_handler, async ({ data }) => {
	try {
		if (!data.txnId) return null;
		return (await api.get(`/transactions/linked/${data.txnId}`)).data;
	} catch (error) {
		handleAPIError(error);
	}
});
var getItems_createServerFn_handler = createServerRpc({
	id: "d40e09247593fe90ad52932b4653fc3f41726e807a9ee2193f44814c309799eb",
	name: "getItems",
	filename: "src/backend/services/txn.services.ts"
}, (opts) => getItems.__executeServer(opts));
var getItems = createServerFn({ method: "GET" }).middleware([withMetaLogger("/items/<itemType>/<year>")]).validator(ItemQuerySchema).handler(getItems_createServerFn_handler, async ({ data }) => {
	try {
		return (await api.get(`/items/${data.type}/${data.year}`)).data;
	} catch (error) {
		handleAPIError(error);
	}
});
//#endregion
export { createTransaction_createServerFn_handler, deleteTransaction_createServerFn_handler, getBalancesByCommittee_createServerFn_handler, getDonationStatsByCommittee_createServerFn_handler, getItems_createServerFn_handler, getLinkedTransfer_createServerFn_handler, getTransactionsByCommittee_createServerFn_handler, updateTransaction_createServerFn_handler };
