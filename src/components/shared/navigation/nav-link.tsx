import { Link, useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function NavLink({
    href,
    title,
    icon,
    partial,
}: {
    href: string;
    title: string;
    icon: ReactNode;
    partial?: string;
}) {
    const location = useLocation();

    return (
        <Link to={href} className="flex flex-col items-center gap-1">
            <span className="hidden md:flex title font-semibold text-base font-sans">
                {title}
            </span>
            {icon}
            <span
                className={cn(
                    "bg-foreground h-1 w-12 transition-all duration-1000 ease-in-out",
                    location.pathname === href ||
                        (partial && location.pathname.includes(partial))
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-full",
                )}
            ></span>
        </Link>
    );
}
