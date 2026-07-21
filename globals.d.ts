export type UserRole = "ADMIN" | "USER";

declare global {
  interface JwtPayload {
    azp: string;
    exp: string;
    fva: string;
    iat: string;
    iss: string;
    nbf: string;
    sid: string;
    sub: string;
    v: string;
    fea: string;
  }

  interface CustomJwtSessionClaims {
    id: string;
    email: string;
    imageUrl: string;
    firstName: string;
    lastName: string;
    metadata: {
      role?: UserRole;
    };
  }
}