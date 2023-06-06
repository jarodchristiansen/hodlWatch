import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { FormatUnixTime } from "@/helpers/formatters/time";
import ReadMoreButton from "@/components/commons/text/ReadMoreButton";
import { MediaQueries } from "@/styles/variables";

interface NewsBlockProps {
  story: StoryType;
}

interface StoryType {
  body: string;
  downvotes: string;
  guid: string;
  imageurl: string;
  lang: string;
  published_on: number;
  source: string;
  source_info: SourceInfoType;
  tags: string;
  title: string;
  upvotes: string;
  url: string;
}

interface SourceInfoType {
  img: string;
  name: string;
}

/**
 *
 * @param props NewsBlockProps: the components of the newsStory rendered in the block
 * @returns NewsBlock: news post block in news feed
 */
const NewsBlock = (props: NewsBlockProps) => {
  const { story } = props;

  return (
    <NewsItem>
      <div className="news-text-column">
        <span>{FormatUnixTime(story.published_on)}</span>

        <Link href={story?.guid} passHref legacyBehavior>
          <a target="_blank">
            <h4 className="article-header">{story.title}</h4>
          </a>
        </Link>

        <div className="main-image-container">
          <Image
            src={story.imageurl}
            height={250}
            width={250}
            alt="block-logo"
            unoptimized={true}
            priority
          />
        </div>

        <div className="story-body">
          <span>{story.body.slice(0, 160) + "..."}</span>
        </div>
      </div>

      <Link href={story?.guid} passHref legacyBehavior>
        <a target="_blank">
          <div className="source-row">
            <span className="source-name">{story?.source_info?.name}</span>
            <Image
              src={story.source_info?.img}
              height={55}
              width={55}
              alt="block-logo"
              unoptimized={true}
              priority
            />
          </div>
        </a>
      </Link>
    </NewsItem>
  );
};

const NewsItem = styled.div`
  border: 2px solid gray;
  text-align: center;
  padding: 2rem 0;
  border-radius: 12px;
  max-width: 52rem;
  box-shadow: 2px 4px 8px gray;
  background-color: white;

  .article-header {
    padding: 1rem;
  }

  .news-text-column {
    display: flex;
    flex-direction: column;
    margin: auto;
    gap: 1rem;

    .main-image-container {
      background-color: #f3e5f368;
      padding: 0.5rem 1rem;
      border-radius: 12px;
      justify-self: center;
      align-self: center;
      border: 1px solid gray;
      box-shadow: 0px 4px 10px lightgray;

      img {
        box-shadow: 0px 4px 10px lightgray;
        border: 1px solid gray;
        border-radius: 12px;
      }

      @media ${MediaQueries.MD} {
        padding: 0.5rem 2rem;
        max-width: 35rem;
      }
    }

    .story-body {
      padding: 2rem;
      font-weight: 500px;
    }
  }

  .source-row {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 0.5rem;
    gap: 1rem;
    font-size: 18px;
    max-width: 4rem;
    margin: auto;
  }

  .source-name {
    white-space: nowrap;
  }

  a:hover {
    text-decoration: underline;
  }
`;

export default NewsBlock;
