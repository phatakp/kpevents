import { Link } from "@tanstack/react-router";
import {
    Tabs,
    TabsContent,
    TabsContents,
    TabsList,
    TabsTrigger,
} from "@/components/animate-ui/components/radix/tabs";
import { CardLoader } from "@/components/shared/loaders/card-loader";
import { SuspenseErrorBoundary } from "@/components/shared/suspense-error-boundary";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ROUTE_TXN_TYPE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Route } from "@/routes/transactions.$committee.$type.$year";
import type { Committee } from "@/types";
import { ROUTE_TYPE_OPTIONS } from "@/zod/common.schema";
import { SelectYear } from "../select-year";
import { TxnButton } from "./txn-button";
import { TransactionList } from "./txn-list";

type Props = {
    className?: string;
};

export function TxnTypeTabs({ className }: Props) {
    const { committee, type, year } = Route.useParams();
    const { donationType } = Route.useSearch();

    return (
        <div
            className={cn(
                "flex flex-col gap-6 w-full max-w-[calc(100vw-1rem)] md:max-w-full",
                className,
            )}
        >
            <Tabs value={type}>
                <TabsList>
                    {ROUTE_TYPE_OPTIONS.map((typ) => (
                        <TabsTrigger
                            key={typ}
                            value={typ}
                            asChild
                            disabled={type === typ}
                        >
                            <Link
                                className="capitalize"
                                to="."
                                params={(old) => ({ ...old, type: typ })}
                                search={
                                    typ === ROUTE_TXN_TYPE.DONATION
                                        ? { building: "A" }
                                        : {}
                                }
                            >
                                {typ}s
                            </Link>
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContents className="py-6">
                    {ROUTE_TYPE_OPTIONS.map((typ) => (
                        <TabsContent key={typ} value={typ}>
                            <Card className="w-full max-w-[calc(100vw-2rem)] md:max-w-full p-0 bg-background border-0 pr-4">
                                <CardHeader className="py-4 px-0">
                                    <CardTitle className="title capitalize text-xl">
                                        {committee} {type}s
                                    </CardTitle>
                                    <CardDescription>
                                        <SelectYear year={year} />
                                    </CardDescription>
                                    <CardAction>
                                        <TxnButton
                                            committee={
                                                committee.toUpperCase() as Committee
                                            }
                                            year={year}
                                            donationType={donationType}
                                        />
                                    </CardAction>
                                </CardHeader>
                                <CardContent className="px-0">
                                    <SuspenseErrorBoundary
                                        id={`${typ}-list`}
                                        fallback={
                                            <CardLoader className="h-[50vh]" />
                                        }
                                    >
                                        <TransactionList />
                                    </SuspenseErrorBoundary>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    ))}
                </TabsContents>
            </Tabs>
        </div>
    );
}
