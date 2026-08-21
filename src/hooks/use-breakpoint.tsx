/** biome-ignore-all lint/suspicious/useIterableCallbackReturn: <ignore> */
import { useEffect, useState } from "react";

// Tailwind standard min-widths (xs is everything below sm)
const breakpoints = {
    sm: "(min-width: 640px)",
    md: "(min-width: 768px)",
    lg: "(min-width: 1024px)",
    xl: "(min-width: 1280px)",
};

export function useBreakpoint() {
    const [breakpoint, setBreakpoint] = useState("xs");

    useEffect(() => {
        // Media query lists ordered from largest to smallest
        const queries = [
            { name: "xl", mql: window.matchMedia(breakpoints.xl) },
            { name: "lg", mql: window.matchMedia(breakpoints.lg) },
            { name: "md", mql: window.matchMedia(breakpoints.md) },
            { name: "sm", mql: window.matchMedia(breakpoints.sm) },
        ];

        // Function to calculate current active breakpoint
        const updateBreakpoint = () => {
            const active = queries.find((q) => q.mql.matches);
            setBreakpoint(active ? active.name : "xs");
        };

        // Initial check on mount
        updateBreakpoint();

        // Listen for changes across all queries
        queries.forEach((q) =>
            q.mql.addEventListener("change", updateBreakpoint),
        );

        // Clean up listeners on unmount
        return () => {
            queries.forEach((q) =>
                q.mql.removeEventListener("change", updateBreakpoint),
            );
        };
    }, []);

    return breakpoint;
}
