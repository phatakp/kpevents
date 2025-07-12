import type { EVENT_TYPES } from '@/lib/constants';
import type { Database } from '@/lib/supabase/types';

//Enum Types
export type TBuilding = Database['public']['Enums']['building_enum'];
export type TCommittee = Database['public']['Enums']['committee_enum'];
export type TPaymentStatus = Database['public']['Enums']['payment_status_enum'];
export type TPaymentType = Database['public']['Enums']['payment_type_enum'];
export type TEventType = (typeof EVENT_TYPES)[number];

//DB Table Types
export type TAnnadaanItem =
  Database['public']['Tables']['annadaan_items']['Row'];
export type TAnnadaanBooking =
  Database['public']['Tables']['annadaan_bookings']['Row'];
export type TCommitteeMember =
  Database['public']['Tables']['committee_members']['Row'];
export type TEventBooking =
  Database['public']['Tables']['event_bookings']['Row'];
export type TEvent = Database['public']['Tables']['events']['Row'];
export type TUserProfile = Database['public']['Tables']['profiles']['Row'];
export type TPayment = Database['public']['Tables']['payments']['Row'];

//Custom
export type TItemWithBookings = TAnnadaanItem & {
  bookings: TAnnadaanBooking[];
};
export type TMemberWithProfile = TCommitteeMember & {
  user: TUserProfile;
};
