import NextAuth from "next-auth";
import Providers from "next-auth/providers";
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import clientPromise from "../../../lib/mongodb";
// import { MongoClient } from "mongodb";
// import { hashPassword, verifyPassword } from "../../../lib/auth";

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

const options = {
  // site: process.env.NEXTAUTH_URL,
  session: {
    jwt: true,
  },
  callbacks: {
    async session(session, token) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
    async jwt(token, user) {
      if (user) {
        token.accessToken = user._id;
        token.user = user;
      }
      return token;
    },
    async signIn(user, account, metadata) {
      let emails;
      let primaryEmail;

      if (account?.provider === "github") {
        const emailRes = await fetch("https://api.github.com/user/emails", {
          headers: {
            Authorization: `token ${account.accessToken}`,
          },
        });
        emails = await emailRes.json();
        primaryEmail = emails.find((e) => e.primary).email;

        user.email = primaryEmail;
      }

      // const client = await MongoClient.connect(`${process.env.MONGODB_URI}`);
      // const db = client.db();

      // const existingUser = await db
      //   .collection("users")
      //   .findOne({ email: user?.email });

      // if (existingUser) {
      //   user.favorites = existingUser?.favorites;

      //   if (!existingUser?.username) {
      //     let newId = makeid(12).toString() + "!@$";
      //     user.username = newId;

      //     const result = await usersCollection.updateOne(
      //       { email: user?.email },
      //       { $set: { username: newId } }
      //     );
      //   } else {
      //     user.username = existingUser?.username;
      //   }
      // } else {
      //   let tempId = makeid(12).toString() + "!@$";

      //   const result = await db.collection("users").insertOne({
      //     email: user?.email,
      //     name: user?.name,
      //     image: user?.image,
      //     username: tempId,
      //   });
      //   user.username = tempId;
      // }
    },
  },
  providers: [
    // Providers.Email({
    //   server: {
    //     port: 465,
    //     host: "smtp.gmail.com",
    //     secure: true,
    //     auth: {
    //       user: process.env.EMAIL_USERNAME,
    //       pass: process.env.EMAIL_PASSWORD,
    //     },
    //     tls: {
    //       rejectUnauthorized: false,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    // }),
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Providers.Credentials({
      async authorize(credentials) {
        // let client = await MongoClient.connect(`${process.env.MONGODB_URI}`);
        // const db = client.db("Crypto_Watch");
        // const usersCollection = db.collection("users");
        // const user = await usersCollection.findOne({
        //   email: credentials.email,
        // });
        // console.log("this is the user", user);
        // if (!user) {
        //   throw new Error("No user found!");
        // }
        // const isValid = await verifyPassword(
        //   credentials.password,
        //   user.password
        // );
        // if (!isValid) {
        //   throw new Error("Could not log you in");
        // }
        // let userCopy = JSON.parse(JSON.stringify(user));
        // delete userCopy["password"];
        // return userCopy;
        // client.close();
      },
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    Providers.Twitter({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
  ],
  // ******** !!!! ADD BELOW LINE !!!! **********
  // Prevents localhost issue on vercel auth deployment
  secret: "PLACE-HERE-ANY-STRING",
  // database: process.env.MONGODB_URI,
  pages: {
    signIn: "/auth",
  },
};
//
// export default async function auth(req, res, options) {
//     return await NextAuth(req, res, options, {
//         adapter: MongoDBAdapter({
//             db: (await clientPromise).db("your-database")
//         }),
//     })
// }

export default async (req, res) => NextAuth(req, res, options);
