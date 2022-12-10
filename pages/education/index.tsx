import { useLazyQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { GET_POSTS } from "../../helpers/queries/posts/index";
import styled from "styled-components";
import { MediaQueries } from "../../styles/MediaQueries";
import RelatedPostsRow from "../../components/posts/RelatedPosts";

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
    <PageHolder>
      {data?.getPosts && (
        <div className="top-row">
          <div className="left-card">{PostCards}</div>

          <div className="right-card">
            <RelatedPostsRow tempPost={data.getPosts[0]} />
          </div>
        </div>
      )}
    </PageHolder>
  );
};

const PostRow = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  text-align: center;
  border: 2px solid black;
  gap: 1rem;

  span {
    color: gray;
    font-weight: bold;
  }
`;

const PageHolder = styled.div`
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
      display: flex;
      flex-direction: column;
      gap: 4rem;

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
        max-width: 20%;
        margin-top: 3rem;
      }
    }
  }
`;

export default EducationPage;
