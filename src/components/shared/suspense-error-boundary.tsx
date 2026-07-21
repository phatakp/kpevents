import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { CatchBoundary } from "@tanstack/react-router";
import { type ReactNode, Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Props = {
    id: string;
    children: ReactNode;
    fallback: ReactNode;
};

export function SuspenseErrorBoundary({ id, children, fallback }: Props) {
    return (
        <QueryErrorResetBoundary>
            {({ reset }) => (
                <CatchBoundary
                    getResetKey={() => id} // Resets when this key changes
                    onCatch={(error) => console.error(error)}
                    errorComponent={({ error, reset: resetBoundary }) => (
                        <div className="min-h-screen flex w-full flex-col gap-4 max-w-3xl mx-auto">
                            <div className="w-full text-base max-w-3xl wrap-break-word">
                                {error.message}
                            </div>
                            <div className="flex items-center">
                                <Button
                                    onClick={() => {
                                        reset(); // Resets the Query state
                                        resetBoundary(); // Resets the CatchBoundary UI
                                    }}
                                >
                                    Try Again
                                </Button>
                            </div>
                        </div>
                    )}
                >
                    <Suspense fallback={fallback}>{children}</Suspense>
                </CatchBoundary>
            )}
        </QueryErrorResetBoundary>
    );
}
