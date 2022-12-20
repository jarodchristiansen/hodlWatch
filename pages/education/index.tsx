import { useLazyQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { GET_POSTS } from "@/helpers/queries/posts/index";
import styled from "styled-components";
import { MediaQueries } from "@/styles/MediaQueries";
import RelatedPostsRow from "@/components/posts/RelatedPosts";
import { useSession, getSession } from "next-auth/client";
import PriceScreener from "@/components/commons/screener";

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
      console.log({ post });

      return (
        <Link href={`/education${post.slug}`}>
          <PostRow>
            <Image
              src={post.header_image}
              height={"300px"}
              width={"100px"}
              alt="block-logo"
              unoptimized={true}
            />
            <h2> {post.post_title}</h2>
            <span>Subject: {post.category}</span>
            {/* 
          <div>{post.post_content}</div> */}
          </PostRow>
        </Link>
      );
    });
  }, [data?.getPosts]);

  return (
    <div>
      <PriceScreener />
      <FilterBar>
        <label htmlFor="article_search">Article:</label>
        <input type="text" name="article_search" />
      </FilterBar>

      <PageHolder>
        {data?.getPosts && (
          <div>
            <div className="top-row">
              <div className="left-card">
                {PostCards}

                {PostCards}

                {PostCards}
              </div>
            </div>

            <InterstitialRow>
              <div className="header-column">
                <h2>Check in on more recent updates</h2>

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
            </InterstitialRow>

            {/* <div className="right-card">
              <RelatedPostsRow tempPost={data.getPosts[0]} />
            </div> */}
          </div>
        )}
      </PageHolder>
    </div>
  );
};

// const PairRowContainer = styled.div`
//   display: flex;
//   max-width: 100%;
//   overflow: scroll;
//   gap: 1rem;
//   padding: 1rem 0;

//   ::-webkit-scrollbar {
//     display: none;
//     -ms-overflow-style: none; /* IE and Edge */
//     scrollbar-width: none; /* Firefox */
//   }
// `;

const InterstitialRow = styled.div`
  width: 100%;
  background-color: #1a1919;
  color: white;
  padding: 2rem 2rem;
  margin-top: 4rem;
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
  margin: 1rem;

  span {
    color: gray;
    font-weight: bold;
  }
`;

const PageHolder = styled.div`
  display: grid;
  width: 100%;
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
      width: 100%;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      column-gap: 2rem;
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
