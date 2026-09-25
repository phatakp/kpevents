import { useNavigate } from "@tanstack/react-router";
import { Check, DotIcon, FilterIcon, X } from "lucide-react";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROUTE_TXN_TYPE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Route } from "@/routes/transactions.$committee.$type.$year";

type Props = {
    title: string;
    options: { label: string; value: string }[];
    className?: string;
    isTransfer?: boolean;
};
export function UserFilterColumn({
    title,
    className,
    options,
    isTransfer,
}: Props) {
    const navigate = useNavigate();
    const { txnUserId, userName } = Route.useSearch();
    const { type } = Route.useParams();
    const [open, setOpen] = useState(false);

    const handleChange = (userId: string | undefined) => {
        navigate({
            to: ".",
            search: (old) => ({
                ...old,
                txnUserId: isTransfer ? old.txnUserId : userId,
                userName: isTransfer ? userId : old.userName,
            }),
        });
    };

    return (
        <div className={cn(className)}>
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger className="justify-start px-0 has-[>svg]:px-0">
                    <span className="md:hidden">{`${type === ROUTE_TXN_TYPE.EXPENSE ? "Desc /" : type === ROUTE_TXN_TYPE.TRANSFER ? "" : "Name or Desc /"}`}</span>
                    <div className="flex items-center gap-1">
                        <span>{title}</span>
                        <FilterIcon
                            className={cn(
                                "size-3.5",
                                !isTransfer && txnUserId && "text-success",
                                isTransfer && userName && "text-success",
                            )}
                        />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        <DropdownMenuLabel className="text-muted-foreground text-sm flex items-center justify-between w-full">
                            Filter by{" "}
                            {type === ROUTE_TXN_TYPE.EXPENSE || isTransfer
                                ? "Paid By"
                                : "Receiver"}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {options.map((o) => (
                            <DropdownMenuItem
                                key={o.value}
                                className={cn(
                                    "justify-start capitalize text-sm",
                                    txnUserId &&
                                        txnUserId !== o.value &&
                                        "text-muted-foreground",
                                    userName &&
                                        userName !== o.value &&
                                        "text-muted-foreground",
                                )}
                                onClick={() => {
                                    handleChange(o.value);
                                    setOpen(false);
                                }}
                            >
                                {txnUserId === o.value ? (
                                    <Check className="size-3.5" />
                                ) : (
                                    <DotIcon />
                                )}
                                {o.label}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    {((!isTransfer && txnUserId) ||
                        (isTransfer && userName)) && (
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
