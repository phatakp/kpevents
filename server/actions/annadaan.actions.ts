'use server';

import { ActionError } from '@/app/errors';
import {
  AnnadaanItemSchema,
  BookingFormSchema,
  BookingPkSchema,
} from '@/app/schemas';
import {
  adminProcedure,
  profileProcedure,
  publicProcedure,
} from '@/lib/safe-action';
import { z } from 'zod/v4';

export const getAllAnnadaanItems = publicProcedure
  .inputSchema(z.object({ year: z.coerce.number() }))
  .action(async ({ parsedInput: { year }, ctx: { supabase } }) => {
    const { data: items, error: err1 } = await supabase
      .from('annadaan_items')
      .select('*');
    if (err1) throw new ActionError(err1.message);

    const { data: bookings, error } = await supabase
      .from('annadaan_bookings')
      .select('*');

    if (error) throw new ActionError(error.message);

    return items?.map((item) => ({
      ...item,
      bookings:
        bookings?.filter(
          (b) => b.item_name === item.item_name && b.year === year
        ) ?? [],
    }));
  });

export const getTotalBookingForItem = adminProcedure
  .inputSchema(z.object({ itemName: z.string() }))
  .action(async ({ parsedInput: { itemName }, ctx: { supabase } }) => {
    const { data, error } = await supabase
      .from('annadaan_bookings')
      .select('totalQty:booking_qty.sum(),item_name')
      .eq('item_name', itemName)
      .single();
    if (error) throw new ActionError(error.message);
    return data?.totalQty ?? 0;
  });

export const upsertAnnadaanItem = adminProcedure
  .inputSchema(AnnadaanItemSchema)
  .action(async ({ parsedInput, ctx: { supabase } }) => {
    const { data, error } = await supabase
      .from('annadaan_items')
      .upsert(parsedInput)
      .select();
    if (error) throw new ActionError(error.message);
    return data;
  });

export const createBookings = publicProcedure
  .inputSchema(BookingFormSchema)
  .action(async ({ parsedInput, ctx: { supabase } }) => {
    console.log(parsedInput);

    const { otherPaidTo, otherBuilding, otherFlat, receiver } = parsedInput;
    let receiverName = receiver;
    if (receiver === 'Other' && otherPaidTo && otherBuilding && otherFlat) {
      receiverName = `${otherPaidTo} (${otherBuilding}${otherFlat})`;
    }
    const promises = parsedInput.bookings.map(async (b) => {
      const { data } = await supabase.rpc('create_annadaan_booking', {
        itemname: b.itemName,
        yr: parsedInput.year,
        bookname: parsedInput.bookByName,
        building: parsedInput.building,
        flat: parsedInput.flat,
        qty: b.bookQty,
        receivr: receiverName,
        amt: b.bookQty * b.price,
      });
      return data;
    });
    const results = await Promise.all(promises);
    const failed = results.findIndex((v) => !v);
    if (failed === -1) {
      return null;
    }
    const failedItem = parsedInput.bookings[failed];
    throw new ActionError(`${failedItem.itemName} already booked by someone`);
  });

export const confirmBooking = profileProcedure
  .inputSchema(BookingPkSchema)
  .action(async ({ parsedInput, ctx: { supabase, profile } }) => {
    const { data, error } = await supabase
      .from('annadaan_bookings')
      .update({
        status: 'confirmed',
        last_action: profile.id,
      })
      .eq('item_name', parsedInput.item_name)
      .eq('year', parsedInput.year)
      .eq('booking_name', parsedInput.booking_name)
      .eq('booking_building', parsedInput.booking_building)
      .eq('booking_flat', parsedInput.booking_flat)
      .select()
      .single();
    if (error) throw new ActionError(error.message);
    return data;
  });

export const deleteBooking = publicProcedure
  .inputSchema(BookingPkSchema)
  .action(async ({ parsedInput, ctx: { supabase } }) => {
    const { error } = await supabase
      .from('annadaan_bookings')
      .delete()
      .eq('item_name', parsedInput.item_name)
      .eq('year', parsedInput.year)
      .eq('booking_name', parsedInput.booking_name)
      .eq('booking_building', parsedInput.booking_building)
      .eq('booking_flat', parsedInput.booking_flat);
    if (error) throw new ActionError(error.message);
  });

export const getTotalBookings = publicProcedure.action(
  async ({ ctx: { supabase } }) => {
    const { data } = await supabase
      .from('annadaan_bookings')
      .select('total:amount.sum()')
      .eq('status', 'confirmed')
      .single();

    return data?.total ?? 0;
  }
);
