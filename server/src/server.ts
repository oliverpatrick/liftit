import express from "express";
import httpStatus from "http-status";
import cors from "cors";

import { auth } from "./middleware/auth";
import ApiError from "./utils/ApiError";

import { userRoutes } from "./routes/user.route";
import { workoutsRoute } from "./routes/workout.route";
import prisma from "./client";

const app = express();
const port = process.env.PORT || 8000;

app.use(
  cors({
    origin: "http://localhost:3000", // Allow only requests from your front-end URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

// Protect routes with Firebase Auth middleware
app.use("/", auth, userRoutes);
app.use("/", workoutsRoute);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

prisma.$connect().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
