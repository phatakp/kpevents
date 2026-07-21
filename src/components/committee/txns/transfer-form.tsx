import { useTypedAppFormContext } from "@/components/shared/form-inputs/hooks";
import { TXN_MODE_OPTIONS } from "@/zod/common.schema";
import { useTxnFormContext } from "./txn-form";

type Props = {
    isDelete?: boolean | undefined;
};

export function TransferForm({ isDelete }: Props) {
    const { defaultValues, memberOptions } = useTxnFormContext();
    const form = useTypedAppFormContext({ defaultValues });

    return (
        <div className="flex flex-col gap-6">
            <div className="flex gap-6">
                <form.AppField name="date">
                    {(field) => (
                        <field.DateInput label="Date" disabled={isDelete} />
                    )}
                </form.AppField>

                <form.AppField name="amount">
                    {(field) => (
                        <field.TextInput
                            label="Amount"
                            type="number"
                            disabled={isDelete}
                        />
                    )}
                </form.AppField>
            </div>

            <form.AppField name="txnUserId">
                {(field) => (
                    <field.SelectInput
                        label="Paid By"
                        options={memberOptions}
                        disabled={isDelete}
                    />
                )}
            </form.AppField>

            <form.Subscribe
                selector={(state) => ({
                    txnUserId: state.values.txnUserId,
                })}
            >
                {({ txnUserId }) => (
                    <form.AppField name="toUserId">
                        {(field) => (
                            <field.SelectInput
                                label="Receiver"
                                options={memberOptions.filter(
                                    (m) => m.value !== txnUserId,
                                )}
                                disabled={isDelete}
                            />
                        )}
                    </form.AppField>
                )}
            </form.Subscribe>

            <div className="flex gap-6">
                <form.AppField name="txnMode">
                    {(field) => (
                        <field.SelectInput
                            label="Txn Mode"
                            options={TXN_MODE_OPTIONS.map((m) => ({
                                label: m.toLowerCase(),
                                value: m,
                            }))}
                            disabled={isDelete}
                        />
                    )}
                </form.AppField>
            </div>
        </div>
    );
}
