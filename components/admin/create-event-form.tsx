'use client';
import { EventCreateSchema } from '@/app/schemas';
import { SelectInput } from '@/components/inputs/select-input';
import { TextInput } from '@/components/inputs/text-input';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { COMMITTEES, EVENT_TYPES } from '@/lib/constants';
import { cn, customResolver } from '@/lib/utils';
import { createEvent } from '@/server/actions/event.actions';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import FormErrorArea from '../layouts/form-error-area';
import { useModal } from '../layouts/modal';

export function CreateEventForm() {
  const router = useRouter();
  const { modalId, closeModal } = useModal();

  const { form, handleSubmitWithAction, resetFormAndAction } =
    useHookFormAction(createEvent, customResolver(EventCreateSchema), {
      formProps: {
        mode: 'onChange',
        defaultValues: {
          type: '',
          committee: '',
          year: new Date().getFullYear(),
        },
      },
      actionProps: {
        onSuccess: () => {
          toast.success('Event Created Successfully');
          resetFormAndAction();
          closeModal(modalId);
          router.refresh();
        },
        onError: ({ error }) => {
          toast.error(
            error?.validationErrors?.formErrors?.[0] ??
              error?.serverError ??
              error.thrownError?.message ??
              'Could not process request'
          );
        },
      },
    });

  const commOptions = COMMITTEES.map((c) => ({
    value: c,
    label: `Piccadilly ${c}`,
  }));

  return (
    <Form {...form}>
      <FormErrorArea />
      <form
        className={cn('flex flex-col gap-6')}
        onSubmit={handleSubmitWithAction}
      >
        <SelectInput
          label="Committee"
          options={commOptions ?? []}
          register={form.register('committee')}
        />
        <SelectInput
          label="Event"
          options={typeOptions}
          register={form.register('type')}
        />
        <TextInput
          label="Year"
          register={form.register('year')}
          type="number"
        />

        <Button
          className="w-full"
          isLoading={form.formState.isSubmitting}
          type="submit"
        >
          Save
        </Button>
      </form>
    </Form>
  );
}

const typeOptions = EVENT_TYPES.map((c) => ({ label: c, value: c }));
