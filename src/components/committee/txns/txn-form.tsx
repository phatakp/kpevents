import { useSuspenseQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { apiQueries } from "@/api/queries";
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
import { getDefaultFormOptions } from "@/lib/utils";
import { Route } from "@/routes/__root";
import { useCart } from "@/stores/cart.store";
import type {
    Committee,
    DonationType,
    SelectOption,
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
    txnType: TxnType;
    donationType?: DonationType;
    txn?: Transaction;
    isDelete?: boolean;
    isViewOnly?: boolean;
};

const TxnFormContext = createContext(
    {} as {
        defaultValues: TxnFormValues;
        memberOptions: SelectOption[];
    },
);

export const useTxnFormContext = () => useContext(TxnFormContext);

export function TransactionForm({
    committee,
    txnType,
    donationType,
    txn,
    isDelete,
    isViewOnly,
}: Props) {
    const { config, auth } = Route.useRouteContext();
    const { data: linked } = useSuspenseQuery(
        apiQueries.txn.linkedTransfer(txn),
    );
    const items = useCart((state) => state.items);
    const defaultFormOptions = getDefaultFormOptions({
        committee,
        year: txn?.year ?? config.activeYear,
        txnType,
        donationType,
        txn,
        fromUserId: linked?.fromUserId,
        loggedInUserId: auth.userId as string,
        items,
    });
    const { data: memberOptions } = useSuspenseQuery(
        apiQueries.user.membership(committee, true),
    );

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
        },
    });

    if ((isDelete || isViewOnly) && !txn)
        return (
            <div className="flex items-center justify-center w-full h-full">
                Transaction Details Required
            </div>
        );

    return (
        <TxnFormContext.Provider
            value={{
                ...defaultFormOptions,
                memberOptions: memberOptions as SelectOption[],
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
                                        isDelete={isDelete || isViewOnly}
                                        isViewOnly={isViewOnly}
                                    />
                                );
                            if (dType === DONATION_TYPE.TEMPLE_ITEM)
                                return (
                                    <TempleItemForm
                                        txn={txn}
                                        isDelete={isDelete || isViewOnly}
                                        isViewOnly={isViewOnly}
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
                                                        isDelete={
                                                            isDelete ||
                                                            isViewOnly
                                                        }
                                                    />
                                                )}
                                                {txnType ===
                                                    TXN_TYPE.EXPENSE && (
                                                    <ExpenseForm
                                                        isDelete={
                                                            isDelete ||
                                                            isViewOnly
                                                        }
                                                    />
                                                )}
                                                {txnType ===
                                                    TXN_TYPE.TRANSFER && (
                                                    <TransferForm
                                                        isDelete={
                                                            isDelete ||
                                                            isViewOnly
                                                        }
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
                    ) : !isViewOnly ? (
                        <form.SubmitButton label="Submit" className="w-full" />
                    ) : null}
                </form.AppForm>
            </form>
        </TxnFormContext.Provider>
    );
}
