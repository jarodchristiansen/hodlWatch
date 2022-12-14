import Post from "../../models/post";

export const PostResolver = {
    getPosts: async (_, { filter }) => {
        try {
          let posts = await Post.find({ section: filter });
  
          return posts;
        } catch (err) {
          console.log("ERROR IN TRY CATCH GET POSTS");
        }
      },
      getPost: async (_, { slug }) => {
        try {
          let post = await Post.findOne({ slug });
  
          return post;
        } catch (err) {
          console.log("ERROR IN TRY CATCH GET POSTS");
        }
      },
}