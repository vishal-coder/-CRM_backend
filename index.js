import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { MongoClient } from "mongodb";
import { userRouter } from "./routes/User.js";
import http from "http";
import { leadRouter } from "./routes/LeadRoute.js";
import { contactRouter } from "./routes/ContactRoute.js";
import { serviceRouter } from "./routes/ServiceRoutes.js";

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
const app = express();
dotenv.config();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

app.use(cors(corsOptions));
app.use(express.json());

async function createConnection() {
  try {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("connected to database");
    return client;
  } catch (error) {
    console.log("error while connecting to database", error);
  }
}
export const client = await createConnection();

server.listen(PORT, () => {
  console.log("listening on *:", PORT);
});

app.get("/", (req, res) => {
  res.send({ message: "default request" });
});

app.use("/auth", userRouter);
app.use("/lead", leadRouter);

app.use("/contact", contactRouter);
app.use("/service", serviceRouter);
