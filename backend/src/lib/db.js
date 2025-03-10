import mongoose from "mongoose";
export const connnectDB = async() =>{
  try {
    const conn = await mongooose.connect(process.env.MONGODB_URI);
    console.log(`MngoDB coonnected:${conn.connection.host}`);

  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
}
