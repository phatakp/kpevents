'use server';

import { ActionError } from '@/app/errors';
import {
  TempleBookingFormSchema,
  TempleBookingPkSchema,
  TempleItemSchema,
} from '@/app/schemas';
import { adminProcedure, publicProcedure } from '@/lib/safe-action';

export const getAllTempleRequirements = publicProcedure.action(
  async ({ ctx: { supabase } }) => {
    const { data: items, error: err1 } = await supabase
      .from('temple_requirements')
      .select('*');
    if (err1) throw new ActionError(err1.message);

    const { data: bookings, error } = await supabase
      .from('temple_bookings')
      .select('*');

    if (error) throw new ActionError(error.message);

    return items?.map((item) => ({
      ...item,
      bookings: bookings?.filter((b) => b.item_name === item.item_name) ?? [],
    }));
  }
);

export const upsertTempleItem = adminProcedure
  .inputSchema(TempleItemSchema)
  .action(async ({ parsedInput, ctx: { supabase } }) => {
    const { data, error } = await supabase
      .from('temple_requirements')
      .upsert(parsedInput)
      .select();
    if (error) throw new ActionError(error.message);
    return data;
  });

export const createTempleBookings = publicProcedure
  .inputSchema(TempleBookingFormSchema)
  .action(async ({ parsedInput, ctx: { supabase } }) => {
    const { otherPaidTo, otherBuilding, otherFlat, receiver } = parsedInput;
    let receiverName = receiver;
    if (receiver === 'Other' && otherPaidTo && otherBuilding && otherFlat) {
      receiverName = `${otherPaidTo} (${otherBuilding}${otherFlat})`;
    }
    const promises = parsedInput.bookings.map(async (b) => {
      const { data, error } = await supabase.rpc('create_temple_booking', {
        itemname: b.itemName,
        bookname: parsedInput.bookByName,
        building: parsedInput.building,
        flat: parsedInput.flat,
        receivr: receiverName,
        amt: b.bookAmt,
      });

      if (error) console.error(error);

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

export const deleteTempleBooking = publicProcedure
  .inputSchema(TempleBookingPkSchema)
  .action(async ({ parsedInput, ctx: { supabase } }) => {
    const { error } = await supabase
      .from('annadaan_bookings')
      .delete()
      .eq('item_name', parsedInput.item_name)
      .eq('booking_name', parsedInput.booking_name)
      .eq('booking_building', parsedInput.booking_building)
      .eq('booking_flat', parsedInput.booking_flat);
    if (error) throw new ActionError(error.message);
  });
