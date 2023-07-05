import { FormatUnixTime } from "@/helpers/formatters/time";
import { Colors, FontWeight, MediaQueries } from "@/styles/variables";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

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
      <Image
        src={story.imageurl}
        height={150}
        width={150}
        alt="block-logo"
        unoptimized={true}
        priority
      />

      <div className="text-column">
        <div className="top-text-row">
          <Link href={story?.guid} passHref legacyBehavior>
            <a target="_blank">
              <h4 className="article-header">{story.title}</h4>
            </a>
          </Link>

          <span>{FormatUnixTime(story.published_on)}</span>
        </div>

        <div className="story-body">
          <span>{story.body.slice(0, 300) + "..."}</span>
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
      </div>
    </NewsItem>
  );
};

const NewsItem = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${Colors.lightGray};
  align-items: center;
  text-align: center;
  padding: 12px;
  border-radius: 12px;
  gap: 24px;
  position: relative;

  h4 {
    font-size: 1.3rem;
    font-weight: ${FontWeight.bold};

    @media ${MediaQueries.MD} {
      max-width: 450px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  img {
    border-radius: 12px;
  }

  .text-column {
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: 18px;

    .top-text-row {
      span {
        color: ${Colors.elegant.accentPurple};
      }

      @media ${MediaQueries.MD} {
        display: flex;
        justify-content: space-between;
      }
    }

    .story-body {
      background-color: #acb6bd1a;
      text-align: center;
      padding: 12px;
      border: 1px solid lightgray;
      border-radius: 6px;
    }
  }

  .source-row {
    display: flex;
    gap: 12px;
    align-items: center;
    max-width: 40%;
    margin: auto;
    font-weight: ${FontWeight.bold};

    @media ${MediaQueries.MD} {
      max-width: 40%;
      margin: auto;
    }
  }

  @media ${MediaQueries.MD} {
    flex-direction: row;
    justify-content: space-evenly;
    max-width: 780px;
    gap: 24px;
    text-align: start;
  }
`;

export default NewsBlock;
