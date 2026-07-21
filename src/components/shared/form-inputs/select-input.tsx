/** biome-ignore-all lint/a11y/useSemanticElements: <ignore> */
import { Check, ChevronsUpDown, Plus, XIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { type FormBaseProps, FormInputBase } from "./base";
import { useFieldContext } from "./hooks";

type Option = {
    value: string;
    label: string;
};

type Props = FormBaseProps & {
    options: Option[];
    isCreatable?: boolean;
    onCreate?: (val: string) => void;
};

export const SelectInput = ({
    options,
    isCreatable = false,
    onCreate,
    ...props
}: Props) => {
    const field = useFieldContext<string | undefined>();
    const currValue = options.find((o) => o.value === field.state.value);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<Option>(
        currValue ?? { label: "", value: "" },
    );
    const [search, setSearch] = useState("");

    const handleCreate = () => {
        if (search && !options.find((i) => i.value === search)) {
            setSelected({ value: search.toLowerCase(), label: search });
            setOpen(false);
            setSearch("");
            onCreate?.(search);
        }
    };

    return (
        <FormInputBase {...props}>
            <Popover onOpenChange={setOpen} open={open}>
                <PopoverTrigger asChild>
                    <Button
                        aria-expanded={open}
                        className={cn(
                            "w-full justify-between sm:min-w-75 capitalize",
                            !selected?.value
                                ? "text-muted-foreground"
                                : "text-foreground",
                        )}
                        variant="outline"
                        disabled={props.disabled}
                    >
                        {selected?.value ? selected.label : `Select value...`}

                        <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 sm:min-w-75">
                    <Command>
                        <CommandInput
                            onValueChange={setSearch}
                            placeholder={`Search ${isCreatable ? "or create" : ""}...`}
                            value={search}
                        />
                        <CommandList>
                            <CommandEmpty>
                                {isCreatable ? (
                                    <Button
                                        className="w-full justify-start"
                                        onClick={handleCreate}
                                        variant="ghost"
                                    >
                                        <Plus className="mr-2 size-4" />
                                        Create "{search}"
                                    </Button>
                                ) : (
                                    "No results found."
                                )}
                            </CommandEmpty>
                            <CommandGroup>
                                {currValue && (
                                    <CommandItem
                                        className="text-destructive hover:text-destructive/80"
                                        onSelect={() => {
                                            setSelected({
                                                label: "",
                                                value: "",
                                            });
                                            field.setValue(undefined);
                                            setOpen(false);
                                        }}
                                        value={undefined}
                                    >
                                        <XIcon
                                            className={cn(
                                                "mr-2 size-4 text-destructive hover:text-destructive/80",
                                            )}
                                        />
                                        Clear selection
                                    </CommandItem>
                                )}
                                {options.map((item) => (
                                    <CommandItem
                                        key={item.value}
                                        className="capitalize"
                                        onSelect={(currentValue) => {
                                            const opt = options.find(
                                                (i) => i.value === currentValue,
                                            );
                                            if (opt) setSelected(opt);
                                            field.setValue(currentValue);
                                            setOpen(false);
                                        }}
                                        value={item.value}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 size-4",
                                                selected?.value === item.value
                                                    ? "opacity-100"
                                                    : "opacity-0",
                                            )}
                                        />
                                        {item.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                            {search &&
                                !options.find((i) => i.value === search) &&
                                options.length > 0 &&
                                isCreatable && (
                                    <>
                                        <CommandSeparator />
                                        <CommandGroup>
                                            <CommandItem
                                                onSelect={handleCreate}
                                            >
                                                <Plus className="mr-2 size-4" />
                                                Create "{search}"
                                            </CommandItem>
                                        </CommandGroup>
                                    </>
                                )}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </FormInputBase>
    );
};
