import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import database from "./database/database.js";
import errorHandler from "./middleware/errorhandler/errorHandler.js";
import notFound from "./middleware/errorhandler/notFound.js";
import { rateLimiter } from "./middleware/ratelimiter/ratelimiter.js";
import apiRoutes from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

const connectionSuccess = await database.connect();
if (!connectionSuccess) {
  process.exit(1);
}

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api", rateLimiter, apiRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
