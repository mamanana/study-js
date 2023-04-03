import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken"

const APP_SECRET = "GraphQL-is-aw3some";

function getTokenPayload(token: string)  {
  return jwt.verify(token, APP_SECRET);
}

export async function createContext({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  if (req && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      if (!token) {
        throw new Error("No token found");
      }
      const { userId } = getTokenPayload(token);
      return userId;
    }
  }

  return null;
}
