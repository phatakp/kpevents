'use server';

import { ActionError } from '@/app/errors';
import { EventCreateSchema } from '@/app/schemas';
import { COMMITTEES, EVENT_TYPES } from '@/lib/constants';
import { adminProcedure, publicProcedure } from '@/lib/safe-action';
import { slugify } from '@/lib/utils';
import { z } from 'zod/v4';

export const getAllEvents = publicProcedure.action(
  async ({ ctx: { supabase } }) => {
    const { data } = await supabase.from('events').select('*').order('type');
    return data;
  }
);

export const getAllEventsByCommittee = publicProcedure
  .inputSchema(z.object({ committee: z.enum(COMMITTEES) }))
  .action(async ({ parsedInput: { committee }, ctx: { supabase } }) => {
    const { data } = await supabase
      .from('events')
      .select('*')
      .eq('committee', committee);
    return data;
  });

export const getAllEventsByType = publicProcedure
  .inputSchema(z.object({ type: z.enum(EVENT_TYPES) }))
  .action(async ({ parsedInput: { type }, ctx: { supabase } }) => {
    const { data } = await supabase.from('events').select('*').eq('type', type);
    return data;
  });

export const getEventBySlug = publicProcedure
  .inputSchema(z.object({ slug: z.string() }))
  .action(async ({ parsedInput: { slug }, ctx: { supabase } }) => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('slug', slug)
      .single();
    if (error) throw new ActionError(error.message);
    return data;
  });

export const createEvent = adminProcedure
  .inputSchema(EventCreateSchema)
  .action(async ({ parsedInput, ctx: { supabase, profile } }) => {
    const { data, error } = await supabase
      .from('events')
      .insert({
        ...parsedInput,
        is_active: false,
        last_action: profile.id,
        slug: `${slugify(parsedInput.type)}-${parsedInput.year}`,
      })
      .select();
    if (error) throw new ActionError(error.message);
    return data;
  });

export const activateEvent = adminProcedure
  .inputSchema(z.object({ slug: z.string() }))
  .action(async ({ parsedInput: { slug }, ctx: { supabase, profile } }) => {
    const { data, error } = await supabase
      .from('events')
      .update({
        is_active: true,
        last_action: profile.id,
      })
      .eq('slug', slug)
      .select();

    if (error) throw new ActionError(error.message);
    return data;
  });

export const deActivateEvent = adminProcedure
  .inputSchema(z.object({ slug: z.string() }))
  .action(async ({ parsedInput: { slug }, ctx: { supabase, profile } }) => {
    const { data, error } = await supabase
      .from('events')
      .update({
        is_active: false,
        last_action: profile.id,
      })
      .eq('slug', slug)
      .select();

    if (error) throw new ActionError(error.message);
    return data;
  });
