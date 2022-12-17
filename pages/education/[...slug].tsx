import { useEffect, useMemo } from "react";
import { GET_POST } from "../../helpers/queries/posts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import styled from "styled-components";
import Image from "next/image";
import { MediaQueries } from "../../styles/MediaQueries";
import RelatedPostsRow from "../../components/posts/RelatedPosts";
import Link from "next/link";
import { Colors } from "../../styles/Colors";
import Head from "next/head";
import client from "../../apollo-client";

const EducationArticle = ({ data }) => {
  const headerImage = useMemo(() => {
    if (!data?.getPost?.header_image) return "";

    return (
      <Image
        src={data.getPost.header_image}
        height={"400px"}
        width={"700px"}
        alt="block-logo"
        // layout="responsive"
        unoptimized={true}
      />
    );
  }, [data?.getPost]);

  const markdown = useMemo(() => {
    if (!data?.getPost?.post_content) return "";
    let postContent = data.getPost.post_content;

    let markdownParts = postContent.split("\n");

    const noGoCharacters = [
      "#",
      "##",
      "###",
      "####",
      "1.",
      "2.",
      "3.",
      "4.",
      "5.",
      "6.",
    ];

    return markdownParts
      .filter((element) => !!element.length)
      .map((markdownPiece, idx) => {
        // Throughout the piece without interfering in headers or lists
        let renderRepetitionCondition =
          !!idx &&
          idx % 3 === 0 &&
          !noGoCharacters.some((char) => markdownPiece.includes(char));

        return (
          <div>
            <ReactMarkdown
              children={markdownPiece}
              remarkPlugins={[remarkGfm, remarkParse, remarkRehype]}
              rehypePlugins={[rehypeRaw]}
              key={markdownPiece + Math.random()}
            />
            {/* Adds interstitial on odd idx and prevents being under headings, within list,  */}
            {renderRepetitionCondition && (
              <InterstitialPlaceholder key={markdownPiece + idx}>
                This is a CTA Placeholder For the Moment
              </InterstitialPlaceholder>
            )}
          </div>
        );
      });
  }, [data?.getPost]);

  return (
    <div>
      {data?.getPost && (
        <Head>
          <link
            rel="icon"
            type="image/png"
            href="/images/cube-svgrepo-com.svg"
          />
          <title>{data?.getPost?.post_title}</title>

          <meta
            name="description"
            content={`${
              data?.getPost?.meta_description ||
              data?.getPost?.post_content.slice(0, 255)
            }`}
          />
          <meta name="twitter:card" content={data?.getPost?.post_title} />

          <meta
            name="twitter:site"
            content={`https://hodl-watch.vercel.app/education${data?.getPost?.slug}`}
          />
          <meta
            property="og:description"
            content={`${
              data?.getPost?.meta_description ||
              data?.getPost?.post_content.slice(0, 255)
            }`}
          />
          <meta property="og:image" content={data.getPost.header_image} />
        </Head>
      )}

      <DisclaimerHeader>
        Nothing in this article should be interpreted as financial advice.
      </DisclaimerHeader>

      <BackButton>
        <Link href="/education">
          <span>
            <span>&#8592;</span>
            <span> Back</span>
          </span>
        </Link>
      </BackButton>

      <ContentContainer>
        {headerImage}
        <div className="top-row">
          <div className="left-card">
            <MarkdownContainer>{markdown}</MarkdownContainer>
          </div>

          {/* Update once related Posts is available */}
          {data?.getPost && (
            <div className="right-card">
              <h4>Related Posts</h4>
              <RelatedPostsRow tempPost={data.getPost} />
            </div>
          )}
        </div>

        <InterstitialPlaceholder>
          CTA Placholder at bottom if no other at bottom
        </InterstitialPlaceholder>
      </ContentContainer>
    </div>
  );
};

const BackButton = styled.div`
  position: absolute;
  top: 10rem;
  left: 2rem;
  cursor: pointer;

  span {
    font-weight: bold;
    font-size: 1rem;
    color: ${Colors.PrimaryButtonBackground};
  }
`;

const DisclaimerHeader = styled.div`
  background-color: gray;
  width: "100%";
  text-align: center;
  color: white;
  font-weight: bold;
  padding: 0.5rem 0;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;

  .top-row {
    width: 100%;
    display: flex;
    flex-direction: column;

    @media ${MediaQueries.MD} {
      flex-direction: row;
      gap: 1rem;
      padding: 0 2rem;
      padding-bottom: 2rem;
    }

    .left-card {
      @media ${MediaQueries.MD} {
        width: 90%;
        margin-top: 3rem;
      }
    }

    .right-card {
      border: 2px solid black;
      text-align: center;
      margin-bottom: auto;

      h4 {
        padding: 1rem;
      }

      @media ${MediaQueries.MD} {
        max-width: 25%;
        margin-top: 3rem;
      }
    }
  }
`;

const InterstitialPlaceholder = styled.div`
  display: flex;
  justify-self: center;
  justify-content: center;
  background-color: #ececec;
  padding: 1rem;
  margin: 1rem;
`;

const MarkdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid black;
  padding: 1rem;
  justify-content: center;
  margin-top: 2rem;

  a {
    color: blue;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    padding: 1rem;
  }

  p {
    padding-left: 1rem;
  }

  @media ${MediaQueries.MD} {
    border: unset;
  }
`;

const getSiteTitle = async (context) => {
  const { slug } = context.query;

  const result = await client.query({
    query: GET_POST,
    variables: {
      slug: "/" + slug?.toString(),
    },
  });

  return { data: result };
};

export const getServerSideProps = async (context) => {
  let data = null;

  const response = await getSiteTitle(context); // any async promise here.

  data = response.data;

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: data, // will be passed to the page component as props
  };
};

export default EducationArticle;
