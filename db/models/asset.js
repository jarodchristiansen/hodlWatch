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
  image: {
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
  current_price: {
    type: Number,
    trim: false,
  },
  market_cap: {
    type: Number,
    trim: false,
  },
  market_cap_rank: {
    type: Number,
    trim: false,
  },
  fully_diluted_valuation: {
    type: Number,
    trim: false,
  },
  circulating_supply: {
    type: Number,
    trim: false,
  },
  total_supply: {
    type: Number,
    trim: false,
  },
  ath: {
    type: Number,
    trim: false,
  },
  ath_change_percentage: {
    type: Number,
    trim: false,
  },
  ath_date: {
    type: Date,
    trim: false,
  },
  atl: {
    type: Number,
    trim: false,
  },
  atl_change_percentage: {
    type: Number,
    trim: false,
  },
  atl_date: {
    type: Date,
    trim: false,
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
  favorite_count: {
    type: Number,
    default: 0,
  },
});

AssetsSchema.index({ name: "text" });

module.exports = mongoose.models.Asset || mongoose.model("Asset", AssetsSchema);
