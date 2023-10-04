import mongoose from "mongoose";

let isConnected = false;

export const mongoDBSession = async () => {
  try {
    mongoose.set("strictQuery", true);

    const con = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (con) {
      return con;
    }
    return new Error("Couldn't connect to database");
  } catch (error) {
    return new Error("Couldn't connect to database");
  }
};

export const connection = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Connected to database");
    return;
  }

  try {
    let con = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (con) {
      return con;
    }
    return new Error("Couldn't connect to database");
  } catch (error) {
    return new Error("Couldn't connect to database");
  }
};
