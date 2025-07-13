import { BUILDINGS, COMMITTEES } from '@/lib/constants';
import { createZodObject, getFlatsForBuilding } from '@/lib/utils';
import { z } from 'zod/v4';
import type {
  TAnnadaanBooking,
  TAnnadaanItem,
  TCommitteeMember,
  TEvent,
  TEventBooking,
  TPayment,
  TUserProfile,
} from './types';

//Auth
export const LoginSchema = z.object({ email: z.email({ error: 'Required' }) });
export const VerifyOTPSchema = z.object({
  email: z.email({ error: 'Required' }),
  token: z.string().min(6, { error: 'Invalid OTP' }),
});

export const ProfileSchema = createZodObject<TUserProfile>({
  id: z.uuid(),
  name: z.string(),
  email: z.email(),
  building: z.enum(['A', 'B', 'C', 'D', 'E', 'F', 'G']),
  flat: z.coerce.number().default(0),
  is_admin: z.boolean(),
  created_at: z.string(),
});

export const ProfileCreateSchema = ProfileSchema.omit({
  is_admin: true,
  created_at: true,
}).check((ctx) => {
  if (!getFlatsForBuilding(ctx.value.building).includes(ctx.value.flat)) {
    ctx.issues.push({
      code: 'custom',
      message: 'Invalid Flat Number',
      input: ctx.value.flat,
      path: ['flat'],
      continue: true, // make this issue continuable (default: false)
    });
  }
});

//Committee

export const CommitteeMemberSchema = createZodObject<TCommitteeMember>({
  committee: z.enum(COMMITTEES),
  member_id: z.uuid(),
  is_active: z.boolean(),
});

export const CommitteeMemberPkSchema = CommitteeMemberSchema.omit({
  is_active: true,
});

//Event
export const EventSchema = createZodObject<TEvent>({
  slug: z.string(),
  year: z.coerce.number(),
  committee: z.enum(COMMITTEES),
  type: z.string(),
  is_active: z.boolean(),
  created_at: z.string(),
  last_action: z.nullable(z.uuid()),
});

export const EventCreateSchema = EventSchema.omit({
  is_active: true,
  slug: true,
  created_at: true,
  last_action: true,
});

//Annadaan
export const AnnadaanItemSchema = createZodObject<TAnnadaanItem>({
  item_name: z.string(),
  quantity: z.coerce.number(),
  price: z.coerce.number(),
  amount: z.coerce.number(),
});

export const BookingSchema = createZodObject<TAnnadaanBooking>({
  item_name: z.string(),
  booking_qty: z.coerce.number(),
  booking_building: z.enum(BUILDINGS),
  booking_flat: z.number(),
  booking_name: z.string(),
  amount: z.coerce.number(),
  year: z.number(),
  receiver: z.string(),
  created_at: z.string(),
  status: z.enum(['pending', 'confirmed']),
});

export const BookingPkSchema = BookingSchema.pick({
  item_name: true,
  booking_building: true,
  booking_flat: true,
  booking_name: true,
  year: true,
});

export const BookingFormSchema = z
  .object({
    bookByName: z.string('Required').min(1, 'Required'),
    receiver: z.string('Required').min(1, 'Required'),
    otherPaidTo: z.string().optional(),
    otherBuilding: z.enum(BUILDINGS).optional(),
    otherFlat: z.coerce.number().optional(),
    building: z.enum(BUILDINGS, 'Required'),
    flat: z.coerce.number('Required'),
    year: z.coerce.number(),
    bookings: z.array(
      z.object({
        itemName: z.string('Required'),
        totQty: z.coerce.number('Required'),
        bookQty: z.coerce.number('Required').min(0.01),
        price: z.coerce.number('Required'),
      })
    ),
  })
  .check((ctx) => {
    if (!getFlatsForBuilding(ctx.value.building).includes(ctx.value.flat)) {
      ctx.issues.push({
        code: 'custom',
        message: 'Invalid Flat Number',
        input: ctx.value.flat,
        path: ['flat'],
        continue: true, // make this issue continuable (default: false)
      });
    }
  });

//Collection
export const EventBookingSchema = createZodObject<TEventBooking>({
  id: z.number(),
  event_slug: z.string(),
  booking_name: z.string(),
  committee: z.enum(COMMITTEES),
  booking_building: z.enum(BUILDINGS),
  booking_flat: z.coerce.number(),
  booking_qty: z.coerce.number(),
  amount: z.coerce.number(),
  receiver: z.string(),
  payment_mode: z.enum(['cash', 'online']),
  created_at: z.string(),
  last_action: z.uuid(),
  status: z.enum(['pending', 'confirmed']),
});

export const EventBookingCreateSchema = EventBookingSchema.omit({
  id: true,
  created_at: true,
  last_action: true,
});

export const EventBookingFormSchema = EventBookingCreateSchema.extend({
  event_slug: z.string(),
  committee: z.enum(COMMITTEES),
  booking_building: z.enum(BUILDINGS),
  booking_flat: z.coerce.number(),
  amount: z.coerce.number(),
  payment_mode: z.enum(['cash', 'online']),
  status: z.enum(['pending', 'confirmed']),
  otherPaidTo: z.string().optional(),
  otherBuilding: z.enum(BUILDINGS).optional(),
  otherFlat: z.coerce.number().optional(),
}).check((ctx) => {
  if (
    !getFlatsForBuilding(ctx.value.booking_building).includes(
      ctx.value.booking_flat
    )
  ) {
    ctx.issues.push({
      code: 'custom',
      message: 'Invalid Flat Number',
      input: ctx.value.booking_flat,
      path: ['booking_flat'],
      continue: true, // make this issue continuable (default: false)
    });
  }

  if (
    ctx.value.receiver === 'Other' &&
    !(ctx.value.otherPaidTo && ctx.value.otherBuilding && ctx.value.otherFlat)
  ) {
    ctx.issues.push({
      code: 'custom',
      message: 'Receiver details required',
      input: ctx.value.receiver,
      path: ['receiver'],
      continue: true, // make this issue continuable (default: false)
    });
  }
});
export const EventBookingUpdateFormSchema = EventBookingFormSchema.extend({
  id: z.number(),
});

export const PaymentSchema = createZodObject<TPayment>({
  id: z.number(),
  desc: z.string(),
  committee: z.enum(COMMITTEES),
  amount: z.coerce.number(),
  created_at: z.string(),
  logged_by: z.uuid(),
  paid_by: z.string(),
  date: z.string(),
});

export const PaymentCreateSchema = PaymentSchema.omit({
  id: true,
  created_at: true,
  logged_by: true,
});

export const PaymentFormSchema = PaymentCreateSchema.extend({
  committee: z.enum(COMMITTEES),
  amount: z.coerce.number(),
  otherPaidTo: z.string().optional(),
  otherBuilding: z.enum(BUILDINGS).optional(),
  otherFlat: z.coerce.number().optional(),
});

export const PaymentUpdateFormSchema = PaymentFormSchema.extend({
  id: z.number(),
});
