import {
    auth,
    clerkClient,
    type User,
} from "@clerk/tanstack-react-start/server";
import { createServerFn } from "@tanstack/react-start";
import type { UserRole } from "@/types";

// Server function to get auth this.state.first
export const getLoggedInUser = createServerFn({ method: "GET" }).handler(
    async () => {
        let user: User | undefined;
        try {
            const { userId, sessionId } = await auth();
            if (userId) user = await clerkClient().users.getUser(userId);
            // if (sessionId) {
            //     const token = await clerkClient().sessions.getToken(sessionId);
            //     console.log(token);
            // }
            return {
                userId,
                role: user?.publicMetadata?.role as UserRole,
                firstName: user?.firstName,
                lastName: user?.lastName,
                imageUrl: user?.imageUrl,
            };
        } catch (_) {
            return {
                userId: undefined,
                role: undefined,
                firstName: undefined,
                lastName: undefined,
                imageUrl: undefined,
            };
        }
    },
);
