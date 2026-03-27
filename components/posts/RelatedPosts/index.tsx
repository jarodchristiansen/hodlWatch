import Link from "next/link";
import { useMemo } from "react";
import styled from "styled-components";

interface RelatedPostsProps {
  tempPost: Post;
}

export type Post = {
  section: string;
  category: string;
  publish_date: Date;
  slug: string;
  header_image: string;
  post_title: string;
  post_content: string;
};

/**
 *
 * @param props Array of posts related to the current article
 * @returns Row of posts related to the existing post in the article
 */
const RelatedPostsRow = (props: RelatedPostsProps) => {
  const { tempPost } = props;

  const posts = useMemo(() => {
    const dummyPosts = [tempPost, tempPost, tempPost, tempPost];

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
  }, [tempPost]);

  return <>{posts}</>;
};

const RelatedPostBlock = styled.div`
  max-width: 33rem;
  text-align: center;
  border-top: 2px solid black;
  padding: 1rem 0;
`;

export default RelatedPostsRow;
