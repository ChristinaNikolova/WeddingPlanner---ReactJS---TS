import express from "express";

async function start(): Promise<void> {
  const app = express();
  app.listen(3030, () => console.log("Hi"));
}

start();
