import { Link } from "@tanstack/react-router";
import { buttonVariants } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { Route } from "@/routes/transactions.$committee.$type.$year";
import { BUILDING_OPTIONS } from "@/zod/common.schema";

export function BuildingFilter() {
    const { building = "A" } = Route.useSearch();

    return (
        <InputGroup
            className={cn(
                "border-none h-9 md:w-fit p-0 m-0",
                "has-[[data-slot=input-group-control]:focus-visible]:border-none has-[[data-slot=input-group-control]:focus-visible]:ring-0 has-[[data-slot=input-group-control]:focus-visible]:ring-none",
            )}
        >
            <InputGroupInput
                className={cn(
                    "pe-0 text-xs text-muted-foreground w-fit hidden md:flex",
                )}
                value={`Show for Building`}
                readOnly
            />
            <InputGroupInput
                className={cn(
                    "pe-0 text-xs text-muted-foreground w-fit md:hidden",
                )}
                value={`Building`}
                readOnly
            />
            <InputGroupAddon align={"inline-end"} className="p-0">
                <ButtonGroup>
                    {BUILDING_OPTIONS.map((b) => (
                        <Link
                            key={b}
                            resetScroll={false}
                            to={"."}
                            search={{
                                page: 0,
                                building: b,
                                query: undefined,
                            }}
                            className={cn(
                                "text-sm",
                                buttonVariants({
                                    variant:
                                        b === building ? "default" : "outline",
                                    size: "icon-sm",
                                }),
                            )}
                        >
                            {b}
                        </Link>
                    ))}
                </ButtonGroup>
            </InputGroupAddon>
        </InputGroup>
    );
}
