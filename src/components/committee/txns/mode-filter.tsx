import { useNavigate } from "@tanstack/react-router";
import { Check, DotIcon, FilterIcon, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Route } from "@/routes/transactions.$committee.$type.$year";
import type { TxnMode } from "@/types";
import { TXN_MODE_OPTIONS } from "@/zod/common.schema";

type Props = {
    className?: string;
};
export function ModeFilterColumn({ className }: Props) {
    const { mode } = Route.useSearch();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleChange = (mode: TxnMode | undefined) => {
        navigate({
            to: ".",
            search: (old) => ({ ...old, mode }),
        });
    };

    return (
        <div className={cn(className)}>
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="justify-start px-0 has-[>svg]:px-0"
                    >
                        Mode{" "}
                        <FilterIcon
                            className={cn("size-3.5", mode && "text-success")}
                        />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        <DropdownMenuLabel className="text-muted-foreground text-sm">
                            Filter by Txn Mode
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {TXN_MODE_OPTIONS.map((o) => (
                            <DropdownMenuItem
                                key={o}
                                className={cn(
                                    "justify-start capitalize text-sm",
                                    mode &&
                                        mode !== o &&
                                        "text-muted-foreground",
                                )}
                                onClick={() => {
                                    handleChange(o);
                                    setOpen(false);
                                }}
                            >
                                {mode === o ? (
                                    <Check className="size-3.5" />
                                ) : (
                                    <DotIcon />
                                )}
                                {o.toLowerCase()}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    {mode && (
                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                className=""
                                variant="destructive"
                                onClick={() => {
                                    handleChange(undefined);
                                    setOpen(false);
                                }}
                            >
                                <X className="size-3.5" />
                                Clear Selection
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
