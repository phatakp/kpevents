import { CommitteeQuerySchema, CommitteeYearQuerySchema, TxnQuerySchema } from "./common.schema-rOPsTdW8.mjs";
import { createServerFn } from "./ssr.mjs";
import { isBookingType, withMetaLogger } from "./utils-lKLyXhB7.mjs";
import { assertAuthMiddleware } from "./auth.middleware-DJyYI05a.mjs";
import { TransactionIDSchema, TransactionSchemaWithValidation } from "./txn.schema-DT3-__5q.mjs";
import { createServerRpc } from "./createServerRpc-DPX_ndmm.mjs";
import { api, handleAPIError } from "./api-client-0PN6z69O.mjs";
import { AdminRepository } from "./admin.repository-C7F-opAP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/txn.function-dTpoLtVh.js
var TransactionRepository = class {
	url = "/transactions";
	async getTransactions(request) {
		try {
			const search = request.donationType ? `?donationType=${request.donationType}` : request.building ? `?building=${request.building}` : "";
			return (await api.get(`${this.url}/committee/${request.committee}/${request.txnType}/${request.year}${search}`)).data;
		} catch (error) {
			handleAPIError(error);
		}
	}
	async getDonationStats(request) {
		try {
			return (await api.get(`${this.url}/donation/stats/${request.committee}/${request.year}`)).data;
		} catch (error) {
			handleAPIError(error);
		}
	}
	async getLinkedTransfer(request) {
		try {
			return (await api.get(`${this.url}/linked/${request.id}`)).data;
		} catch (error) {
			handleAPIError(error);
		}
	}
	async getCommitteeBalance(request) {
		try {
			return (await api.get(`${this.url}/balances/committee/${request.committee}`)).data;
		} catch (error) {
			handleAPIError(error);
		}
	}
	async createTransaction(request) {
		try {
			return (await api.post(this.url, JSON.stringify(request))).data;
		} catch (error) {
			handleAPIError(error);
		}
	}
	async updateTransaction(request) {
		try {
			return (await api.put(`${this.url}/${request.id}`, JSON.stringify(request))).data;
		} catch (error) {
			handleAPIError(error);
		}
	}
};
var TransactionService = class {
	repo = new TransactionRepository();
	adminRepo = new AdminRepository();
	async getTransactions(request) {
		return this.repo.getTransactions(request);
	}
	async getCommitteeBalance(request) {
		return this.repo.getCommitteeBalance(request);
	}
	async getDonationStats(request) {
		return this.repo.getDonationStats(request);
	}
	async getLinkedTransfer(request) {
		return this.repo.getLinkedTransfer(request);
	}
	async createTransaction(request) {
		const { flatNumber, amount, ...input } = request;
		let total = amount;
		if (isBookingType(input.donationType)) total = input.bookings.reduce((acc, b) => acc + b.bookingAmt, 0);
		return this.repo.createTransaction({
			...input,
			amount: total,
			donorBuilding: flatNumber.building,
			donorFlat: flatNumber.flat
		});
	}
	async updateTransaction(request) {
		const { flatNumber, amount, ...input } = request;
		let total = amount;
		if (isBookingType(input.donationType)) total = input.bookings.reduce((acc, b) => acc + b.bookingAmt, 0);
		return this.repo.updateTransaction({
			...input,
			amount: total,
			donorBuilding: flatNumber.building,
			donorFlat: flatNumber.flat
		});
	}
	async deleteTransaction(request) {
		return this.adminRepo.deleteTransaction(request);
	}
};
var txnService = new TransactionService();
var getTransactions_createServerFn_handler = createServerRpc({
	id: "9f06137571158a25216ffd026e974e717af33e8fbad3650b3eefd91ccc5a13c6",
	name: "getTransactions",
	filename: "src/api/functions/txn.function.ts"
}, (opts) => getTransactions.__executeServer(opts));
var getTransactions = createServerFn({ method: "GET" }).middleware([assertAuthMiddleware, withMetaLogger("/transactions/committee/{committeeName}/{txnType}/{year}")]).validator(TxnQuerySchema).handler(getTransactions_createServerFn_handler, async ({ data }) => {
	return txnService.getTransactions(data);
});
var getDonationStats_createServerFn_handler = createServerRpc({
	id: "a4eaee4a66527eb297dce572bdf5af9b5a0e7cef0ba4a37d24ec483457a08f97",
	name: "getDonationStats",
	filename: "src/api/functions/txn.function.ts"
}, (opts) => getDonationStats.__executeServer(opts));
var getDonationStats = createServerFn({ method: "GET" }).middleware([withMetaLogger("/transactions/donation/stats/{committeeName}/{year}")]).validator(CommitteeYearQuerySchema).handler(getDonationStats_createServerFn_handler, async ({ data }) => {
	return txnService.getDonationStats(data);
});
var getCommitteeBalance_createServerFn_handler = createServerRpc({
	id: "0d66bd1a75e3545838827ead260d2b1e629e330d97b93af153abeecd0b07ee3d",
	name: "getCommitteeBalance",
	filename: "src/api/functions/txn.function.ts"
}, (opts) => getCommitteeBalance.__executeServer(opts));
var getCommitteeBalance = createServerFn({ method: "GET" }).middleware([withMetaLogger("/transactions/balances/committee/{committeeName}")]).validator(CommitteeQuerySchema).handler(getCommitteeBalance_createServerFn_handler, async ({ data }) => {
	return txnService.getCommitteeBalance(data);
});
var getLinkedTransfer_createServerFn_handler = createServerRpc({
	id: "e1b713e57cf1d8fd86ff55a1b21daf0ad583a4d292d8609a936cb9429900d34c",
	name: "getLinkedTransfer",
	filename: "src/api/functions/txn.function.ts"
}, (opts) => getLinkedTransfer.__executeServer(opts));
var getLinkedTransfer = createServerFn({ method: "GET" }).middleware([withMetaLogger("/transactions/linked/<txnId>")]).validator(TransactionIDSchema.optional()).handler(getLinkedTransfer_createServerFn_handler, async ({ data }) => {
	if (!data?.id) return null;
	return txnService.getLinkedTransfer(data);
});
var createTransaction_createServerFn_handler = createServerRpc({
	id: "b7dbf08dceb952edea20e331cca93eef293585d13bc32246cf91708661791ee0",
	name: "createTransaction",
	filename: "src/api/functions/txn.function.ts"
}, (opts) => createTransaction.__executeServer(opts));
var createTransaction = createServerFn({ method: "POST" }).middleware([withMetaLogger("/transactions")]).validator(TransactionSchemaWithValidation).handler(createTransaction_createServerFn_handler, async ({ data }) => {
	return txnService.createTransaction(data);
});
var updateTransaction_createServerFn_handler = createServerRpc({
	id: "21874d7b906f9c887b77c1970254c6084c04d992d9d8a3333ea009cc1679349f",
	name: "updateTransaction",
	filename: "src/api/functions/txn.function.ts"
}, (opts) => updateTransaction.__executeServer(opts));
var updateTransaction = createServerFn({ method: "POST" }).middleware([withMetaLogger("/transactions")]).validator(TransactionSchemaWithValidation).handler(updateTransaction_createServerFn_handler, async ({ data }) => {
	if (!data.id) throw new Error("Transaction ID required");
	return txnService.updateTransaction(data);
});
var deleteTransaction_createServerFn_handler = createServerRpc({
	id: "47aa4707c9eb590b8300b503d382ae505796d6bdd227bcc6b2406622294f81fd",
	name: "deleteTransaction",
	filename: "src/api/functions/txn.function.ts"
}, (opts) => deleteTransaction.__executeServer(opts));
var deleteTransaction = createServerFn({ method: "POST" }).middleware([withMetaLogger("/transactions/{txnId}")]).validator(TransactionIDSchema).handler(deleteTransaction_createServerFn_handler, async ({ data }) => {
	return txnService.deleteTransaction(data);
});
//#endregion
export { createTransaction_createServerFn_handler, deleteTransaction_createServerFn_handler, getCommitteeBalance_createServerFn_handler, getDonationStats_createServerFn_handler, getLinkedTransfer_createServerFn_handler, getTransactions_createServerFn_handler, updateTransaction_createServerFn_handler };
