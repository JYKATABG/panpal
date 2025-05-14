import express from "express";
import { NODE_ENV, PORT } from "./config/env.js";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";
import recipeRouter from "./routes/recipe.routes.js";
import userRouter from "./routes/user.routes.js";
import connectToDatabase from "./database/db.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import arjcetMiddleware from "./middlewares/arcjet.middleware.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = path.resolve();
const __filename = fileURLToPath(import.meta.url);

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(arjcetMiddleware);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/recipes", recipeRouter);
app.use("/api/v1/users", userRouter);

app.use(express.static(path.join(__dirname, "public")));

app.get("/{*any}", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log(`Server is running in ${NODE_ENV} mode on port ${PORT}`);

  await connectToDatabase();
});
