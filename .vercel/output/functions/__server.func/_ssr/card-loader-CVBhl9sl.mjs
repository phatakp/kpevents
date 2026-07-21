import { require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { createServerFn } from "./ssr.mjs";
import { v4_default } from "../_libs/zod.mjs";
import { CommitteeQuerySchema, CommitteeYearQuerySchema, QUERY_KEYS, TXN_TYPE, TxnQuerySchema, assertAdminMiddleware, assertAuthMiddleware, createSsrRpc } from "./common.schema-CKnvY_hu.mjs";
import { cn, withMetaLogger } from "./user.schema-BooD9qhh.mjs";
import { queryOptions } from "../_libs/tanstack__react-query.mjs";
import { Skeleton } from "./separator-CR3Hz17M.mjs";
import { ItemQuerySchema, TransactionIDSchema, TransactionSchemaWithValidation } from "./txn.schema-6TubNZKo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/card-loader-CVBhl9sl.js
var import_jsx_runtime = require_jsx_runtime();
var getBalancesByCommittee = createServerFn({ method: "GET" }).middleware([withMetaLogger("/transactions/balances/committee/<name>")]).validator(CommitteeQuerySchema).handler(createSsrRpc("b5d78011557001fc373edf1217c8ff2bdc3b5bf14cb73316ea1bcccad47af133"));
var getDonationStatsByCommittee = createServerFn({ method: "GET" }).middleware([withMetaLogger("/transactions/donation/stats/<committee>/<year>")]).validator(CommitteeYearQuerySchema).handler(createSsrRpc("116b806431027f13fec5fe75219ebccb747059530464aedd6333c043d73444b2"));
var getTransactionsByCommittee = createServerFn({ method: "GET" }).middleware([assertAuthMiddleware, withMetaLogger("/transactions/committee/<committee>/<txnType>/<year>")]).validator(TxnQuerySchema).handler(createSsrRpc("1d692b8426027a2a3eeaac0956f70ef319e2da2c38d248abf71c13783bb5225e"));
var createTransaction = createServerFn({ method: "POST" }).middleware([withMetaLogger("/transactions")]).validator(TransactionSchemaWithValidation).handler(createSsrRpc("b4db8936e296eed475103358f49dcfbf1ba5bf26949c14d951b8bb2534986eed"));
var updateTransaction = createServerFn({ method: "POST" }).middleware([assertAuthMiddleware, withMetaLogger("/transactions")]).validator(TransactionSchemaWithValidation).handler(createSsrRpc("f6f2132eca1745d4b282d9e8e4427899ae99e3b5cc25867d06bf8999c279146f"));
var deleteTransaction = createServerFn({ method: "POST" }).middleware([assertAdminMiddleware, withMetaLogger("/transactions")]).validator(TransactionIDSchema).handler(createSsrRpc("6c4267b34632725fe0a2aaf4fab5bde4e05894f995b56a51e7cd10ad6fdf20b9"));
var getLinkedTransfer = createServerFn({ method: "GET" }).middleware([withMetaLogger("/transactions/linked/<txnId>")]).validator(v4_default.object({ txnId: v4_default.string().optional() })).handler(createSsrRpc("e92d830a41c886f96eb8d3a79ceb71f122379b8bd66695aa3661534c27c59f21"));
var getItems = createServerFn({ method: "GET" }).middleware([withMetaLogger("/items/<itemType>/<year>")]).validator(ItemQuerySchema).handler(createSsrRpc("d40e09247593fe90ad52932b4653fc3f41726e807a9ee2193f44814c309799eb"));
var balancesByCommitteeOptions = (data) => queryOptions({
	queryKey: QUERY_KEYS.balancesByCommittee(data),
	queryFn: () => getBalancesByCommittee({ data }),
	staleTime: 1e3 * 60 * 60 * 24
});
var linkedTransferOptions = (txn) => queryOptions({
	queryKey: QUERY_KEYS.linkedTransfer(txn?.id ?? ""),
	queryFn: () => getLinkedTransfer({ data: { txnId: txn && txn.txnType === TXN_TYPE.TRANSFER ? txn.id : void 0 } }),
	staleTime: 1e3 * 60 * 60 * 24
});
var donationStatsByCommitteeOptions = (data) => queryOptions({
	queryKey: QUERY_KEYS.donationStatsByCommittee(data),
	queryFn: () => getDonationStatsByCommittee({ data }),
	staleTime: 1e3 * 60 * 60 * 24
});
var txnsByCommitteeOptions = (data) => queryOptions({
	queryKey: QUERY_KEYS.txnsByCommittee(data),
	queryFn: () => getTransactionsByCommittee({ data }),
	staleTime: 1e3 * 60 * 60 * 24
});
var itemsOptions = (data) => queryOptions({
	queryKey: QUERY_KEYS.items(data),
	queryFn: () => getItems({ data }),
	staleTime: 1e3 * 60 * 60 * 24
});
function CardLoader({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: cn("w-full md:max-w-3xl h-[30vh] mx-auto rounded-md", className) });
}
//#endregion
export { CardLoader, balancesByCommitteeOptions, createTransaction, deleteTransaction, donationStatsByCommitteeOptions, itemsOptions, linkedTransferOptions, txnsByCommitteeOptions, updateTransaction };
