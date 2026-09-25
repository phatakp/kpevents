import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Props = {
    className?: string;
};
export function ListLoader({ className }: Props) {
    return (
        <div className="flex flex-col gap-6 w-full">
            {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton
                    key={i}
                    className={cn("w-full h-12 mx-auto rounded-md", className)}
                />
            ))}
        </div>
    );
}
