export const BUILDINGS = ['A', 'B', 'C', 'D', 'E', 'F', 'G'] as const;
export const BUILDING_FLOORS = {
  A: 12,
  B: 12,
  C: 11,
  D: 11,
  E: 12,
  F: 12,
  G: 12,
};
export const PER_FLOOR_FLATS = 4;
export const COMMITTEES = ['cultural', 'temple'] as const;
export const PAY_MODES = ['cash', 'online'] as const;
export const PAY_STATUS = ['pending', 'confirmed'] as const;
export const EVENT_TYPES = [
  'annadaan',
  'temple',
  'ganpati',
  'independence-day',
  'pheta-bookings',
  'republic-day',
] as const;
