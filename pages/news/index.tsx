import { useLazyQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";
import { GET_NEWS_FEED } from "../../helpers/queries/news-feed";
import styled from "styled-components";
import Image from "next/image";
import PriceScreener from "../../components/commons/screener";
import { FormatUnixTime } from "../../helpers/formatters/time";
import { MediaQueries } from "../../styles/MediaQueries";
import Link from "next/link";
import ReadMoreButton from "../../components/commons/text/ReadMoreButton";

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

    return data.getNewsFeed.slice(0, 5).map((story) => {
      console.log({ story });
      return (
        <NewsItem>
          <div className="news-text-column">
            <span>{FormatUnixTime(story.published_on)}</span>

            <Link href={story?.guid} passHref>
              <a target="_blank">
                <h4 className="partner-header">{story.title}</h4>
              </a>
            </Link>

            {/* <Image
              src={story.imageurl}
              height={"140px"}
              width={"190px"}
              alt="block-logo"
              className="partner-image"
            /> */}

            <ReadMoreButton>{story.body}</ReadMoreButton>
          </div>

          <Link href={story?.guid} passHref>
            <a target="_blank">
              <span>{story?.source_info?.name}</span>
              <Image
                src={story.source_info?.img}
                height={"90px"}
                width={"90px"}
                alt="block-logo"
                className="partner-image"
              />
            </a>
          </Link>
        </NewsItem>
      );
    });

    console.log({ data });
  }, [data]);

  return (
    <PageWrapper>
      <PriceScreener />
      News Feed Page
      <FilterBar>
        <button className="standardized-button">All</button>
        <button className="standardized-button">All</button>
        <button className="standardized-button">All</button>
      </FilterBar>
      <NewsFeed>{newsFeedContent}</NewsFeed>
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
`;

const NewsFeed = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid black;

  @media ${MediaQueries.MD} {
    margin: 1rem 3rem;
  }
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
