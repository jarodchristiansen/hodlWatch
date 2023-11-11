// newsPostTypes.js
import { gql } from "apollo-server-micro";

export const newsPostTypeDefs = gql`
  type Post {
    section: String
    category: String
    publish_date: Date
    slug: String
    header_image: String
    post_title: String
    post_content: String
    description: String
  }

  input PostInput {
    section: String
    category: String
    publish_date: Date
    slug: String
    header_image: String
    post_title: String
    post_content: String
    description: String
  }

  enum CategoryType {
    BTC
    BUSINESS
    EXCHANGE
    ICO
  }

  type NewsFeedEntries {
    id: String
    guid: String
    published_on: Float
    imageurl: String
    title: String
    url: String
    body: String
    tags: String
    lang: String
    upvotes: String
    downvotes: String
    categories: CategoryType
    source_info: SourceInfo
    source: String
  }

  type SourceInfo {
    name: String
    img: String
    lang: String
  }
`;
