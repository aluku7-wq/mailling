import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongoDb connected:${conn.connection.host}`);
    // .cyn.underline is comming from colors library
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
export default dbConnect;
