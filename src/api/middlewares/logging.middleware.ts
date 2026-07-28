import { createMiddleware } from "@tanstack/react-start";

export const withMetaLogger = (url: string) =>
    createMiddleware({
        type: "function",
    })
        .client(async ({ next, method }) => {
            // Safely allow the client-side execution to proceed without logging
            if (process.env.NODE_ENV?.includes("prod"))
                return await next({ sendContext: { method, url } });
            console.log(`[CLIENT] Calling ${method} ${url}`);
            return await next({ sendContext: { method, url } });
        })
        .server(async ({ next, data, context }) => {
            if (process.env.NODE_ENV?.includes("prod")) return await next();

            try {
                const startTime = Date.now();

                console.log(
                    `[SERVER] Calling ${context.method} ${context.url} ${data ? `with Arguments: ${JSON.stringify(data)}` : ""}`,
                );

                const result = await next();

                const duration = Date.now() - startTime;

                console.log(
                    `[SERVER] Finished ${context.method} ${context.url} in ${duration}ms`,
                );

                return result;
            } catch (error) {
                console.warn(
                    `[SERVER] Error ${context.method} ${context.url} ${JSON.stringify(error, null, 4)}`,
                );
                throw error;
            }
        });
