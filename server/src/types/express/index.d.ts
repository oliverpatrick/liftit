// src/types/express/index.d.ts
import * as admin from "firebase-admin";

declare global {
  declare namespace Express {
    interface Request {
      user?: admin.auth.DecodedIdToken;
    }
  }
}
