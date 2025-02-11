import { User } from "@prisma/client";
import httpStatus from "http-status";
import prisma from "../client";
import ApiError from "../utils/ApiError";
import { decodeToken } from "../middleware/auth";

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (
  name: string,
  email: string,
  token: string
): Promise<User | ApiError> => {
  try {
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");
    }
    console.log("name: ", name);
    console.log("email: ", email);

    const decodedToken = await decodeToken(token);
    console.log("Decoded token: ", decodedToken);

    let existingUser = await prisma.user.findUnique({ where: { email } });

    if (!existingUser) {
      existingUser = await prisma.user.create({
        data: { name, email },
      });
    }

    return existingUser;
  } catch (error) {
    console.error("Error creating user: ", error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Error creating user");
  }
};

// /**
//  * Get user by id
//  * @param {ObjectId} id
//  * @param {Array<Key>} keys
//  * @returns {Promise<Pick<User, Key> | null>}
//  */
// const getUserById = async <Key extends keyof User>(
//   id: number,
//   keys: Key[] = ["id", "email", "firebaseUid", "token"] as Key[]
// ): Promise<Pick<User, Key> | null> => {
//   return prisma.user.findUnique({
//     where: { id },
//     select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
//   }) as Promise<Pick<User, Key> | null>;
// };

/**
 * Get user by email
 * @param {string} email
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<User, Key> | null>}
 */
const getUserByEmail = async <Key extends keyof User>(
  email: string,
  keys: Key[] = ["id", "email", "name"] as Key[]
): Promise<Pick<User, Key> | null> => {
  return prisma.user.findUnique({
    where: { email },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
  }) as Promise<Pick<User, Key> | null>;
};

export default {
  createUser,
  // getUserById,
  getUserByEmail,
};
