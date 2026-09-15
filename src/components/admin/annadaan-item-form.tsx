import { useAppForm } from "@/components/shared/form-inputs/hooks";
import {
    useCreateAnnadaanItem,
    useDeleteAnnadaanItem,
    useUpdateAnnadaanItem,
} from "@/hooks/admin.hooks";
import { ITEM_TYPE, USER_ROLE } from "@/lib/constants";
import { Route } from "@/routes/__root";
import type { ItemResponse } from "@/types";
import { ItemRequestSchema } from "@/zod/txn.schema";
import { Amount } from "../shared/amount";

type Props = {
    item?: ItemResponse;
    isDelete?: boolean;
};

export function AnnadaanItemForm({ item, isDelete }: Props) {
    const { auth } = Route.useRouteContext();

    const { mutate: createItem } = useCreateAnnadaanItem();
    const { mutate: updateItem } = useUpdateAnnadaanItem();
    const { mutate: deleteItem } = useDeleteAnnadaanItem();

    const form = useAppForm({
        defaultValues: {
            id: item?.id,
            itemName: item?.itemName ?? "",
            quantity: item?.quantity ?? 0,
            price: item?.price ?? 0,
            amount: item?.price ?? 0,
            type: item?.type ?? ITEM_TYPE.ANNADAAN,
        },
        validators: {
            onSubmit: ItemRequestSchema,
        },
        onSubmit: async ({ value }) => {
            if (value.id && isDelete) deleteItem({ data: { id: value.id } });
            else if (value.id)
                updateItem({ data: { ...value, itemId: value.id } });
            else createItem({ data: value });
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

                <form.AppField name={"itemName"}>
                    {(field) => (
                        <field.TextInput
                            label={"Item Name"}
                            disabled={isDelete}
                        />
                    )}
                </form.AppField>

                <form.AppField name={"quantity"}>
                    {(field) => (
                        <field.TextInput
                            label={"Quantity"}
                            type="number"
                            disabled={isDelete}
                        />
                    )}
                </form.AppField>

                <form.AppField name={"price"}>
                    {(field) => (
                        <field.TextInput
                            label={"Price"}
                            type="number"
                            disabled={isDelete}
                        />
                    )}
                </form.AppField>

                <form.Subscribe
                    selector={(state) => ({
                        quantity: state.values.quantity,
                        price: state.values.price,
                    })}
                >
                    {({ quantity, price }) => {
                        return (
                            <div className="flex flex-col">
                                <span className="text-sm text-muted-foreground">
                                    Amount
                                </span>
                                <Amount
                                    amount={quantity * price}
                                    className="text-lg"
                                    containerClass="justify-start"
                                />
                            </div>
                        );
                    }}
                </form.Subscribe>

                <form.SubmitButton
                    label={isDelete ? "Confirm Delete" : "Submit"}
                    className="w-full"
                />
            </form.AppForm>
        </form>
    );
}
