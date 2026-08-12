import { Check } from "lucide-react";
import { useAppForm } from "@/components/shared/form-inputs/hooks";
import { Button } from "@/components/ui/button";
import { useUpdateConfig } from "@/hooks/admin.hooks";
import { USER_ROLE } from "@/lib/constants";
import { Route } from "@/routes/__root";
import { ControlRecordSchema } from "@/zod/common.schema";

export function AdminForm() {
    const { auth, config } = Route.useRouteContext();

    const { mutate } = useUpdateConfig();

    const form = useAppForm({
        defaultValues: config,
        validators: {
            onSubmit: ControlRecordSchema,
        },
        onSubmit: async ({ value }) => {
            mutate({ data: value });
        },
    });

    if (auth.role !== USER_ROLE.ADMIN) return;

    return (
        <form
            className="flex flex-col gap-7 max-w-sm mx-auto"
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}
        >
            <form.AppForm>
                <form.ErrorMap />

                <form.AppField name={"activeYear"}>
                    {(field) => <field.TextInput label={"Active Year"} />}
                </form.AppField>

                <form.AppField name={"isAnnadaanActive"}>
                    {(field) => (
                        <div className="flex gap-4">
                            <Button
                                type="button"
                                variant={"outline"}
                                size={"icon-sm"}
                                className="size-5"
                                onClick={() => {
                                    if (field.state.value === true)
                                        field.setValue(false);
                                    else field.setValue(true);
                                }}
                            >
                                {field.state.value && (
                                    <Check className="text-success, size-4" />
                                )}
                            </Button>
                            <span className="capitalize">
                                Activate Annadaan for this year
                            </span>
                        </div>
                    )}
                </form.AppField>

                <form.SubmitButton label="Submit" className="w-full" />
            </form.AppForm>
        </form>
    );
}
