const mongoose = require("mongoose");

const MongoDb = process.env.MONGODB_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(MongoDb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
      // useCreateIndex: true,
    });
    console.log("db success connect");
  } catch (err) {
    console.log("error connecting to database", err);
    process.exit(1);
  }
};

module.exports = connectDb;
