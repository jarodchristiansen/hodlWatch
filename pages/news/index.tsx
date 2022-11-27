import { useLazyQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import { GET_NEWS_FEED } from "../../helpers/queries/news-feed";
import styled from "styled-components";
import PriceScreener from "../../components/commons/screener";
import { MediaQueries } from "../../styles/MediaQueries";
import Head from "next/head";
import NewsBlock from "../../components/news/news-block";

const NewsFeedPage = () => {
  const [
    fetchNewsFeed,
    { data, loading: newsLoading, error, called, refetch },
  ] = useLazyQuery(GET_NEWS_FEED);

  // useEffect(() => {
  //   console.log({ session });
  // }, [loading]);

  useEffect(() => {
    fetchNewsFeed();
  }, []);

  const [articleLimit, setArticleLimit] = useState(5);
  const [contentLength, setContentLength] = useState(0);
  const [shouldFetchContent, setShouldFetchContent] = useState(true);

  const newsFeedContent = useMemo(() => {
    if (!data?.getNewsFeed?.length) return [];

    return data.getNewsFeed.slice(0, articleLimit).map((story) => {
      return <NewsBlock story={story} />;
    });
  }, [data, articleLimit]);

  useEffect(() => {
    if (
      contentLength !== newsFeedContent?.length ||
      newsFeedContent.length === 0
    ) {
      setContentLength(newsFeedContent.length);
    } else {
      setShouldFetchContent(false);
    }
  }, [newsFeedContent]);

  console.log({ articleLimit, data, newsFeedContent });

  const increaseArticleLimit = () => {
    if (shouldFetchContent) {
      setArticleLimit(articleLimit + 5);
    }
  };

  return (
    <PageWrapper>
      <Head>
        <title>HodlWatch- NewsFeed</title>
      </Head>
      <PriceScreener />
      <h2>Live Updates</h2>
      {/* <FilterBar>
        <button className="standardized-button">All</button>
        <button className="standardized-button">All</button>
        <button className="standardized-button">All</button>
        <button className="standardized-button" onClick={increaseArticleLimit}>
          Add More Articles
        </button>
      </FilterBar> */}
      <NewsFeed>{newsFeedContent}</NewsFeed>

      {shouldFetchContent && (
        <div className="fetch-more-button-holder">
          <button
            className="standardized-button"
            onClick={increaseArticleLimit}
          >
            + More Articles
          </button>
        </div>
      )}
      {!shouldFetchContent && <div>No More Fetchy Block</div>}
    </PageWrapper>
  );
};

const FilterBar = styled.div`
  display: flex;
  flex-direction: row;
  position: sticky;
  top: 4.3rem;
  z-index: 100;
  width: 100%;
  justify-content: center;
  gap: 2rem;
  background-color: white;
  padding: 1rem 1rem;

  @media ${MediaQueries.MD} {
    top: 2.6rem;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: relative;

  .fetch-more-button-holder {
    padding: 2rem 0;
  }
`;

const NewsFeed = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media ${MediaQueries.MD} {
    margin: 1rem 0;
    /* max-width: 42rem; */
  }
`;

export default NewsFeedPage;
