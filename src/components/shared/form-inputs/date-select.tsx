/** biome-ignore-all lint/a11y/useSemanticElements: <ignore> */

import { format, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn, isValidDate } from "@/lib/utils";
import { type FormBaseProps, FormInputBase } from "./base";
import { useFieldContext } from "./hooks";

type Props = FormBaseProps & {};

export const DateInput = (props: Props) => {
    const field = useFieldContext<string>();
    const [open, setOpen] = useState(false);

    const [date, setDate] = useState<Date | undefined>(
        parse(field.state.value, "yyyy-MM-dd", new Date()),
    );
    const [month, setMonth] = useState<Date | undefined>(date);

    return (
        <FormInputBase {...props}>
            <Popover onOpenChange={setOpen} open={open}>
                <PopoverTrigger asChild>
                    <Button
                        aria-expanded={open}
                        className={cn(
                            "w-full justify-between sm:min-w-75 capitalize",
                        )}
                        variant="outline"
                        disabled={props.disabled}
                    >
                        {format(new Date(field.state.value), "PP")}

                        <CalendarIcon className="ml-2 size-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-auto overflow-hidden p-0 z-999"
                    align="end"
                    alignOffset={-8}
                    sideOffset={10}
                >
                    <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        month={month}
                        onMonthChange={setMonth}
                        onSelect={(date) => {
                            if (isValidDate(date)) {
                                setDate(date);
                                setMonth(date);
                                field.handleChange(
                                    format(date as Date, "yyyy-MM-dd"),
                                );
                            }

                            setOpen(false);
                        }}
                    />
                </PopoverContent>
            </Popover>
        </FormInputBase>
    );
};
