import type { VariantProps } from "class-variance-authority";
import type { PropsWithChildren } from "react";
import { Button, type buttonVariants } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { useFormContext } from "./hooks";

export function SubmitButton({
    label,
    className,
    variant = "default",
}: PropsWithChildren & {
    label: string;
    className?: string;
    isLoading?: boolean;
    variant?: VariantProps<typeof buttonVariants>["variant"];
}) {
    const form = useFormContext();

    return (
        <form.Subscribe
            selector={(state) => ({
                isSubmitting: state.isSubmitting,
                canSubmit: state.canSubmit,
            })}
        >
            {({ isSubmitting, canSubmit }) => (
                <Button
                    type="submit"
                    variant={variant}
                    isLoading={isSubmitting}
                    disabled={!canSubmit || isSubmitting}
                    className={cn(className)}
                >
                    {form.state.isSubmitting ? (
                        <>
                            <Spinner />
                            {" Submitting..."}
                        </>
                    ) : (
                        label
                    )}
                </Button>
            )}
        </form.Subscribe>
    );
}
