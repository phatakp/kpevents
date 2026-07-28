import { v4_default } from "../_libs/zod.mjs";
import { CommitteeQuerySchema, CommitteeUserQuerySchema } from "./common.schema-rOPsTdW8.mjs";
import { createServerFn } from "./ssr.mjs";
import { getUserInfo, withMetaLogger } from "./utils-lKLyXhB7.mjs";
import { assertAdminMiddleware, assertAuthMiddleware } from "./auth.middleware-DJyYI05a.mjs";
import { createServerRpc } from "./createServerRpc-DPX_ndmm.mjs";
import { api, handleAPIError } from "./api-client-0PN6z69O.mjs";
import { AdminRepository } from "./admin.repository-C7F-opAP.mjs";
import { userService } from "./user.service-1w3jqwfk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/member.function-BtQ0_TVq.js
var MemberRepository = class {
	url = "/members";
	async getMemberShip(request) {
		try {
			return (await api.get(`${this.url}/committee/${request.committee}`)).data;
		} catch (_) {
			return null;
		}
	}
	async requestMembership(request) {
		try {
			await api.post(`${this.url}/committee/${request.committee}`);
			return "success";
		} catch (error) {
			handleAPIError(error);
		}
	}
};
var MemberService = class {
	repo = new MemberRepository();
	adminRepo = new AdminRepository();
	async requestMemberShip(request) {
		return this.repo.requestMembership(request);
	}
	async getMemberShip(request) {
		return this.repo.getMemberShip(request);
	}
	async approveMember(request) {
		return this.adminRepo.approveMember(request);
	}
	async deleteMember(request) {
		return this.adminRepo.deleteMember(request);
	}
};
var memberService = new MemberService();
var getMembership_createServerFn_handler = createServerRpc({
	id: "09337d0c9f07b8f716c6492c1a417f64549628908f267a458c718993d0e6852f",
	name: "getMembership",
	filename: "src/api/functions/member.function.ts"
}, (opts) => getMembership.__executeServer(opts));
var getMembership = createServerFn({ method: "GET" }).middleware([withMetaLogger("/members/committee/{commiteeName}")]).validator(CommitteeQuerySchema.extend({ optionsOnly: v4_default.coerce.boolean().optional() })).handler(getMembership_createServerFn_handler, async ({ data }) => {
	const members = await memberService.getMemberShip(data);
	if (data.optionsOnly) return members?.map((u) => ({
		label: getUserInfo(u),
		value: u.clerkId
	})) ?? [];
	return members ?? [];
});
var getAllMembers_createServerFn_handler = createServerRpc({
	id: "6f3227802fbab886a413e78e87d5ed46f525f2b9af8c29c011d2624b6b24ae84",
	name: "getAllMembers",
	filename: "src/api/functions/member.function.ts"
}, (opts) => getAllMembers.__executeServer(opts));
var getAllMembers = createServerFn({ method: "GET" }).middleware([assertAdminMiddleware]).handler(getAllMembers_createServerFn_handler, async () => {
	return userService.getAllMembers();
});
var requestMemberShip_createServerFn_handler = createServerRpc({
	id: "0d98d4507a636b822e0746dcc766dd14e115d34781f097087a2a9a365ae2b640",
	name: "requestMemberShip",
	filename: "src/api/functions/member.function.ts"
}, (opts) => requestMemberShip.__executeServer(opts));
var requestMemberShip = createServerFn({ method: "POST" }).middleware([assertAuthMiddleware, withMetaLogger("/members/commmittee/{committeeName}")]).validator(CommitteeQuerySchema).handler(requestMemberShip_createServerFn_handler, async ({ data }) => {
	return memberService.requestMemberShip(data);
});
var approveMember_createServerFn_handler = createServerRpc({
	id: "45610988ed4978aa15781caed856d76fd7f39e46b1ade1812231b48bf56ef723",
	name: "approveMember",
	filename: "src/api/functions/member.function.ts"
}, (opts) => approveMember.__executeServer(opts));
var approveMember = createServerFn({ method: "POST" }).middleware([assertAdminMiddleware]).validator(CommitteeUserQuerySchema).handler(approveMember_createServerFn_handler, async ({ data }) => {
	return memberService.approveMember(data);
});
var deleteMember_createServerFn_handler = createServerRpc({
	id: "7e88cd9a41024f46ffb3e6ff98189f4b6c3484835219ec29837910d95803dd49",
	name: "deleteMember",
	filename: "src/api/functions/member.function.ts"
}, (opts) => deleteMember.__executeServer(opts));
var deleteMember = createServerFn({ method: "POST" }).middleware([assertAdminMiddleware]).validator(CommitteeUserQuerySchema).handler(deleteMember_createServerFn_handler, async ({ data }) => {
	return memberService.deleteMember(data);
});
//#endregion
export { approveMember_createServerFn_handler, deleteMember_createServerFn_handler, getAllMembers_createServerFn_handler, getMembership_createServerFn_handler, requestMemberShip_createServerFn_handler };
