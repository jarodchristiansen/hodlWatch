import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import User from "../../../db/models/user";

function makeid(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return result;
}

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin";
      return token;
    },
    async session({ session, token, user }) {
      session.user.username = user.username;
      session.user.favorites = user.favorites;

      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      let userEmail = user?.email;
      let existingUser = await User.findOne({ email: userEmail });

      if (existingUser) {
        if (!existingUser?.username) {
          let newId = makeid(12).toString() + "!@$";
          existingUser.username = newId;
          await existingUser.save();
        }
      } else if (!existingUser) {
        return;
      }

      return user;
    },
  },
  secret: "PLACE-HERE-ANY-STRING",
  pages: {
    signIn: "/auth",
  },
};

export default NextAuth(authOptions);
