import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
    createRootRouteWithContext,
    HeadContent,
    ScriptOnce,
    Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { getLoggedInUser } from "@/api/functions/auth.function";
import { apiQueries } from "@/api/queries";
import { Navbar } from "@/components/shared/navigation";
import { SuspenseErrorBoundary } from "@/components/shared/suspense-error-boundary";
import { Skeleton } from "@/components/ui/skeleton";
import ClerkProvider from "@/integrations/clerk/provider";
import { ReactHotToast } from "@/integrations/react-toast";
import TanStackQueryDevtools from "@/integrations/tanstack-query/devtools";
import TanStackQueryProvider from "@/integrations/tanstack-query/root-provider";
import { getStoredTheme, ThemeProvider } from "@/integrations/theme-provider";
import appCss from "@/styles.css?url";

interface MyRouterContext {
    queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
    head: () => ({
        meta: [
            {
                charSet: "utf-8",
            },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            {
                title: "KP Events",
            },
        ],
        links: [
            {
                rel: "stylesheet",
                href: appCss,
            },
        ],
    }),
    beforeLoad: async ({ context }) => {
        const config = await context.queryClient.ensureQueryData(
            apiQueries.admin.config(),
        );
        if (!config) throw new Error("Config not available");

        const auth = await getLoggedInUser();
        return { auth, config }; // Injected into router context
    },
    loader: async () => ({ _storedTheme: await getStoredTheme() }),
    shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                {/* <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} /> */}
                <HeadContent />
                <ScriptOnce
                    children={`
          (function() {
            const storedTheme = 'dark';
            if (storedTheme === 'system') {
              const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              document.documentElement.className = systemTheme;
            } else {
              document.documentElement.className = storedTheme;
            }
          })();
        `}
                />
            </head>
            <body>
                <ThemeProvider initialTheme={"dark"}>
                    <TanStackQueryProvider>
                        <ClerkProvider>
                            <SuspenseErrorBoundary
                                id="navbar"
                                fallback={
                                    <Skeleton className="inset-x-0 h-16 absolute" />
                                }
                            >
                                <Navbar />
                            </SuspenseErrorBoundary>
                            <main className="relative min-h-[calc(100vh-2rem)] px-4">
                                {children}
                            </main>
                            <ReactHotToast />
                            <TanStackDevtools
                                config={{
                                    position: "bottom-right",
                                }}
                                plugins={[
                                    {
                                        name: "Tanstack Router",
                                        render: <TanStackRouterDevtoolsPanel />,
                                    },
                                    TanStackQueryDevtools,
                                ]}
                            />
                        </ClerkProvider>
                    </TanStackQueryProvider>
                </ThemeProvider>
                <Scripts />
            </body>
        </html>
    );
}
