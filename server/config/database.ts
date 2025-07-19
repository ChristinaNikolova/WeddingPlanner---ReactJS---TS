import mongoose from "mongoose";

export default async function connectDB(): Promise<void> {
  try {
    await mongoose.connect("mongodb://localhost:27017/weddingplanner-ts", {
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
