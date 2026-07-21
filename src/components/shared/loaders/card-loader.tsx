import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Props = {
    className?: string;
};
export function CardLoader({ className }: Props) {
    return (
        <Skeleton
            className={cn(
                "w-full md:max-w-3xl h-[30vh] mx-auto rounded-md",
                className,
            )}
        />
    );
}
