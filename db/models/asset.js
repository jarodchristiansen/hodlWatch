import mongoose from "mongoose";

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const AssetsSchema = new Schema({
  title: {
    type: String,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
  },
  symbol: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  imageUrl: {
    type: String,
    trim: false,
  },
  linkUrl: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  tags: {
    type: Array,
    trim: true,
  },
  // urls: {
  //   type: Enumerator,
  //   trim: true,
  // },
  size: {
    type: String,
    trim: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

AssetsSchema.index({ name: "text" });

module.exports = mongoose.models.Asset || mongoose.model("Asset", AssetsSchema);
