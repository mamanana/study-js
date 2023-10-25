import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const APP_SECRET = "GraphQL-is-aw3some";

function getTokenPayload(token) {
  return jwt.verify(token, APP_SECRET);
}

function isAuthenticated(req) {
  // I use a cookie called 'session'
  const { token } = req?.cookies;

  // Cryptr requires a minimum length of 32 for any signing
  if (token) {
    const userId = getTokenPayload(token);

    if(userId) {
      return {
        isLogin: true,
        userId,
      };
    }
  }

  return {
    isLogin: false,
  };
}

export default async function createContext({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const authorization = isAuthenticated(req)
  return {
    // expose the cookie helper in the GraphQL context object
    cookie: res.cookie,
    // allow queries and mutations to look for an `isLogin` boolean in the context object
    ...authorization
  };
}
