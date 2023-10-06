import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@models/user";
import { connectToDB } from "@utils/database";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials;
        if (email == "" || password == "") {
          return new Response(
            JSON.stringify({ message: "Invalid credentials" }),
            { status: 401 }
          );
        }
        try {
          //perform user verification logic
          await connectToDB();
          console.log(email, password);
          const user = await User.findOne({
            email: email,
            isVerified: true,
          });
          if (!user) {
            throw new Error("Invalid credentials");
          }
          let result = await bcrypt.compare(password, user.password);
          console.log(result);
          if (!result) {
            throw new Error("Invalid credentials");
          }

          return {
            name: user.name,
            email: user.email,
            id: user._id,
            role: user.role,
          };
        } catch (error) {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.userId = user._id;
        token.role = user.role;
      }
      return token;
    },
  },

  pages: {
    signIn: "/user/login",
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
