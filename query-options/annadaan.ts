import { getAllAnnadaanItems } from '@/server/actions/annadaan.actions';
import { queryOptions } from '@tanstack/react-query';

export const annadaanKeys = {
  all: ['annadaan'] as const,
  getAllBookings: (year: number) =>
    [...annadaanKeys.all, 'bookings', year] as const,
};

export const allAnnadaanBookingOptions = (year: number) =>
  queryOptions({
    queryKey: annadaanKeys.getAllBookings(year),
    queryFn: () => getAllAnnadaanItems({ year }).then((res) => res.data),
    staleTime: 1000 * 60 * 60,
  });
