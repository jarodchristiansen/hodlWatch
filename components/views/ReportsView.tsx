import { GET_ASSET_SOCIALS } from "@/helpers/queries/assets";
import { GET_ASSET_NEWS } from "@/helpers/queries/news-feed";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";
import styled from "styled-components";
import LoadingSpinner from "../commons/animations/LoadingSpinner";
import NewsBlock from "../news/news-block";

const ReportsView = ({ id }) => {
  const [getNews, { data, loading, error, refetch }] =
    useLazyQuery(GET_ASSET_NEWS);

  const [
    getSocials,
    {
      data: socialData,
      loading: socialLoading,
      error: socialError,
      refetch: socialRefetch,
    },
  ] = useLazyQuery(GET_ASSET_SOCIALS);

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

  console.log({ socialData });

  const NewsFeed = useMemo(() => {
    if (!data?.getAssetNews?.length) return [];

    return data?.getAssetNews.map((news, idx) => {
      return <NewsBlock story={news} key={idx} />;
    });
  }, [data?.getAssetNews]);

  return (
    <NewsFeedContainer>
      {loading && (
        <div className={"container text-center"}>
          <LoadingSpinner />
        </div>
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
