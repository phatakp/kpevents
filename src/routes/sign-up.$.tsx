import { SignUp } from "@clerk/clerk-react";
import { createFileRoute } from "@tanstack/react-router";
import { Background } from "@/components/shared/background";

export const Route = createFileRoute("/sign-up/$")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <Background>
            <div className="flex flex-col items-center justify-center gap-6 min-h-screen">
                <div className="shadow-xl shadow-accent">
                    <SignUp
                        forceRedirectUrl={"/dashboard"}
                        signInUrl="/sign-in"
                    />
                </div>
            </div>
        </Background>
    );
}
