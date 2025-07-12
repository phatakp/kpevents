'use server';

import { ActionError } from '@/app/errors';
import { EventBookingCreateSchema, PaymentCreateSchema } from '@/app/schemas';
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
    const { data } = await supabase
      .from('event_bookings')
      .select('total:amount.sum(),receiver')
      .eq('committee', committee);

    return data;
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
  .inputSchema(EventBookingCreateSchema)
  .action(async ({ parsedInput, ctx: { supabase, profile } }) => {
    const { event_slug } = parsedInput;
    const committee = event_slug.startsWith('temple') ? 'temple' : 'cultural';
    const { data, error } = await supabase
      .from('event_bookings')
      .insert({ ...parsedInput, last_action: profile.id, committee })
      .select()
      .single();
    if (error) throw new ActionError(error.message);
    return data;
  });

export const addPayment = profileProcedure
  .inputSchema(PaymentCreateSchema)
  .action(async ({ parsedInput, ctx: { supabase, profile } }) => {
    const { data, error } = await supabase
      .from('payments')
      .insert({ ...parsedInput, logged_by: profile.id })
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
