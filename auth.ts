import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { cookies } from "next/headers";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.NEXT_PUBLIC_SECRET,
  debug: true,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to log in");
          }

          const { data } = await response.json();

          const cookieStore = cookies();
          cookieStore.set("sid", data.token);

          return {
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.role,
            accessToken: data.token,
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
    session: async ({ token, session }) => {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },
    jwt: async ({ token, user }) => {
      if (user) token.role = user.role;
      console.log(token);
      return token;
    },
  },
  session: { strategy: "jwt", maxAge: 60 * 60 * 1 },
  pages: {
    signIn: "/sign-in",
  },
  jwt: {
    maxAge: 60 * 60 * 1,
  },
  cookies: {
    sessionToken: {
      name: `session-jwt`,
      options: {
        httpOnly: true,
        sameSite: "lax",
      },
    },
  },
});
