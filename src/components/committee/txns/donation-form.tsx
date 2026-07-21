import { Check } from "lucide-react";
import { useTypedAppFormContext } from "@/components/shared/form-inputs/hooks";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { COMMITTEE, DONATION_TYPE } from "@/lib/constants";
import type { Committee, DonationType, Transaction } from "@/types";
import { TXN_MODE_OPTIONS } from "@/zod/common.schema";
import { useTxnFormContext } from "./txn-form";

type Props = {
    committee: Committee;
    donationType: DonationType;
    txn?: Transaction;
    isDelete?: boolean | undefined;
};

export function DonationForm({
    committee,
    donationType,
    txn,
    isDelete = false,
}: Props) {
    const { defaultValues, memberOptions } = useTxnFormContext();
    const form = useTypedAppFormContext({ defaultValues });

    return (
        <div className="flex flex-col gap-6">
            {!txn?.id && (
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <div className="flex gap-4">
                                <Button
                                    type="button"
                                    variant={"outline"}
                                    size={"icon-sm"}
                                    className="size-5"
                                    disabled={isDelete}
                                    onClick={() => {
                                        if (
                                            donationType === DONATION_TYPE.OTHER
                                        )
                                            form.setFieldValue(
                                                "donationType",
                                                committee === COMMITTEE.CULTURAL
                                                    ? DONATION_TYPE.CULTURAL
                                                    : DONATION_TYPE.TEMPLE,
                                            );
                                        else
                                            form.setFieldValue(
                                                "donationType",
                                                DONATION_TYPE.OTHER,
                                            );
                                    }}
                                >
                                    {donationType === DONATION_TYPE.OTHER && (
                                        <Check className="text-success, size-4" />
                                    )}
                                </Button>
                                <span className="capitalize">
                                    Other Donation Type
                                </span>
                            </div>
                        </CardTitle>
                        <CardDescription>
                            {"For external or non resident donations"}
                        </CardDescription>
                    </CardHeader>
                </Card>
            )}

            {donationType === DONATION_TYPE.OTHER && (
                <form.AppField name={"description"}>
                    {(field) => (
                        <field.TextInput
                            label={"Description"}
                            disabled={isDelete}
                        />
                    )}
                </form.AppField>
            )}

            {donationType !== DONATION_TYPE.OTHER && (
                <div className="flex flex-col md:flex-row gap-6">
                    <form.AppField name={"donorName"}>
                        {(field) => (
                            <field.TextInput
                                label={"Donor Name"}
                                disabled={isDelete}
                            />
                        )}
                    </form.AppField>
                    <form.AppField name={"flatNumber"}>
                        {(field) => (
                            <field.FlatNumberInput
                                field={field}
                                className="w-full sm:w-fit"
                                disabled={isDelete}
                            />
                        )}
                    </form.AppField>
                </div>
            )}

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
                        label="Receiver"
                        options={memberOptions}
                        disabled={isDelete}
                    />
                )}
            </form.AppField>

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
                {donationType === DONATION_TYPE.CULTURAL && (
                    <form.AppField name="donorQuantity">
                        {(field) => (
                            <field.TextInput
                                label="Mahaprasad Count"
                                type="number"
                                disabled={isDelete}
                            />
                        )}
                    </form.AppField>
                )}
            </div>
        </div>
    );
}
