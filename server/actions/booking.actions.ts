'use server';

import { ActionError } from '@/app/errors';
import { EventBookingFormSchema, PaymentFormSchema } from '@/app/schemas';
import { BUILDINGS, COMMITTEES } from '@/lib/constants';
import {
  adminProcedure,
  profileProcedure,
  publicProcedure,
} from '@/lib/safe-action';
import { z } from 'zod/v4';

export const getAllCollectionsbyBuilding = profileProcedure
  .inputSchema(z.object({ building: z.enum(BUILDINGS), slug: z.string() }))
  .action(async ({ parsedInput: { building, slug }, ctx: { supabase } }) => {
    const { data } = await supabase
      .from('event_bookings')
      .select('*')
      .eq('booking_building', building)
      .eq('event_slug', slug)
      .order('booking_flat');

    return data;
  });

export const getAllPayments = profileProcedure
  .inputSchema(z.object({ committee: z.enum(COMMITTEES) }))
  .action(async ({ parsedInput: { committee }, ctx: { supabase } }) => {
    const { data } = await supabase
      .from('payments')
      .select('*')
      .eq('committee', committee)
      .order('created_at', { ascending: false });

    return data;
  });

export const getCollectionsbyReceiver = profileProcedure
  .inputSchema(z.object({ committee: z.enum(COMMITTEES) }))
  .action(async ({ parsedInput: { committee }, ctx: { supabase } }) => {
    const { data: collections } = await supabase
      .from('event_bookings')
      .select('total:amount.sum(),receiver')
      .eq('committee', committee);
    const { data: payments } = await supabase
      .from('payments')
      .select('total:amount.sum(),receiver:paid_by')
      .eq('committee', committee);

    return collections?.map((c) => {
      const idx = payments?.findIndex((p) => p.receiver === c.receiver) ?? -1;
      return idx === -1
        ? c
        : { ...c, total: c.total - (payments?.[idx]?.total ?? 0) };
    });
  });

export const getTotalCollectionsBySlug = publicProcedure
  .inputSchema(z.object({ committee: z.enum(COMMITTEES), slug: z.string() }))
  .action(async ({ parsedInput, ctx: { supabase } }) => {
    const { data } = await supabase
      .from('event_bookings')
      .select('total:amount.sum()')
      .eq('committee', parsedInput.committee)
      .eq('event_slug', parsedInput.slug)
      .eq('status', 'confirmed')
      .single();

    return data?.total ?? 0;
  });

export const getTotalCollections = publicProcedure
  .inputSchema(z.object({ committee: z.enum(COMMITTEES) }))
  .action(async ({ parsedInput, ctx: { supabase } }) => {
    const { data } = await supabase
      .from('event_bookings')
      .select('total:amount.sum()')
      .eq('committee', parsedInput.committee)
      .eq('status', 'confirmed')
      .single();

    return data?.total ?? 0;
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

export const addEventBooking = profileProcedure
  .inputSchema(EventBookingFormSchema)
  .action(async ({ parsedInput, ctx: { supabase, profile } }) => {
    const {
      receiver,
      event_slug,
      otherPaidTo,
      otherBuilding,
      otherFlat,
      ...values
    } = parsedInput;
    let receiverName = receiver;
    if (receiver === 'Other' && otherPaidTo && otherBuilding && otherFlat) {
      receiverName = `${otherPaidTo} (${otherBuilding}${otherFlat})`;
    }
    const committee = event_slug.startsWith('temple') ? 'temple' : 'cultural';
    const { data, error } = await supabase
      .from('event_bookings')
      .insert({
        ...values,
        last_action: profile.id,
        committee,
        event_slug,
        receiver: receiverName,
      })
      .select()
      .single();
    if (error) throw new ActionError(error.message);
    return data;
  });

export const addPayment = profileProcedure
  .inputSchema(PaymentFormSchema)
  .action(async ({ parsedInput, ctx: { supabase, profile } }) => {
    const { otherBuilding, otherFlat, otherPaidTo, paid_by, ...values } =
      parsedInput;
    let receiverName = paid_by;
    if (paid_by === 'Other' && otherPaidTo && otherBuilding && otherFlat) {
      receiverName = `${otherPaidTo} (${otherBuilding}${otherFlat})`;
    }
    const { data, error } = await supabase
      .from('payments')
      .insert({ ...values, logged_by: profile.id, paid_by: receiverName })
      .select()
      .single();
    if (error) throw new ActionError(error.message);
    return data;
  });

export const deleteBooking = adminProcedure
  .inputSchema(z.object({ id: z.number() }))
  .action(async ({ parsedInput: { id }, ctx: { supabase } }) => {
    const { error } = await supabase
      .from('event_bookings')
      .delete()
      .eq('id', id);
    if (error) throw new ActionError(error.message);
  });

export const deletePayment = adminProcedure
  .inputSchema(z.object({ id: z.number() }))
  .action(async ({ parsedInput: { id }, ctx: { supabase } }) => {
    const { error } = await supabase.from('payments').delete().eq('id', id);
    if (error) throw new ActionError(error.message);
  });
