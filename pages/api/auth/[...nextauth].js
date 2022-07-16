import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import User from "../../../db/models/user";
import { verifyPassword } from "../../../helpers/auth/auth";

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

async function addUserNameToExistingWithout(existingUser, user) {
  if (!existingUser?.username) {
    let newId = makeid(12).toString() + "!@$";
    user.username = newId;

    console.log({ existingUser, user });

    let result = await User.findOneAndUpdate(
      { email: user.user.email },
      { username: newId }
    );

    console.log({ result });
    return result;
  }
}

const options = {
  // site: process.env.NEXTAUTH_URL,
  secret: process.env.NEXT_PUBLIC_SECRET,
  // session: {
  //   jwt: true,
  // },
  callbacks: {
    // async session(session) {
    //   return session;
    // },
    async signIn(user, account, metadata) {
      try {
        const existingUser = await User.find({ email: user.user.email });

        if (existingUser && existingUser.length > 0) {
          addUserNameToExistingWithout(existingUser, user);

          return existingUser;
        }

        let tempId = makeid(25).toString() + "!@$";
        Object.assign(user.user, { username: tempId });

        const userObject = new User(user.user);
        const result = await userObject.save();
        return result;
      } catch (err) {
        console.log(err);
      }
    },
  },
  // callbacks: {
  //   async session(session, token) {
  //     session.accessToken = token.accessToken;
  //     session.user = token.user;
  //     return session;
  //   },
  //   async jwt(token, user) {
  //     if (user) {
  //       token.accessToken = user._id;
  //       token.user = user;
  //     }
  //     return token;
  //   },
  //   async signIn(user, account, metadata) {
  //     let emails;
  //     let primaryEmail;
  //
  //     if (account?.provider === "github") {
  //       const emailRes = await fetch("https://api.github.com/user/emails", {
  //         headers: {
  //           Authorization: `token ${account.accessToken}`,
  //         },
  //       });
  //       emails = await emailRes.json();
  //       primaryEmail = emails.find((e) => e.primary).email;
  //
  //       user.email = primaryEmail;
  //     }
  //     const client = await MongoClient.connect(`${process.env.MONGODB_URI}`);
  //     const db = client.db();
  //
  //     const existingUser = await db
  //       .collection("users")
  //       .findOne({ email: user?.email });
  //
  //     if (existingUser) {
  //       user.favorites = existingUser?.favorites;
  //
  //       if (!existingUser?.username) {
  //         let newId = makeid(12).toString() + "!@$";
  //         user.username = newId;
  //
  //         const result = await usersCollection.updateOne(
  //           { email: user?.email },
  //           { $set: { username: newId } }
  //         );
  //       } else {
  //         user.username = existingUser?.username;
  //       }
  //     } else {
  //       let tempId = makeid(12).toString() + "!@$";
  //
  //       const result = await db.collection("users").insertOne({
  //         email: user?.email,
  //         name: user?.name,
  //         image: user?.image,
  //         username: tempId,
  //       });
  //       user.username = tempId;
  //     }
  //   },
  // },
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
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      // credentials: {
      //   username: { label: "Username", type: "text", placeholder: "jsmith" },
      //   password: { label: "Password", type: "password" },
      // },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        console.log({ credentials });

        const { password, email } = credentials;

        const user = await User.find({ email });

        console.log("user.password", user[0]?.password);

        if (!user) {
          throw new Error("No user found matching this email address");
        }

        const isValid = await verifyPassword(password, user[0]?.password);

        console.log({ isValid });

        if (!isValid) {
          throw new Error("Could not log you in");
        } else {
          return user;
        }

        // const user = { id: 1, name: "J Smith", email: "jsmith@example.com" };

        // if (user) {
        //   // Any object returned will be saved in `user` property of the JWT
        //   return user;
        // } else {
        //   // If you return null then an error will be displayed advising the user to check their details.
        //   return null;
        //
        //   // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        // }
      },
    }),
    // CredentialsProvider({
    //   async authorize(credentials) {
    //     let client = await MongoClient.connect(`${process.env.MONGODB_URI}`);
    //
    //     const db = client.db("Crypto_Watch");
    //
    //     const usersCollection = db.collection("users");
    //
    //     const user = await usersCollection.findOne({
    //       email: credentials.email,
    //     });
    //
    //     console.log("this is the user", user);
    //
    //     if (!user) {
    //       throw new Error("No user found!");
    //     }
    //
    //     const isValid = await verifyPassword(
    //       credentials.password,
    //       user.password
    //     );
    //
    //     if (!isValid) {
    //       throw new Error("Could not log you in");
    //     }
    //
    //     let userCopy = JSON.parse(JSON.stringify(user));
    //
    //     delete userCopy["password"];
    //
    //     return userCopy;
    //
    //     client.close();
    //   },
    // }),

    // Providers.GitHub({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    // Providers.Google({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // }),
    // Providers.Credentials({
    //   async authorize(credentials) {
    //     let client = await MongoClient.connect(`${process.env.MONGODB_URI}`);
    //
    //     const db = client.db("Crypto_Watch");
    //
    //     const usersCollection = db.collection("users");
    //
    //     const user = await usersCollection.findOne({
    //       email: credentials.email,
    //     });
    //
    //     console.log("this is the user", user);
    //
    //     if (!user) {
    //       throw new Error("No user found!");
    //     }
    //
    //     const isValid = await verifyPassword(
    //       credentials.password,
    //       user.password
    //     );
    //
    //     if (!isValid) {
    //       throw new Error("Could not log you in");
    //     }
    //
    //     let userCopy = JSON.parse(JSON.stringify(user));
    //
    //     delete userCopy["password"];
    //
    //     return userCopy;
    //
    //     client.close();
    //   },
    // }),
  ],

  database: process.env.MONGODB_URI,
  pages: {
    signIn: "/auth",
  },
};

export default async (req, res) => NextAuth(req, res, options);
