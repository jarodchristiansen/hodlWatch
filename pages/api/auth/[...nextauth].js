// import NextAuth from "next-auth";
// // import Providers from "next-auth/providers";
// // import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import clientPromise from "../../../lib/mongodb";
// // import { MongoClient } from "mongodb";
// // import { hashPassword, verifyPassword } from "../../../lib/auth";
// import User from "../../../db/models/user";
// import GithubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

// function makeid(length) {
//   var result = "";
//   var characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   var charactersLength = characters.length;
//   for (var i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   return result;
// }

// const options = {
//   // site: process.env.NEXTAUTH_URL,
//   database: process.env.MONGODB_URI,
//   session: {
//     jwt: true,
//   },

//   callbacks: {
//     async session(session, token) {
//       session.accessToken = token.accessToken;
//       session.user = token.user;
//       return session;
//     },
//     async jwt(token, user) {
//       if (user) {
//         token.accessToken = user._id;
//         token.user = user;
//       }
//       return token;
//     },
//     async signIn(user, account, metadata) {
//       let emails;
//       let primaryEmail;

//       // if (account?.provider === "github") {
//       //   const emailRes = await fetch("https://api.github.com/user/emails", {
//       //     headers: {
//       //       Authorization: `token ${account.accessToken}`,
//       //     },
//       //   });
//       //   emails = await emailRes.json();
//       //   primaryEmail = emails.find((e) => e.primary).email;

//       //   user.email = primaryEmail;
//       // }

//       // const email = user?.email;

//       // const users = await User.find({ email });

//       // let existingUser = users.length ? users[0].toObject() : [];

//       // if (!Object.keys(existingUser)?.length) {
//       //   await User.create(user);
//       // } else {
//       //   user = existingUser;
//       // }

//       // if (existingUser) {
//       //   user.favorites = existingUser?.favorites;

//       //   if (!existingUser?.username) {
//       //     let newId = makeid(12).toString() + "!@$";
//       //     user.username = newId;

//       //     const result = await usersCollection.updateOne(
//       //       { email: user?.email },
//       //       { $set: { username: newId } }
//       //     );
//       //   } else {
//       //     user.username = existingUser?.username;
//       //   }
//       // } else {
//       //   let tempId = makeid(12).toString() + "!@$";

//       //   const result = await db.collection("users").insertOne({
//       //     email: user?.email,
//       //     name: user?.name,
//       //     image: user?.image,
//       //     username: tempId,
//       //   });
//       //   user.username = tempId;
//       // }
//     },
//   },
//   providers: [
//     // Providers.Email({
//     //   server: {
//     //     port: 465,
//     //     host: "smtp.gmail.com",
//     //     secure: true,
//     //     auth: {
//     //       user: process.env.EMAIL_USERNAME,
//     //       pass: process.env.EMAIL_PASSWORD,
//     //     },
//     //     tls: {
//     //       rejectUnauthorized: false,
//     //     },
//     //   },
//     //   from: process.env.EMAIL_FROM,
//     // }),
//     // Providers.Coinbase({
//     //   clientId: process.env.COINBASE_CLIENT_ID,
//     //   clientSecret: process.env.COINBASE_CLIENT_SECRET,
//     //   // scope: "wallet:accounts:read,wallet:transactions:read",
//     // }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//     }),
//     GithubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),

//     // Providers.GitHub({
//     //   clientId: process.env.GITHUB_ID,
//     //   clientSecret: process.env.GITHUB_SECRET,
//     // }),
//     // Providers.Google({
//     //   clientId: process.env.GOOGLE_ID,
//     //   clientSecret: process.env.GOOGLE_SECRET,
//     // }),
//     // Providers.Credentials({
//     //   async authorize(credentials) {
//     //     const email = credentials.email;

//     //     const users = await User.find({ email });

//     //     let existingUser = users.length ? users[0].toObject() : [];

//     //     // if (!user) {
//     //     //   throw new Error("No user found!");
//     //     // }
//     //     // const isValid = await verifyPassword(
//     //     //   credentials.password,
//     //     //   user.password
//     //     // );
//     //     // if (!isValid) {
//     //     //   throw new Error("Could not log you in");
//     //     // }
//     //     // let userCopy = JSON.parse(JSON.stringify(user));
//     //     // delete userCopy["password"];
//     //     // return userCopy;
//     //     // client.close();
//     //   },
//     // }),
//     // Providers.Facebook({
//     //   clientId: process.env.FACEBOOK_ID,
//     //   clientSecret: process.env.FACEBOOK_SECRET,
//     // }),
//     // Providers.Twitter({
//     //   clientId: process.env.TWITTER_ID,
//     //   clientSecret: process.env.TWITTER_SECRET,
//     // }),
//   ],
//   // ******** !!!! ADD BELOW LINE !!!! **********
//   // Prevents localhost issue on vercel auth deployment
//   secret: "PLACE-HERE-ANY-STRING",
//   database: process.env.MONGODB_URI,
//   pages: {
//     signIn: "/auth",
//   },
// };
// //
// export default async function auth(req, res, options) {
//   return await NextAuth(req, res, options, {
//     adapter: MongoDBAdapter({
//       db: (await clientPromise).db("your-database"),
//     }),
//   });
// }

// // export default async (req, res) => NextAuth(req, res, options);

import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import Auth0Provider from "next-auth/providers/auth0";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"
import clientPromise from "../../../lib/mongodb";
import User from "../../../db/models/user";

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    /* EmailProvider({
         server: process.env.EMAIL_SERVER,
         from: process.env.EMAIL_FROM,
       }),
    // Temporarily removing the Apple provider from the demo site as the
    // callback URL for it needs updating due to Vercel changing domains
    Providers.Apple({
      clientId: process.env.APPLE_ID,
      clientSecret: {
        appleId: process.env.APPLE_ID,
        teamId: process.env.APPLE_TEAM_ID,
        privateKey: process.env.APPLE_PRIVATE_KEY,
        keyId: process.env.APPLE_KEY_ID,
      },
    }),
    */
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET,
    // }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // TwitterProvider({
    //   clientId: process.env.TWITTER_ID,
    //   clientSecret: process.env.TWITTER_SECRET,
    // }),
    // Auth0Provider({
    //   clientId: process.env.AUTH0_ID,
    //   clientSecret: process.env.AUTH0_SECRET,
    //   issuer: process.env.AUTH0_ISSUER,
    // }),
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
      console.log({ user, account, profile, email, credentials });

      let userEmail = user?.email;
      let existingUser = await User.findOne({ email: userEmail });

      console.log({ existingUser }, "jfound user");
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
