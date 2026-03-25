import { GET_ASSET_SOCIALS } from "@/helpers/queries/assets";
import { GET_ASSET_NEWS } from "@/helpers/queries/news-feed";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";
import styled from "styled-components";

import LoadingSpinner from "../commons/animations/LoadingSpinner";
import NewsBlock from "../news/news-block";

const ReportsView = ({ id }) => {
  const [getNews, { data, loading }] = useLazyQuery(GET_ASSET_NEWS);

  const [getSocials] = useLazyQuery(GET_ASSET_SOCIALS);

  useEffect(() => {
    getNews({
      variables: {
        symbol: id,
      },
    });

    getSocials({
      variables: {
        symbol: id,
      },
    });
  }, [id, getNews, getSocials]);

  const NewsFeed = useMemo(() => {
    if (!data?.getAssetNews?.length) return [];

    return data?.getAssetNews.map((news) => {
      return (
        <NewsBlock story={news} key={news.guid ?? news.url ?? news.title} />
      );
    });
  }, [data?.getAssetNews]);

  return (
    <NewsFeedContainer>
      {loading && (
        <LoadingSpinner overlay message="Loading reports" />
      )}
      {data && NewsFeed}
    </NewsFeedContainer>
  );
};

const NewsFeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding-top: 24px;
`;

export default ReportsView;
