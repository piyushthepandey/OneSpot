import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import registerRouter from "../routes/index.js";
import cookieParser from "cookie-parser";

const corsConfig = {
  credentials: true,
  origin: true,
};

const initialize = (app) => {
  app.use(cors(corsConfig));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  // MongoDB connection
  // Add your UserName and password to connect to your collection
  mongoose.connect(process.env.MONGO_DB_CONNECTION);
  //  Initialise routes
  registerRouter(app);
};

export default initialize;
