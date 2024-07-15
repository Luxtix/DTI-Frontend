import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { cookies } from "next/headers";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.NEXT_PUBLIC_SECRET,
  debug: true,
  providers: [
    Credentials({
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const response = await fetch(`http://localhost:8080/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            credentials: "include",
          });

          if (!response.ok) {
            throw new Error("Failed to log in");
          }

          const data = await response.json();

          const useCookies = cookies();
          useCookies.set("Sid", data.accessToken, {
            httpOnly: true,
            secure: false,
            maxAge: 6000,
            path: "/",
          });

          return {
            id: data.id,
            email: data.email,
            sub: data.email,
            role: data.role,
            accessToken: data.accessToken,
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async authorized({ auth }) {
      return !!auth;
    },
    async session({ token, session }) {
      if (token.email) session.user.email = token.email;
      if (token.role) session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }) {
      if (user && user.email) {
        token.sub = user.email;
        token.email = user.email;
      }
      if (user && user.role) {
        token.role = user.role;
      }
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
