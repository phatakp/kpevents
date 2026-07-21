import type { AnyFieldMeta, FieldApi } from "@tanstack/react-form";
import { Minus, Plus } from "lucide-react";
import type { ZodError } from "zod";
import { Badge } from "@/components/ui/badge";
import { Field, FieldContent } from "@/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group";

import { cn } from "@/lib/utils";

export type Props = {
    field: FieldApi<
        any,
        any,
        number,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any
    >;
    value: number;
    onIncrement: () => void;
    onDecrement: () => void;
    fraction?: number;
    isPlusDisabled?: boolean;
    isMinusDisabled?: boolean;
    className?: string;
};

type FieldErrorsProps = {
    meta: AnyFieldMeta;
};

export function NumberInput({
    field,
    className,
    onIncrement,
    onDecrement,
    fraction = 1,
    value,
    isPlusDisabled = false,
    isMinusDisabled = false,
}: Props) {
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

    const FieldErrors = ({ meta }: FieldErrorsProps) => {
        if (!meta.isTouched) return null;

        return (
            <div className="flex flex-col gap-1">
                {meta.errors.map(({ message }: ZodError, index) => (
                    <Badge
                        key={index}
                        variant={"destructive"}
                        className="w-full"
                    >
                        {message}
                    </Badge>
                ))}
            </div>
        );
    };

    return (
        <Field data-invalid={isInvalid} className={cn(className)}>
            <FieldContent>
                <InputGroup className="w-full border-0 outline-0 shadow-none">
                    <InputGroupAddon align="inline-start">
                        <InputGroupButton
                            variant={"ghost"}
                            size={"icon-xs"}
                            onClick={onDecrement}
                            disabled={isMinusDisabled}
                        >
                            <Minus className="size-3.5" />
                        </InputGroupButton>
                    </InputGroupAddon>
                    <InputGroupInput
                        className="w-full text-center text-xs border-none text-secondary-foreground"
                        value={value.toFixed(fraction)}
                        readOnly
                    />
                    <InputGroupAddon align={"inline-end"}>
                        <InputGroupButton
                            variant={"ghost"}
                            size={"icon-xs"}
                            onClick={onIncrement}
                            disabled={isPlusDisabled}
                        >
                            <Plus className="size-4" />
                        </InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>
                {isInvalid && <FieldErrors meta={field.state.meta} />}
            </FieldContent>
        </Field>
    );
}
