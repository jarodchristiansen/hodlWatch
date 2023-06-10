import RelatedPostsRow from "@/components/posts/RelatedPosts";
import { GET_POST } from "@/helpers/queries/posts";
import { Colors } from "@/styles/variables";
import { MediaQueries } from "@/styles/variables";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import styled from "styled-components";

import client from "../../apollo-client";

/**
 *
 * @param data: Post Article that is returned from SSR query
 * @returns EducationArticle from HodlWatch-Admin
 */
const EducationArticle = ({ data }) => {
  const headerImage = useMemo(() => {
    if (!data?.getPost?.header_image) return "";

    return (
      <Image
        src={data.getPost.header_image}
        height={300}
        width={500}
        alt="block-logo"
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
          idx % 7 === 0 &&
          !noGoCharacters.some((char) => markdownPiece.includes(char));

        return (
          <div key={markdownPiece + Math.random()}>
            <ReactMarkdown
              // eslint-disable-next-line react/no-children-prop
              children={markdownPiece}
              remarkPlugins={[remarkGfm, remarkParse, remarkRehype]}
              rehypePlugins={[rehypeRaw]}
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

  const { asPath } = useRouter();

  const shareToFacebook = () => {
    const origin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "";

    const URL = `${origin}${asPath}`;

    const navUrl = "https://www.facebook.com/sharer/sharer.php?u=" + URL;
    window.open(navUrl, "_blank");
  };

  const shareToTwitter = () => {
    const origin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "";

    const URL = `${origin}${asPath}`;

    const navUrl = "https://twitter.com/intent/tweet?text=" + URL;
    window.open(navUrl, "_blank");
  };

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
              data?.getPost?.description ||
              data?.getPost?.post_content.slice(0, 255)
            }`}
          />
          <meta name="twitter:card" content={data?.getPost?.post_title} />
          <meta name="twitter:title" content={data?.getPost?.post_title} />
          <meta
            name="twitter:site"
            content={`https://hodl-watch.vercel.app/education${data?.getPost?.slug}`}
          />
          <meta property="twitter:image" content={data.getPost.header_image} />
          <meta property="twitter:domain" content="hodl-watch.vercel.app" />

          <meta property="og:title" content={data?.getPost?.post_title} />

          <meta
            property="og:description"
            content={`${
              data?.getPost?.description ||
              data?.getPost?.post_content.slice(0, 255)
            }`}
          />
          <meta property="og:image" content={data.getPost.header_image} />

          <meta property="og:image:width" content="400" />
          <meta property="og:image:height" content="400" />
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
            <h1>{data?.getPost?.post_title}</h1>

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

        <div className="share-button-container">
          <ProviderButton onClick={shareToFacebook}>
            <div className="button-content">
              <FaFacebook size={28} data-testid="login-facebook" />
            </div>
          </ProviderButton>

          <ProviderButton onClick={shareToTwitter}>
            <div className="button-content">
              <FaTwitter size={28} data-testid="login-twitter" />
            </div>
          </ProviderButton>
        </div>
      </ContentContainer>
    </div>
  );
};

const ProviderButton = styled.button`
  background-color: black;
  color: white;
  border-radius: 8px;
  border: 2px solid black;
  box-shadow: 2px 4px 8px gray;

  .button-content {
    display: flex;
    white-space: nowrap;
    gap: 1rem;
    padding: 0.5rem 0.5rem;
  }

  :hover {
    background-color: white;
    color: black;
  }
`;

const BackButton = styled.div`
  position: absolute;
  top: 10rem;
  left: 2rem;
  cursor: pointer;

  span {
    font-weight: bold;
    font-size: 1rem;
    color: ${Colors.elegant.accentPurple};
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
  gap: 1rem;

  img {
    margin-top: 2rem;
    width: 90%;
    height: auto;

    @media ${MediaQueries.SM} {
      width: 80%;
      margin-top: 3rem;
    }

    @media ${MediaQueries.MD} {
      margin-top: 4rem;
      width: 45%;
    }
  }

  .share-button-container {
    display: flex;
    gap: 1rem;
  }

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
      h1 {
        padding-left: 2rem;
      }

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
  border-radius: 12px;
  padding: 1rem;
  justify-content: center;
  margin-top: 2rem;

  a {
    color: blue;
    text-decoration: underline;
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
    border-radius: unset;
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
