import User from "../../db/models/user";
import Asset from "../../db/models/asset";
import CollectiveStats from "../../db/models/collective";

/**
 *
 * @param {request} request: Features Crypto_Compare key to act as minor protection of route,
 * @param {response} response: Seeds the db for favorited assets per other db references.
 * @returns
 */
export default async function handler(request, response) {
  if (request?.query?.SECRET === process.env.CRYPTO_COMPARE_KEY) {
    let data = {};

    let users = await User.find().catch((err) => console.log(err));
    let assets = await Asset.find().catch((err) => console.log(err));

    let topAssets = assets
      .filter((asset) => asset?.favorite_count)
      .sort((a, b) => b.favorite_count - a.favorite_count);

    data.date = new Date(Date.now());
    data.user_count = users.length;
    data.asset_count = assets.length;
    data.followed_assets = topAssets.length;
    data.top_assets = topAssets?.slice(0, 5).map((asset) => {
      return {
        id: asset.id,
        symbol: asset.symbol,
        name: asset.name,
        favorite_count: asset.favorite_count,
      };
    });

    console.log({ data }, data.top_assets);

    let collectiveData = new CollectiveStats(data);

    collectiveData.save();

    console.log("FINISHED COLLECTIVE DATA UPDATE");

    response.status(200).json({
      body: { data },
    });
  } else {
    response.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
    return;
  }
}
