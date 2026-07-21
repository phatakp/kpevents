import { SignIn } from "@clerk/clerk-react";
import { createFileRoute } from "@tanstack/react-router";
import { Background } from "@/components/shared/background";

export const Route = createFileRoute("/sign-in/$")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <Background type="grid">
            <div className="flex flex-col items-center justify-center gap-6 min-h-screen">
                <div className="shadow-xl shadow-accent">
                    <SignIn
                        forceRedirectUrl={"/dashboard"}
                        signUpUrl="/sign-up"
                    />
                </div>
            </div>
        </Background>
    );
}
