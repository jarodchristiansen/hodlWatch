import mongoose from "mongoose";

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const BTCMacrosSchema = new Schema({
  time: {
    type: Number,
    trim: false,
  },
  high: {
    type: Number,
    trim: false,
  },
  low: {
    type: Number,
    trim: false,
  },
  open: {
    type: Number,
    trim: false,
  },
  volumefrom: {
    type: Number,
    trim: false,
  },
  volumeto: {
    type: Number,
    trim: false,
  },
  close: {
    type: Number,
    trim: false,
  },
  conversionType: {
    type: String,
    trim: false,
  },
  totalvolume: {
    type: Number,
    trim: false,
  },
  VWAP: {
    type: Number,
    trim: false,
  },
  TWAP: {
    type: Number,
    trim: false,
  },
  rolling_sharpe: {
    type: Number,
    trim: false,
  },
});

BTCMacrosSchema.index({ name: "text" });

module.exports =
  mongoose.models.btc_macros || mongoose.model("btc_macros", BTCMacrosSchema);
