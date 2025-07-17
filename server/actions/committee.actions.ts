'use server';

import { ActionError } from '@/app/errors';
import { CommitteeMemberPkSchema } from '@/app/schemas';
import { COMMITTEES } from '@/lib/constants';
import {
  adminProcedure,
  protectedProcedure,
  publicProcedure,
} from '@/lib/safe-action';
import { z } from 'zod/v4';
import { getTotalBookings } from './annadaan.actions';
import { isLoggedInProfile } from './auth.actions';
import { getTotalCollections } from './booking.actions';
import { getTotalPayments } from './payment.actions';

export const getAllCommitteeMembers = publicProcedure
  .inputSchema(z.object({ committee: z.enum(COMMITTEES) }))
  .action(async ({ parsedInput: { committee }, ctx: { supabase } }) => {
    const { data } = await supabase
      .from('committee_members')
      .select('*,user:profiles(*)')
      .eq('committee', committee)
      .eq('is_active', true);
    return data;
  });

export const getCommitteeMember = publicProcedure
  .inputSchema(CommitteeMemberPkSchema)
  .action(
    async ({ parsedInput: { committee, member_id }, ctx: { supabase } }) => {
      const { data } = await supabase
        .from('committee_members')
        .select('*,user:profiles(*)')
        .eq('committee', committee)
        .eq('member_id', member_id)
        .single();
      return data;
    }
  );

export const isCommitteeMember = publicProcedure
  .inputSchema(
    z.object({
      committee: z.enum(COMMITTEES),
    })
  )
  .action(async ({ parsedInput: { committee }, ctx: { supabase } }) => {
    const { data } = await isLoggedInProfile();
    if (!data?.profile?.id) return false;

    const { data: member } = await supabase
      .from('committee_members')
      .select('*,user:profiles(*)')
      .eq('committee', committee)
      .eq('member_id', data.profile.id)
      .single();
    return !!member?.is_active;
  });

export const getCommitteeBalance = publicProcedure
  .inputSchema(
    z.object({
      committee: z.enum(COMMITTEES),
    })
  )
  .action(async ({ parsedInput: { committee } }) => {
    if (committee === 'cultural') {
      const [{ data: annadaan }, { data: collections }, { data: payments }] =
        await Promise.all([
          getTotalBookings(),
          getTotalCollections({ committee }),
          getTotalPayments({ committee }),
        ]);
      return (annadaan ?? 0) + (collections ?? 0) - (payments ?? 0);
    }
    const [{ data: collections }, { data: payments }] = await Promise.all([
      getTotalCollections({ committee }),
      getTotalPayments({ committee }),
    ]);
    return (collections ?? 0) - (payments ?? 0);
  });

export const getAllPendingApprovals = adminProcedure.action(
  async ({ ctx: { supabase } }) => {
    const { data } = await supabase
      .from('committee_members')
      .select('*,user:profiles(*)')
      .eq('is_active', false);
    return data;
  }
);

export const addMember = protectedProcedure
  .inputSchema(CommitteeMemberPkSchema)
  .action(async ({ parsedInput, ctx: { supabase } }) => {
    const { data, error } = await supabase
      .from('committee_members')
      .insert([{ ...parsedInput, is_active: false }])
      .select();
    if (error) throw new ActionError(error.message);
    return data;
  });

export const deleteMember = adminProcedure
  .inputSchema(CommitteeMemberPkSchema)
  .action(
    async ({ parsedInput: { committee, member_id }, ctx: { supabase } }) => {
      const { error } = await supabase
        .from('committee_members')
        .delete()
        .eq('committee', committee)
        .eq('member_id', member_id);
      if (error) throw new ActionError(error.message);
    }
  );

export const approveMember = adminProcedure
  .inputSchema(CommitteeMemberPkSchema)
  .action(
    async ({ parsedInput: { committee, member_id }, ctx: { supabase } }) => {
      const { data, error } = await supabase
        .from('committee_members')
        .update({ is_active: true })
        .eq('committee', committee)
        .eq('member_id', member_id);
      if (error) throw new ActionError(error.message);
      return data;
    }
  );
