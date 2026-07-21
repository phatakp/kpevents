import type { AnyFieldMeta, FieldApi } from "@tanstack/react-form";
import type { ZodError } from "zod";
import { Badge } from "@/components/ui/badge";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { cn, getFlatsForBuilding } from "@/lib/utils";
import type { Building } from "@/types";
import { BUILDING_OPTIONS } from "@/zod/common.schema";

export interface FlatNumberValue {
    building: Building | undefined;
    flat: number | undefined;
}

export type Props = {
    field: FieldApi<
        any,
        any,
        FlatNumberValue,
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
    isLoading?: boolean;
    showClearButton?: boolean;
    required?: boolean;
    disabled?: boolean;
    className?: string;
};

type FieldErrorsProps = {
    meta: AnyFieldMeta;
};

export function FlatNumberInput({
    field,
    className,
    isLoading = false,
    required = true,
    disabled = false,
}: Props) {
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

    const handleChange = (
        val: Building | number,
        name: keyof FlatNumberValue,
    ) => {
        const newValue = {
            ...field.state.value,
            [name]: val,
        } as FlatNumberValue;
        if (newValue) field.handleChange(newValue);
    };

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

    const fieldLabel = (
        <FieldLabel
            htmlFor={"building"}
            className={cn(
                "text-sm",
                disabled ? "text-muted-foreground" : "text-foreground",
            )}
        >
            Flat Number
        </FieldLabel>
    );

    if (isLoading) return <Skeleton className="w-full h-10" />;

    return (
        <Field data-invalid={isInvalid} className={cn(className)}>
            <FieldContent>
                {fieldLabel}
                <InputGroup className="w-full">
                    <InputGroupAddon align={"inline-start"}>
                        <Select
                            onValueChange={(e) =>
                                handleChange(e as Building, "building")
                            }
                            value={field.state.value?.building ?? undefined}
                        >
                            <SelectTrigger
                                aria-invalid={isInvalid}
                                id={`building`}
                                name={`building`}
                                onBlur={field.handleBlur}
                                className="w-full text-sm border-0 border-r rounded-none bg-transparent dark:bg-transparent"
                                disabled={disabled}
                                aria-required={required}
                            >
                                <SelectValue placeholder={"Building"} />
                            </SelectTrigger>
                            <SelectContent>
                                {BUILDING_OPTIONS.map((b) => (
                                    <SelectItem key={b} value={b as string}>
                                        {b}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </InputGroupAddon>
                    {isLoading ? (
                        <InputGroupAddon align="inline-end">
                            <Spinner />
                        </InputGroupAddon>
                    ) : (
                        <Select
                            onValueChange={(e) => handleChange(+e, "flat")}
                            value={
                                field.state.value?.flat?.toString() ?? undefined
                            }
                        >
                            <SelectTrigger
                                aria-invalid={isInvalid}
                                id={`flat`}
                                name={`flat`}
                                onBlur={field.handleBlur}
                                className="w-full text-sm border-0 border-r rounded-none bg-transparent dark:bg-transparent"
                                disabled={disabled}
                                aria-required={required}
                            >
                                <SelectValue placeholder={"Flat"} />
                            </SelectTrigger>
                            <SelectContent>
                                {getFlatsForBuilding(
                                    field.state.value.building ?? "A",
                                )?.map((b) => (
                                    <SelectItem key={b} value={b.toString()}>
                                        {b}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                </InputGroup>
                {isInvalid && <FieldErrors meta={field.state.meta} />}
            </FieldContent>
        </Field>
    );
}
