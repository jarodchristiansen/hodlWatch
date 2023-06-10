import { ApolloServer } from "apollo-server-micro";
import Cors from "micro-cors";

import connectDb from "../../db/config";
import resolvers from "../../db/resolvers/index";
// import { ApolloServer } from "@apollo/server";

import typeDefs from "../../db/schema";

// import { createContext } from "graphql/context";

connectDb();

export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ["POST", "OPTIONS"],
});

const server = new ApolloServer({
  // context: createContext,
  // schema,
  typeDefs,
  resolvers,
  context: () => {
    return {};
  },
  engine: {
    reportSchema: true,
  },
  playground: {
    settings: {
      "editor.theme": "dark",
      "request.credentials": "include",
    },
  },
});

const startServer = server.start();

export default cors(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;
  await server.createHandler({ path: "/api/graphql" })(req, res);
});
