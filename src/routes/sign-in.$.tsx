import { SignIn } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";
import { Background } from "@/components/shared/background";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/sign-in/$")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <Background type="grid">
            <div className="flex flex-col items-center justify-center gap-6 min-h-screen">
                <Card className="feature-card">
                    <CardContent>
                        <SignIn
                            forceRedirectUrl={"/dashboard"}
                            signUpUrl="/sign-up"
                        />
                    </CardContent>
                </Card>
            </div>
        </Background>
    );
}
