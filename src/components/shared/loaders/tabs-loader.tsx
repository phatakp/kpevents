import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function TabsLoader({
    className,
    cnt = 2,
}: {
    className?: string;
    cnt?: number;
}) {
    return (
        <div
            className={cn(
                "flex flex-col gap-6 mx-auto min-w-screen",
                className,
            )}
        >
            <div className="flex items-center gap-4">
                {Array.from({ length: cnt }).map((_, i) => (
                    <Skeleton key={i} className="h-9 w-25" />
                ))}
            </div>

            <Card className="w-full h-[30vh] md:max-w-3xl">
                <Skeleton className="w-[calc(100vw-2rem)] md:w-full h-full" />
            </Card>
        </div>
    );
}
