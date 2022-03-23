import "dotenv/config";
import express from "express";
import cors, { CorsOptions } from "cors";
import authRouter from "./src/routers/auth.router";
import { init } from "./src/models";
import gapisRouter from "./src/routers/gapis.route";
import docRouter from "./src/routers/doc.route";

// const BASE_URL = process.env.BASE_URL | "api";

const app = express();

var corsOptions: CorsOptions = {
  origin: ["https://lsalab.cs.nthu.edu.tw", "http://localhost:3000"],
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to lsalab web api!" });
});

app.use("/api", authRouter);
app.use("/api", gapisRouter);
app.use("/api", docRouter);

init();

// set port, listen for requests
const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
