import { SignUp } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";
import { Background } from "@/components/shared/background";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/sign-up/$")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <Background>
            <div className="flex flex-col items-center justify-center gap-6 min-h-screen">
                <Card className="feature-card">
                    <SignUp
                        forceRedirectUrl={"/dashboard"}
                        signInUrl="/sign-in"
                    />
                </Card>
            </div>
        </Background>
    );
}
