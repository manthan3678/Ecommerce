import mongoose, { mongo } from "mongoose";
import colors from "colors";
const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Conneted To Mongodb Databse`.bgMagenta.white);
  } catch (error) {
    console.log(`error in MongoDb ${error}`.bgRed.white);
  }
};

export default connectDb;
