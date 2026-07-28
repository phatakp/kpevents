import { auth } from "@clerk/tanstack-react-start/server";
import axios from "axios";
import type { APIErrResponse } from "@/types";

export const api = axios.create({
    baseURL: `${process.env.SERVER_API_URL}`,
    timeout: 50000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

api.interceptors.request.use(async (config) => {
    const { getToken } = await auth();
    const token = await getToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export function handleAPIError(error: any) {
    if (axios.isAxiosError(error)) {
        const err = error.response?.data as APIErrResponse;
        if (error.status === 422) {
            throw new Error(err.fieldErrors?.[0].message);
        }

        if (error.status === 403) {
            throw new Error(error.message);
        }
        throw new Error(err.errorDescription);
    } else {
        // Handle other types of errors
        throw new Error("Could not process your request");
    }
}
