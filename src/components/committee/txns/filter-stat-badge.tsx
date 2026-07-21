import { Amount } from "@/components/shared/amount";
import { Badge } from "@/components/ui/badge";
import type { Transaction } from "@/types";

type Props = {
    filtered: Transaction[];
};

export function FilterStatBadge({ filtered }: Props) {
    return (
        <Badge className="w-full text-base justify-start">
            Total for filtered:{" "}
            <Amount
                className="text-xl"
                amount={filtered.reduce((sum, txn) => sum + txn.amount, 0) ?? 0}
            />
        </Badge>
    );
}
