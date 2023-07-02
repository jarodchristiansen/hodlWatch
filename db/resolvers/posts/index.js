import Post from "../../models/post";

export const PostResolver = {
  getPosts: async (_, { filter }) => {
    try {
      let posts = await Post.find({ section: filter });

      return posts;
    } catch (err) {
      throw new Error(err, "Try GET Posts");
    }
  },
  getPost: async (_, { slug }) => {
    try {
      let post = await Post.findOne({ slug });

      return post;
    } catch (err) {
      throw new Error(err, "Try GET Post");
    }
  },
};
