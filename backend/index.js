import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const mongoUrl = process.env.MONGO_URL;

app.get("/", (req, res) => {
  res.send("Hello world");
});

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log(`server is connected to mongodb`);
    app.listen(port, () => {
      console.log(`server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(`failed to connect : ${err}`);
  });
