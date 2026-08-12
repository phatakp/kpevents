import { createFileRoute } from "@tanstack/react-router";
import { allMembersOptions } from "@/api/queries/admin.queries";
import { AdminForm } from "@/components/admin/admin-form";
import { AllMembers } from "@/components/admin/all-members";
import { Background } from "@/components/shared/background";
import { SuspenseErrorBoundary } from "@/components/shared/suspense-error-boundary";

export const Route = createFileRoute("/admin")({
    component: RouteComponent,
    loader: async ({ context }) => {
        context.queryClient.ensureQueryData(allMembersOptions);
    },
});

function RouteComponent() {
    return (
        <Background className="items-start">
            <div className="flex flex-col gap-6 py-8 container">
                <span className="title">Admin Page</span>

                <AdminForm />

                <SuspenseErrorBoundary
                    id={`user-card`}
                    fallback={<div>Loading...</div>}
                >
                    <AllMembers />
                </SuspenseErrorBoundary>
            </div>
        </Background>
    );
}
