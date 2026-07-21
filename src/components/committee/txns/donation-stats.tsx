import {
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    Rectangle,
    XAxis,
} from "recharts";
import type { BarShapeProps } from "recharts/types/cartesian/Bar";

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";
import type { DonationStat } from "@/types";
import { Amount } from "@/components/shared/amount";
import { amountShortener, cn } from "@/lib/utils";
import { Route } from "@/routes/$committee.$year";

const chartConfig = {
    collection: {
        label: "collection",
    },
    A: {
        label: "A",
        color: "var(--chart-1)",
    },
    B: {
        label: "B",
        color: "var(--chart-2)",
    },
    C: {
        label: "C",
        color: "var(--chart-3)",
    },
    D: {
        label: "D",
        color: "var(--chart-4)",
    },
    E: {
        label: "E",
        color: "var(--chart-5)",
    },
    F: {
        label: "F",
        color: "var(--chart-2)",
    },
    G: {
        label: "G",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig;

const ACTIVE_INDEX = 2;

type Props = {
    data: DonationStat[];
    className?: string;
};

export function DonationStatsByBuilding({ data, className }: Props) {
    const { year } = Route.useParams();

    const { config } = Route.useRouteContext();
    const applicableYear = year ?? config.activeYear;

    if (data.length === 0) return;
    const total = data.reduce((acc, b) => acc + b.amount, 0);

    const chartData = data.map((d) => ({
        building: d.building,
        collection: d.amount,
        fill: `var(--color-${d.building})`,
    }));

    return (
        <Card className={cn("w-full", className)}>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div className="grid gap-1">
                        <CardTitle>Building wise</CardTitle>
                        <CardDescription className="text-xs">
                            Donations for {applicableYear}
                        </CardDescription>
                    </div>
                    <CardAction>
                        <div className="flex flex-col items-center">
                            <span className="text-sm text-muted-foreground">
                                Total Collection
                            </span>
                            <Amount amount={total} />
                        </div>
                    </CardAction>
                </div>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{ top: 20, right: 0, left: 0, bottom: 5 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="building"
                            tickLine={false}
                            tickMargin={0}
                            axisLine={false}
                            tickFormatter={(value) =>
                                chartConfig[value as keyof typeof chartConfig]
                                    ?.label
                            }
                        />
                        <ChartTooltip
                            cursor={true}
                            content={<ChartTooltipContent />}
                        />
                        <Bar
                            dataKey="collection"
                            strokeWidth={2}
                            radius={5}
                            shape={({ index, ...props }: BarShapeProps) =>
                                index === ACTIVE_INDEX ? (
                                    <Rectangle
                                        {...props}
                                        fillOpacity={0.8}
                                        stroke={props.payload.fill}
                                        strokeDasharray={4}
                                        strokeDashoffset={4}
                                    />
                                ) : (
                                    <Rectangle {...props} />
                                )
                            }
                        >
                            <LabelList
                                dataKey="collection"
                                position="top"
                                formatter={(val) =>
                                    amountShortener(val as number)
                                }
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
