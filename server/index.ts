import express from "express";
import connectDB from "./config/database";

async function start(): Promise<void> {
  const app = express();

  await connectDB();

  app.listen(3030, () => console.log("Hi"));
}

start();
