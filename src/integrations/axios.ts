import { auth } from "@clerk/tanstack-react-start/server";
import axios from "axios";

const api = axios.create({
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

api.interceptors.response.use(
    (response) => {
        // Triggers for any 2xx status code
        // You can unpack data globally to avoid writing '.data' every time
        return response.data;
    },
    (error) => {
        // Triggers for status codes outside the 2xx range
        if (error.response && error.response.status === 401) {
            // Global action: redirect to login or trigger a token refresh
            window.location.href = "/login";
        }
        return Promise.reject(error);
    },
);

type APIErrResponse = {
    errorCode: string;
    errorDescription: string;
    timestamp: string;
    fieldErrors: Record<string, string>[] | null;
};

function handleAPIError(error: any) {
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

export { type APIErrResponse, api, handleAPIError };
