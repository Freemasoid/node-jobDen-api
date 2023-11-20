import "dotenv/config";
import "express-async-errors";
import helmet from "helmet";
import express from "express";
import connectDB from "./db/connect.js";
import authMid from "./middleware/authentication.js";
import authRouter from "./routes/auth.js";
import jobsRouter from "./routes/jobs.js";
import notFoundMid from "./middleware/not-found.js";
import errorHandlerMid from "./middleware/error-handler.js";
import path from "path";
import url from "url";
import cors from "cors";

//__dirname and __filename are not used in ESM, this is a workaround
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.json());
app.use(helmet());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authMid, jobsRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(notFoundMid);
app.use(errorHandlerMid);
app.use(cors());

const port = process.env.PORT || 5174;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
