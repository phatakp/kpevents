/** biome-ignore-all lint/a11y/useSemanticElements: <ignore> */
import type { ComponentPropsWithoutRef } from "react";

import {
    Field,
    FieldContent,
    FieldError,
    FieldLabel,
} from "@/components/ui/field";

import { cn } from "@/lib/utils";
import { useFieldContext } from "./hooks";

export type FormBaseProps = ComponentPropsWithoutRef<"input"> & {
    label: string;
    labelClass?: string;
};

export const FormInputBase = ({
    children,
    label,
    labelClass,
    required = true,
    ...props
}: FormBaseProps) => {
    const field = useFieldContext<string | undefined>();
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

    return (
        <Field
            data-invalid={isInvalid}
            className="transition-all duration-500 ease-in-out"
        >
            <FieldContent>
                <FieldLabel
                    htmlFor={field.name}
                    className={cn(
                        "text-sm transition-all duration-500 ease-in-out",
                        props.disabled
                            ? "text-muted-foreground"
                            : "text-foreground",
                        labelClass,
                    )}
                >
                    {label} {!required && "(Optional)"}
                </FieldLabel>

                {children}
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </FieldContent>
        </Field>
    );
};
