import Asset from "../../db/models/asset";
import User from "../../db/models/user";

/**
 *
 * @param {request} request: Features Crypto_Compare key to act as minor protection of route,
 * @param {response} response: Seeds the db for favorited assets per other db references.
 * @returns
 */
export default async function handler(request, response) {
  if (request?.query?.SECRET === process.env.CRYPTO_COMPARE_KEY) {
    let users = await User.find().catch((err) => new Error(err, "IN GET USER"));

    let favoritesMap = {};

    if (users) {
      users.forEach((user) => {
        for (let favorite of user.favorites) {
          if (favoritesMap[favorite.title]) {
            favoritesMap[favorite.title]++;
          } else if (!favoritesMap[favorite.title]) {
            favoritesMap[favorite.title] = 1;
          }
        }
      });
    }

    for (let favorite in favoritesMap) {
      let asset = await Asset.findOneAndUpdate(
        { name: favorite },
        { favorite_count: favoritesMap[favorite] }
      ).catch();
    }

    response.status(200).json({
      body: "Sucess",
    });
  } else {
    response.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
    return;
  }
}
