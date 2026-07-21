/** biome-ignore-all lint/correctness/noChildrenProp: <ignore> */ /** biome-ignore-all lint/suspicious/noExplicitAny: <ignore> */

import { Badge } from "@/components/ui/badge";
import { useFormContext } from "./hooks";

export function FormErrorMap() {
    const form = useFormContext();

    return (
        <form.Subscribe
            selector={(state) => [state.errorMap]}
            children={([errorMap]) => {
                if (!errorMap.onSubmit) return;
                return (
                    <div className="flex flex-col gap-2">
                        {Object.entries(errorMap.onSubmit).map(([fld, err]) => (
                            <Badge variant={"destructive"} key={fld}>
                                {fld}
                                {" : "}
                                {(err as any)?.[0].message}
                            </Badge>
                        ))}
                    </div>
                );
            }}
        />
    );
}
