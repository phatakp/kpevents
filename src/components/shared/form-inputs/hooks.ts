import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { DateInput } from "./date-select";
import { FlatNumberInput } from "./flat-number-input";
import { FormErrorMap } from "./form-error";
import { NumberInput } from "./number-input";
import { SelectInput } from "./select-input";
import { SubmitButton } from "./submit-button";
import { TextInput } from "./text-input";

const { fieldContext, formContext, useFieldContext, useFormContext } =
    createFormHookContexts();

const { useAppForm, withFieldGroup, withForm, useTypedAppFormContext } =
    createFormHook({
        fieldComponents: {
            TextInput,
            SelectInput,
            FlatNumberInput,
            DateInput,
            NumberInput,
        },
        formComponents: {
            SubmitButton,
            ErrorMap: FormErrorMap,
        },
        fieldContext,
        formContext,
    });

export {
    useAppForm,
    useFieldContext,
    useFormContext,
    useTypedAppFormContext,
    withFieldGroup,
    withForm,
};
