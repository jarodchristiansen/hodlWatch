import { useLazyQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { GET_POSTS } from "../../helpers/queries/posts/index";
import styled from "styled-components";
import { MediaQueries } from "../../styles/MediaQueries";
import RelatedPostsRow from "../../components/posts/RelatedPosts";
import { useSession, getSession } from "next-auth/client";
import PriceScreener from "../../components/commons/screener";

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
      <PageHolder>
        {data?.getPosts && (
          <div>
            <div className="top-row">
              <div className="left-card">
                {PostCards}

                {PostCards}
              </div>
            </div>

            <div className="right-card">
              <RelatedPostsRow tempPost={data.getPosts[0]} />
            </div>
          </div>
        )}
      </PageHolder>
    </div>
  );
};

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
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
