import { useLazyQuery } from "@apollo/client";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { GET_POSTS } from "../../helpers/queries/posts/index";

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
          <div>
            <h2> {post.post_title}</h2>
            <h2> {post.category}</h2>
            {/* 
          <div>{post.post_content}</div> */}
          </div>
        </Link>
      );
    });
  }, [data?.getPosts]);

  return (
    <div>
      This is Educationpage
      {PostCards}
    </div>
  );
};

export default EducationPage;
