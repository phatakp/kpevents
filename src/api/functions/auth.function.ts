import { auth } from "@clerk/tanstack-react-start/server";
import { createServerFn } from "@tanstack/react-start";
import type { UserRole } from "@/types";

export const getLoggedInUser = createServerFn({ method: "GET" }).handler(
    async () => {
        // let user: User | undefined;
        try {
            const { userId, sessionClaims } = await auth();
            if (!userId) throw Error("Not authenticated");

            return {
                userId,
                role: sessionClaims.metadata?.role as UserRole,
                firstName: sessionClaims?.firstName,
                lastName: sessionClaims?.lastName,
                imageUrl: sessionClaims?.imageUrl,
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
