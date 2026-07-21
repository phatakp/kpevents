import { pendingMemberOptions } from "@/backend/queries/admin.queries";
import { PendingMembers } from "@/components/admin/pending-members";
import { Background } from "@/components/shared/background";
import { SuspenseErrorBoundary } from "@/components/shared/suspense-error-boundary";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
    component: RouteComponent,
    loader: async ({ context }) => {
        context.queryClient.ensureQueryData(pendingMemberOptions());
    },
});

function RouteComponent() {
    return (
        <Background className="items-start">
            <div className="flex flex-col gap-6 py-8 container">
                <span className="title">Admin Page</span>

                <SuspenseErrorBoundary
                    id={`user-card`}
                    fallback={<div>Loading...</div>}
                >
                    <PendingMembers />
                </SuspenseErrorBoundary>
            </div>
        </Background>
    );
}
