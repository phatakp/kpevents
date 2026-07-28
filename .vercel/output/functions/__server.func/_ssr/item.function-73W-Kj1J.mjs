import { createServerFn } from "./ssr.mjs";
import { withMetaLogger } from "./utils-lKLyXhB7.mjs";
import { ItemQuerySchema } from "./txn.schema-DT3-__5q.mjs";
import { createServerRpc } from "./createServerRpc-DPX_ndmm.mjs";
import { api, handleAPIError } from "./api-client-0PN6z69O.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/item.function-73W-Kj1J.js
var ItemRepository = class {
	url = "/items";
	async getItems(request) {
		try {
			return (await api.get(`${this.url}/${request.type}/${request.year}`)).data;
		} catch (error) {
			handleAPIError(error);
		}
	}
};
var ItemService = class {
	repo = new ItemRepository();
	async getItems(request) {
		return this.repo.getItems(request);
	}
};
var itemService = new ItemService();
var getItems_createServerFn_handler = createServerRpc({
	id: "842724d275a0ab5c86cb23c46ae8344dcfd903c48367d6e78793f474a1b40488",
	name: "getItems",
	filename: "src/api/functions/item.function.ts"
}, (opts) => getItems.__executeServer(opts));
var getItems = createServerFn({ method: "GET" }).middleware([withMetaLogger("/items/{itemType}/{year}")]).validator(ItemQuerySchema).handler(getItems_createServerFn_handler, async ({ data }) => {
	return itemService.getItems(data);
});
//#endregion
export { getItems_createServerFn_handler };
