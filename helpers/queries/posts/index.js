import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GET_POSTS($filter: String) {
    getPosts(filter: $filter) {
      category
      header_image
      post_title
      post_content
      publish_date
      section
      slug
      description
    }
  }
`;

export const GET_POST = gql`
  query GET_POST($slug: String) {
    getPost(slug: $slug) {
      category
      header_image
      post_content
      publish_date
      section
      slug
      post_title
      description
    }
  }
`;
