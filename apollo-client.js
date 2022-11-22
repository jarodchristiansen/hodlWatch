import fetch from "cross-fetch";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  dataIdFromObject: (o) => o.id,
  link: new HttpLink({
    uri: "https://hodl-watch.vercel.app/api/graphql",
    fetch,
  }),
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
