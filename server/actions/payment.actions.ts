'use server';

import { ActionError } from '@/app/errors';
import { PaymentFormSchema, PaymentUpdateFormSchema } from '@/app/schemas';
import { COMMITTEES } from '@/lib/constants';
import {
  adminProcedure,
  profileProcedure,
  publicProcedure,
} from '@/lib/safe-action';
import { getISTDate } from '@/lib/utils';
import { z } from 'zod/v4';

export const getAllPayments = publicProcedure
  .inputSchema(z.object({ committee: z.enum(COMMITTEES) }))
  .action(async ({ parsedInput: { committee }, ctx: { supabase } }) => {
    const { data } = await supabase
      .from('payments')
      .select('*')
      .eq('committee', committee)
      .order('date', { ascending: false });

    return data;
  });

export const getTotalPayments = publicProcedure
  .inputSchema(z.object({ committee: z.enum(COMMITTEES) }))
  .action(async ({ parsedInput, ctx: { supabase } }) => {
    const { data } = await supabase
      .from('payments')
      .select('total:amount.sum()')
      .eq('committee', parsedInput.committee)
      .single();

    return data?.total ?? 0;
  });

export const getTotalPaymentsBySlug = publicProcedure
  .inputSchema(z.object({ slug: z.string() }))
  .action(async ({ parsedInput, ctx: { supabase } }) => {
    const { data } = await supabase
      .from('payments')
      .select('total:amount.sum()')
      .eq('event_slug', parsedInput.slug)
      .single();

    return data;
  });

export const addPayment = profileProcedure
  .inputSchema(PaymentFormSchema)
  .action(async ({ parsedInput, ctx: { supabase, profile } }) => {
    const { otherBuilding, otherFlat, otherPaidTo, paid_by, date, ...values } =
      parsedInput;
    let receiverName = paid_by;
    if (paid_by === 'Other' && otherPaidTo && otherBuilding && otherFlat) {
      receiverName = `${otherPaidTo} (${otherBuilding}${otherFlat})`;
    }
    const { data, error } = await supabase
      .from('payments')
      .insert({
        ...values,
        logged_by: profile.id,
        paid_by: receiverName,
        date: getISTDate(date),
      })
      .select()
      .single();
    if (error) throw new ActionError(error.message);
    return data;
  });

export const updatePayment = profileProcedure
  .inputSchema(PaymentUpdateFormSchema)
  .action(async ({ parsedInput, ctx: { supabase, profile } }) => {
    const {
      id,
      otherBuilding,
      otherFlat,
      otherPaidTo,
      paid_by,
      date,
      ...values
    } = parsedInput;

    let receiverName = paid_by;
    if (paid_by === 'Other' && otherPaidTo && otherBuilding && otherFlat) {
      receiverName = `${otherPaidTo} (${otherBuilding}${otherFlat})`;
    }
    const { data, error } = await supabase
      .from('payments')
      .update({
        ...values,
        logged_by: profile.id,
        paid_by: receiverName,
        date: getISTDate(date),
      })
      .eq('id', id)
      .select()
      .single();
    if (error) throw new ActionError(error.message);
    return data;
  });

export const deletePayment = adminProcedure
  .inputSchema(z.object({ id: z.number() }))
  .action(async ({ parsedInput: { id }, ctx: { supabase } }) => {
    const { error } = await supabase.from('payments').delete().eq('id', id);
    if (error) throw new ActionError(error.message);
  });
