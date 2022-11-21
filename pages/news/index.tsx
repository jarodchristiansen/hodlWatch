import { useLazyQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";
import { GET_NEWS_FEED } from "../../helpers/queries/news-feed";
import styled from "styled-components";
import Image from "next/image";
import PriceScreener from "../../components/commons/screener";
import { FormatUnixTime } from "../../helpers/formatters/time";

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

  const newsFeedContent = useMemo(() => {
    if (!data?.getNewsFeed?.length) return [];

    console.log({ data });

    return data.getNewsFeed.slice(0, 5).map((story) => {
      return (
        <NewsItem>
          <div className="news-text-column">
            <span>{FormatUnixTime(story.published_on)}</span>
            <h4 className="partner-header">{story.title}</h4>

            {/* <Image
              src={story.imageurl}
              height={"140px"}
              width={"190px"}
              alt="block-logo"
              className="partner-image"
            /> */}

            <span>{story.body}</span>
          </div>

          <span>{story?.source_info?.name}</span>
          <Image
            src={story.source_info?.img}
            height={"90px"}
            width={"90px"}
            alt="block-logo"
            className="partner-image"
          />
        </NewsItem>
      );
    });

    console.log({ data });
  }, [data]);

  return (
    <PageWrapper>
      <PriceScreener />
      News Feed Page
      <NewsFeed>{newsFeedContent}</NewsFeed>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const NewsFeed = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid black;
  margin: 1rem 3rem;
`;

const NewsItem = styled.div`
  border: 2px solid black;
  text-align: center;
  padding: 2rem 2rem;

  .news-text-column {
    display: flex;
    flex-direction: column;
    max-width: 80%;
    margin: auto;
  }

  /* border: 2px solid black;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  padding: 1rem 2rem;
  justify-content: start;
  max-height: 22rem;
  min-width: 22rem; */
`;

export default NewsFeedPage;
