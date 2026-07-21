import { Toaster } from "react-hot-toast";

export function ReactHotToast() {
    return (
        <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
                style: {
                    border: "1px solid var(--color-popover-foreground)",
                    padding: "16px",
                    backgroundColor: "var(--color-card)",
                    color: "var(--color-card-foreground)",
                },
                success: {
                    style: {
                        border: "1px solid var(--color-success)",
                        backgroundColor: "var(--color-success)",
                        color: "var(--color-success-foreground)",
                    },
                },
                error: {
                    style: {
                        border: "1px solid var(--color-destructive)",
                        backgroundColor: "var(--color-destructive)",
                        color: "var(--color-destructive-foreground)",
                    },
                },
            }}
        />
    );
}
