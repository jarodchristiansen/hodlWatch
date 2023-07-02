export const NewsFeedResolver = {
  getNewsFeed: async (_, {}) => {
    try {
      let newsData = await fetch(
        `https://min-api.cryptocompare.com/data/v2/news/?lang=EN`
      ).then((response) => response.json());

      if (newsData.Data) {
        return newsData.Data;
      }
    } catch (err) {
      throw new Error(err, "No news feed found");
    }
  },
};
