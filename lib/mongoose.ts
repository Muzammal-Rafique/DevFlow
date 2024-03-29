import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    return console.log("MongoDB Url Missing");
  }

  if (isConnected) {
    return console.log("MongoDB is already Connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "DevFlow",
    });
    isConnected = true;

    console.log("MongoDB is Connected");
  } catch (error) {
    console.log("MongoDB connection is failed", error);
  }
};
