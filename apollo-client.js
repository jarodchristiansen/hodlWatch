import fetch from "cross-fetch";
// import { ApolloClient, HttpLink } from "@apollo/client";
// const client = new ApolloClient({
//   link: new HttpLink({ uri: "/graphql", fetch }),
// });

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  dataIdFromObject: (o) => o.id,
  link: new HttpLink({ uri: "http://localhost:3000/api/graphql", fetch }),
  cache: new InMemoryCache(),
  //     {
  //   typePolicies: {
  //     AssetFinancialDetails: {
  //       fields: {
  //         timeSeries: {
  //           read(LunarAssetDetails = {}) {
  //             // Return the cached name, transformed to upper case
  //             return LunarAssetDetails;
  //           },
  //         },
  //       },
  //     },
  //   },
  // }
});

export default client;
