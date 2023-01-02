import PriceScreener from "@/components/commons/screener";
import RelatedPostsRow from "@/components/posts/RelatedPosts";
import { GET_POSTS } from "@/helpers/queries/posts/index";
import { MediaQueries } from "@/styles/MediaQueries";
import { useLazyQuery } from "@apollo/client";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import styled from "styled-components";

/**
 *
 * @returns Education Page filtering the posts created from HodlWatch-Admin portal
 */
const EducationPage = () => {
  const [getPosts, { data, loading: newsLoading, error, called, refetch }] =
    useLazyQuery(GET_POSTS);

  useEffect(() => {
    getPosts({
      variables: {
        filter: "Education",
      },
    });
  }, []);

  const PostCards = useMemo(() => {
    if (!data?.getPosts) return [];

    return data.getPosts.map((post) => {
      return (
        <Link href={`/education${post.slug}`} key={post.slug}>
          <PostRow>
            <Image
              src={post.header_image}
              height={300}
              width={100}
              alt="block-logo"
              unoptimized={true}
            />
            <h2> {post.post_title}</h2>
            <span>Subject: {post.category}</span>
            <span>
              {post?.description?.length &&
                post?.description?.slice(0, 125) + "..."}
            </span>
            {/* 
          <div>{post.post_content}</div> */}
          </PostRow>
        </Link>
      );
    });
  }, [data?.getPosts]);

  return (
    <div>
      <Head>
        <link rel="icon" type="image/png" href="/images/cube-svgrepo-com.svg" />
        <title>Cryptocurrency Explained - Blockchain Data Analysis</title>

        <meta
          name="description"
          content={
            "Have questions about cryptocurrency, 'like how many cryptocurrency exchanges are there?' but need some of the details explained? Click to learn more"
          }
        />
        <meta
          name="twitter:card"
          content={"Cryptocurrency Explained - Blockchain Data Analysis"}
        />
        <meta
          name="twitter:title"
          content={"Cryptocurrency Explained - Blockchain Data Analysis"}
        />
        <meta
          name="twitter:site"
          content={`https://hodl-watch.vercel.app/education`}
        />
        <meta property="twitter:image" content={"/assets/PieChart.PNG"} />
        <meta property="twitter:domain" content="hodl-watch.vercel.app" />

        <meta
          property="og:title"
          content={"Cryptocurrency Explained - Blockchain Data Analysis"}
        />

        <meta
          property="og:description"
          content={
            "Have questions about cryptocurrency, 'like how many cryptocurrency exchanges are there?' but need some of the details explained? Click to learn more"
          }
        />
        <meta property="og:image" content={"/assets/PieChart.PNG"} />

        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="400" />
      </Head>

      {/* <PriceScreener /> */}
      <FilterBar>
        <label htmlFor="article_search">Article:</label>
        <input type="text" name="article_search" />
      </FilterBar>

      <PageHolder>
        <InterstitialRow>
          <div className="header-column">
            <span>
              <h4>
                Remember, nothing in these articles should be interpreted as
                financial advice
              </h4>
              <h6>
                (we think we're pretty good, but we aren't financial advisors)
              </h6>
            </span>
          </div>
        </InterstitialRow>

        {data?.getPosts && (
          <div className="grid-holder">
            <h1>Crypto Insights: Indicators & Background</h1>

            <div className="top-row">
              <div className="left-card">
                {PostCards}

                {PostCards}

                {PostCards}
              </div>
            </div>

            <InterstitialRow>
              <div className="header-column">
                <span>
                  <h4>
                    Remember, nothing in these articles should be interpreted as
                    financial advice
                  </h4>
                  <h6>
                    (we think we're pretty good, but we aren't financial
                    advisors)
                  </h6>
                </span>
              </div>

              <div className="related-row">
                <RelatedPostsRow tempPost={data.getPosts[0]} />
              </div>
            </InterstitialRow>
          </div>
        )}
      </PageHolder>
    </div>
  );
};

const InterstitialRow = styled.div`
  width: 100%;
  background-color: #1a1919;
  color: white;
  padding: 2rem 2rem;
  border-top: 2px solid gray;
  text-align: center;

  .header-column {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .image-row {
    display: flex;
    justify-content: space-between;
    padding: 2rem 0;
    max-width: 30rem;
    margin: auto;
    gap: 1rem;

    @media ${MediaQueries.MD} {
      max-width: 50rem;
      gap: 3rem;
    }
  }

  .image-column {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .related-row {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;

    div {
      background-color: white;
      color: black;
      border-radius: 12px;
    }

    @media ${MediaQueries.MD} {
      flex-direction: row;
    }
  }
`;

const FilterBar = styled.div`
  display: flex;
  flex-direction: row;
  position: sticky;
  top: 4.5rem;
  z-index: 100;
  border-bottom: 1px solid gray;
  box-shadow: 2px 4px 8px gray;

  text-align: right;
  white-space: nowrap;
  justify-content: center;

  background-color: white;
  padding: 1.5rem 2rem;
  width: 100%;

  gap: 1rem;

  @media ${MediaQueries.MD} {
    justify-content: flex-end;
    top: 2.8rem;
    padding: 1.5rem 6rem;
  }
`;

const PostRow = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  text-align: center;
  border: 2px solid black;
  border-radius: 12px;
  box-shadow: 2px 4px 8px lightgray;
  gap: 1rem;
  margin: 1rem 0;

  span {
    color: gray;
    font-weight: bold;
  }

  h2:hover,
  span:hover {
    cursor: pointer;
    color: blue;
    text-decoration: underline;
  }
`;

const PageHolder = styled.div`
  display: grid;
  width: 100%;

  .grid-holder {
    text-align: center;
    margin: 1rem;
  }

  .top-row {
    width: 100%;
    display: flex;
    flex-direction: column;

    @media ${MediaQueries.MD} {
      flex-direction: row;
      gap: 1rem;
      padding: 2rem 2rem;
    }

    .left-card {
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      column-gap: 2rem;

      @media ${MediaQueries.MD} {
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      }
    }
  }

  .right-card {
    justify-content: center;
    max-width: 28.5rem;
    margin: auto;

    @media ${MediaQueries.MD} {
      max-width: 38.5rem;
    }
  }
`;

// export async function getServerSideProps(context) {
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/auth",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { session },
//   };
// }

export default EducationPage;
