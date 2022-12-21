import mongoose from "mongoose";
import { stringify } from "querystring";

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const PostSchema = new Schema({
  section: {
    type: String,
  },
  category: {
    type: String,
  },
  publish_date: {
    type: Date,
    default: Date.now(),
  },
  slug: {
    type: String,
    default: "/",
  },
  header_image: {
    type: String,
    trim: false,
  },
  post_title: {
    type: String,
    trim: false,
  },
  description: {
    type: String,
    trim: false,
  },
  post_content: {
    type: String,
    trim: false,
  },
});

PostSchema.index({ name: "text" });

module.exports = mongoose.models.Post || mongoose.model("Post", PostSchema);
