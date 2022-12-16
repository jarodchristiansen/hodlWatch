import User from "../../models/user";

export const UserResolver = {
  queries: {
    getAssetPriceData: async (_, { tickers, exchange_data }) => {
      if (tickers) {
        try {
          const { public_key: publicKey, private_key: privateKey } =
            exchange_data;

          const ccxt = require("ccxt");

          const exchange = new ccxt.coinbase({
            apiKey: publicKey,
            secret: privateKey,
          });

          let prices = await exchange.fetchTickers(tickers);
          let assetArray = [];

          if (prices) {
            for (let i in prices) {
              assetArray.push({ symbol: i, info: 1 / prices[i].info });
            }
          }
          // prices = prices.map((asset) => {
          //   console.log({ asset });
          // });

          return assetArray;
        } catch (err) {}
      }
    },
    getUserExchangeData: async (_, { input }) => {
      const {
        exchangeData,
        public_key: publicKey,
        private_key: privateKey,
      } = input;

      const ccxt = require("ccxt");

      try {
        const exchange = new ccxt.coinbase({
          apiKey: publicKey,
          secret: privateKey,
        });

        let balance = {};
        let tickers = [];

        let list = await exchange.fetchBalance();

        balance = Object.entries(list.free)
          .filter((entry) => entry[1] > 0)
          .map((entry) => {
            tickers.push(`${entry[0]}/USD`);

            return {
              symbol: entry[0],
              balance: entry[1],
              ticker: `${entry[0]}/USD`,
            };
          });

        let prices = await exchange.fetchTickers(tickers);
        let assetArray = [];

        if (prices) {
          for (let i in prices) {
            assetArray.push({
              symbol: prices[i].symbol,
              usd: 1 / prices[i].info,
            });
          }
        }

        const result = balance.map((asset) => ({
          ...asset,
          ...assetArray.find((price) => price.symbol === asset.ticker),
        }));

        return { balances: result };
      } catch (err) {
        console.log({ err });
      }
    },

    getUser: async (_, { email }) => {
      const user = await User.find({ email }).then((res) => res[0].toObject());

      if (user?.favorites) {
        for (let i of user.favorites) {
          i.id = user.favorites.indexOf(i);
        }
      }

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    },
  },
  mutations: {
    removeFavorite: async (_, { input }) => {
      const { asset, email } = input;

      try {
        let user = await User.findOne({ email });

        if (user) {
          if (
            user.favorites.find(
              (item) =>
                item?.symbol?.toLowerCase() === asset.symbol.toLowerCase()
            )
          ) {
            user.favorites = user.favorites.filter(function (item) {
              return item?.symbol?.toLowerCase() !== asset.symbol.toLowerCase();
            });

            user.save();

            return user;
          }
        }
        return "user not found";
      } catch (err) {
        console.log("Err in removeFavorite!!", err);
      }
    },

    addFavorite: async (_, { input }) => {
      const { asset, email } = input;

      try {
        let user = await User.findOne({ email });

        if (user) {
          if (
            user.favorites.find(
              (item) =>
                item?.symbol?.toLowerCase() === asset.symbol.toLowerCase()
            )
          ) {
            console.log("ALREADY IN FAVORITES", { user, asset });

            return;
          }

          console.log("ADDING ASSET", { asset });
          user.favorites.push(asset);

          user.save();
        }

        return user;
      } catch (err) {
        console.log("Err in addFavorite!!", err);
      }
    },
    updateUsername: async (_, { input }) => {
      const { username, email } = input;

      try {
        let user = await User.findOne({ email });

        let inputMatch = await User.findOne({ username: username });

        inputMatch && new Error("User name already exists");

        if (user && !inputMatch) {
          user.username = username;
          await user.save();
          return user;
        }
      } catch (err) {
        console.log("Error in updating username!", { err });
      }
    },
  },
};
