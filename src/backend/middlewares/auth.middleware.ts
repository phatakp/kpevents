import { createMiddleware } from "@tanstack/react-start";
import { getLoggedInUser } from "@/backend/services/auth.services";
import { USER_ROLE } from "@/lib/constants";

export const authMiddleware = createMiddleware().server(async ({ next }) => {
    const { userId } = await getLoggedInUser();
    return next({ context: { userId } });
});

export const assertAuthMiddleware = createMiddleware().server(
    async ({ next }) => {
        const { userId } = await getLoggedInUser();
        if (!userId) throw new Error("You are not authenticated");
        return next({ context: { userId } });
    },
);

export const assertAdminMiddleware = createMiddleware().server(
    async ({ next }) => {
        const { role, userId } = await getLoggedInUser();
        if (role !== USER_ROLE.ADMIN) throw new Error("Not Admin");
        return next({ context: { userId } });
    },
);
