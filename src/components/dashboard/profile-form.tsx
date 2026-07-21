import { useUser } from "@clerk/clerk-react";
import type z4 from "zod/v4";
import { useAppForm } from "@/components/shared/form-inputs/hooks";
import { useCreateProfile, useUpdateProfile } from "@/hooks/user.hooks";
import type { Building, User } from "@/types";
import { ProfileSchemaWithValidation } from "@/zod/user.schema.ts";

type Props = {
    profile?: User | null;
};

export function ProfileForm({ profile }: Props) {
    const { isLoaded, isSignedIn, user } = useUser();

    const profileUser = {
        clerkId: profile?.clerkId ?? user?.id,
        firstName: profile?.firstName || user?.firstName,
        lastName: profile?.lastName || user?.lastName,
        email: profile?.email || user?.emailAddresses[0]?.emailAddress,
        imageUrl: profile?.imageUrl || user?.imageUrl,
        flatNumber: {
            building: profile?.building as Building | undefined,
            flat: Number(profile?.flat),
        },
    } as z4.infer<typeof ProfileSchemaWithValidation>;

    const { mutate: addUser } = useCreateProfile();
    const { mutate: updateUser } = useUpdateProfile();

    const form = useAppForm({
        defaultValues: profileUser,
        validators: {
            onSubmit: ProfileSchemaWithValidation,
        },
        onSubmit: async ({ value }) => {
            profile?.flat
                ? updateUser({ data: value })
                : addUser({ data: value });
        },
    });

    if (!isLoaded || !isSignedIn) return <div>Loading...</div>;

    return (
        <form
            className="flex flex-col gap-7"
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}
        >
            <form.AppForm>
                <form.ErrorMap />

                <form.AppField name={"email"}>
                    {(field) => <field.TextInput label={"Email"} disabled />}
                </form.AppField>

                <form.AppField name={"firstName"}>
                    {(field) => <field.TextInput label={"First Name"} />}
                </form.AppField>

                <form.AppField name={"lastName"}>
                    {(field) => <field.TextInput label={"First Name"} />}
                </form.AppField>

                <form.AppField name="flatNumber">
                    {(field) => <field.FlatNumberInput field={field} />}
                </form.AppField>

                <form.SubmitButton label="Submit" className="w-full" />
            </form.AppForm>
        </form>
    );
}
