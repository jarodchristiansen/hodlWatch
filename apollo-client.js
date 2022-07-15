import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  dataIdFromObject: (o) => o.id,
  uri: "http://localhost:3000/api/graphql",
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
