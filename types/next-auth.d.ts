import type { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      token: string;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    a_token: string;
  }
}

declare module "next-auth/jwt/types" {
  interface JWT {
    myToken: string;
  }
}
