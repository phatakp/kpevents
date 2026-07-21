import { PenIcon } from "lucide-react";
import { Modal } from "@/components/shared/modal";
import { cn } from "@/lib/utils";
import type { User } from "@/types";
import { ProfileForm } from "./profile-form";

type Props = {
    profile: User | null | undefined;
};
export function ProfileButton({ profile }: Props) {
    return (
        <Modal
            headerClass={cn(
                "bg-linear-to-br from-primary via-primary/60 to-primary/30 p-4 text-primary-foreground rounded-t-lg text-xl",
            )}
            closeBtnClass="text-primary-foreground hover:text-accent"
            btnClass="w-fit"
            title={`Update Profile`}
            initOpen={!profile?.flat}
            content={<ProfileForm profile={profile} />}
        >
            <PenIcon className="size-4" />
        </Modal>
    );
}
