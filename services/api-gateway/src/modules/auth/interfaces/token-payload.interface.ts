export interface TokenPayload {
  sub: string;
  email: string;
  role: string;
  plan: string;
  iat?: number;
  exp?: number;
}
