/** biome-ignore-all lint/a11y/useSemanticElements: <ignore> */

import { XIcon } from "lucide-react";

import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group";
import { type FormBaseProps, FormInputBase } from "./base";
import { useFieldContext } from "./hooks";

type Props = FormBaseProps & {
    showClearButton?: boolean;
};

export const TextInput = ({ showClearButton = false, ...props }: Props) => {
    const field = useFieldContext<string | undefined>();
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
    const {
        value: _ignoredValue,
        onChange: _ignoredOnChange,
        ...cleanProps
    } = props;

    return (
        <FormInputBase {...props}>
            <InputGroup>
                <InputGroupInput
                    {...cleanProps}
                    placeholder={
                        props.placeholder ||
                        `Enter ${props.label.toLowerCase()}`
                    }
                    name={field.name}
                    value={field.state.value ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                        field.handleChange(
                            e.target.value === "" ? undefined : e.target.value,
                        )
                    }
                    onFocus={(e) => e.target.select()}
                    aria-invalid={isInvalid}
                    className="w-full"
                />
                {showClearButton && field.state.value && (
                    <InputGroupAddon align="inline-end">
                        <InputGroupButton
                            aria-label="Clear"
                            title="Clear"
                            size="icon-xs"
                            onClick={() => {
                                field.setValue("");
                            }}
                        >
                            <XIcon />
                        </InputGroupButton>
                    </InputGroupAddon>
                )}
            </InputGroup>
        </FormInputBase>
    );
};
