import { useSuspenseQuery } from "@tanstack/react-query";
import { IndianRupeeIcon, Pen, Plus, Trash2 } from "lucide-react";
import { annadaanItemOptions } from "@/api/queries/admin.queries";
import { Amount } from "@/components/shared/amount";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Route } from "@/routes/__root";
import { Modal } from "../shared/modal";
import { buttonVariants } from "../ui/button";
import { AnnadaanItemForm } from "./annadaan-item-form";

export function AnnadaanItemList() {
    const { config } = Route.useRouteContext();
    const { data: items } = useSuspenseQuery(annadaanItemOptions);
    return (
        <div className="flex flex-col gap-6">
            <span className="font-heading font-semibold text-lg">
                Annadaan Items - {config.activeYear}
            </span>

            <Modal
                headerClass={cn(
                    "bg-linear-to-br from-primary via-primary/60 to-primary/30 p-4 text-primary-foreground rounded-t-lg text-xl",
                )}
                closeBtnClass="text-primary-foreground hover:text-accent"
                btnClass={cn(buttonVariants())}
                title={`Add Item Details`}
                content={<AnnadaanItemForm />}
            >
                <Plus className="size-3" />
                New Annadaan Item
            </Modal>

            <Table>
                <TableCaption>A list of committee members</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className=""></TableHead>
                        <TableHead className="">Name</TableHead>
                        <TableHead className="text-right hidden md:table-cell">
                            Qty
                        </TableHead>
                        <TableHead className="text-right hidden md:table-cell">
                            Price
                        </TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items?.map((item) => {
                        return (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <div className="flex items-center gap-1">
                                        <Modal
                                            headerClass={cn(
                                                "bg-linear-to-br from-primary via-primary/60 to-primary/30 p-4 text-primary-foreground rounded-t-lg text-xl",
                                            )}
                                            closeBtnClass="text-primary-foreground hover:text-accent"
                                            btnClass={cn(
                                                buttonVariants({
                                                    size: "icon-xs",
                                                    variant: "ghost",
                                                }),
                                            )}
                                            title={`Edit Item Details`}
                                            content={
                                                <AnnadaanItemForm item={item} />
                                            }
                                        >
                                            <Pen className="size-3" />
                                        </Modal>
                                        <Modal
                                            headerClass={cn(
                                                "bg-linear-to-br from-primary via-primary/60 to-primary/30 p-4 text-primary-foreground rounded-t-lg text-xl",
                                            )}
                                            closeBtnClass="text-primary-foreground hover:text-accent"
                                            btnClass={cn(
                                                buttonVariants({
                                                    size: "icon-xs",
                                                    variant: "destructive",
                                                }),
                                            )}
                                            title={`Delete Item`}
                                            content={
                                                <AnnadaanItemForm
                                                    item={item}
                                                    isDelete
                                                />
                                            }
                                        >
                                            <Trash2 className="size-3" />
                                        </Modal>
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium text-muted-foreground truncate">
                                    <div className="flex flex-col">
                                        <span className="truncate">
                                            {item.itemName}
                                        </span>
                                        <div className="flex items-center md:hidden text-xs">
                                            Qty: {item.quantity} X{" "}
                                            <IndianRupeeIcon className="size-3" />
                                            {""}
                                            {item.price}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right hidden md:table-cell">
                                    {item.quantity}
                                </TableCell>
                                <TableCell className="text-right hidden md:table-cell">
                                    {item.price}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Amount
                                        amount={item.amount}
                                        className="text-sm"
                                    />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
