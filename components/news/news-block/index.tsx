import { FormatUnixTime } from "@/helpers/formatters/time";
import {
  BorderRadius,
  Colors,
  FontWeight,
  MediaQueries,
  Shadows,
} from "@/styles/variables";
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
function externalStoryUrl(story: StoryType): string {
  const candidates = [story.url, story.guid];
  const found = candidates.find(
    (u) => typeof u === "string" && /^https?:\/\//i.test(u)
  );
  return found ?? "";
}

const NewsBlock = (props: NewsBlockProps) => {
  const { story } = props;
  const storyLink = externalStoryUrl(story);

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

        {storyLink ? (
          <Link
            href={storyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="source-link"
          >
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
          </Link>
        ) : (
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
        )}
      </div>
    </NewsItem>
  );
};

const NewsItem = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${Colors.midGray};
  align-items: center;
  text-align: center;
  padding: 18px;
  border-radius: ${BorderRadius.large};
  gap: 24px;
  position: relative;
  color: ${Colors.white};
  background: ${Colors.charcoal};
  box-shadow: ${Shadows.card};

  h4 {
    font-size: 1.3rem;
    font-weight: ${FontWeight.bold};
    color: ${Colors.white};

    a {
      color: ${Colors.white};
      &:hover {
        color: ${Colors.accent};
      }
    }

    @media ${MediaQueries.MD} {
      max-width: 700px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  img {
    border-radius: ${BorderRadius.medium};
  }

  .text-column {
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: 18px;

    .top-text-row {
      span {
        color: ${Colors.midGray};
      }

      @media ${MediaQueries.MD} {
        display: flex;
        justify-content: space-between;
      }
    }

    .story-body {
      background-color: rgba(58, 80, 107, 0.3);
      text-align: center;
      padding: 12px;
      border: 1px solid ${Colors.midGray};
      border-radius: ${BorderRadius.small};
    }
  }

  .source-row {
    display: flex;
    gap: 12px;
    align-items: center;
    max-width: 40%;
    margin: auto;
    font-weight: ${FontWeight.bold};
    color: ${Colors.white};

    @media ${MediaQueries.MD} {
      max-width: 40%;
      margin: auto;
    }
  }

  @media ${MediaQueries.MD} {
    flex-direction: row;
    justify-content: space-evenly;
    min-width: 100%;
    gap: 24px;
    text-align: start;
  }
`;

export default NewsBlock;
