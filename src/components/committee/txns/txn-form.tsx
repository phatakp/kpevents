import { useSuspenseQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { linkedTransferOptions } from "@/backend/queries/txn.queries";
import { membersByCommitteeOptions } from "@/backend/queries/user.queries";
import {
    Tabs,
    TabsContent,
    TabsContents,
    TabsList,
    TabsTrigger,
} from "@/components/animate-ui/components/radix/tabs";
import { useAppForm } from "@/components/shared/form-inputs/hooks";
import { Button } from "@/components/ui/button";
import {
    useCreateTransaction,
    useDeleteTransaction,
    useUpdateTransaction,
} from "@/hooks/txn.hooks";
import { COMMITTEE, DONATION_TYPE, TXN_TYPE } from "@/lib/constants";
import { getDefaultFormOptions, getUserInfo } from "@/lib/utils";
import { Route } from "@/routes/__root";
import { useCart } from "@/stores/cart.store";
import type {
    Committee,
    DonationType,
    Transaction,
    TxnFormValues,
    TxnType,
} from "@/types";
import { TXN_TYPE_OPTIONS } from "@/zod/common.schema";
import { TransactionSchemaWithValidation } from "@/zod/txn.schema";
import { AnnadaanForm } from "./annadaan-form";
import { DonationForm } from "./donation-form";
import { ExpenseForm } from "./expense-form";
import { TempleItemForm } from "./temple-item-form";
import { TransferForm } from "./transfer-form";

type Props = {
    committee: Committee;
    year: number;
    donationType?: DonationType;
    txn?: Transaction;
    isDelete?: boolean;
};

const TxnFormContext = createContext(
    {} as {
        defaultValues: TxnFormValues;
        memberOptions: {
            label: string;
            value: string;
        }[];
    },
);
export const useTxnFormContext = () => useContext(TxnFormContext);

export function TransactionForm({
    committee,
    donationType,
    txn,
    isDelete,
}: Props) {
    const { config, auth } = Route.useRouteContext();
    const { data: linked } = useSuspenseQuery({
        ...linkedTransferOptions(txn),
    });
    const { data: users } = useSuspenseQuery({
        ...membersByCommitteeOptions({ committee }),
    });

    const memberOptions =
        users?.map((u) => ({
            label: getUserInfo(u),
            value: u.clerkId,
        })) ?? [];

    const items = useCart((state) => state.items);
    const defaultFormOptions = getDefaultFormOptions({
        committee,
        year: txn?.year ?? config.activeYear,
        donationType,
        txn,
        fromUserId: linked?.fromUserId,
        loggedInUserId: auth.userId as string,
        items,
    });

    const { mutate: createTransaction } = useCreateTransaction();
    const { mutate: updateTransaction } = useUpdateTransaction();
    const { mutate: deleteTransaction, isPending } = useDeleteTransaction();

    const form = useAppForm({
        ...defaultFormOptions,
        validators: {
            onSubmit: TransactionSchemaWithValidation,
        },

        onSubmit: async ({ value }) => {
            txn?.id
                ? updateTransaction({ data: value })
                : createTransaction({ data: value });
            // console.log(value);
        },
    });

    // console.log(form.state.values);

    if (isDelete && !txn)
        return (
            <div className="flex items-center justify-center w-full h-full">
                Transaction Details Required
            </div>
        );

    return (
        <TxnFormContext.Provider
            value={{
                ...defaultFormOptions,
                memberOptions,
            }}
        >
            <form
                className="flex flex-col gap-7"
                onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                }}
            >
                <form.AppForm>
                    <form.ErrorMap />

                    <form.Subscribe
                        selector={(state) => ({
                            txnType: state.values.txnType,
                            dType: state.values.donationType,
                        })}
                    >
                        {({ txnType, dType }) => {
                            if (dType === DONATION_TYPE.ANNADAAN)
                                return (
                                    <AnnadaanForm
                                        txn={txn}
                                        isDelete={isDelete}
                                    />
                                );
                            if (dType === DONATION_TYPE.TEMPLE_ITEM)
                                return (
                                    <TempleItemForm
                                        txn={txn}
                                        isDelete={isDelete}
                                    />
                                );
                            return (
                                <Tabs value={txnType}>
                                    <TabsList>
                                        {TXN_TYPE_OPTIONS.map((t) => (
                                            <TabsTrigger
                                                key={t}
                                                type="button"
                                                value={t}
                                                disabled={!!txn?.id}
                                                className="capitalize"
                                                onClick={() => {
                                                    form.reset();
                                                    form.setErrorMap({});
                                                    form.setFieldValue(
                                                        "txnType",
                                                        t as TxnType,
                                                    );
                                                    if (t === TXN_TYPE.DONATION)
                                                        form.setFieldValue(
                                                            "donationType",
                                                            committee ===
                                                                COMMITTEE.CULTURAL
                                                                ? DONATION_TYPE.CULTURAL
                                                                : DONATION_TYPE.TEMPLE,
                                                        );
                                                    else
                                                        form.setFieldValue(
                                                            "donationType",
                                                            undefined,
                                                        );
                                                }}
                                            >
                                                {t.toLowerCase()}
                                            </TabsTrigger>
                                        ))}
                                    </TabsList>
                                    <TabsContents className="py-6">
                                        {TXN_TYPE_OPTIONS.map((t) => (
                                            <TabsContent key={t} value={t}>
                                                {txnType ===
                                                    TXN_TYPE.DONATION && (
                                                    <DonationForm
                                                        committee={committee}
                                                        donationType={
                                                            dType ??
                                                            (committee ===
                                                            COMMITTEE.CULTURAL
                                                                ? DONATION_TYPE.CULTURAL
                                                                : DONATION_TYPE.TEMPLE)
                                                        }
                                                        txn={txn}
                                                        isDelete={isDelete}
                                                    />
                                                )}
                                                {txnType ===
                                                    TXN_TYPE.EXPENSE && (
                                                    <ExpenseForm
                                                        isDelete={isDelete}
                                                    />
                                                )}
                                                {txnType ===
                                                    TXN_TYPE.TRANSFER && (
                                                    <TransferForm
                                                        isDelete={isDelete}
                                                    />
                                                )}
                                            </TabsContent>
                                        ))}
                                    </TabsContents>
                                </Tabs>
                            );
                        }}
                    </form.Subscribe>
                    {isDelete && txn ? (
                        <Button
                            variant={"destructive"}
                            type="button"
                            className="w-full"
                            isLoading={isPending}
                            onClick={() =>
                                deleteTransaction({ data: { id: txn.id } })
                            }
                        >
                            Confirm Delete
                        </Button>
                    ) : (
                        <form.SubmitButton label="Submit" className="w-full" />
                    )}
                </form.AppForm>
            </form>
        </TxnFormContext.Provider>
    );
}
