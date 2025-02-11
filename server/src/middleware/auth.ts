import { Request, Response, NextFunction } from "express";
import * as admin from "firebase-admin";
import * as dotenv from "dotenv";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import firebaseConfigJSON from "../config/config";
import firebaseConfig from "../config/config";

dotenv.config();

// var serviceAccount = require("../../firebase-key.json");
// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig as admin.ServiceAccount),
});

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const idToken = req.header("Authorization")?.split("Bearer ")[1];

  if (!idToken) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify the ID token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // Attach decoded token to the request object
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token", error });
  }
};

export const decodeToken = async (token: string): Promise<any> => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid token");
  }
};
