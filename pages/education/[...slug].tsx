import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
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

const EducationArticle = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [getPost, { data, loading, error: getPostError, called, refetch }] =
    useLazyQuery(GET_POST);

  useEffect(() => {
    if (slug) {
      getPost({
        variables: {
          slug: "/" + slug.toString(),
        },
      });
    }
  }, [slug]);

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

    const noGoCharacters = ["####", "1.", "2.", "3.", "4.", "5.", "6."];

    return markdownParts
      .filter((element) => !!element.length)
      .map((markdownPiece, idx) => {
        return (
          <div>
            <ReactMarkdown
              children={markdownPiece}
              remarkPlugins={[remarkGfm, remarkParse, remarkRehype]}
              rehypePlugins={[rehypeRaw]}
              key={markdownPiece + Math.random()}
            />
            {/* Adds interstitial on odd idx and prevents being under headings, within list,  */}
            {!!idx &&
              idx % 3 === 0 &&
              !noGoCharacters.some((char) => markdownPiece.includes(char)) && (
                <InterstitialPlaceholder key={markdownPiece + idx}>
                  This is a CTA Placeholder For the Moment
                </InterstitialPlaceholder>
              )}
          </div>
        );
      });
  }, [data?.getPost]);

  console.log({ markdown });

  return (
    <div>
      <DisclaimerHeader>
        Nothing in this article should be interpreted as financial advice.
      </DisclaimerHeader>

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
      </ContentContainer>
    </div>
  );
};

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

export default EducationArticle;
