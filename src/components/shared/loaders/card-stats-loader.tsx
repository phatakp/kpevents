import { Image } from "@unpic/react";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function CardStatsLoader({ className }: { className?: string }) {
    return (
        <div className={cn("py-10 w-full md:max-w-3xl mx-auto", className)}>
            <Card className="ring-0 border rounded-2xl relative h-full w-full">
                <CardHeader>
                    <CardTitle>
                        <Skeleton className="h-10 w-30" />
                    </CardTitle>
                    <CardDescription>
                        <Skeleton className="h-12 w-60" />
                    </CardDescription>
                    <CardAction>
                        <Skeleton className="h-9 w-20" />
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <div className="py-4 flex flex-col gap-9 justify-between md:max-w-3/4">
                        <div className="grid gap-2 text-sm">
                            <Skeleton className="h-9 w-40" />
                            {Array.from([1, 2, 3])?.map((i) => (
                                <div
                                    key={i}
                                    className="flex items-center w-full justify-between text-muted-foreground gap-6"
                                >
                                    <Skeleton className="h-9 w-full" />
                                    <Skeleton className="h-10 w-30" />
                                </div>
                            ))}

                            <Separator />
                            <div className="flex items-center w-full justify-between text-muted-foreground gap-6">
                                <Skeleton className="h-9 w-full" />
                                <Skeleton className="h-10 w-30" />
                            </div>
                        </div>
                    </div>
                    {/* image */}
                    <Image
                        src="https://images.shadcnspace.com/assets/backgrounds/stats-01.webp"
                        alt="user-img"
                        width={211}
                        height={168}
                        className="absolute bottom-0 right-0 hidden sm:block"
                    />
                </CardContent>

                <CardFooter>
                    <Skeleton className="h-9 w-20" />
                </CardFooter>
            </Card>
        </div>
    );
}
