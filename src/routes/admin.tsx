import { createFileRoute } from "@tanstack/react-router";
import { apiQueries } from "@/api/queries";
import { AdminForm } from "@/components/admin/admin-form";
import { AllMembers } from "@/components/admin/all-members";
import { AnnadaanItemList } from "@/components/admin/annadaan-item-list";
import {
    Tabs,
    TabsContent,
    TabsContents,
    TabsList,
    TabsTrigger,
} from "@/components/animate-ui/components/radix/tabs";
import { Background } from "@/components/shared/background";
import { SuspenseErrorBoundary } from "@/components/shared/suspense-error-boundary";

export const Route = createFileRoute("/admin")({
    component: RouteComponent,
    loader: async ({ context }) => {
        context.queryClient.query(apiQueries.user.allMembers());
        context.queryClient.query(apiQueries.admin.annadaanItems());
    },
});

function RouteComponent() {
    return (
        <Background className="items-start">
            <div className="flex flex-col gap-16 py-8 container">
                <span className="title">Admin Page</span>

                <AdminForm />

                <SuspenseErrorBoundary
                    id={`admin-tabs`}
                    fallback={<div>Loading...</div>}
                >
                    <Tabs defaultValue={"members"}>
                        <TabsList>
                            <TabsTrigger value={"members"}>Members</TabsTrigger>
                            <TabsTrigger value={"items"}>
                                Annadaan Items
                            </TabsTrigger>
                        </TabsList>

                        <TabsContents className="">
                            <TabsContent value={"members"}>
                                <AllMembers />
                            </TabsContent>
                            <TabsContent value={"items"}>
                                <AnnadaanItemList />
                            </TabsContent>
                        </TabsContents>
                    </Tabs>
                </SuspenseErrorBoundary>
            </div>
        </Background>
    );
}
