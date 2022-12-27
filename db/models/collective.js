import mongoose from "mongoose";

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const CollectiveStatSchema = new Schema({
  user_count: {
    type: Number,
    default: 0,
  },
  asset_count: {
    type: Number,
    default: 12907,
  },
  followed_assets: {
    type: Number,
    default: 0,
  },
  top_assets: {
    type: [
      { id: String, symbol: String, name: String, favorite_count: Number },
    ],
    default: [],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

CollectiveStatSchema.index({ name: "text" });

module.exports =
  mongoose.models.CollectiveStats ||
  mongoose.model("CollectiveStats", CollectiveStatSchema);
