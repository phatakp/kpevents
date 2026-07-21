import {
    createContext,
    type ReactNode,
    useContext,
    useId,
    useState,
} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/animate-ui/components/radix/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type Props = {
    children: ReactNode;
    content: ReactNode;
    title: ReactNode;
    description?: string;
    initOpen?: boolean;
    titleClass?: string;
    headerClass?: string;
    btnClass?: string;
    closeBtnClass?: string;
    onClose?: () => void;
};

type ModalContextProps = {
    open: boolean;
    modalId: string;
    closeModal: (id: string) => void;
    isOpen: (id: string) => boolean;
};

const ModalContext = createContext({} as ModalContextProps);

export function Modal({
    children,
    title,
    description,
    content,
    initOpen,
    titleClass,
    headerClass,
    btnClass,
    closeBtnClass,
    onClose,
}: Props) {
    const modalId = useId();
    const [open, setOpen] = useState(!!initOpen);
    const closeModal = (id: string) => {
        if (id === modalId) setOpen(false);
        if (onClose) onClose();
    };

    const isOpen = (id: string) => {
        if (id === modalId) return open;
        return false;
    };

    return (
        <ModalContext.Provider value={{ modalId, closeModal, open, isOpen }}>
            <Dialog onOpenChange={setOpen} open={open}>
                <DialogTrigger className={btnClass}>{children}</DialogTrigger>
                <DialogContent
                    className="w-full bg-card text-card-foreground p-0 max-w-[calc(100vw-1rem)] mr-auto"
                    closeBtnClass={closeBtnClass}
                >
                    <DialogHeader className={cn(headerClass)}>
                        <DialogTitle
                            className={cn(
                                "text-left text-2xl font-bold font-heading",
                                titleClass,
                            )}
                        >
                            {title}
                        </DialogTitle>
                        <DialogDescription className="text-muted">
                            {description}
                        </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="h-full max-h-[70vh] my-auto me-1">
                        <div className="p-4">{content}</div>
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </ModalContext.Provider>
    );
}

export const useModal = () => useContext(ModalContext);
