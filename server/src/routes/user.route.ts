import { Router, Request, Response } from "express";
import { userController } from "../controllers";

export const userRoutes = Router();

userRoutes.get("/user", (req: Request, res: Response) => {
  const user = req.user; // The decoded user info from Firebase
  if (user) {
    res.json({ message: "Authenticated", user });
  } else {
    res.status(401).json({ message: "No user authenticated" });
  }
});

userRoutes.post("/user", (req: Request, res: Response) =>
  userController.createUser(req, res)
);

userRoutes.get("/user/:userId", (req: Request, res: Response) => {
  const user = req.user; // The decoded user info from Firebase
  if (user) {
    res.json({ message: "Authenticated", user });
  } else {
    res.status(401).json({ message: "No user authenticated" });
  }
});
