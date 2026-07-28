import { api, handleAPIError } from "./api-client-0PN6z69O.mjs";
import { AdminRepository } from "./admin.repository-C7F-opAP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/user.service-1w3jqwfk.js
var UserRepository = class {
	url = "/users";
	async getCurrUser() {
		try {
			return (await api.get(`${this.url}/me`)).data;
		} catch (_) {
			return null;
		}
	}
	async getCurrUserBalance(request) {
		try {
			return (await api.get(`${this.url}/me/balances/committee/${request.committee}`)).data;
		} catch (error) {
			handleAPIError(error);
		}
	}
	async getAllUserBalance() {
		try {
			return (await api.get(`${this.url}/balances`)).data;
		} catch (error) {
			handleAPIError(error);
		}
	}
	async createProfile(request) {
		try {
			return (await api.post(this.url, JSON.stringify(request))).data;
		} catch (error) {
			handleAPIError(error);
		}
	}
	async updateProfile(request) {
		try {
			return (await api.put(this.url, JSON.stringify(request))).data;
		} catch (error) {
			handleAPIError(error);
		}
	}
};
var UserService = class {
	repo = new UserRepository();
	adminRepo = new AdminRepository();
	async getCurrUser() {
		return this.repo.getCurrUser();
	}
	async getAllMembers() {
		return this.adminRepo.getAllMembers();
	}
	async getAllUserBalance() {
		return this.repo.getAllUserBalance();
	}
	async createProfile(request) {
		return this.repo.createProfile(request);
	}
	async updateProfile(request) {
		return this.repo.updateProfile(request);
	}
};
var userService = new UserService();
//#endregion
export { userService };
