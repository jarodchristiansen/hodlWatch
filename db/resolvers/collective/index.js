import CollectiveStats from "../../models/collective";

export const CollectiveResolver = {
  getCollectiveStats: async (_, {}) => {
    try {
      let collectiveStats = await CollectiveStats.find().catch(
        (err) => new Error(err)
      );

      if (collectiveStats && collectiveStats.length > 1) {
        return collectiveStats.slice(-1);
      } else if (collectiveStats && collectiveStats.length === 1) {
        return collectiveStats[0];
      }

      return collectiveStats;
    } catch (err) {
      throw new Error(err);
    }
  },
};
