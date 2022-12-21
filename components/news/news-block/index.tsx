import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { FormatUnixTime } from "@/helpers/formatters/time";
import ReadMoreButton from "@/components/commons/text/ReadMoreButton";

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

        <Link href={story?.guid} passHref>
          <a target="_blank">
            <h4 className="article-header">{story.title}</h4>
          </a>
        </Link>

        <Image
          src={story.imageurl}
          height={"0px"}
          width={"100px"}
          alt="block-logo"
          layout="responsive"
          unoptimized={true}
        />

        {story.body.slice(0, 160) + "..."}
      </div>

      <Link href={story?.guid} passHref>
        <a target="_blank">
          <div className="source-row">
            <span>{story?.source_info?.name}</span>
            <Image
              src={story.source_info?.img}
              height={"50px"}
              width={"50px"}
              alt="block-logo"
              layout="fixed"
              unoptimized={true}
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
  padding: 2rem 3rem;
  border-radius: 12px;
  max-width: 52rem;
  box-shadow: 2px 4px 8px gray;

  .article-header {
    padding: 1rem 0;
  }

  .news-text-column {
    display: flex;
    flex-direction: column;
    margin: auto;
  }

  .source-row {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 0.5rem;
    gap: 1rem;
    font-size: 18px;
  }

  a:hover {
    text-decoration: underline;
  }
`;

export default NewsBlock;
