import mongoose from "mongoose";
import global from "../utils/constants/global";

const { important } = global;

export default async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(important.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);

    console.log("Connected");

    mongoose.connection.on("error", (err) => {
      console.error("Error 1");
      console.error(err);
    });
  } catch (err) {
    console.error("Error");
    process.exit(1);
  }
}
