import Link from "next/link";
import { useMemo } from "react";
import styled from "styled-components";

interface RelatedPostsProps {
  tempPost: Post;
}

export type Post = {
  section: String;
  category: String;
  publish_date: Date;
  slug: String;
  header_image: String;
  post_title: String;
  post_content: String;
};

const RelatedPostsRow = (props: RelatedPostsProps) => {
  const { tempPost } = props;

  const posts = useMemo(() => {
    const dummyPosts = [tempPost, tempPost, tempPost, tempPost, tempPost];

    console.log({ tempPost });

    return dummyPosts.map((post, idx) => {
      if (!post?.slug) return "";

      return (
        <Link
          href={`/education${post.slug}`}
          key={post.post_content + Math.random().toString()}
        >
          <RelatedPostBlock>
            <h3>{tempPost.post_title}</h3>
            <h3> {tempPost.category}</h3>
          </RelatedPostBlock>
        </Link>
      );
    });
  }, []);

  return <div>{posts}</div>;
};

const RelatedPostBlock = styled.div`
  text-align: center;
  border-top: 2px solid black;
  padding: 1rem 0;
`;

export default RelatedPostsRow;
