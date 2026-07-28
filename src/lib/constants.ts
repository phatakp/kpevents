export const PAGE_SIZE = 10;
export const PER_FLOOR_FLATS = 4;

export const BUILDING = {
    A: "A",
    B: "B",
    C: "C",
    D: "D",
    E: "E",
    F: "F",
    G: "G",
} as const;
export const BUILDING_FLOORS = {
    A: 12,
    B: 12,
    C: 11,
    D: 11,
    E: 12,
    F: 12,
    G: 12,
};
export const ROUTE_COMMITTEE = {
    CULTURAL: "cultural",
    TEMPLE: "temple",
} as const;
export const ROUTE_TXN_TYPE = {
    DONATION: "donation",
    EXPENSE: "expense",
    TRANSFER: "transfer",
} as const;
export const ROUTE_SUB_TYPE = {
    ANNADAAN: "annadaan",
    TEMPLE: "temple",
} as const;
export const COMMITTEE = { CULTURAL: "CULTURAL", TEMPLE: "TEMPLE" } as const;
export const TXN_MODE = { CASH: "CASH", ONLINE: "ONLINE" } as const;

export const TXN_TYPE = {
    DONATION: "DONATION",
    EXPENSE: "EXPENSE",
    TRANSFER: "TRANSFER",
} as const;
export const DONATION_TYPE = {
    ANNADAAN: "ANNADAAN",
    TEMPLE: "TEMPLE",
    CULTURAL: "CULTURAL",
    TEMPLE_ITEM: "TEMPLE_ITEM",
    OTHER: "OTHER",
} as const;
export const ITEM_TYPE = {
    ANNADAAN: "ANNADAAN",
    TEMPLE: "TEMPLE",
} as const;
export const USER_ROLE = { ADMIN: "ADMIN", USER: "USER" } as const;

export const localization = {
    signUp: {
        start: {
            subtitle: "Create your {{applicationName}} account",
            title: "Only for Committee Members",
        },
    },
    signIn: {
        start: {
            title: "Only for Committee Members",
            subtitle: "Sign in to {{applicationName}}",
        },
    },
};
