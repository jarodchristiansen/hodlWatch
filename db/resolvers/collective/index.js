export const CollectiveResolver = {
  // getCollectiveStats: async (_, ) => {

  // },
  getAssets: async (_, { offset, limit, topListBy }) => {
    try {
      const CoinGeckoClient = new CoinGecko();
      let assets = await CoinGeckoClient.coins.all({
        page: offset,
        per_page: limit,
      });
      // const assets = await Asset.find({});
      return assets?.data;
    } catch (err) {
      console.log(err);
    }
  },
};
