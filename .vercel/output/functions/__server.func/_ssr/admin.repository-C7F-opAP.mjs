import { api, handleAPIError } from "./api-client-0PN6z69O.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.repository-C7F-opAP.js
var AdminRepository = class {
	url = "/admin";
	async getConfig() {
		try {
			return (await api.get(`${this.url}/config`)).data;
		} catch (error) {
			handleAPIError(error);
		}
	}
	async getAllMembers() {
		try {
			return (await api.get(`${this.url}/members`)).data;
		} catch (error) {
			handleAPIError(error);
		}
	}
	async updateConfig(request) {
		try {
			return (await api.put(`${this.url}`, JSON.stringify(request))).data;
		} catch (error) {
			handleAPIError(error);
		}
	}
	async approveMember(request) {
		try {
			await api.put(`${this.url}/members/approve`, JSON.stringify(request));
			return "success";
		} catch (error) {
			handleAPIError(error);
		}
	}
	async deleteMember(request) {
		try {
			await api.post(`${this.url}/members/delete`, JSON.stringify(request));
			return "success";
		} catch (error) {
			handleAPIError(error);
		}
	}
	async deleteTransaction(request) {
		try {
			await api.delete(`${this.url}/transactions/${request.id}`);
			return "success";
		} catch (error) {
			handleAPIError(error);
		}
	}
};
//#endregion
export { AdminRepository };
