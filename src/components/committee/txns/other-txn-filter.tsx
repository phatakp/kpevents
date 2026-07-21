import { useNavigate } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

import { DONATION_TYPE } from "@/lib/constants";
import { Route } from "@/routes/transactions.$committee.$type.$year";

export function OtherTxnFilter() {
    const { donationType } = Route.useSearch();
    const navigate = useNavigate();

    function handleChange() {
        if (donationType !== DONATION_TYPE.OTHER)
            navigate({
                to: ".",
                search: (old) => ({
                    ...old,
                    donationType: DONATION_TYPE.OTHER,
                }),
            });
        else
            navigate({
                to: ".",
                search: (old) => ({ ...old, donationType: undefined }),
            });
    }

    return (
        <div className="flex gap-4">
            <Button
                type="button"
                variant={"outline"}
                size={"icon-sm"}
                className="size-5"
                onClick={handleChange}
            >
                {donationType === DONATION_TYPE.OTHER && (
                    <Check className="text-success, size-4" />
                )}
            </Button>
            <span className="capitalize text-sm text-muted-foreground">
                Show only non resident donations
            </span>
        </div>
    );
}
