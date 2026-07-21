import { auth } from "./auth-Bf5LRocI.mjs";
import { axios } from "../_libs/axios+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/axios-DW8fiHrc.js
var api = axios.create({
	baseURL: `${process.env.SERVER_API_URL}`,
	timeout: 5e4,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json"
	}
});
api.interceptors.request.use(async (config) => {
	const { getToken } = await auth();
	const token = await getToken();
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});
function handleAPIError(error) {
	if (axios.isAxiosError(error)) {
		const err = error.response?.data;
		if (error.status === 422) throw new Error(err.fieldErrors?.[0].message);
		if (error.status === 403) throw new Error(error.message);
		throw new Error(err.errorDescription);
	} else throw new Error("Could not process your request");
}
//#endregion
export { api, handleAPIError };
