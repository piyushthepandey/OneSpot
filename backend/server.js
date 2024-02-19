import express from "express";
import initialize from "./app/app.js";
import dotenv from "dotenv/config";

// Initialise express
const app = express();
const port = process.env.SERVER_PORT;
initialize(app);
app.listen(port, () => console.log(`Server ready at port ${port}`));
