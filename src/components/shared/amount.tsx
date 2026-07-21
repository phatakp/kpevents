import { IndianRupee } from "lucide-react";
import { amountFormatter, cn } from "@/lib/utils";

type Props = {
    amount: number;
    className?: string;
    containerClass?: string;
    iconClass?: string;
    decimalClass?: string;
    decimals?: number;
};

export function Amount({
    amount,
    className,
    containerClass,
    iconClass,
    decimalClass,
    decimals = 0,
}: Props) {
    const formattedAmount = amountFormatter(amount, decimals).toString();
    let integerPart: string | undefined;
    let decimalPart: string | undefined;
    if (formattedAmount.includes(".")) {
        const [i, d] = formattedAmount.split(".");
        integerPart = i;
        decimalPart = d;
    }
    return (
        <div className={cn("flex items-center justify-end", containerClass)}>
            <IndianRupee
                className={cn("size-3.5 text-muted-foreground", iconClass)}
            />
            {integerPart && decimalPart ? (
                <div className="flex items-end">
                    <span
                        className={cn(
                            "font-semibold text-2xl tabular-nums font-number",
                            className,
                        )}
                    >
                        {integerPart}
                    </span>
                    <span
                        className={cn(
                            "font-semibold text-lg tabular-nums text-muted-foreground font-number",
                            decimalClass,
                        )}
                    >
                        .{decimalPart}
                    </span>
                </div>
            ) : (
                <span
                    className={cn(
                        "font-semibold font-number text-2xl tabular-nums",
                        className,
                    )}
                >
                    {amountFormatter(amount, decimals)}
                </span>
            )}
        </div>
    );
}
