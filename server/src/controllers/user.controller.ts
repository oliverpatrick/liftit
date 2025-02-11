import httpStatus from "http-status";
import ApiError from "../utils/ApiError";
import catchAsync from "../utils/catchAsync";
import { userService } from "../services";
import { Request, Response } from "express";
import { log } from "console";

const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const token = req.headers.authorization?.split("Bearer ")[1] ?? "";
  const user = await userService.createUser(name, email, token);
  res.status(httpStatus.CREATED).send(user);
};

// const getUser = async (req: Request, res: Response) => {
//   const user = await userService.getUserById(Number(req.params.userId));
//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, "User not found");
//   }
//   res.send(user);
// };

export default {
  createUser,
  // getUser,
};
