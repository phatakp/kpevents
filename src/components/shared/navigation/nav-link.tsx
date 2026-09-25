import { Link, useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useCart } from "@/stores/cart.store";

export function NavLink({
    href,
    title,
    icon,
    partial,
    isDropdown,
    dropdownLinks,
}: {
    href: string;
    title: string;
    icon: ReactNode;
    partial?: string;
    isDropdown?: boolean;
    dropdownLinks?: {
        title: string;
        href: string;
    }[];
}) {
    const location = useLocation();
    const clearCart = useCart((state) => state.clearCart);
    const btn = (
        <>
            <span className="hidden md:flex title font-semibold text-base font-sans">
                {title}
            </span>
            {icon}
            <span
                className={cn(
                    "bg-foreground h-1 w-full transition-all duration-1000 ease-in-out absolute -bottom-1",
                    location.pathname === href ||
                        (partial && location.pathname.includes(partial))
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-full",
                )}
            />
        </>
    );

    if (isDropdown)
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size={"sm"} className="relative">
                        {btn}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuGroup className="pt-4">
                        {dropdownLinks?.map((d) => {
                            return (
                                <DropdownMenuItem key={d.title} asChild>
                                    <Link to={d.href} onClick={clearCart}>
                                        {d.title}
                                    </Link>
                                </DropdownMenuItem>
                            );
                        })}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        );

    return (
        <Link
            to={href}
            className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "relative",
            )}
            onClick={clearCart}
        >
            {btn}
        </Link>
    );
}
